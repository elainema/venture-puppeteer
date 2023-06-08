import { IRequestConfig, IRequestRes } from "./model";
/**
 * 生成图片
 * @param  {IRequestConfig} config  生成截图的必须参数
 * @returns Promise<IRequestRes>
*/
declare const generatePng: (config: IRequestConfig) => Promise<IRequestRes>;
export { generatePng };
