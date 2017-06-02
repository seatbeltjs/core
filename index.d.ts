export * from './lib';
export * from './boot';
export interface ISend {
    status?: number;
    json: any;
}
export interface IController {
    params: any;
    send(sendInterface: ISend): void;
}
export interface IPolicyController extends IController {
    next(): void;
}
export interface IRoute {
    controller(controls: IController): any;
}
export interface IPolicy {
    controller(controls: IPolicyController): any;
}
export interface IServer {
    port?: number;
}
