"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMON_SCRIPT = exports.IMAGE_PAGE_HEIGHT = exports.IMG_HOST = exports.COMMON_HTML = void 0;
const COMMON_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>your title</title>
    <style>
        body{    
            max-width: 1200px;
            margin: auto;
        }
        img{
            display: block;
            width: 100%;
        }
        .app-container,
        .web-container {
            display: none;
        }
    </style>
</head>
<body>
</body>
</html>`;
exports.COMMON_HTML = COMMON_HTML;
const COMMON_SCRIPT = `<script>
            var appContainer = document.querySelector('.app-container');
            var webContainer = document.querySelector('.web-container');
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
                appContainer.style.display = 'block';
                loadImages(appContainer, app);
            } else {
                webContainer.style.display = 'block';
                loadImages(webContainer, web);
            }

            function loadImages(container, images) {
                // var images = // container.querySelectorAll('img[data-src]');
                for (var i = 0; i < images.length; i++) {
                    var _ele = images[i];
                    var src = host + _ele
                    var img = document.createElement('img');
                    img.src = src
                    document.body.appendChild(img);
                }
            }
        </script>`;
exports.COMMON_SCRIPT = COMMON_SCRIPT;
const IMG_HOST = "https://aspen-dev.oss-ap-southeast-1.aliyuncs.com/afront/test/images/";
exports.IMG_HOST = IMG_HOST;
const IMAGE_PAGE_HEIGHT = 800;
exports.IMAGE_PAGE_HEIGHT = IMAGE_PAGE_HEIGHT;
//# sourceMappingURL=constant.js.map