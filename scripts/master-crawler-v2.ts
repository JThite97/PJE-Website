/**
 * ═══════════════════════════════════════════════════════════════════
 *  MASTER CRAWLER V2 — Deep Tree-Node Recursive Extraction Engine
 *  Target: https://pjenterprise.in/tyrolit-precision
 *  Features: Swiper extraction, Google Drive handling, Level 3 discovery
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
const NAV_TIMEOUT = 45000;

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

function depthLabel(depth: number): string {
  const labels: Record<number, string> = {
    0: 'Root',
    1: 'Level 1 -> Category',
    2: 'Level 2 -> Product Series',
    3: 'Level 3 -> Deep Link',
  };
  return labels[depth] ?? `Level ${depth}`;
}

function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`  📁 Created folder: ${path.relative(OUTPUT_DIR, dirPath) || '.'}`);
  }
}

function saveManifest(): void {
  const manifestPath = path.join(OUTPUT_DIR, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
}

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

// ─── File Downloading ─────────────────────────────────────────────
async function downloadFile(url: string, destPath: string): Promise<boolean> {
  const { result } = await withRetry(async () => {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
      },
    });
    fs.writeFileSync(destPath, Buffer.from(response.data));
    return true;
  }, `download ${url}`);
  return result === true;
}

// ─── Google Drive Converter ───────────────────────────────────────
function getGoogleDriveDownloadUrl(url: string): string | null {
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=download&id=${match[1]}`;
  }
  return null;
}

// ─── Scroll to Bottom ─────────────────────────────────────────────
async function scrollToBottom(page: Page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

// ─── Extract Images ───────────────────────────────────────────────
async function extractImages(
  page: Page,
  folderPath: string,
  categoryName: string,
  depth: number
): Promise<void> {
  console.log(`  🖼️  Scanning for images (lazy-load & swipers)...`);
  
  // Scroll to bottom to trigger lazy loading
  await scrollToBottom(page);
  await sleep(1500); // let things render

  const imgData = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img'));
    return images
      .map((img, idx) => ({
        src: img.getAttribute('data-src') || img.src || '',
        alt: img.alt || '',
        width: img.naturalWidth || img.width || 0,
        height: img.naturalHeight || img.height || 0,
        index: idx,
      }))
      .filter(
        (i) => i.src && !i.src.includes('data:image/svg') && !i.src.includes('favicon') && i.width >= 50
      );
  });

  console.log(`  🖼️  Found ${imgData.length} qualifying images`);

  for (const img of imgData) {
    let url = img.src;
    if (url.startsWith('//')) url = 'https:' + url;
    else if (url.startsWith('/')) url = `https://${DOMAIN}${url}`;

    const ext = getExtFromUrl(url) || 'png';
    const baseName = img.alt ? sanitize(img.alt) : `img_${img.index}`;
    const fileName = `${sanitize(categoryName)}_${baseName}.${ext}`;
    const destPath = path.join(folderPath, fileName);

    if (fs.existsSync(destPath)) continue;

    const downloaded = await downloadFile(url, destPath);

    if (downloaded) {
      console.log(`    ✅ Downloaded: ${fileName}`);
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
    }
  }
}

// ─── Extract PDFs (Standard & GDrive) ─────────────────────────────
async function extractPDFs(
  page: Page,
  folderPath: string,
  categoryName: string,
  depth: number
): Promise<void> {
  console.log(`  📄 Scanning for PDF / GDrive links...`);

  const pdfLinks = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a[href]'));
    return anchors
      .filter((a) => {
        const href = a.getAttribute('href') || '';
        return href.toLowerCase().endsWith('.pdf') || href.includes('drive.google.com/file/d/');
      })
      .map((a) => ({
        href: a.getAttribute('href')!,
        text: a.textContent?.trim() || '',
      }));
  });

  console.log(`  📄 Found ${pdfLinks.length} brochure link(s)`);

  for (const pdf of pdfLinks) {
    let url = pdf.href;
    if (url.startsWith('/')) url = `https://${DOMAIN}${url}`;

    let isGoogleDrive = false;
    let downloadTargetUrl = url;

    const gDriveUrl = getGoogleDriveDownloadUrl(url);
    if (gDriveUrl) {
      isGoogleDrive = true;
      downloadTargetUrl = gDriveUrl;
      console.log(`    🔗 Extracted GDrive ID targeting direct download.`);
    }

    const ext = isGoogleDrive ? 'pdf' : url.split('.').pop()?.split('?')[0] || 'pdf';
    let baseName = pdf.text ? sanitize(pdf.text) : 'brochure';
    if (!baseName || baseName.length < 2) baseName = isGoogleDrive ? 'gdrive_doc' : path.basename(new URL(url).pathname, '.'+ext);

    const fileName = `${sanitize(categoryName)}_${baseName}.${ext}`;
    const destPath = path.join(folderPath, fileName);

    if (fs.existsSync(destPath)) continue;

    const downloaded = await downloadFile(downloadTargetUrl, destPath);
    if (downloaded) {
      console.log(`    ✅ ${isGoogleDrive?'GDrive ':''}Downloaded PDF: ${fileName}`);
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
      console.log(`    ❌ Failed to download PDF.`);
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

// ─── Extract Sub Links (Level Discovery) ──────────────────────────
async function extractSubLinks(page: Page, baseUrl: string, domainParam: string): Promise<{name: string, url: string}[]> {
  return await page.evaluate(({base, domain}) => {
    const anchors = Array.from(document.querySelectorAll('a[href]'));
    const links: { name: string; url: string }[] = [];
    const basePath = new URL(base).pathname.replace(/\/+$/, '');

    for (const a of anchors) {
      const href = a.getAttribute('href')!;
      const text = a.textContent?.trim() || '';
      if (!href.includes(domain) && !href.startsWith('/')) continue;
      
      let fullUrl = "";
      try {
        fullUrl = new URL(href, base).href;
      } catch { continue; }

      const hrefPath = new URL(fullUrl).pathname.replace(/\/+$/, '');
      
      // Look for a link that goes "deeper"
      // Wait, on WP sites, Level 2 is /automotive/ and Level 3 might be /crankshafts-and-camshafts/
      // Which means it is NOT a sub-path of /automotive/, but a sibling path structurally!
      // So checking subPath.startsWith(parentPath) FAILS for WP.
      // Instead, we trust links appearing inside content blocks that look like internal pages (not pdfs, contacts, etc).
      if (
        fullUrl.includes(domain) &&
        !fullUrl.endsWith('.pdf') &&
        !fullUrl.includes('#') &&
        !fullUrl.includes('wp-content') &&
        !fullUrl.includes('/about') &&
        !fullUrl.includes('/contact') &&
        !fullUrl.includes('/services') &&
        !fullUrl.includes('/projects') &&
        fullUrl !== base &&
        hrefPath.length > 2
      ) {
         if (!links.find(l => l.url === fullUrl)) {
             links.push({ name: text, url: fullUrl });
         }
      }
    }
    return links;
  }, {base: baseUrl, domain: domainParam});
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

// ─── DFS Crawl Function ───────────────────────────────────────────
async function crawlNode(
  browser: Browser,
  node: SiteNode,
  parentFolder: string,
  maxLevels = 3
): Promise<void> {
  const normalizedUrl = node.url.replace(/\/+$/, '');
  if (visitedUrls.has(normalizedUrl)) {
    return;
  }
  visitedUrls.add(normalizedUrl);

  const folderName = sanitize(node.name || 'Root');
  const folderPath = node.depth === 0 ? parentFolder : path.join(parentFolder, folderName);
  ensureDir(folderPath);

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`🔍 [L${node.depth}] NODE: ${node.name}`);
  console.log(`   URL: ${node.url}`);
  console.log('─'.repeat(50));

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const { result: navOk } = await withRetry(async () => {
    await page.goto(node.url, { waitUntil: 'load', timeout: NAV_TIMEOUT });
    return true;
  }, `navigate to ${node.name}`);

  if (!navOk) {
    console.error(`  ❌ Failed to crawl ${node.name}`);
    await page.close();
    return;
  }
  
  await sleep(1000);

  // Take full page screenshot
  const ssPath = path.join(folderPath, `_page_screenshot.png`);
  try {
    await page.screenshot({ path: ssPath, fullPage: true });
    addManifestEntry({
      file: path.relative(OUTPUT_DIR, ssPath),
      sourceUrl: node.url,
      timestamp: new Date().toISOString(),
      treeDepth: node.depth,
      depthLabel: depthLabel(node.depth),
      status: 'Screenshot',
      category: node.name,
      retries: 0,
    });
  } catch(e) {}

  await extractPDFs(page, folderPath, node.name, node.depth);
  await extractImages(page, folderPath, node.name, node.depth);

  // Level progression
  if (node.depth < maxLevels) {
    const rawLinks = await extractSubLinks(page, node.url, DOMAIN);
    
    // We only process child links that are likely category children.
    // For depth 0 (Root), we look for the main categories.
    // For depth 1 (Category), we look for specific product strings or "Show More" matches.
    for (const link of rawLinks) {
       let validChild = false;
       if (node.depth === 0) {
          // If it's the root Tyrolit page, valid children are the industry links
          const categories = ['automotive', 'bearing-industry', 'precision-industry', 'steel-foundry', 'tooling-industry', 'medical-technology', 'turbine-industry', 'technical-ceramics', 'foundry-industry'];
          if (categories.some(c => link.url.includes(c))) validChild = true;
       } else if (node.depth === 1) {
          // If we are on an industry page, level 3 links are usually specific products or sub categories.
          // They don't link back to root or other generic pages.
          // Exclude root and main categories (since we've already seen them or will see them)
           const categories = ['automotive', 'bearing-industry', 'precision-industry', 'steel-foundry-industry', 'tooling-industry', 'medical-technology', 'turbine-industry', 'technical-ceramics', 'foundry-industry', 'shell', 'tyrolit-precision'];
           const pathName = new URL(link.url).pathname.replace(/\//g, '');
           if (!categories.includes(pathName) && pathName.length > 2) validChild = true;
       }

       if (validChild && !visitedUrls.has(link.url.replace(/\/+$/, ''))) {
          // Add child
          let cName = link.name;
          if (!cName || cName.length < 2 || cName.toLowerCase() === 'show more' || cName.toLowerCase().includes('read more')) {
             cName = new URL(link.url).pathname.split('/').filter(x=>x).pop()?.replace(/-/g, ' ') || 'Sub-category';
          }
          
          const childNode: SiteNode = { name: cName, url: link.url, depth: node.depth + 1, children: [] };
          node.children.push(childNode);
       }
    }
  }

  await page.close();

  for (const child of node.children) {
    await crawlNode(browser, child, folderPath, maxLevels);
  }
}

// ─── Main ─────────────────────────────────────────────────────────
async function main() {
  ensureDir(OUTPUT_DIR);
  console.log('🚀 Launching Master Crawler V2...\n');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const rootNode: SiteNode = {
    name: 'Tyrolit_Precision_Root',
    url: ROOT_URL,
    depth: 0,
    children: []
  };

  try {
    await crawlNode(browser, rootNode, OUTPUT_DIR, 2); // Depth 0 (Root) -> 1 (Category) -> 2 (Sub-product)
    fs.writeFileSync(path.join(OUTPUT_DIR, 'site-tree-v2.json'), JSON.stringify(rootNode, null, 2));
    
    console.log('\n✅ Crawl V2 Complete!');
    console.log(`Assets: ${manifest.length}`);
  } finally {
    await browser.close();
  }
}

main().catch(console.error);
