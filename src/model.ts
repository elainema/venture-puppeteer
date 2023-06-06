export interface IRequestConfig {
    targetUrl: string;
    isMobile: boolean;
    name: string; // 生成图片的目录和 html名称
}
 export interface IRequestRes {
     images: string[];
 }