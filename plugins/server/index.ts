import { Log } from '../../';
import { Plugin } from '../plugin';
import { Decorator } from '../../helpers';
import { Request, Response } from '../../';

declare type IServerRegisterConstructor = new () => {
  __seatbeltPlugin: string;
};

export namespace ServerPlugin {
  export declare type Init = () => any;
  export declare type Config = (routes: any[]) => any;

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
    __routeConfig: RouteConfig;
    controller: (request: Request.Base, response: Response.Base, server: Object) => any;
  }

  export interface PluginConfig {
    name: string;
  }

  export function Register(config: PluginConfig): Decorator.ClassDecorator {
    return function (OriginalClassConstructor: Decorator.ClassConstructor): any {

      class ServerRegister extends OriginalClassConstructor {
        public __seatbeltPluginName: string = config.name;
        public __seatbeltPluginType: string = 'server';
      }

      ServerRegister.prototype = OriginalClassConstructor.prototype;
      ServerRegister.constructor = OriginalClassConstructor.constructor;
      Object.defineProperty(ServerRegister, 'name', {value: OriginalClassConstructor.name});

      return ServerRegister;
    };
  }
}
