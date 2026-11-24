// Smoke test em navegador real: hidratação sem erros, boot, navegação por teclado, screenshots.
// Uso: node scripts/smoke.mjs [outDir]   (requer Chromium do Playwright instalado)
import path from "node:path";
import fs from "node:fs";
import { chromium } from "playwright-core";
import { startServer } from "./serve.mjs";

const out = process.argv[2] || "/tmp/portfolio-shots";
fs.mkdirSync(out, { recursive: true });
const server = await startServer(path.resolve(import.meta.dirname, "../dist"));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const problems = [];
for (const [name, p, vp] of [["home", "/", { width: 1366, height: 800 }], ["home-mobile", "/", { width: 390, height: 800 }], ["projeto", "/projetos/antichurn/", { width: 1366, height: 800 }], ["recruiter", "/recruiter/", { width: 1366, height: 800 }]]) {
  const ctx = await browser.newContext({ viewport: vp });
  const page = await ctx.newPage();
  page.on("console", (m) => { if (["error", "warning"].includes(m.type())) problems.push(`${name}: ${m.type()}: ${m.text()}`); });
  page.on("pageerror", (e) => problems.push(`${name}: pageerror: ${e.message}`));
  page.on("requestfailed", (r) => problems.push(`${name}: requestfailed ${r.url()}`));
  await page.goto(base + p, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  if (name.startsWith("home")) { await page.click(".boot", { timeout: 3000 }).catch(() => {}); await page.waitForTimeout(900); }
  await page.evaluate(() => document.querySelectorAll(".reveal").forEach((e) => e.classList.add("in")));
  await page.screenshot({ path: path.join(out, name + ".png"), fullPage: name !== "home" && name !== "home-mobile" ? true : false });
  if (name === "home") await page.screenshot({ path: path.join(out, "home-full.png"), fullPage: true });
  await ctx.close();
}
await browser.close();
server.close();
console.log(problems.length ? problems.join("\n") : "sem erros de console/rede");
process.exit(problems.length ? 1 : 0);
