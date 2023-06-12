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
            const { targetUrl, isMobile, folderName, hasBanner } = config;
            // 配置浏览器参数
            const browser = await puppeteer_1.default.launch({
                headless: true,
                ignoreHTTPSErrors: true,
                args: ['--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-first-run', '--no-sandbox',
                    '--no-zygote']
            });
            const page = await browser.newPage();
            // 是移动端的情况模拟移动端
            isMobile && await page.emulate(iPhone);
            !isMobile && await page.setViewport({ width: constant_1.WEB_SCREEN_WIDTGH, height: 1000 });
            // 跳转到目标页面
            await page.goto(targetUrl, {
                // https://pptr.dev/api/puppeteer.page.reload#remarks
                waitUntil: 'networkidle0', // // 页面完全加载
            }).catch(async (e) => {
                console.log("page error:" + e);
            });
            console.log("statr to get page Height And Width");
            // 获取截图宽/高
            const pageHeightAndWidth = await page.evaluate(() => {
                const body = window.document.body;
                //const html =  window.documentElement;
                const _maxWidth = Math.max(body.scrollWidth, body.offsetWidth);
                let _maxHeight = Math.max(body.scrollHeight, body.offsetHeight);
                // _maxHeight = Number(_maxHeight + BANNER_HEIGHT_WEB)
                return { maxHeight: _maxHeight, maxWidth: _maxWidth };
            });
            console.log("end get page Height And Width");
            // wix网站顶部有广告，截图时切除
            const bannerHeight = hasBanner ? (isMobile ? constant_1.BANNER_HEIGHT_APP : constant_1.BANNER_HEIGHT_WEB) : 0;
            // 将整个页面拆分为多个截图
            const pageSections = [];
            console.log("bannerHeight:" + bannerHeight);
            console.log("pageHeightAndWidth.maxHeight:" + pageHeightAndWidth.maxHeight);
            for (let i = bannerHeight; i <= pageHeightAndWidth.maxHeight; i += constant_1.SCREEN_SHOT_HEIGHT) {
                pageSections.push(i);
            }
            // 计算需要截取的次数
            const numScreenshots = Math.ceil(pageHeightAndWidth.maxHeight / constant_1.SCREEN_SHOT_HEIGHT);
            // 
            await page.evaluate(() => {
                window.scrollTo(0, 12000);
            });
            // 生成图片文件夹
            (0, utils_1.checkImagePath)(folderName, "images").then(async (imagesPath) => {
                const images = [];
                // 生成每个部分的图片文件
                for (let i = 0; i < pageSections.length; i++) {
                    const start = pageSections[i];
                    const end = i === pageSections.length - 1 ? pageHeightAndWidth.maxHeight : pageSections[i + 1];
                    const _prefix = isMobile ? "mobile" : "web";
                    const imageName = `${_prefix}-${folderName}-${i + 1}.webp`; // 图片文件名
                    // TODO 高度超过大概7500的截图会模糊
                    await page.screenshot({
                        type: "webp",
                        path: `${imagesPath}/${imageName}`,
                        fullPage: false,
                        clip: {
                            x: 0,
                            y: start,
                            width: isMobile ? pageHeightAndWidth.maxWidth : constant_1.WEB_SCREEN_WIDTGH,
                            height: end - start,
                            scale: 2 // 慎重修改
                        },
                    });
                    images.push(imageName);
                    // 最后一个截图完毕之后关闭浏览器
                    if (i === pageSections.length - 1) {
                        await browser.close();
                    }
                }
                resolve({ images });
            }).catch((e) => {
                console.log("checkImagePath error:" + e);
                reject(e);
                throw new Error(e);
            });
        };
        return _genarate();
    });
};
exports.generatePng = generatePng;
//# sourceMappingURL=index.js.map