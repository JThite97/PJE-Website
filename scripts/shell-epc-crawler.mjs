/**
 * Shell EPC crawler: fills in missing Shell TDS / MSDS PDFs.
 *
 * Source: https://www.epc.shell.com (Shell Product Catalogue Portal)
 *   1. Open the portal in English (inLang=EN).
 *   2. Choose India as the country and wait for the country page to load.
 *   3. For every Shell product on our catalog page that lacks a TDS or MSDS,
 *      search by product name, pick the exact match, accept the disclaimer
 *      and download the English TDS / MSDS.
 *
 * Files are written to public/PJ_Enterprise_Catalog/Shell/<family>/<product>/
 * and registered in src/data/catalog.json, which the Catalog page reads.
 *
 * Usage:  node scripts/shell-epc-crawler.mjs [--dry-run] [--only "Omala S2 G 100"]
 * Needs:  playwright (npm i -D playwright && npx playwright install chromium)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG_JSON = path.join(ROOT, "src/data/catalog.json");
const CATALOG_TSX = path.join(ROOT, "src/pages/Catalog.tsx");
const SHELL_DIR = path.join(ROOT, "public/PJ_Enterprise_Catalog/Shell");
const BASE = "https://www.epc.shell.com";
const COUNTRY = "India";

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const ONLY = args.includes("--only") ? args[args.indexOf("--only") + 1] : null;

// Same normalisation the Catalog page uses to match names to catalog.json.
const norm = (s) => s.toLowerCase().replace(/\ben-in\b/g, "").replace(/shell/g, "").replace(/[^a-z0-9]/g, "");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Catalog page family label -> catalog.json / folder name, for products that have no folder yet.
const FAMILY_FOLDER = {
  "Argina – Marine Engine Oil": "Argina  Marine Engine Oil Furnace",
  "Corena – Compressor Oil": "Compressor  Corena",
  "Gadus – Grease": "Grease",
  "Mysella – Gas Engine Oil": "Mysella  Ggas Engine Oil",
  "Rimula – Heavy Duty Engine Oil": "Rimula",
  "Tellus – Hydraulic Oil": "Hydraulic  Tellus",
  "Omala – Gear Oil": "Gear Oil  Omala",
  "Morlina – Bearing Oil": "Bearing  Morlina",
  "Turbin – Turbine Oil": "Turbin",
  "Spirax – Transmission Oil": "Spirex",
  "Tonna – Slide Way Oil": "Tonna  Slide Way Oil",
  "Heat Transfer Oil": "Heat Transfer",
  "Refrigeration Oil": "Refrigeration Oil",
};

/** Products shown on the Catalog page, with their family label. */
function readPageProducts() {
  const src = fs.readFileSync(CATALOG_TSX, "utf8");
  const out = [];
  const famRe = /family: "([^"]+)",[\s\S]*?products: \[([\s\S]*?)\]/g;
  let m;
  while ((m = famRe.exec(src))) {
    for (const p of m[2].matchAll(/name: "([^"]+)"/g)) out.push({ family: m[1], name: p[1] });
  }
  return out;
}

/** Work out which products need which documents. */
function buildWorklist(catalog) {
  const shell = catalog.Shell;
  const index = {};
  for (const [fam, prods] of Object.entries(shell))
    for (const [prod, data] of Object.entries(prods)) index[norm(prod)] = { fam, prod, data };

  return readPageProducts()
    .filter((p) => !ONLY || norm(p.name) === norm(ONLY))
    .map((p) => {
      const hit = index[norm(p.name)];
      const files = hit?.data?._files || [];
      const has = (k) => files.some((f) => new RegExp(`_${k}\\.pdf$`, "i").test(f.path));
      const fam = hit?.fam || FAMILY_FOLDER[p.family];
      if (!fam) throw new Error(`No folder mapping for family "${p.family}"`);
      return {
        ...p,
        fam,
        folder: hit?.prod || p.name,
        need: ["TDS", "MSDS"].filter((k) => !has(k)),
      };
    })
    .filter((p) => p.need.length);
}

/** Open the portal in English and pick India. */
async function openIndia(page) {
  await page.goto(`${BASE}/home/HomeSetup?inLang=EN`, { waitUntil: "networkidle" });
  await Promise.all([page.waitForURL(/CountryList/), page.selectOption("#countryId", { label: COUNTRY })]);
  await page.waitForLoadState("networkidle");
  await sleep(1000); // the portal needs a moment after the country is set
}

// Our name -> the name Shell EPC lists it under, where they differ beyond spacing/case.
const EPC_ALIASES = {
  "Shell Gadus S2 V220AC": "Shell Gadus S2 V220AC 2",
};

