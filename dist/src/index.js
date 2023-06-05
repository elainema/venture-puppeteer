"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePng = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const utils_1 = require("./utils");
// https://puppeteer.bootcss.com/api#pagesetviewportviewport
const generatePng = (targetUrl, isMobile) => {
    return new Promise((resolve, reject) => {
        (async () => {
            const url = targetUrl;
            const browser = await puppeteer_1.default.launch({
                headless: true,
                args: ['--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-first-run', '--no-sandbox', '--no-zygote']
            });
            const page = await browser.newPage();
            const pageHeight = await (0, utils_1.getPageHeight)(url, isMobile, page);
            // 将整个页面拆分为多个部分
            const pageSections = [];
            const IMAGE_PAGE_HEIGHT = 400; // 每一页图片的
            const bannerHeight = 38; // 没有banner可以不要
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
            resolve("");
        })();
    });
};
exports.generatePng = generatePng;
// https://static.aspendigital.co/strategies/detailTemplate/venturesDiscoveryFundI/index_zh.html
// const url = "https://info6052668.wixsite.com/website-5/agenda"
// generatePng(url, false)
// generatePng(url, true)
//# sourceMappingURL=index.js.map