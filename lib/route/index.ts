export interface IRouteConfig {
  type: string|string[];
  path: string|string[];
  policies?: string|string[];
}

export function DRoute(config: IRouteConfig): any {
  return function(OriginalClassConstructor: new () => {}) {
    return class extends OriginalClassConstructor {
      public __seatbelt_config__: IRouteConfig;
      public __seatbelt__: string;
      constructor() {
        super();
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
        this.__seatbelt_config__ = config;
        this.__seatbelt__ = 'route';
      }
    };
  };
}
