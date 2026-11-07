/**
 * ═══════════════════════════════════════════════════════════════════
 *  MASTER CRAWLER — Tree-Node Recursive Extraction Engine
 *  Target: https://pjenterprise.in/tyrolit-precision
 *  Strategy: DFS (Depth-First Search) with retry & self-correction
 * ═══════════════════════════════════════════════════════════════════
 */

import puppeteer, { type Browser, type Page, type ElementHandle } from 'puppeteer';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

// ─── Configuration ────────────────────────────────────────────────
const ROOT_URL = 'https://pjenterprise.in/tyrolit-precision';
const DOMAIN = 'pjenterprise.in';
const OUTPUT_DIR = path.resolve(process.cwd(), 'pjenterprise.in');
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;
const NAV_TIMEOUT = 30000;

// ─── Types ────────────────────────────────────────────────────────
interface ManifestEntry {
  file: string;
  sourceUrl: string;
  timestamp: string;
  treeDepth: number;
  depthLabel: string;
  status: 'Download' | 'Screenshot' | 'Node Failure';
  category: string;
  retries: number;
}

interface SiteNode {
  name: string;
  url: string;
  depth: number;
  children: SiteNode[];
}

// ─── State ────────────────────────────────────────────────────────
const manifest: ManifestEntry[] = [];
const visitedUrls = new Set<string>();

// ─── Utility: Sleep ───────────────────────────────────────────────
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

// ─── Utility: Sanitize Folder/File Names ──────────────────────────
function sanitize(name: string): string {
  return name
    .replace(/[<>:"/\\|?*]+/g, '_')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .substring(0, 100);
}

// ─── Utility: Depth Label ─────────────────────────────────────────
function depthLabel(depth: number): string {
  const labels: Record<number, string> = {
    0: 'Root',
    1: 'Level 1 -> Category Index',
    2: 'Level 2 -> Category',
    3: 'Level 3 -> Product',
    4: 'Level 4 -> Sub-Product',
  };
  return labels[depth] ?? `Level ${depth}`;
}

// ─── Utility: Ensure Directory Exists ─────────────────────────────
function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`  📁 Created folder: ${path.relative(OUTPUT_DIR, dirPath) || '.'}`);
  }
}

