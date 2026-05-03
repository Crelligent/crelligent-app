const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3004');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'homepage_final.webp', fullPage: true });
  await browser.close();
})();