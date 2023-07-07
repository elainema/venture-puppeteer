

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
            }`

const IMG_HOST = process.env.IMG_HOST ? process.env.IMG_HOST : "https://static.aspendigital.co/strategies/detailTemplate/web3UnicornSecondaryFundI/images/"
// https://static.aspendigital.co/strategies/detailTemplate/web3UnicornSecondaryFundI/Web3UnicornSecondaryFundI.html
const SCREEN_SHOT_HEIGHT = 400;
const WEB_SCREEN_WIDTGH = 1200
const BANNER_HEIGHT_APP = 38
const BANNER_HEIGHT_WEB = 60

export { IMG_HOST,SCREEN_SHOT_HEIGHT,COMMON_SCRIPT,WEB_SCREEN_WIDTGH,BANNER_HEIGHT_APP,BANNER_HEIGHT_WEB }