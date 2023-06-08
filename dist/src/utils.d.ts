import { IIMages } from "./model";
/**
 * 检查目录是否存在，不存在就创建目录
 * @param  {[string]} path  目录路径
 * @param  {[string]} subPath  子目录路径
 * @return {[string]}  返回子目录路径
*/
declare const checkImagePath: (path: string, subPath?: string) => Promise<unknown>;
/**
 * 渲染html
 * 渲染local只是为本地查看方便
 * @param  {[string]} imgs  图片数组
 * @param  {[string]} name  文件名
 * @return
*/
declare const renderToHtml: (imgs: IIMages, name: string) => Promise<void>;
export { checkImagePath, renderToHtml };
