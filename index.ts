



// 测试爬取地址，后续移除
  // https://info6052668.wixsite.com/website-5/agenda

import { generatePng } from "./src/index"
import { renderToHtml } from "./src/utils"
import { IRequestRes} from "./src/model"

// import generatePng from "./src"

  // https://static.aspendigital.co/strategies/detailTemplate/venturesDiscoveryFundI/index_zh.html
  // https://www.web3investmentsummit.com/
const url = "https://info6052668.wixsite.com/website-5/agenda"
generatePng({
  targetUrl: url,
  isMobile: true,
  name: "agenda"
}).then((data: IRequestRes) => { 
  const {images} = data
  renderToHtml(images,"agenda")
}).catch((e) => { })