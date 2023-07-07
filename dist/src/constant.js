"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BANNER_HEIGHT_WEB = exports.BANNER_HEIGHT_APP = exports.WEB_SCREEN_WIDTGH = exports.COMMON_SCRIPT = exports.SCREEN_SHOT_HEIGHT = exports.IMG_HOST = void 0;
const COMMON_SCRIPT = `
            /**
             * @description: 判断用户当前设备是否移动端
             * @params
             * @return boolean, 是否移动端
             */
            var isMobile = function () {
                if (
                    typeof window != "undefined" &&
                    navigator.userAgent.match(
                    /(phone|pad|pod|iPhone|iPod|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
                    )
                ) {
                    return true;
                }
                return false;
            };
            if (isMobile()) {
                document.querySelector("#detailMain").style.background = "#000";
                loadImages(appImages);
            } else {
                document.querySelector("#detailMain").style.width = "1200px";
                document.querySelector("#detailMain").style.background = "#2f3342";
                loadImages(webImages);
            }
            function loadImages(images) {
                for (var i = 0; i < images.length; i++) {
                    var _ele = images[i];
                    var src = _ele;
                    var img = document.createElement('img');
                    img.src = src;
                    img.loading = "eager";
                    img.style.maxWidth = "100%";
                   document.querySelector("#detailMain").appendChild(img);
                }
            }`;
exports.COMMON_SCRIPT = COMMON_SCRIPT;
const IMG_HOST = process.env.IMG_HOST ? process.env.IMG_HOST : "https://static.aspendigital.co/strategies/detailTemplate/web3UnicornSecondaryFundI/images/";
exports.IMG_HOST = IMG_HOST;
// https://static.aspendigital.co/strategies/detailTemplate/web3UnicornSecondaryFundI/Web3UnicornSecondaryFundI.html
const SCREEN_SHOT_HEIGHT = 400;
exports.SCREEN_SHOT_HEIGHT = SCREEN_SHOT_HEIGHT;
const WEB_SCREEN_WIDTGH = 1200;
exports.WEB_SCREEN_WIDTGH = WEB_SCREEN_WIDTGH;
const BANNER_HEIGHT_APP = 38;
exports.BANNER_HEIGHT_APP = BANNER_HEIGHT_APP;
const BANNER_HEIGHT_WEB = 60;
exports.BANNER_HEIGHT_WEB = BANNER_HEIGHT_WEB;
//# sourceMappingURL=constant.js.map