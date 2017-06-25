import { Log } from '../../';
import { Plugin } from '../plugin';
import { Decorator } from '../../helpers';

declare type IServerRegisterConstructor = new () => {
  __seatbeltPlugin: string;
};

export namespace ServerPlugin {
  export declare type Init = () => any;
  export declare type Config = (routes: any[]) => any;

  export interface Request {
    allParams: Object;
  }

  export interface Response {
    send: (status: number, body: Object) => any;
  }

  export interface BaseServer extends Plugin.BasePlugin {
    port: number;
    server: Object;
    conformServerControllerToSeatbeltController: Function;
  }

  export interface RouteConfig {
    type: string[];
    path: string[];
  }

  export interface Route {
    __seatbeltConfig: RouteConfig;
    controller: (request: Request, response: Response, server: Object) => any;
  }

  export function Register(): Decorator.ClassDecorator {
    return (OriginalClassConstructor: Decorator.ClassConstructor): any => {

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
