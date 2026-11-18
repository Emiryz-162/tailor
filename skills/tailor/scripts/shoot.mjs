#!/usr/bin/env node
// Full-page screenshots at several widths using an installed Chrome / Edge / Chromium.
// Zero dependencies: talks to the browser over the DevTools protocol with Node's built-in WebSocket.
//
// Usage: node shoot.mjs <file-or-url> [output-folder] [--widths 390,768,1440] [--wait 800]
// Env:   BROWSER_PATH (or CHROME_PATH) to point at a browser executable.
// Needs Node 22+.

import { spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const opt = (name, dflt) => {
  const i = args.indexOf(`--${name}`);
  if (i === -1) return dflt;
  const v = args[i + 1];
  args.splice(i, 2);
  return v;
};
const widths = opt("widths", "390,768,1440").split(",").map(Number).filter(Boolean);
const waitMs = Number(opt("wait", "800"));
const [target, outArg] = args;

if (!target) {
  console.error("Usage: node shoot.mjs <file-or-url> [output-folder] [--widths 390,768,1440] [--wait 800]");
  process.exit(1);
}
if (typeof WebSocket === "undefined") {
  console.error("This script needs Node 22 or newer (built-in WebSocket).");
  process.exit(1);
}

const url = existsSync(target) ? pathToFileURL(resolve(target)).href : target;
const outDir = resolve(outArg || "screenshots");
mkdirSync(outDir, { recursive: true });

function findBrowser() {
  const fromEnv = process.env.BROWSER_PATH || process.env.CHROME_PATH;
  if (fromEnv) return fromEnv;
  const pf = process.env["PROGRAMFILES"] || "C:\\Program Files";
  const pf86 = process.env["PROGRAMFILES(X86)"] || "C:\\Program Files (x86)";
  const local = process.env["LOCALAPPDATA"] || "";
  const candidates = {
    win32: [
      `${pf}\\Google\\Chrome\\Application\\chrome.exe`,
      `${pf86}\\Google\\Chrome\\Application\\chrome.exe`,
      `${local}\\Google\\Chrome\\Application\\chrome.exe`,
      `${pf86}\\Microsoft\\Edge\\Application\\msedge.exe`,
      `${pf}\\Microsoft\\Edge\\Application\\msedge.exe`,
    ],
    darwin: [
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Applications/Chromium.app/Contents/MacOS/Chromium",
      "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    ],
    linux: [
      "/usr/bin/google-chrome", "/usr/bin/google-chrome-stable", "/usr/bin/chromium",
      "/usr/bin/chromium-browser", "/usr/bin/microsoft-edge", "/snap/bin/chromium",
    ],
  }[process.platform] || [];
  return candidates.find((p) => existsSync(p));
}

const browserPath = findBrowser();
if (!browserPath) {
  console.error("No Chrome/Edge/Chromium found. Set BROWSER_PATH to the browser executable.");
  process.exit(1);
}

const profile = mkdtempSync(join(tmpdir(), "tailor-shoot-"));
const browser = spawn(browserPath, [
  "--headless=new", "--remote-debugging-port=0", `--user-data-dir=${profile}`,
  "--no-first-run", "--no-default-browser-check", "--hide-scrollbars",
  "--disable-extensions", "--allow-file-access-from-files", "about:blank",
], { stdio: ["ignore", "ignore", "pipe"] });

const wsUrl = await new Promise((ok, fail) => {
  let buf = "";
  const timer = setTimeout(() => fail(new Error("Browser did not start in 20s")), 20000);
  browser.stderr.on("data", (d) => {
    buf += d;
    const m = buf.match(/DevTools listening on (ws:\/\/\S+)/);
    if (m) { clearTimeout(timer); ok(m[1]); }
  });
  browser.on("exit", (c) => fail(new Error(`Browser exited early (code ${c})`)));
});

const ws = new WebSocket(wsUrl);
await new Promise((ok, fail) => { ws.onopen = ok; ws.onerror = fail; });

let nextId = 1;
const pending = new Map();
const listeners = [];
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { ok, fail } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? fail(new Error(msg.error.message)) : ok(msg.result);
  } else if (msg.method) {
    listeners.forEach((l) => l(msg));
  }
};
const send = (method, params = {}, sessionId) => new Promise((ok, fail) => {
  const id = nextId++;
  pending.set(id, { ok, fail });
  ws.send(JSON.stringify({ id, method, params, sessionId }));
});
const once = (method, sessionId, timeoutMs = 30000) => new Promise((ok) => {
  const timer = setTimeout(() => ok(null), timeoutMs);
  const l = (m) => {
    if (m.method === method && m.sessionId === sessionId) {
      clearTimeout(timer);
      listeners.splice(listeners.indexOf(l), 1);
      ok(m);
    }
  };
  listeners.push(l);
});
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const written = [];
try {
  for (const width of widths) {
    const { targetId } = await send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
    await send("Page.enable", {}, sessionId);
    await send("Emulation.setDeviceMetricsOverride",
      { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 }, sessionId);
    const loaded = once("Page.loadEventFired", sessionId);
    await send("Page.navigate", { url }, sessionId);
    await loaded;
    await send("Runtime.evaluate", { expression: "document.fonts.ready.then(() => true)", awaitPromise: true }, sessionId);
    // Scroll through the page so lazy content and scroll-triggered reveals render.
    await send("Runtime.evaluate", {
      expression: `(async () => { const h = document.documentElement.scrollHeight;
        for (let y = 0; y < h; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
        window.scrollTo(0, 0); return true; })()`,
      awaitPromise: true,
    }, sessionId);
    // Force lazy images to load and wait until every image has loaded or failed (max 10 s).
    await send("Runtime.evaluate", {
      expression: `(async () => { const imgs = [...document.images];
        imgs.forEach(i => { if (i.loading === "lazy") i.loading = "eager"; });
        const done = Promise.all(imgs.map(i => i.complete ? 0 : new Promise(r => { i.addEventListener("load", r, { once: true }); i.addEventListener("error", r, { once: true }); })));
        await Promise.race([done, new Promise(r => setTimeout(r, 10000))]);
        await Promise.all(imgs.map(i => i.decode ? i.decode().catch(() => 0) : 0)); return true; })()`,
      awaitPromise: true,
    }, sessionId);
    await sleep(waitMs);
    const metrics = await send("Page.getLayoutMetrics", {}, sessionId);
    const size = metrics.cssContentSize || metrics.contentSize;
    const height = Math.min(Math.ceil(size.height), 16000);
    const overflow = Math.ceil(size.width) > width;
    const { data } = await send("Page.captureScreenshot", {
      format: "png", captureBeyondViewport: true,
      clip: { x: 0, y: 0, width, height, scale: 1 },
    }, sessionId);
    const file = join(outDir, `shot-${width}.png`);
    writeFileSync(file, Buffer.from(data, "base64"));
    written.push(file);
    console.log(`${file}  (${width}x${height})${overflow ? `  WARNING: page is ${Math.ceil(size.width)}px wide — horizontal overflow` : ""}`);
    await send("Target.closeTarget", { targetId });
  }
} catch (e) {
  console.error("Screenshot failed:", e.message);
  process.exitCode = 1;
} finally {
  try { await send("Browser.close"); } catch {}
  ws.close();
  browser.kill();
  await sleep(500);
  try { rmSync(profile, { recursive: true, force: true }); } catch {}
}
