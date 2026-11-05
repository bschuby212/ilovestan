import { chromium } from 'playwright';
const out = '/opt/cursor/artifacts';
const browser = await chromium.launch({
  headless: true,
  args: ['--autoplay-policy=no-user-gesture-required'],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(4000);
const playing = await page.evaluate(() => {
  const v = document.querySelector('video');
  if (!v) return { ok: false };
  return { ok: !v.paused, time: v.currentTime, ready: v.readyState, w: v.videoWidth, h: v.videoHeight };
});
console.log('video', playing);
await page.screenshot({ path: `${out}/hero_highlights_video_start.png`, fullPage: false });
await page.waitForTimeout(3500);
await page.screenshot({ path: `${out}/hero_highlights_video_later.png`, fullPage: false });
await page.evaluate(() => window.scrollTo(0, Math.round(window.innerHeight * 1.1)));
await page.waitForTimeout(1000);
await page.screenshot({ path: `${out}/hero_highlights_video_parallax.png`, fullPage: false });
await browser.close();
