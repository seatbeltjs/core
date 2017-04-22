export interface PublicFolder {
  publicPath: string;
  pathOnSystem: string;
}

export interface IExpressServer {
  favicon?: string;
  publicFolders?: PublicFolder|PublicFolder[];
  port?: number;
  middleware?: Function[];
  app?: (app: any) => {};
}

export class CExpressServer {
}

export function DExpressServer(): any {
  return function(OriginalClassConstructor: any) {

    OriginalClassConstructor();
    this.__seatbelt__ = 'server';
    this.__seatbelt_server__ = 'express';
    return this;
  };
}
