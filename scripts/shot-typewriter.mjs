import { chromium } from 'playwright';
const out = '/opt/cursor/artifacts';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 });
await page.evaluate(() => {
  document.querySelector('#titles-overview')?.scrollIntoView({ behavior: 'instant', block: 'center' });
});
await page.waitForTimeout(500);
await page.screenshot({ path: `${out}/typewriter_titles_mid.png`, fullPage: false });
await page.waitForTimeout(1600);
await page.screenshot({ path: `${out}/typewriter_titles_next.png`, fullPage: false });
const text = await page.evaluate(() => document.querySelector('#titles-overview .display-type')?.textContent?.trim());
console.log('shown:', text);
await browser.close();
