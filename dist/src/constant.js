"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BANNER_HEIGHT_WEB = exports.BANNER_HEIGHT_APP = exports.WEB_SCREEN_WIDTGH = exports.COMMON_SCRIPT = exports.SCREEN_SHOT_HEIGHT = exports.IMG_HOST = exports.COMMON_HTML = void 0;
const COMMON_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>your title</title>
    <style>
        img{
            width: 100%;
        }
        #detailMain {
            max-width:1200px;
            margin: auto;
            /* 避免标签段之间的空格，导致元素间留白间距 */
            font-size: 0;
        }
    </style>
</head>
<body style="background: #2f3342;margin: auto;">
</body>
</html>`;
exports.COMMON_HTML = COMMON_HTML;
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
                loadImages(appImages);
            } else {
                loadImages(webImages);
            }

            function loadImages(images) {
                for (var i = 0; i < images.length; i++) {
                    var _ele = images[i];
                    var src = host + _ele
                    var img = document.createElement('img');
                    img.src = src
                   document.querySelector("#detailMain").appendChild(img);
                }
            }
        </script>`;
exports.COMMON_SCRIPT = COMMON_SCRIPT;
const IMG_HOST = "https://aspen-dev.oss-ap-southeast-1.aliyuncs.com/afront/test/images/";
exports.IMG_HOST = IMG_HOST;
const SCREEN_SHOT_HEIGHT = 400;
exports.SCREEN_SHOT_HEIGHT = SCREEN_SHOT_HEIGHT;
const WEB_SCREEN_WIDTGH = 1200;
exports.WEB_SCREEN_WIDTGH = WEB_SCREEN_WIDTGH;
const BANNER_HEIGHT_APP = 38;
exports.BANNER_HEIGHT_APP = BANNER_HEIGHT_APP;
const BANNER_HEIGHT_WEB = 60;
exports.BANNER_HEIGHT_WEB = BANNER_HEIGHT_WEB;
//# sourceMappingURL=constant.js.map