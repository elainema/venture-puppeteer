export interface IRequestConfig {
    targetUrl: string;
    isMobile: boolean;
    name: string;
}
export interface IRequestRes {
    images: string[];
}
export interface IIMages {
    web: Array<string>;
    app: Array<string>;
}
