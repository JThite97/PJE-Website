import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "..", "public", "assets", "tyrolit");

// Map: industry slug -> { product name, image URL }
const IMAGES = {
  // ─── Industry-level thumbnails ─────────────────────────────────────
  "_industries": [
    { name: "automotive",       url: "https://pjenterprise.in/wp-content/uploads/2024/04/start-your-engines-how-to-begin-a-startup-in-the-cars-industry.webp" },
    { name: "bearing",          url: "https://pjenterprise.in/wp-content/uploads/2024/04/Industrial-Bearings.webp" },
    { name: "precision",        url: "https://pjenterprise.in/wp-content/uploads/2024/04/precision-Additive-Manufacturing-and-Automotive-Manufacturing.webp" },
    { name: "steel-foundry",    url: "https://pjenterprise.in/wp-content/uploads/2024/04/electric-arc-furnace-3.webp" },
    { name: "tooling",          url: "https://pjenterprise.in/wp-content/uploads/2024/04/download.webp" },
    { name: "medical",          url: "https://pjenterprise.in/wp-content/uploads/2024/04/4-Emerging-Trends-Shaping-Medical-Devices.webp" },
    { name: "turbine",          url: "https://pjenterprise.in/wp-content/uploads/2024/04/Robotic-arms.jpg" },
    { name: "ceramics",         url: "https://pjenterprise.in/wp-content/uploads/2024/04/Technical-Ceramics.jpg" },
    { name: "foundry",          url: "https://pjenterprise.in/wp-content/uploads/2024/04/hammer-anvil-dark-blacksmith-workshop-with-fire-stove-background_613910-3412.webp" },
  ],

  // ─── Automotive sub-products ───────────────────────────────────────
  "automotive": [
    { name: "crankshafts-and-camshafts",          url: "https://pjenterprise.in/wp-content/uploads/2024/04/sbu1_nocken-kurbelwellen.jpg" },
    { name: "valves",                              url: "https://pjenterprise.in/wp-content/uploads/2024/04/sbu1_ventile.jpg" },
    { name: "compressors-and-turbocharger",        url: "https://pjenterprise.in/wp-content/uploads/2024/04/sbu1_turbolader.jpg" },
    { name: "fuel-injection-components",            url: "https://pjenterprise.in/wp-content/uploads/2024/04/sbu1_einspritzsysteme.jpg" },
    { name: "transmission-components",              url: "https://pjenterprise.in/wp-content/uploads/2024/04/sbu1_getriebewellen.jpg" },
    { name: "chassis-components",                   url: "https://pjenterprise.in/wp-content/uploads/2024/04/sbu1_homokinetisches-gelenk.jpg" },
    { name: "con-rods",                             url: "https://pjenterprise.in/wp-content/uploads/2024/04/sbu1_pleul.jpg" },
  ],

  // ─── Bearing sub-products ──────────────────────────────────────────
  "bearing": [
    { name: "rolling-bearing-rings",    url: "https://pjenterprise.in/wp-content/uploads/2024/04/sbu1_innen-aussen-ring-removebg-preview.png" },
    { name: "taper-rollers",            url: "https://pjenterprise.in/wp-content/uploads/2024/04/sbu1_stirnflaeche_kegelrollen.jpg" },
    { name: "cylindrical-rollers",      url: "https://pjenterprise.in/wp-content/uploads/2024/04/sbu1_zylinderrollen-nadeln.jpg" },
    { name: "spherical-rollers",        url: "https://pjenterprise.in/wp-content/uploads/2024/04/sbu1_tonnenrollenlager_aussen-einstech-schwing.jpg" },
    { name: "guide-rails",             url: "https://pjenterprise.in/wp-content/uploads/2024/04/sbu1_linearfuehrung.jpg" },
  ],

  // ─── Foundry sub-products ──────────────────────────────────────────
  "foundry": [
    { name: "automatic-fettling",         url: "https://pjenterprise.in/wp-content/uploads/2024/04/gussputzen_focur-sa.jpg_-removebg-preview.png" },
    { name: "off-hand-grinding",          url: "https://pjenterprise.in/wp-content/uploads/2024/04/gussputzen_freihandschleifen_focurextra-1.jpg" },
    { name: "off-hand-cutting",           url: "https://pjenterprise.in/wp-content/uploads/2024/04/sbu1_entgraten_putzen.jpg" },
    { name: "pedestal-pendular-grinding", url: "https://pjenterprise.in/wp-content/uploads/2024/04/sbu1_staender-pendelflach-1.jpg" },
    { name: "stationary-cut-off",         url: "https://pjenterprise.in/wp-content/uploads/2024/04/sbu1_stationaerestrennen-1.jpg" },
  ],

  // ─── Medical sub-products ──────────────────────────────────────────
  "medical": [
    { name: "hip-knee-joints",          url: "https://pjenterprise.in/wp-content/uploads/2024/04/sbu1_hueft_knie_gelenke.jpg" },
    { name: "implants-instruments",     url: "https://pjenterprise.in/wp-content/uploads/2024/04/sbu1_polieren_mattieren_Implantate.jpg" },
    { name: "hypodermic-needles",       url: "https://pjenterprise.in/wp-content/uploads/2024/04/sbu1_injektionsnadeln.jpg" },
    { name: "scissors-scalpels",        url: "https://pjenterprise.in/wp-content/uploads/2024/04/sbu1_skalpelle.jpg" },
  ],

  // ─── Steel & Foundry sub-products ──────────────────────────────────
  "steel-foundry": [
    { name: "cut-off-grinding",   url: "https://pjenterprise.in/wp-content/uploads/2024/04/f2a728cc93ae_secur_2_0_front_mdb-e1704803180942.png" },
    { name: "roll-grinding",      url: "https://pjenterprise.in/wp-content/uploads/2024/04/sbu1_walzenschleifen_walzenherstellung.jpg" },
    { name: "high-pressure",      url: "https://pjenterprise.in/wp-content/uploads/2024/04/sbu1_hochdruck_halbzeugen.jpg" },
    { name: "centreless-grinding",url: "https://pjenterprise.in/wp-content/uploads/2024/04/sbu1_centerless_stabstahl.jpg" },
  ],

  // ─── Tooling sub-products ─────────────────────────────────────────
  "tooling": [
    { name: "rotating-tools",     url: "https://pjenterprise.in/wp-content/uploads/2024/04/sbu1_schaft-gewindeschleifen.jpg" },
    { name: "cutting-inserts",    url: "https://pjenterprise.in/wp-content/uploads/2024/04/wendeschneidplatten_skytec_bold.jpg" },
    { name: "bandsaws-circular",  url: "https://pjenterprise.in/wp-content/uploads/2024/04/saegeschaerfen.jpg" },
  ],
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // follow redirect
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
    }).on("error", reject);
  });
}

async function main() {
  for (const [group, items] of Object.entries(IMAGES)) {
    const dir = path.join(OUT_DIR, group);
    fs.mkdirSync(dir, { recursive: true });

    for (const { name, url } of items) {
      const ext = path.extname(new URL(url).pathname) || ".jpg";
      const dest = path.join(dir, `${name}${ext}`);

      if (fs.existsSync(dest)) {
        console.log(`  SKIP  ${group}/${name}${ext}`);
        continue;
      }

      try {
        await download(url, dest);
        console.log(`  ✓  ${group}/${name}${ext}`);
      } catch (err) {
        console.error(`  ✗  ${group}/${name}${ext}  — ${err.message}`);
      }
    }
  }
  console.log("\nDone! All images downloaded.");
}

main();
