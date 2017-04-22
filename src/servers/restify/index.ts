export function DRestify(): any {
  return function(OriginalClassConstructor: any) {

    return function () {
      const origin = new OriginalClassConstructor();
      origin.__seatbelt__ = 'server';
      origin.__seatbelt_server__ = require('restify');
      origin.__seatbelt_strap__ = function(classes: any) {
        console.log(classes);
      };
      return origin;
    };
  };
}
