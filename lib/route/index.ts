import { Plugin } from '../../plugins';
import { Decorator } from '../../helpers';

export interface IRouteConfig {
  type: string|string[];
  path: string|string[];
  policies?: string|string[];
}

export namespace Route {
  export type RouteConstructor = new () => {
    controller: Function;
  };
  export interface BaseRoute {
    controller: Function;
  }

  export function Register(config: IRouteConfig): Decorator.ClassDecorator {
    return function(OriginalClassConstructor: Decorator.ClassConstructor) {
      @Plugin.Register({
        name: 'route'
      })
      class Route extends OriginalClassConstructor {
        public __seatbeltConfig: IRouteConfig = config;
        public name: string = OriginalClassConstructor.name;
        constructor() {
          super();
          if (typeof this.__seatbeltConfig.type === 'string') {
            this.__seatbeltConfig.type = [this.__seatbeltConfig.type];
          }
          if (typeof this.__seatbeltConfig.path === 'string') {
            this.__seatbeltConfig.path = [this.__seatbeltConfig.path];
          }
          if (!this.__seatbeltConfig.policies) {
            this.__seatbeltConfig.policies = [];
          }
          if (typeof this.__seatbeltConfig.policies === 'string') {
            this.__seatbeltConfig.policies = [this.__seatbeltConfig.policies];
          }
        }
      }
      return Route;
    };
  }
}
