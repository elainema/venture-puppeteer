"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderToHtml = exports.checkImagePath = void 0;
const fs_1 = __importDefault(require("fs"));
const constant_1 = require("./constant");
/**
 * 检查目录是否存在，不存在就创建目录
 * @param  {[string]} path  目录路径
 * @param  {[string]} subPath  子目录路径
 * @return {[string]}  返回子目录路径
*/
const checkImagePath = (path, subPath) => {
    const _dirPath = "../templates/" + path;
    const _subPath = subPath ? `${_dirPath}/${subPath}` : "";
    return new Promise((resolve) => {
        if (!fs_1.default.existsSync(_dirPath)) {
            console.log('main Directory not found.');
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
 * @param  {[string]} imgs  图片数组
 * @param  {[string]} host  图片保存的域名host
 * @return {[string]}  返回更新后的html内容
*/
const updateHtmlContent = (images, host) => {
    const htmlContent = constant_1.COMMON_HTML;
    const _host = host;
    let imgAppHtml = '';
    let imgWebHtml = '';
    const { app, web } = images;
    for (let i = 0; i < app.length; i++) {
        const imgSrc = _host + app[i];
        imgAppHtml += `<img src="${imgSrc}" />`; // 将每个app img 元素的 HTML 代码添加到 imgAppHtml 中
    }
    for (let i = 0; i < web.length; i++) {
        const imgSrc = _host + web[i];
        imgWebHtml += `<img data-src="${imgSrc}" />`; // 将每个web img 元素的 HTML 代码添加到 imgWebHtml 中
    }
    const updatedHtml = htmlContent.replace('</body>', `
        <div class="app-container">
            ${imgAppHtml}
        </div>
        <div class="web-container">
            ${imgWebHtml}
        </div>
        ${constant_1.COMMON_SCRIPT}
    </body>
    `);
    return updatedHtml;
};
/**
 * 更新和获取html内容
 * @param  {[string]} imgs  图片数组
 * @param  {[string]} host  图片保存的域名host
 * @return {[string]}  返回更新后的html内容
*/
const updateHtmlContent2 = (images, host, isProd) => {
    const htmlContent = constant_1.COMMON_HTML;
    const _host = host;
    let imgAppHtml = '';
    let imgWebHtml = '';
    const { app, web } = images;
    // for (let i = 0; i < app.length; i++) {
    //     const imgSrc = _host + app[i];
    //     imgAppHtml += `<img src="${imgSrc}" />`; // 将每个app img 元素的 HTML 代码添加到 imgAppHtml 中
    // }
    // for (let i = 0; i < web.length; i++) {
    //     const imgSrc = _host + web[i];
    //     imgWebHtml += `<img data-src="${imgSrc}" />`; // 将每个web img 元素的 HTML 代码添加到 imgWebHtml 中
    // }
    const updatedHtml = htmlContent.replace('</body>', `<div id="detailMain"></div>
        <script>
            var appImages = ${JSON.stringify(app)};
            var webImages = ${JSON.stringify(web)};
            var host = "${_host}";
            ${constant_1.COMMON_SCRIPT}
    </body>
    `);
    return updatedHtml;
};
/**
 * 渲染html
 * 渲染local只是为本地查看方便
 * @param  {[string]} imgs  图片数组
 * @param  {[string]} name  文件名
 * @return
*/
const renderToHtml = async (imgs, name) => {
    console.log("renderToHtml start", name);
    const fileName = `${name}.html`;
    const fileNameLocal = `${name}_local.html`;
    const filePath = `../templates/${name}/` + fileName;
    const filePathLocal = `../templates/${name}/` + fileNameLocal;
    const updatedHtmlLocal = updateHtmlContent2(imgs, `./images/`, false);
    let updatedHtmlProd = updateHtmlContent2(imgs, constant_1.IMG_HOST);
    // TODO 代码混淆压缩
    // updatedHtmlProd = await minify(updatedHtmlProd, {
    //     removeAttributeQuotes: true,
    //     removeComments: true,
    //     removeEmptyElements: true,
    //     sortAttributes: true,
    //     trimCustomFragments: true,
    //     useShortDoctype: true,
    // });
    // write the updated HTML string to the file
    fs_1.default.writeFileSync(filePath, updatedHtmlProd);
    fs_1.default.writeFileSync(filePathLocal, updatedHtmlLocal);
    console.log("renderToHtml end");
};
exports.renderToHtml = renderToHtml;
//# sourceMappingURL=utils.js.map