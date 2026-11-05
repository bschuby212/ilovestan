import { chromium } from 'playwright';
const out = '/opt/cursor/artifacts';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3000/#backhand', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1500);
await page.evaluate(() => document.querySelector('#backhand')?.scrollIntoView({behavior:'instant', block:'start'}));
await page.waitForTimeout(1200);
await page.screenshot({ path: `${out}/backhand_side_by_side.png`, fullPage: false });
await page.evaluate(() => {
  const el = document.querySelector('.bh-compare');
  el?.scrollIntoView({behavior:'instant', block:'start'});
});
await page.waitForTimeout(900);
await page.screenshot({ path: `${out}/backhand_compare_bars.png`, fullPage: false });
await browser.close();
console.log('done');