// ─── Utility: Save Manifest ──────────────────────────────────────
function saveManifest(): void {
  const manifestPath = path.join(OUTPUT_DIR, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
}

// ─── Utility: Add Manifest Entry ─────────────────────────────────
function addManifestEntry(entry: ManifestEntry): void {
  manifest.push(entry);
  saveManifest();
}

// ─── Retry Wrapper ────────────────────────────────────────────────
async function withRetry<T>(
  fn: () => Promise<T>,
  context: string,
  retries = MAX_RETRIES
): Promise<{ result: T | null; attempts: number }> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await fn();
      return { result, attempts: attempt };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  ⚠️  Attempt ${attempt}/${retries} failed for ${context}: ${msg}`);
      if (attempt < retries) {
        console.log(`      Retrying in ${RETRY_DELAY_MS}ms...`);
        await sleep(RETRY_DELAY_MS);
      }
    }
  }
  return { result: null, attempts: retries };
}

// ─── Download File via Axios ──────────────────────────────────────
async function downloadFile(
  url: string,
  destPath: string
): Promise<boolean> {
  const { result } = await withRetry(async () => {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 30000,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    fs.writeFileSync(destPath, Buffer.from(response.data));
    return true;
  }, `download ${url}`);
  return result === true;
}

// ─── Screenshot an Element ────────────────────────────────────────
async function screenshotElement(
  page: Page,
  selector: string,
  destPath: string
): Promise<boolean> {
  const { result } = await withRetry(async () => {
    const el = await page.$(selector);
    if (!el) throw new Error(`Element not found: ${selector}`);
    await el.screenshot({ path: destPath, type: 'png' });
    return true;
  }, `screenshot ${selector}`);
  return result === true;
}

// ─── Extract Images from a Page ──────────────────────────────────
async function extractImages(
  page: Page,
  folderPath: string,
  categoryName: string,
  depth: number
): Promise<void> {
  console.log(`  🖼️  Scanning for images...`);

  // Gather all image sources on the page
  const imgData = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img'));
    return images
      .map((img, idx) => ({
        src: img.src || img.getAttribute('data-src') || '',
        alt: img.alt || '',
        width: img.naturalWidth || img.width || 0,
        index: idx,
      }))
      .filter(
        (i) =>
          i.src &&
          !i.src.includes('data:image/svg') &&
          !i.src.includes('favicon') &&
          !i.src.includes('logo') &&
          i.width >= 50 // skip tiny icons
      );
  });

  console.log(`  🖼️  Found ${imgData.length} qualifying images`);

  for (const img of imgData) {
    const ext = getExtFromUrl(img.src) || 'png';
    const baseName = img.alt
      ? sanitize(img.alt)
      : `image_${img.index}`;
    const fileName = `${sanitize(categoryName)}_${baseName}.${ext}`;
    const destPath = path.join(folderPath, fileName);

    if (fs.existsSync(destPath)) continue;

    // Try direct download first
    const downloaded = await downloadFile(img.src, destPath);

    if (downloaded) {
      console.log(`    ✅ Downloaded: ${fileName}`);
      addManifestEntry({
        file: path.relative(OUTPUT_DIR, destPath),
        sourceUrl: img.src,
        timestamp: new Date().toISOString(),
        treeDepth: depth,
        depthLabel: depthLabel(depth),
        status: 'Download',
        category: categoryName,
        retries: 0,
      });
    } else {
      // Fallback: screenshot the element
      console.log(`    📸 Falling back to screenshot for: ${baseName}`);
      const screenshotName = `${sanitize(categoryName)}_${baseName}_screenshot.png`;
      const ssPath = path.join(folderPath, screenshotName);
      const screenshotted = await screenshotElement(
        page,
        `img[src="${img.src}"]`,
        ssPath
      );
      if (screenshotted) {
        console.log(`    ✅ Screenshotted: ${screenshotName}`);
        addManifestEntry({
          file: path.relative(OUTPUT_DIR, ssPath),
          sourceUrl: img.src,
          timestamp: new Date().toISOString(),
          treeDepth: depth,
          depthLabel: depthLabel(depth),
          status: 'Screenshot',
          category: categoryName,
          retries: MAX_RETRIES,
        });
      } else {
        console.log(`    ❌ Failed to acquire: ${baseName}`);
        addManifestEntry({
          file: '',
          sourceUrl: img.src,
          timestamp: new Date().toISOString(),
          treeDepth: depth,
          depthLabel: depthLabel(depth),
          status: 'Node Failure',
          category: categoryName,
          retries: MAX_RETRIES,
        });
      }
    }
  }
}

// ─── Extract PDFs from a Page ─────────────────────────────────────
async function extractPDFs(
  page: Page,
  folderPath: string,
  categoryName: string,
  depth: number
): Promise<void> {
  console.log(`  📄 Scanning for PDF links...`);

  const pdfLinks = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a[href]'));
    return anchors
      .filter((a) => {
        const href = a.getAttribute('href') || '';
        return href.toLowerCase().endsWith('.pdf');
      })
      .map((a) => ({
        href: a.getAttribute('href')!,
        text: a.textContent?.trim() || '',
      }));
  });

  console.log(`  📄 Found ${pdfLinks.length} PDF link(s)`);

  for (const pdf of pdfLinks) {
    const url = pdf.href.startsWith('http')
      ? pdf.href
      : `https://${DOMAIN}${pdf.href}`;

    const originalName = path.basename(new URL(url).pathname);
    const fileName = `${sanitize(categoryName)}_${originalName}`;
    const destPath = path.join(folderPath, fileName);

    if (fs.existsSync(destPath)) continue;

    const downloaded = await downloadFile(url, destPath);
    if (downloaded) {
      console.log(`    ✅ Downloaded PDF: ${fileName}`);
      addManifestEntry({
        file: path.relative(OUTPUT_DIR, destPath),
        sourceUrl: url,
        timestamp: new Date().toISOString(),
        treeDepth: depth,
        depthLabel: depthLabel(depth),
        status: 'Download',
        category: categoryName,
        retries: 0,
      });
    } else {
      console.log(`    ❌ Failed to download PDF: ${originalName}`);
      addManifestEntry({
        file: '',
        sourceUrl: url,
        timestamp: new Date().toISOString(),
        treeDepth: depth,
        depthLabel: depthLabel(depth),
        status: 'Node Failure',
        category: categoryName,
        retries: MAX_RETRIES,
      });
    }
  }
}

