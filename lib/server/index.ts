import { Log } from '../log';

declare type IServerRegisterConstructor = new () => {
  __seatbelt_plugin_name__: string;
};

export interface IServerRequest {
  allParams: any;
}

export interface IServerResponse {
  send: (status: number, body: any) => any;
}

export interface IServerSeatbeltConfig {
  type: string[];
  path: string[];
}

export interface IServerRoute {
  controller: (request: IServerRequest, response: IServerResponse, server: any) => any;
  __seatbelt_config__: IServerSeatbeltConfig;
}

export function DServerRegister(): Function {
  return (OriginalClassConstructor: IServerRegisterConstructor): any => {
    if (typeof OriginalClassConstructor === 'function') {
      class ServerRegister extends OriginalClassConstructor {
        public log: Log = new Log('ServerRegister');
        public name: string = OriginalClassConstructor.name;
        public __seatbelt_plugin_name__: string = 'server';
        constructor() {
          super();
          this.log.system('registering server');
        }
      }
      return ServerRegister;
    } else {
      const log = new Log('ServerRegister');
      log.system('server wrapper cannot be used as a property wrapper');
    }
  };
}
