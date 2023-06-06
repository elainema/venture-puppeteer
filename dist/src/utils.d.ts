/**
 * 获取页面高度
*/
declare const getPageHeight: (targetUrl: string, isMobile: boolean, page: any) => Promise<any>;
/**
 * 检查目录是否存在，不存在就创建目录
*/
declare const checkImagePath: (path: string, subPath?: string) => Promise<unknown>;
/**
 * 渲染html
 * 渲染local只是为本地查看方便
*/
declare const renderToHtml: (imgs: string[], name: string) => Promise<void>;
export { getPageHeight, checkImagePath, renderToHtml };
