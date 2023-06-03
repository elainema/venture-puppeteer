
const puppeteer = require('puppeteer');
const fs = require("fs");

// https://puppeteer.bootcss.com/api#pagesetviewportviewport
(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-first-run', '--no-sandbox', '--no-zygote']
  });
  const page = await browser.newPage();
  

  // 设置ua(模拟移动端设备)
  const ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Mobile/17G68 Safari/604.1"
  await page.setUserAgent(ua);
  // await page.setViewport({
  //   width: 750, 
  //   height: 667,
  //   isMobile: true,
  //   hasTouch:true,
  // });
  
  // https://info6052668.wixsite.com/website-5/agenda
  // https://static.aspendigital.co/strategies/detailTemplate/venturesDiscoveryFundI/index_zh.html
  await page.goto('https://info6052668.wixsite.com/website-5/agenda', {
    // https://pptr.dev/api/puppeteer.page.reload#remarks
    waitUntil: 'networkidle0', // // 页面完全加载
    maxTotalWaitTime: 1000 * 60 * 2,
  }).catch( async e => {
    console.log("page error:" + e)
  });



  const pageHeight = await page.evaluate(() => {
    const body = document.body;
    const html = document.documentElement;

    return Math.max(
      body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight
    );
  });

  console.log(pageHeight);
  const PDF_PAGE_HEIGHT = 400; // 每一页 PDF 的高度
    // 将整个页面拆分为多个部分
  const pageSections = [];
  for (let i = 0; i < pageHeight; i += PDF_PAGE_HEIGHT) {
    pageSections.push(i);
  }
      
      // 生成每个部分的 PDF 文件
    const pdfs = [];
    for (let i = 0; i < pageSections.length; i++) {
      const start = pageSections[i];
      const end = i === pageSections.length - 1 ? pageHeight : pageSections[i + 1];

      const pdfPath = `section-${i + 1}.pdf`; // PDF 文件名
      await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        pageRanges: `1`,
        clip: {
          x: 0,
          y: start,
          width: 800,
          height: end - start
        }
      });

      pdfs.push(pdfPath);
    }
    
  // // page.pdf() is currently supported only in headless mode.
  // // @see https://bugs.chromium.org/p/chromium/issues/detail?id=753118
  // await page.pdf({
  //   path: 'web.pdf',
  //   displayHeaderFooter: false,
  //   printBackground:true,
  //   format: 'letter',
  //   scale: 1,
  //   margin: {
  //     top: 0,
  //     bottom: 0,
  //     left: 0,
  //     right:0
  //   }
  // });

  // await page.reload({ waitUntil: 'networkidle2'});
  // await page.pdf({
  //   path: 'mobile.pdf',
  //   displayHeaderFooter: false,
  //   printBackground:true,
  //   format: 'letter',
  //   margin: {
  //     top: 0,
  //     bottom: 0,
  //     left: 0,
  //     right:0
  //   }
  // });

  const screenshot = await page.screenshot({
    path: 'example.png',
    fullPage: true,
    omitBackground: true,
    // clip: {
    //   x: 150,
    //   y: 200,
    //   width: 1200,
    //   height:height
    // },
    encoding:"binary"
  }).catch( async e => {
    console.log("page error:" + e)
  });
  fs.writeFile('example.png', screenshot, 'binary', (err) => {
  if (err) throw err;
  console.log('Screenshot saved!');
});

  await browser.close();
})();