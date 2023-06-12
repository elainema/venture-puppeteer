export interface IRequestConfig {
    targetUrl: string;
    isMobile: boolean;
    folderName: string;
    hasBanner: boolean;
}
export interface IRequestRes {
    images: string[];
}
export interface IIMages {
    web: Array<string>;
    app: Array<string>;
}
