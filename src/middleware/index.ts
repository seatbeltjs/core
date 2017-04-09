export interface IMiddlewareConfig {
  weight: number;
}

export function Middleware(config: IMiddlewareConfig): any {
  return (OriginalClassConstructor: any) => {

    return () => {
      const origin = new OriginalClassConstructor();
      origin.prototype = OriginalClassConstructor.prototype;
      origin.__seatbelt__ = 'middleware';
      origin.__seatbelt_config__ = config;
      return origin;
    };
  };
}
