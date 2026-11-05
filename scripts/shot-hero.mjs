import { chromium } from 'playwright';

const out = '/opt/cursor/artifacts';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2500);
await page.screenshot({ path: `${out}/hero_video_parallax_start.png`, fullPage: false });

await page.evaluate(() => window.scrollTo(0, Math.round(window.innerHeight * 1.0)));
await page.waitForTimeout(1000);
await page.screenshot({ path: `${out}/hero_video_parallax_scroll.png`, fullPage: false });

await page.evaluate(() => window.scrollTo(0, Math.round(window.innerHeight * 1.8)));
await page.waitForTimeout(1000);
await page.screenshot({ path: `${out}/hero_video_parallax_exit.png`, fullPage: false });

await browser.close();
console.log('done');
