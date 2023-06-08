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
    </style>
</head>
<body>
</body>
</html>`

const COMMON_SCRIPT = `<script>
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
                loadImages(appContainer, app);
            } else {
                loadImages(webContainer, web);
            }

            function loadImages(container, images) {
                for (var i = 0; i < images.length; i++) {
                    var _ele = images[i];
                    var src = host + _ele
                    var img = document.createElement('img');
                    img.src = src
                    document.body.appendChild(img);
                }
            }
        </script>`

const IMG_HOST = "https://aspen-dev.oss-ap-southeast-1.aliyuncs.com/afront/test/images/"
const IMAGE_PAGE_HEIGHT = 800;

export { COMMON_HTML,IMG_HOST,IMAGE_PAGE_HEIGHT,COMMON_SCRIPT }