// ─── Helper: Get Extension from URL ───────────────────────────────
function getExtFromUrl(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    const ext = path.extname(pathname).replace('.', '').toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'avif'].includes(ext)) {
      return ext;
    }
  } catch {}
  return 'png';
}

// ─── Phase 1: Map the Site Hierarchy (DFS) ────────────────────────
async function mapSiteTree(page: Page): Promise<SiteNode> {
  console.log('\n═══════════════════════════════════════════');
  console.log(' PHASE 1: MAPPING SITE HIERARCHY (DFS)');
  console.log('═══════════════════════════════════════════\n');

  // Navigate to root page
  const { result: navOk } = await withRetry(async () => {
    await page.goto(ROOT_URL, { waitUntil: 'networkidle2', timeout: NAV_TIMEOUT });
    return true;
  }, 'navigate to root');

  if (!navOk) {
    console.error('❌ FATAL: Cannot reach root URL.');
    process.exit(1);
  }

  // Extract the industry category links from the Tyrolit Precision page
  const categoryLinks = await page.evaluate(() => {
    const links: { name: string; url: string }[] = [];
    // The page has "KNOW MORE" links for each industry category
    const anchors = Array.from(document.querySelectorAll('a'));
    for (const a of anchors) {
      const href = a.getAttribute('href') || '';
      const text = a.textContent?.trim() || '';
      // Match industry category pages on pjenterprise.in domain
      if (
        href.includes('pjenterprise.in/') &&
        !href.includes('tyrolit-precision') &&
        !href.includes('/shell') &&
        !href.includes('/about') &&
        !href.includes('/contact') &&
        !href.includes('/services') &&
        !href.includes('/home') &&
        !href.includes('/team') &&
        !href.includes('/projects') &&
        !href.includes('/news') &&
        !href.includes('/shop') &&
        !href.endsWith('.pdf') &&
        !href.includes('wp-content') &&
        !href.includes('tplabs.co') &&
        !href.includes('jeen.co') &&
        href !== 'https://pjenterprise.in/' &&
        href !== 'https://pjenterprise.in'
      ) {
        // Avoid duplicates
        if (!links.find((l) => l.url === href)) {
          // Derive category name from parent context or from URL
          const urlPath = new URL(href).pathname.replace(/\//g, '');
          const name =
            urlPath
              .split('-')
              .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(' ') || text;
          links.push({ name, url: href });
        }
      }
    }
    return links;
  });

  console.log(`📌 Root: Tyrolit Precision`);
  console.log(`   Found ${categoryLinks.length} industry categories:\n`);

  const rootNode: SiteNode = {
    name: 'Tyrolit Precision',
    url: ROOT_URL,
    depth: 0,
    children: [],
  };

  for (const cat of categoryLinks) {
    console.log(`   ├── ${cat.name} → ${cat.url}`);
    rootNode.children.push({
      name: cat.name,
      url: cat.url,
      depth: 1,
      children: [],
    });
  }

  console.log(`\n✅ Site tree mapped: 1 root + ${rootNode.children.length} categories\n`);

  return rootNode;
}

// ─── Phase 2: DFS Crawl Each Node ─────────────────────────────────
async function crawlNode(
  browser: Browser,
  node: SiteNode,
  parentFolder: string
): Promise<void> {
  const normalizedUrl = node.url.replace(/\/+$/, '');
  if (visitedUrls.has(normalizedUrl)) {
    console.log(`  ⏭️  Already visited: ${node.name}`);
    return;
  }
  visitedUrls.add(normalizedUrl);

  const folderName = sanitize(node.name);
  const folderPath =
    node.depth === 0 ? parentFolder : path.join(parentFolder, folderName);
  ensureDir(folderPath);

  console.log(`\n${'─'.repeat(50)}`);
  console.log(
    `🔍 NODE: ${node.name} [Depth ${node.depth} — ${depthLabel(node.depth)}]`
  );
  console.log(`   URL: ${node.url}`);
  console.log(`   Folder: ${path.relative(OUTPUT_DIR, folderPath) || '.'}`);
  console.log('─'.repeat(50));

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  );

  // Navigate to this node's URL
  const { result: navOk, attempts } = await withRetry(async () => {
    await page.goto(node.url, { waitUntil: 'networkidle2', timeout: NAV_TIMEOUT });
    return true;
  }, `navigate to ${node.name}`);

  if (!navOk) {
    console.error(`  ❌ NODE FAILURE: Could not load ${node.name} after ${MAX_RETRIES} retries`);
    addManifestEntry({
      file: '',
      sourceUrl: node.url,
      timestamp: new Date().toISOString(),
      treeDepth: node.depth,
      depthLabel: depthLabel(node.depth),
      status: 'Node Failure',
      category: node.name,
      retries: MAX_RETRIES,
    });
    await page.close();
    return;
  }

  // Wait a moment for lazy-loaded content
  await sleep(1500);

  // Take a full-page screenshot for reference
  const pageScreenshotPath = path.join(folderPath, `_page_screenshot.png`);
  try {
    await page.screenshot({ path: pageScreenshotPath, fullPage: true, type: 'png' });
    console.log(`  📸 Page screenshot saved`);
    addManifestEntry({
      file: path.relative(OUTPUT_DIR, pageScreenshotPath),
      sourceUrl: node.url,
      timestamp: new Date().toISOString(),
      treeDepth: node.depth,
      depthLabel: depthLabel(node.depth),
      status: 'Screenshot',
      category: node.name,
      retries: 0,
    });
  } catch (err) {
    console.log(`  ⚠️  Could not take page screenshot`);
  }

  // Extract PDFs
  await extractPDFs(page, folderPath, node.name, node.depth);

  // Extract images
  await extractImages(page, folderPath, node.name, node.depth);

  // If this is a category page (depth 1), discover sub-pages (product links)
  if (node.depth >= 1) {
    const subLinks = await page.evaluate((domain: string) => {
      const anchors = Array.from(document.querySelectorAll('a[href]'));
      const links: { name: string; url: string }[] = [];
      for (const a of anchors) {
        const href = a.getAttribute('href') || '';
        const text = a.textContent?.trim() || '';
        if (
          href.includes(domain) &&
          !href.endsWith('.pdf') &&
          !href.includes('#') &&
          !href.includes('wp-content') &&
          text.length > 0 &&
          text.length < 100
        ) {
          if (!links.find((l) => l.url === href)) {
            links.push({ name: text, url: href });
          }
        }
      }
      return links;
    }, DOMAIN);

    // Filter to only sub-pages we haven't seen and that are under the parent category
    const parentPath = new URL(node.url).pathname.replace(/\/+$/, '');
    for (const sub of subLinks) {
      try {
        const subPath = new URL(sub.url).pathname.replace(/\/+$/, '');
        // Only follow deeper links (sub-paths of current page) that we haven't visited
        if (
          subPath.startsWith(parentPath) &&
          subPath !== parentPath &&
          subPath.length > parentPath.length &&
          !visitedUrls.has(sub.url.replace(/\/+$/, ''))
        ) {
          const childNode: SiteNode = {
            name: sub.name || sanitize(subPath.split('/').pop() || 'unknown'),
            url: sub.url,
            depth: node.depth + 1,
            children: [],
          };
          node.children.push(childNode);
        }
      } catch {}
    }
  }

  await page.close();

  // Recurse into children
  for (const child of node.children) {
    await crawlNode(browser, child, folderPath);
  }
}

