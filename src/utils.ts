const getPageHeight = async (targetUrl:string, isMobile:boolean, page) => {
    if (!targetUrl) throw new console.error("url can't be empty"); 
    if (isMobile) {
        // 设置ua(模拟移动端设备)
        const ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Mobile/17G68 Safari/604.1"
        await page.setUserAgent(ua);
    }
    await page.goto(targetUrl, {
        // https://pptr.dev/api/puppeteer.page.reload#remarks
        waitUntil: 'networkidle0', // // 页面完全加载
        maxTotalWaitTime: 1000 * 60 * 2,
    }).catch( async e => {
        console.log("page error:" + e)
    });
    const pageHeight = await page.evaluate(() => {
        const body = window.document.body;
        //const html =  window.documentElement;

        return Math.max(
            body.scrollHeight, body.offsetHeight,
            //html.clientHeight, html.scrollHeight, html.offsetHeight
        );
    });
    console.log("pageHeight: " + pageHeight);
    return pageHeight

}
// const renderToHtml = () => { 

// }
export { getPageHeight }