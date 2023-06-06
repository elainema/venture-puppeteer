"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderToHtml = exports.checkImagePath = exports.getPageHeight = void 0;
const fs_1 = __importDefault(require("fs"));
const html_minifier_terser_1 = require("html-minifier-terser");
const constant_1 = require("./constant");
/**
 * 获取页面高度
*/
const getPageHeight = async (targetUrl, isMobile, page) => {
    if (!targetUrl)
        throw new console.error("url can't be empty");
    // if (isMobile) {
    //     // 设置ua(模拟移动端设备)
    //     const ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Mobile/17G68 Safari/604.1"
    //     await page.setUserAgent(ua);
    // }
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
/**
 * 检查目录是否存在，不存在就创建目录
*/
const checkImagePath = (path, subPath) => {
    const _dirPath = "../templates/" + path;
    const _subPath = subPath ? `${_dirPath}/${subPath}/` : "";
    return new Promise((resolve) => {
        if (!fs_1.default.existsSync(_dirPath)) {
            console.log(' main Directory not found.');
            // 如果一级目录不存在，就创建目录
            fs_1.default.mkdirSync(_dirPath);
            console.log('main Directory created successfully.');
        }
        else {
            console.log('main Directory already exists.');
        }
        if (_subPath && !fs_1.default.existsSync(_subPath)) {
            console.log('sub Directory not found.');
            // 如果二级目录不存在，就创建目录
            fs_1.default.mkdirSync(_subPath);
            console.log('sub Directory created successfully.');
        }
        else {
            console.log('sub Directory already exists.');
        }
        resolve(_subPath ? _subPath : _dirPath);
    });
};
exports.checkImagePath = checkImagePath;
/**
 * 更新和获取html内容
*/
const updateHtmlContent = (imgs, host) => {
    const htmlContent = constant_1.COMMON_HTML;
    const _host = host;
    let imgHtml = '';
    for (let i = 0; i < imgs.length; i++) {
        const imgSrc = _host + imgs[i];
        imgHtml += `<img src="${imgSrc}" />`; // 将每个 img 元素的 HTML 代码添加到 imgHtml 中
    }
    const updatedHtml = htmlContent.replace('</body>', `
        <div class="img-container">
            ${imgHtml}
        </div>
    </body>
    `);
    return updatedHtml;
};
/**
 * 渲染html
 * 渲染local只是为本地查看方便
*/
const renderToHtml = async (imgs, name) => {
    console.log("renderToHtml start", name);
    if (imgs.length === 0)
        return;
    const fileName = `${name}.html`;
    const fileNameLocal = `${name}_local.html`;
    const filePath = `../templates/${name}/` + fileName;
    const filePathLocal = `../templates/${name}/` + fileNameLocal;
    const updatedHtmlLocal = updateHtmlContent(imgs, `./images/`);
    let updatedHtmlProd = updateHtmlContent(imgs, constant_1.IMG_HOST);
    // TODO 代码混淆压缩
    updatedHtmlProd = await (0, html_minifier_terser_1.minify)(updatedHtmlProd, {
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyElements: true,
        sortAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
    });
    // write the updated HTML string to the file
    fs_1.default.writeFileSync(filePath, updatedHtmlProd);
    fs_1.default.writeFileSync(filePathLocal, updatedHtmlLocal);
    console.log("renderToHtml end");
};
exports.renderToHtml = renderToHtml;
//# sourceMappingURL=utils.js.map