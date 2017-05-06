export interface IRouteConfig {
  type: string|string[];
  path: string|string[];
  policies?: string|string[];
}

export function DRoute(config: IRouteConfig): any {
  return function(OriginalClassConstructor: any) {

    return function () {
      const origin = new OriginalClassConstructor();
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
      origin.__seatbelt_config__ = config;
      origin.__seatbelt__ = 'route';
      return origin;
    };
  };
}
