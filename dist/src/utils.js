"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageHeight = void 0;
const getPageHeight = async (targetUrl, isMobile, page) => {
    if (!targetUrl)
        throw new console.error("url can't be empty");
    if (isMobile) {
        // 设置ua(模拟移动端设备)
        const ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Mobile/17G68 Safari/604.1";
        await page.setUserAgent(ua);
    }
    await page.goto(targetUrl, {
        // https://pptr.dev/api/puppeteer.page.reload#remarks
        waitUntil: 'networkidle0',
        maxTotalWaitTime: 1000 * 60 * 2,
    }).catch(async (e) => {
        console.log("page error:" + e);
    });
    const pageHeight = await page.evaluate(() => {
        const body = window.document.body;
        //const html =  window.documentElement;
        return Math.max(body.scrollHeight, body.offsetHeight);
    });
    console.log("pageHeight: " + pageHeight);
    return pageHeight;
};
exports.getPageHeight = getPageHeight;
//# sourceMappingURL=utils.js.map