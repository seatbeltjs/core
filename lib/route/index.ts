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

      if (typeof config.type === 'string') {
        config.type = [config.type];
      }
      if (typeof config.path === 'string') {
        config.path = [config.path];
      }
      if (!config.policies) {
        config.policies = [];
      }
      if (typeof config.policies === 'string') {
        config.policies = [config.policies];
      }

      @Plugin.Register({
        name: 'route'
      })
      class Route extends OriginalClassConstructor {
        public __routeConfig: IRouteConfig = config;
        public name: string = OriginalClassConstructor.name;
      }

      Route.prototype = OriginalClassConstructor.prototype;
      Route.constructor = OriginalClassConstructor.constructor;
      Object.defineProperty(Route, 'name', {
        value: OriginalClassConstructor.name + Route.name
      });

      return Route;
    };
  }
}
