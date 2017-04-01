export function Validator(config: Object) {
  return (originalClassConstructor: Function) => {

    const ValidatorConstructor = function () {
      originalClassConstructor.prototype.__seatbelt__ = 'validator';
      originalClassConstructor.prototype.__seatbelt_config__ = config;
      return originalClassConstructor.prototype;
    };

    return ValidatorConstructor;
  };
}
