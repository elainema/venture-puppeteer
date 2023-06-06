import fs from "fs"
import { minify }from 'html-minifier-terser';
import { COMMON_HTML,IMG_HOST } from "./constant"
/**
 * 获取页面高度
*/
const getPageHeight = async (targetUrl: string, isMobile: boolean, page) => {
    if (!targetUrl) throw new console.error("url can't be empty"); 
    // if (isMobile) {
    //     // 设置ua(模拟移动端设备)
    //     const ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Mobile/17G68 Safari/604.1"
    //     await page.setUserAgent(ua);
    // }
    await page.goto(targetUrl, {
        // https://pptr.dev/api/puppeteer.page.reload#remarks
        waitUntil: 'networkidle0', // // 页面完全加载
        maxTotalWaitTime: 1000 * 60 * 2,
    }).catch( async e => {
        console.log("page error:" + e)
    });
    const pageHeight = await page.evaluate(() => {
        const body = window.document.body;
        //const html =  window.documentElement;

        return Math.max(
            body.scrollHeight, body.offsetHeight,
            //html.clientHeight, html.scrollHeight, html.offsetHeight
        );
    });
    console.log("pageHeight: " + pageHeight);
    return pageHeight

}

/**
 * 检查目录是否存在，不存在就创建目录
*/
const checkImagePath = (path: string, subPath?: string) => { 
    const _dirPath =  "../templates/" + path;
    const _subPath = subPath ? `${_dirPath}/${subPath}/` : "";
    
    return new Promise((resolve) => { 
        if (!fs.existsSync(_dirPath)) {
            console.log(' main Directory not found.');
            // 如果一级目录不存在，就创建目录
            fs.mkdirSync(_dirPath);
            console.log('main Directory created successfully.');
        } else {
            console.log('main Directory already exists.');
        }

        if (_subPath && !fs.existsSync(_subPath)) {
            console.log('sub Directory not found.');
            // 如果二级目录不存在，就创建目录
            fs.mkdirSync(_subPath);
            console.log('sub Directory created successfully.');
        } else {
            console.log('sub Directory already exists.');
        }
        
        resolve(_subPath ? _subPath : _dirPath)
    })
}

/**
 * 更新和获取html内容
*/
const updateHtmlContent: (imgs: string[], host: string) => string = (imgs, host) => {
    const htmlContent = COMMON_HTML;
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
    return updatedHtml
}
/**
 * 渲染html
 * 渲染local只是为本地查看方便
*/
const renderToHtml = async (imgs: string[], name: string) => { 
    console.log("renderToHtml start",name)
    if (imgs.length === 0) return;

    const fileName = `${name}.html`;
    const fileNameLocal = `${name}_local.html`;
    const filePath = `../templates/${name}/` + fileName;
    const filePathLocal = `../templates/${name}/` + fileNameLocal;
    const updatedHtmlLocal = updateHtmlContent(imgs, `./images/`)
    let updatedHtmlProd = updateHtmlContent(imgs, IMG_HOST)

    // TODO 代码混淆压缩
    updatedHtmlProd = await minify(updatedHtmlProd, {
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyElements: true,
        sortAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
    });

    // write the updated HTML string to the file
    fs.writeFileSync(filePath, updatedHtmlProd);
    fs.writeFileSync(filePathLocal, updatedHtmlLocal);
    console.log("renderToHtml end")
}
export { getPageHeight,checkImagePath,renderToHtml }