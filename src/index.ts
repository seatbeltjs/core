export {
  Seatbelt
} from './seatbelt';
export {
  DRoute
} from './route';
export {
  DPolicy
} from './policy';
export {
  DExpress,
  DRestify,
  DKoa,
  DHapi
} from './servers';

export interface IPolicy {
  policy: (req: any, res: any, next: any) => {};
}

export interface IRoute {
  controller: (req: any, res: any) => {};
}

export interface PublicFolder {
  publicPath: string;
  pathOnSystem: string;
}

export interface IServer {
  log?: any;
  favicon?: string;
  publicFolders?: PublicFolder|PublicFolder[];
  port?: number;
  middleware?: Function[];
  app?: (app: any) => {};
}
