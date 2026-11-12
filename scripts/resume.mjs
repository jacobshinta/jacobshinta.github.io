// Prints resume/resume.html to public/resume.pdf with headless Edge (Chrome works too).
//   node scripts/resume.mjs
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const browsers = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
];
const browser = browsers.find(existsSync);
if (!browser) throw new Error("No Edge or Chrome found to print the PDF.");

const src = pathToFileURL(path.resolve("resume/resume.html")).href;
const out = path.resolve("public/resume.pdf");
const profile = mkdtempSync(path.join(tmpdir(), "resume-print-"));

execFileSync(browser, [
  "--headless=new",
  "--disable-gpu",
  "--no-first-run",
  `--user-data-dir=${profile}`,
  "--no-pdf-header-footer",
  `--print-to-pdf=${out}`,
  src,
]);

// Edge can hand the work to a child process and return early, so wait for the file.
const start = Date.now();
while (!existsSync(out) || statSync(out).size === 0) {
  if (Date.now() - start > 30000) throw new Error("Timed out waiting for the PDF.");
  await new Promise((r) => setTimeout(r, 250));
}
console.log(`public/resume.pdf  ${(statSync(out).size / 1024).toFixed(0)} KB`);
