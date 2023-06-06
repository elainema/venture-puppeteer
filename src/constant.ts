const COMMON_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>your title</title>
    <style>
        img{
            display: block;
            width: 100%;
        }


    @media only screen and (max-width: 1800px) {
        body {
            margin: 0;
            width: 100% !important;
        }
    }

    @media only screen and (max-width: 600px) {
        .divider {
            display: none;
        }

        .container {
            width: 100% !important;
            height: 100%;
            padding-right: 0 !important;
            padding-left: 0 !important;
        }

        .content-title {
            font-size: 16px !important;
        }

    }
    </style>
    
</head>
<body>
</body>
</html>`

const IMG_HOST = "https://aspen-dev.oss-ap-southeast-1.aliyuncs.com/afront/test/"

export { COMMON_HTML,IMG_HOST }