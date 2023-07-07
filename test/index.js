const { generatePng }  = require("../dist/src/index")
const { renderToHtml } =require( "../dist/src/utils")

  // https://static.aspendigital.co/strategies/detailTemplate/venturesDiscoveryFundI/index_en.html
  // https://www.web3investmentsummit.com/
const url = "https://info6052668.wixsite.com/website-5/agenda"
// figma暂时爬虫有问题
const figma = "https://www.figma.com/proto/ZwY62z2C6cWBv1oHJNcO0P/Aspen_Website?type=design&node-id=9184-1758&scaling=min-zoom&page-id=1%3A19"
const locaFigma = "file:///Users/elaine/Desktop/venture-puppeteer/templates/figma/figma_local2.html"
const yuque = "https://kikitrade.yuque.com/bun8m4/zgmaon"
const yuque2 = "https://kikitrade.yuque.com/bun8m4/zgmaon/21934762?artboard_type=artboard&view=&from="
const mywix = "https://elainema3.wixsite.com/aspendigital"
const allElement = "https://elainema3.wixsite.com/website-1"
// https://static.dev.test-aspendigital.co/afront/test/aspendigital.html

const localImage = "file:////Users/elaine/Desktop/venture-puppeteer/test/test.html"
const testUrl = "https://na4.docusign.net/Signing/?ti=d2def59415594be2ac041cf659aa195c"
const local_test_web = "file:///Users/elaine/Desktop/venture-puppeteer/test/local_test_web.html"
const local_test_app = "file:///Users/elaine/Desktop/venture-puppeteer/test/local_test_app.html"

const targetUrl = "Web3UnicornSecondaryFundI"
const name = targetUrl.split("/").at("-1")
const hasBanner = false

const generateWebPng =  new Promise(async (resolve, reject) => { 
  generatePng({
    targetUrl: local_test_web,
    isMobile: false,
    folderName: name,
    hasBanner:hasBanner
  }).then((data) => { 
    const { images } = data
    console.log(images)
    return resolve(images)
  })
})
 
const generateAppPng = new Promise(async (resolve, reject) => { 
  generatePng({
    targetUrl: local_test_app,
    isMobile: true,
    folderName: name,
    hasBanner:hasBanner
  }).then((data) => { 
    const { images } = data
    console.log(images)
    return resolve(images)
  })
})

Promise.all([generateWebPng, generateAppPng]).then((results) => { 
  const webImages = results?.[0] ?? []
  const appImages = results?.[1] ?? []
  const allImages = {
    web: webImages,
    app:appImages,
  }
  renderToHtml(allImages, name)
})