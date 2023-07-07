import fs from "fs"
import { IMG_HOST,COMMON_SCRIPT } from "./constant"
import { IIMages } from "./model";

/**
 * 检查目录是否存在，不存在就创建目录
 * @param  {[string]} path  目录路径
 * @param  {[string]} subPath  子目录路径
 * @return {[string]}  返回子目录路径
*/
const checkImagePath = (path: string, subPath?: string) => { 
    const _dirPath =  "../templates/" + path;
    const _subPath = subPath ? `${_dirPath}/${subPath}` : "";
    
    return new Promise((resolve) => { 
        if (!fs.existsSync(_dirPath)) {
            console.log('main Directory not found.');
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
const updateHtmlContent: (images: IIMages, host: string, isProd?: boolean) => string = (images, host) => {
    const htmlContent = "";
    const { app, web } = images;
    const updatedHtml = htmlContent.replace('', `<div id="detailMain" style="font-size: 0;margin: auto;"></div>
        <script>
            var appImages = ${ JSON.stringify(app) };
            var webImages = ${ JSON.stringify(web) };
            var host = "${IMG_HOST}";
            ${COMMON_SCRIPT}
        </script>
    `);
    return updatedHtml
}

const convet2Base64 = (path: string) => { 
    var imageBuf = fs.readFileSync(path);
    return "data:image/webp;base64,"+imageBuf.toString("base64");
}
/**
 * 渲染html
 * 渲染local只是为本地查看方便
 * @param  {[string]} imgs  图片数组
 * @param  {[string]} name  文件名
 * @return 
*/
const renderToHtml = async (allimgs: IIMages, name: string) => { 
    console.log("renderToHtml start", name)
    const imgs = {
        web: allimgs.web,
        app:allimgs.app
    }
    const path = `../templates/Web3UnicornSecondaryFundI/images`

    imgs.web = allimgs.web.map((img) => { 
        return convet2Base64(`${path}/${img}`)
    })
    imgs.app = allimgs.app.map((img) => {
        return convet2Base64(`${path}/${img}`)
    })
    
    // imgs.web[0] = convet2Base64(`${path}/${imgs.web[0]}`) 
    // imgs.app[0] = convet2Base64(`${path}/${imgs.app[0]}`) 

    const fileName = `${name}.html`;
    const fileNameLocal = `${name}_local.html`;
    const filePath = `../templates/${name}/` + fileName;
    const filePathLocal = `../templates/${name}/` + fileNameLocal;
    const updatedHtmlLocal = updateHtmlContent(imgs, ``, false)
    let updatedHtmlProd = updateHtmlContent(imgs, IMG_HOST)

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
    console.log("render To Html end")
}
export { checkImagePath,renderToHtml }