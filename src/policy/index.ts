export function Policy(config: Object) {
  return (originalClassConstructor: Function) => {

    const PolicyConstructor = function () {
      originalClassConstructor.prototype.__seatbelt__ = 'policy';
      originalClassConstructor.prototype.__seatbelt_config__ = config;
      return originalClassConstructor.prototype;
    };

    return PolicyConstructor;
  };
}
