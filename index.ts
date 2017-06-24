/// <reference types="node" />
export * from './lib';
export * from './boot';
export * from './helpers';

export declare interface ISend {
  status?: number;
  json: any;
}

export declare interface IController {
  params: any;
  send (sendInterface: ISend): void;
}

export declare interface IPolicyController extends IController {
  next (): void;
}

export declare interface IRoute {
  controller (controls: IController): any;
}

export declare interface IPolicy {
  controller (controls: IPolicyController): any;
}

export declare interface IServer {
  port?: number;
}
