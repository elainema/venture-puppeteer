import { IRequestConfig, IRequestRes } from "./model";
declare const generatePng: (config: IRequestConfig) => Promise<IRequestRes | unknown>;
export { generatePng };
