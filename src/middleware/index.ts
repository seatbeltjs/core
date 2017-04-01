export function Middleware(config: Object) {
  return (originalClassConstructor: Function) => {

    const MiddlewareConstructor = function () {
      originalClassConstructor.prototype.__seatbelt__ = 'middleware';
      originalClassConstructor.prototype.__seatbelt_config__ = config;
      return originalClassConstructor.prototype;
    };

    return MiddlewareConstructor;
  };
}