/** Search by product name; return the matching row's document links. */
async function findProduct(page, ourName) {
  const name = EPC_ALIASES[ourName] || ourName;
  // Try the full name, then without "Shell", then the first three and two words.
  const bare = name.replace(/^shell\s+/i, "");
  const words = bare.split(/\s+/);
  const queries = [...new Set([name, bare, words.slice(0, 3).join(" "), words.slice(0, 2).join(" ")])];
  for (const q of queries) {
    await page.goto(`${BASE}/home/HomeSetup?inLang=EN`, { waitUntil: "networkidle" });
    await page.fill("#searchTextBox", q);
    await page.check("#radio1"); // search by product name
    await Promise.all([page.waitForLoadState("networkidle"), page.click("#searchButton")]);
    await sleep(500);
    const rows = await page.$$eval("table tr", (trs) =>
      trs.map((tr) => {
        const a = [...tr.querySelectorAll("a")];
        const prod = a.find((x) => /\/Product\/Product\?/.test(x.getAttribute("href") || ""));
        const docs = a
          .map((x) => x.getAttribute("href") || "")
          .filter((h) => /DocumentRequest/.test(h))
          .map((h) => ({ href: h, type: (h.match(/Type=(\w+)/) || [])[1], lang: "" }));
        a.filter((x) => /DocumentRequest/.test(x.getAttribute("href") || "")).forEach((x, i) => (docs[i].lang = x.innerText.trim()));
        return prod ? { name: prod.innerText.trim(), docs } : null;
      }).filter(Boolean)
    );
    const exact = rows.filter((r) => norm(r.name) === norm(name));
    if (exact.length) {
      // Prefer the row that actually has documents.
      exact.sort((a, b) => b.docs.length - a.docs.length);
      return exact[0];
    }
  }
  return null;
}

/** Accept the disclaimer page and fetch the PDF bytes in the browser session. */
async function download(page, requestHref) {
  await page.goto(BASE + requestHref, { waitUntil: "networkidle" });
  const accept = await page.$eval('a:text-is("Accept")', (a) => a.getAttribute("href")).catch(() => null);
  if (!accept) return null;
  // The "Accept" page auto-opens the real PDF: TDS are on shell-livedocs.com (var pdfUrl),
  // MSDS are served by the portal itself (var pdfDownload, needs the session cookies).
  await page.goto(BASE + accept, { waitUntil: "domcontentloaded" });
  const html = await page.content();
  const pdfUrl = (html.match(/var pdfUrl = '([^']*)'/) || [])[1];
  const blobUrl = (html.match(/var pdfDownload = '([^']*)'/) || [])[1];
  let buf = null;
  if (pdfUrl) {
    const res = await fetch(pdfUrl.replace(/^http:/, "https:"));
    if (res.ok) buf = Buffer.from(await res.arrayBuffer());
  } else if (blobUrl) {
    const b64 = await page.evaluate(async (u) => {
      const r = await fetch(u);
      if (!r.ok) return null;
      const bytes = new Uint8Array(await r.arrayBuffer());
      let s = "";
      for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
      return btoa(s);
    }, blobUrl);
    if (b64) buf = Buffer.from(b64, "base64");
  }
  return buf && buf.subarray(0, 4).toString() === "%PDF" ? buf : null;
}

async function main() {
  const catalog = JSON.parse(fs.readFileSync(CATALOG_JSON, "utf8"));
  const work = buildWorklist(catalog);
  console.log(`${work.length} products need documents.`);

  const browser = await chromium.launch();
  const page = await (await browser.newContext({ locale: "en-US", extraHTTPHeaders: { "Accept-Language": "en" } })).newPage();
  await openIndia(page);

  const report = [];
  for (const item of work) {
    const row = await findProduct(page, item.name);
    if (!row) {
      console.log(`✗ ${item.name}: not found on EPC (India)`);
      report.push({ name: item.name, status: "not found" });
      continue;
    }
    const got = [];
    for (const kind of item.need) {
      const doc = row.docs.find((d) => d.type === kind && /^EN/i.test(d.lang)) || row.docs.find((d) => d.type === kind);
      if (!doc) continue;
      let pdf = null;
      for (let attempt = 1; attempt <= 3 && !pdf; attempt++) {
        pdf = await download(page, doc.href).catch((e) => (console.log(`  retry ${kind} (${e.cause?.code || e.message})`), null));
        if (!pdf) await sleep(2000 * attempt);
      }
      if (!pdf) continue;
      const dir = path.join(SHELL_DIR, item.fam, item.folder);
      const file = `Shell_${item.folder.replace(/\s+/g, "_")}_${kind}.pdf`;
      const rel = `PJ_Enterprise_Catalog/Shell/${item.fam}/${item.folder}/${file}`;
      if (!DRY_RUN) {
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, file), pdf);
        fs.rmSync(path.join(dir, "MISSING_FILES.txt"), { force: true });
        const entry = ((catalog.Shell[item.fam] ||= {})[item.folder] ||= {});
        (entry._files ||= []).push({ name: `Shell ${item.folder} ${kind}`, path: rel });
      }
      got.push(kind);
    }
    const missing = item.need.filter((k) => !got.includes(k));
    console.log(`${got.length ? "✓" : "✗"} ${item.name}: got [${got.join(", ")}]${missing.length ? ` still missing [${missing.join(", ")}]` : ""}`);
    report.push({ name: item.name, matched: row.name, got, missing });
  }

  if (!DRY_RUN) fs.writeFileSync(CATALOG_JSON, JSON.stringify(catalog, null, 2) + "\n");
  fs.writeFileSync(path.join(ROOT, "scripts/shell-epc-report.json"), JSON.stringify(report, null, 2) + "\n");
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
