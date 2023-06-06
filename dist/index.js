"use strict";
// 测试爬取地址，后续移除
// https://info6052668.wixsite.com/website-5/agenda
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./src/index");
const utils_1 = require("./src/utils");
// import generatePng from "./src"
// https://static.aspendigital.co/strategies/detailTemplate/venturesDiscoveryFundI/index_zh.html
// https://www.web3investmentsummit.com/
const url = "https://info6052668.wixsite.com/website-5/agenda";
(0, index_1.generatePng)({
    targetUrl: url,
    isMobile: true,
    name: "agenda"
}).then((data) => {
    const { images } = data;
    (0, utils_1.renderToHtml)(images, "agenda");
}).catch((e) => { });
//# sourceMappingURL=index.js.map