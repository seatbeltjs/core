export interface IPolicyConfig {
  name: string;
}

export function Policy(config?: IPolicyConfig): Function {
  return (OriginalClassConstructor: any): any => {

    return function () {
      const origin = OriginalClassConstructor.prototype;
      if (config && config.name) {
        origin.__name__ = config.name;
      } else {
        origin.__name__ = OriginalClassConstructor.name;
      }
      origin.__seatbelt__ = 'policy';
      return OriginalClassConstructor.prototype;
    };
  };
}
