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
  DValidateRequest
} from './validate';

export interface IPolicy {
  controller: (route: any) => {};
}

export interface IRoute {
  controller: (route: any) => {};
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
