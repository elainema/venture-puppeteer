import fs from "fs"
import { COMMON_HTML,IMG_HOST,COMMON_SCRIPT } from "./constant"
import { IIMages } from "./model";

/**
 * 检查目录是否存在，不存在就创建目录
 * @param  {[string]} path  目录路径
 * @param  {[string]} subPath  子目录路径
 * @return {[string]}  返回子目录路径
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
 * @param  {[string]} imgs  图片数组
 * @param  {[string]} host  图片保存的域名host
 * @return {[string]}  返回更新后的html内容
*/
const updateHtmlContent: (images: IIMages, host: string) => string = (images, host) => {
    const htmlContent = COMMON_HTML;
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
        ${COMMON_SCRIPT}
    </body>
    `);
    return updatedHtml
}
/**
 * 更新和获取html内容
 * @param  {[string]} imgs  图片数组
 * @param  {[string]} host  图片保存的域名host
 * @return {[string]}  返回更新后的html内容
*/
const updateHtmlContent2: (images: IIMages, host: string, isProd?: boolean) => string = (images, host, isProd) => {
    const htmlContent = COMMON_HTML;
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
    const updatedHtml = htmlContent.replace('</body>', `
        <script>
            var app = ${ JSON.stringify(app) };
            var web = ${ JSON.stringify(web) };
            var host = "${ _host }";
        </script>
        ${COMMON_SCRIPT}
    </body>
    `);
    return updatedHtml
}
/**
 * 渲染html
 * 渲染local只是为本地查看方便
 * @param  {[string]} imgs  图片数组
 * @param  {[string]} name  文件名
 * @return 
*/
const renderToHtml = async (imgs: IIMages, name: string) => { 
    console.log("renderToHtml start",name)

    const fileName = `${name}.html`;
    const fileNameLocal = `${name}_local.html`;
    const filePath = `../templates/${name}/` + fileName;
    const filePathLocal = `../templates/${name}/` + fileNameLocal;
    const updatedHtmlLocal = updateHtmlContent2(imgs, `./images/`, false)
    let updatedHtmlProd = updateHtmlContent2(imgs, IMG_HOST)

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
    fs.writeFileSync(filePath, updatedHtmlProd);
    fs.writeFileSync(filePathLocal, updatedHtmlLocal);
    console.log("renderToHtml end")
}
export { checkImagePath,renderToHtml }