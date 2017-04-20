export function HapiServer(): any {
  return function(OriginalClassConstructor: any) {

    return function () {
      const origin = new OriginalClassConstructor();
      origin.__seatbelt__ = 'server';
      origin.__seatbelt_server__ = 'hapi';
      return origin;
    };
  };
}
