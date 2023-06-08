"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePng = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const utils_1 = require("./utils");
const puppeteer_2 = require("puppeteer");
const constant_1 = require("./constant");
const iPhone = puppeteer_2.KnownDevices['iPhone 13 Pro Max'];
/**
 * 生成图片
 * @param  {IRequestConfig} config  生成截图的必须参数
 * @returns Promise<IRequestRes>
*/
const generatePng = (config) => {
    return new Promise((resolve, reject) => {
        const _genarate = async () => {
            const { targetUrl, isMobile, name } = config;
            // 配置浏览器参数
            const browser = await puppeteer_1.default.launch({
                headless: true,
                ignoreHTTPSErrors: true,
                args: ['--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-first-run', '--no-sandbox',
                    // '--disable-web-security', // 禁用跨域安全限制
                    // '--disable-features=IsolateOrigins,site-per-process', // 禁用同源限制
                    // '--disable-setuid-sandbox', // 禁用沙盒模式
                    // '--no-sandbox', // 禁用沙盒模式
                    '--no-zygote']
            });
            const page = await browser.newPage();
            // 是移动端的情况模拟移动端
            isMobile && await page.emulate(iPhone);
            // 跳转到目标页面
            await page.goto(targetUrl, {
                // https://pptr.dev/api/puppeteer.page.reload#remarks
                waitUntil: 'networkidle0', // // 页面完全加载
                // maxTotalWaitTime: 1000 * 60 * 2,
            }).catch(async (e) => {
                console.log("page error:" + e);
            });
            console.log("statr to get page Height And Width");
            // 获取截图宽/高
            const pageHeightAndWidth = await page.evaluate(() => {
                const body = window.document.body;
                //const html =  window.documentElement;
                const _maxWidth = Math.max(body.scrollWidth, body.offsetWidth);
                const _maxHeight = Math.max(body.scrollHeight, body.offsetHeight);
                console.log("maxWidth:" + _maxWidth + "maxHeight:" + _maxHeight);
                return { maxHeight: _maxHeight, maxWidth: _maxWidth };
            });
            console.log("end get page Height And Width");
            // 将整个页面拆分为多个截图
            const pageSections = [];
            // 没有banner可以不要
            const bannerHeight = 38;
            for (let i = bannerHeight; i < pageHeightAndWidth.maxHeight; i += constant_1.IMAGE_PAGE_HEIGHT) {
                pageSections.push(i);
            }
            // 生成图片文件夹
            await (0, utils_1.checkImagePath)(name, "images").then(async (imagesPath) => {
                const images = [];
                // 生成每个部分的图片文件
                for (let i = 0; i < pageSections.length; i++) {
                    const start = pageSections[i];
                    const end = i === pageSections.length - 1 ? pageHeightAndWidth.maxHeight : pageSections[i + 1];
                    const _prefix = isMobile ? "mobile" : "web";
                    const imagePath = `${name}-${_prefix}-section-${i + 1}.webp`; // 图片文件名
                    await page.screenshot({
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
                // 关闭浏览器
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