// ─── Phase 3: Self-Correction & Validation ────────────────────────
function validateHierarchy(node: SiteNode, parentFolder: string): void {
  const folderPath =
    node.depth === 0 ? parentFolder : path.join(parentFolder, sanitize(node.name));

  if (!fs.existsSync(folderPath)) {
    console.warn(`  ⚠️  MISSING FOLDER: ${folderPath}`);
    return;
  }

  if (node.children.length > 0) {
    const expectedCount = node.children.length;
    const actualFolders = fs
      .readdirSync(folderPath, { withFileTypes: true })
      .filter((d) => d.isDirectory()).length;

    if (actualFolders < expectedCount) {
      console.warn(
        `  ⚠️  HIERARCHY MISMATCH at "${node.name}": ` +
          `Expected ${expectedCount} sub-folders, found ${actualFolders}`
      );
    } else {
      console.log(
        `  ✅ Hierarchy OK at "${node.name}": ${actualFolders} sub-folders`
      );
    }
  }

  for (const child of node.children) {
    validateHierarchy(child, folderPath);
  }
}

// ─── Main Entry Point ─────────────────────────────────────────────
async function main(): Promise<void> {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║   MASTER CRAWLER — Tree-Node Recursive Engine   ║');
  console.log('║   Target: pjenterprise.in/tyrolit-precision     ║');
  console.log('╚══════════════════════════════════════════════════╝\n');

  // Create root output directory
  ensureDir(OUTPUT_DIR);

  // Launch headless browser
  console.log('🚀 Launching headless browser...\n');
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    // ── Phase 1: Map the tree ──
    const siteTree = await mapSiteTree(page);
    await page.close();

    // Save the tree structure
    const treePath = path.join(OUTPUT_DIR, 'site-tree.json');
    fs.writeFileSync(treePath, JSON.stringify(siteTree, null, 2), 'utf-8');
    console.log(`📊 Site tree saved to site-tree.json\n`);

    // ── Phase 2: DFS Crawl ──
    console.log('═══════════════════════════════════════════');
    console.log(' PHASE 2: DFS CRAWL & ASSET ACQUISITION');
    console.log('═══════════════════════════════════════════\n');

    await crawlNode(browser, siteTree, OUTPUT_DIR);

    // ── Phase 3: Validation ──
    console.log('\n═══════════════════════════════════════════');
    console.log(' PHASE 3: SELF-CORRECTION & VALIDATION');
    console.log('═══════════════════════════════════════════\n');

    validateHierarchy(siteTree, OUTPUT_DIR);

    // Final summary
    const totalFiles = manifest.filter((m) => m.status !== 'Node Failure').length;
    const failures = manifest.filter((m) => m.status === 'Node Failure').length;
    const downloads = manifest.filter((m) => m.status === 'Download').length;
    const screenshots = manifest.filter((m) => m.status === 'Screenshot').length;

    console.log('\n╔══════════════════════════════════════════════════╗');
    console.log('║             CRAWL COMPLETE — SUMMARY             ║');
    console.log('╠══════════════════════════════════════════════════╣');
    console.log(`║  Total assets acquired:  ${String(totalFiles).padStart(4)}                    ║`);
    console.log(`║  ├── Downloads:          ${String(downloads).padStart(4)}                    ║`);
    console.log(`║  ├── Screenshots:        ${String(screenshots).padStart(4)}                    ║`);
    console.log(`║  └── Node Failures:      ${String(failures).padStart(4)}                    ║`);
    console.log(`║  Categories traversed:   ${String(visitedUrls.size).padStart(4)}                    ║`);
    console.log('╚══════════════════════════════════════════════════╝\n');

    console.log(`📋 Full manifest: ${path.join(OUTPUT_DIR, 'manifest.json')}`);
    console.log(`🌳 Site tree:     ${treePath}`);
  } finally {
    await browser.close();
    console.log('\n🛑 Browser closed. Crawler finished.');
  }
}

main().catch((err) => {
  console.error('💥 FATAL ERROR:', err);
  process.exit(1);
});
