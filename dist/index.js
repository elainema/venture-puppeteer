var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const puppeteer = require('puppeteer');
// https://puppeteer.bootcss.com/api#pagesetviewportviewport
(() => __awaiter(this, void 0, void 0, function* () {
    const browser = yield puppeteer.launch();
    const page = yield browser.newPage();
    // await page.emulate(iPhone);
    yield page.goto('https://static.aspendigital.co/strategies/detailTemplate/venturesDiscoveryFundI/index_zh.html', {
        // https://pptr.dev/api/puppeteer.page.reload#remarks
        waitUntil: 'networkidle2',
    });
    // page.pdf() is currently supported only in headless mode.
    // @see https://bugs.chromium.org/p/chromium/issues/detail?id=753118
    yield page.pdf({
        path: 'web.pdf',
        displayHeaderFooter: false,
        printBackground: true,
        format: 'letter',
        scale: 1,
        width: "1200px",
        margin: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }
    });
    yield page.emulate(puppeteer.devices['iPhone 12']);
    yield page.reload({ waitUntil: 'networkidle2' });
    yield page.pdf({
        path: 'mobile.pdf',
        displayHeaderFooter: false,
        printBackground: true,
        format: 'letter',
        margin: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }
    });
    // await page.screenshot({
    //   path: 'example.png',
    //   fullPage: true,
    //   omitBackground:true
    // });
    yield browser.close();
}))();
//# sourceMappingURL=index.js.map