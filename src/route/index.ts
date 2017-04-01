export interface IRouteConfig {
  type: string;
  path: string;
}

export function Route(config: IRouteConfig): any {
  return function(originalClassConstructor: any) {

    const RouteConstructor = function () {
      originalClassConstructor.prototype.__seatbelt__ = 'route';
      originalClassConstructor.prototype.__seatbelt_config__ = config;
      return originalClassConstructor.prototype;
    };

    return <typeof originalClassConstructor>RouteConstructor;
  };
}
