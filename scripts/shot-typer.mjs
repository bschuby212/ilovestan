import { chromium } from 'playwright';
const out = '/opt/cursor/artifacts';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 });
await page.evaluate(() => {
  document.querySelector('#titles-overview')?.scrollIntoView({ behavior: 'instant', block: 'center' });
});
await page.waitForTimeout(400);
await page.screenshot({ path: `${out}/typer_cycle_a.png`, fullPage: false });
await page.waitForTimeout(1400);
await page.screenshot({ path: `${out}/typer_cycle_b.png`, fullPage: false });
await page.waitForTimeout(1400);
await page.screenshot({ path: `${out}/typer_cycle_c.png`, fullPage: false });
const text = await page.evaluate(() => document.querySelector('#titles-overview .display-type')?.textContent);
console.log('line:', text);
await browser.close();
