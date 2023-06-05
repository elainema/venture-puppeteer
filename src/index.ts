import puppeteer from 'puppeteer'
import { getPageHeight } from "./utils"
// https://puppeteer.bootcss.com/api#pagesetviewportviewport

const generatePng: (targetUrl: string, isMobile: boolean) => void = (targetUrl, isMobile) => { 
  return new Promise((resolve, reject) => {
    (async () => {
      const url = targetUrl;
      const browser = await puppeteer.launch({
          headless: true, //是否开始无头模式
          args: ['--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-first-run', '--no-sandbox', '--no-zygote']
      });
      const page = await browser.newPage();   
      const pageHeight = await getPageHeight(url, isMobile,page)

      // 将整个页面拆分为多个部分
      const pageSections = [];
      const IMAGE_PAGE_HEIGHT = 400; // 每一页图片的
      const bannerHeight = 38 // 没有banner可以不要
      for (let i = bannerHeight; i < pageHeight; i += IMAGE_PAGE_HEIGHT) {
        pageSections.push(i);
      }

      // 生成每个部分的图片文件
      for (let i = 0; i < pageSections.length; i++) {
        const start = pageSections[i];
        const end = i === pageSections.length - 1 ? pageHeight : pageSections[i + 1];
        const imagePath = `${targetUrl}-mobile-section-${i + 1}.png`; // 图片文件名
        await page.screenshot({
          path: "../images/" + imagePath,
          fullPage: false,
          clip: {
            x: 0,
            y: start,
            width: 800,
            height: end - start
          }
        });
      }
      await browser.close();
      resolve("")
    })();
   })
} 


export { generatePng } ;
  

  // https://static.aspendigital.co/strategies/detailTemplate/venturesDiscoveryFundI/index_zh.html
// const url = "https://info6052668.wixsite.com/website-5/agenda"
// generatePng(url, false)
// generatePng(url, true)