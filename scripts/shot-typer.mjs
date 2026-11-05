import { chromium } from 'playwright';
const out = '/opt/cursor/artifacts';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(800);
await page.evaluate(() => {
  document.querySelector('#titles-overview')?.scrollIntoView({ behavior: 'instant', block: 'center' });
});
// catch mid-animation
await page.waitForTimeout(280);
await page.screenshot({ path: `${out}/color_typer_animating.png`, fullPage: false });
await page.waitForTimeout(900);
await page.screenshot({ path: `${out}/color_typer_done.png`, fullPage: false });
await browser.close();
console.log('done');
