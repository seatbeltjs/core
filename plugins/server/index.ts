import { Log, Route } from '../../';
import { Plugin } from '../plugin';
import { Decorator } from '../../helpers';

declare type IServerRegisterConstructor = new () => {
  __seatbeltPlugin: string;
};

export namespace ServerPlugin {
  export declare type Init = (seatbelt: any) => any;
  export declare type Config = (seatbelt: any, cb: Function) => any;

  export interface BaseInterface extends Plugin.BaseInterface {
    port: number;
    server: Object;
    conformServerControllerToSeatbeltController: Function;
  }

  export interface RouteConfigInterface {
    type: string[];
    path: string[];
  }

  export interface RouteInterface {
    __routeConfig: RouteConfigInterface;
    controller: (request: Route.Request.BaseInterface, response: Route.Response.BaseInterface, server: Object) => any;
  }

  export interface PluginConfigInterface {
    name: string;
  }

  export function Register (config: PluginConfigInterface): Decorator.ClassDecorator {
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
