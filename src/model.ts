export interface IRequestConfig {
    targetUrl: string;
    isMobile: boolean;
    folderName: string; // 生成图片的目录和 html名称
    hasBanner: boolean;
}
 export interface IRequestRes {
    images: string[];
 }
export interface IIMages { 
    web: Array<string>;
    app:Array<string>;
}