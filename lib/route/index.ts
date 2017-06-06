import { DRegisterPlugin } from '../';

export interface IRouteConfig {
  type: string|string[];
  path: string|string[];
  policies?: string|string[];
}

export function DRoute(config: IRouteConfig): any {
  return function(OriginalClassConstructor: new () => {}) {
    @DRegisterPlugin({
      pluginName: 'route'
    })
    class Route extends OriginalClassConstructor {
      public __seatbelt_config__: IRouteConfig = config;
      public name: string = OriginalClassConstructor.name;
      constructor() {
        super();
        if (typeof this.__seatbelt_config__.type === 'string') {
          this.__seatbelt_config__.type = [this.__seatbelt_config__.type];
        }
        if (typeof this.__seatbelt_config__.path === 'string') {
          this.__seatbelt_config__.path = [this.__seatbelt_config__.path];
        }
        if (!this.__seatbelt_config__.policies) {
          this.__seatbelt_config__.policies = [];
        }
        if (typeof this.__seatbelt_config__.policies === 'string') {
          this.__seatbelt_config__.policies = [this.__seatbelt_config__.policies];
        }
      }
    }
    return Route;
  };
}
