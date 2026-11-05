import { chromium } from 'playwright';
const out = '/opt/cursor/artifacts';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1500);
// scroll into titles overview pin
await page.evaluate(() => {
  const el = document.querySelector('#titles-overview');
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo(0, top + window.innerHeight * 0.4);
});
await page.waitForTimeout(1200);
await page.screenshot({ path: `${out}/titles_color_typer_mid.png`, fullPage: false });
await page.evaluate(() => {
  const el = document.querySelector('#titles-overview');
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo(0, top + window.innerHeight * 1.6);
});
await page.waitForTimeout(1000);
await page.screenshot({ path: `${out}/titles_color_typer_deep.png`, fullPage: false });
await browser.close();
console.log('done');
