export interface IRouteConfig {
  type: string;
  path: string;
}

export function Route(config: IRouteConfig): any {
  return function(OriginalClassConstructor: any) {

    return function () {
      const origin = new OriginalClassConstructor();
      origin.__seatbelt_config__ = config;
      origin.__seatbelt__ = 'route';
      return origin;
    };
  };
}
