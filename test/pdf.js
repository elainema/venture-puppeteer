const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://grid6-membernft-git-develaine-aspendigital.vercel.app/', {waitUntil: 'networkidle0'});
  await page.pdf({
    path: 'dev.pdf',
    printBackground: true,
    preferCSSPageSize: true,
    width:1200,
    height: 2500
  });

  await browser.close();
})();