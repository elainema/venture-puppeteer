"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePng = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const utils_1 = require("./utils");
const puppeteer_2 = require("puppeteer");
const iPhone = puppeteer_2.KnownDevices['iPhone 6'];
// import path from "path"
// https://puppeteer.bootcss.com/api#pagesetviewportviewport
const generatePng = (config) => {
    return new Promise((resolve, reject) => {
        const _genarate = async () => {
            const { targetUrl, isMobile, name } = config;
            const url = targetUrl;
            const browser = await puppeteer_1.default.launch({
                headless: true,
                args: ['--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-first-run', '--no-sandbox', '--no-zygote']
            });
            // isMobile
            const page = await browser.newPage();
            isMobile && await page.emulate(iPhone);
            await page.goto(targetUrl, {
                // https://pptr.dev/api/puppeteer.page.reload#remarks
                waitUntil: 'networkidle0', // // 页面完全加载
                // maxTotalWaitTime: 1000 * 60 * 2,
            }).catch(async (e) => {
                console.log("page error:" + e);
            });
            // TODO 获取截图宽/高
            const pageHeightAndWidth = await page.evaluate(() => {
                const body = window.document.body;
                //const html =  window.documentElement;
                const _maxWidth = Math.max(body.scrollWidth, body.offsetWidth);
                const _maxHeight = Math.max(body.scrollHeight, body.offsetHeight);
                return { maxHeight: _maxHeight, maxWidth: _maxWidth };
            });
            // const pageHeight = await getPageHeight(url, isMobile, page)
            // 将整个页面拆分为多个部分
            const pageSections = [];
            const IMAGE_PAGE_HEIGHT = 400; // 每一页图片的
            const bannerHeight = 38; // 没有banner可以不要
            for (let i = bannerHeight; i < pageHeightAndWidth.maxHeight; i += IMAGE_PAGE_HEIGHT) {
                pageSections.push(i);
            }
            (0, utils_1.checkImagePath)(name, "images").then(async (imagesPath) => {
                const images = [];
                // 生成每个部分的图片文件
                for (let i = 0; i < pageSections.length; i++) {
                    const start = pageSections[i];
                    const end = i === pageSections.length - 1 ? pageHeightAndWidth.maxHeight : pageSections[i + 1];
                    const _prefix = isMobile ? "mobile" : "web";
                    const imagePath = `${name}-${_prefix}-section-${i + 1}.webp`; // 图片文件名
                    await page.screenshot({
                        type: "webp",
                        path: imagesPath + imagePath,
                        fullPage: false,
                        clip: {
                            x: 0,
                            y: start,
                            width: pageHeightAndWidth.maxWidth,
                            height: end - start
                        }
                    });
                    images.push(imagePath);
                }
                await browser.close();
                resolve({ images });
            }).catch((e) => {
                reject(e);
                throw new Error(e);
            });
        };
        return _genarate();
    });
};
exports.generatePng = generatePng;
//# sourceMappingURL=index.js.map