import { Log } from '../log';
import { isPropertyDecorator, PropertyDecorator, ClassDecorator } from '../../helpers';

declare type IServerRegisterConstructor = new () => {
  __seatbeltPlugin: string;
};

export namespace Server {
  export declare type Init = () => any;
  export declare type Config = (routes: any[]) => any;

  export interface Request {
    allParams: Object;
  }

  export interface Response {
    send: (status: number, body: Object) => any;
  }

  export interface BaseServer {
    port: number;
    server: Object;
    log: Log;
    conformServerControllerToSeatbeltController: Function;
    init: Init;
    config: Config;
  }

  export interface RouteConfig {
    type: string[];
    path: string[];
  }

  export interface Route {
    __seatbeltConfig: RouteConfig;
    controller: (request: Request, response: Response, server: Object) => any;
  }

  export function Register(): ClassDecorator {
    return (OriginalClassConstructor: IServerRegisterConstructor): any => {
      if (isPropertyDecorator(OriginalClassConstructor)) {
        const log = new Log('ServerRegister');
        return log.system('server wrapper cannot be used as a property wrapper');
      }
      class ServerRegister extends OriginalClassConstructor {
        public __seatbeltPlugin: string = 'server';
        public __log: Log = new Log('ServerRegister');
        public name: string = OriginalClassConstructor.name;
        constructor() {
          super();
          this.__log.system('registering server => ', this.name);
        }
      }
      return ServerRegister;
    };
  }
}
