export interface IMiddlewareConfig {
  weight: number;
}

export function Middleware(config: IMiddlewareConfig): any {
  return (OriginalClassConstructor: any) => {

    return function() {
      const origin = new OriginalClassConstructor();
      origin.__seatbelt__ = 'middleware';
      origin.__seatbelt_config__ = config;
      return origin;
    };
  };
}
