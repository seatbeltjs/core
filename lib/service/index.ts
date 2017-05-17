const serviceRegister: any = {};

export function DService(): Function {
  return (OriginalClassConstructor: any, wrappedName: any, valueObject: any): any => {
    if (typeof OriginalClassConstructor === 'function') {
      const origin = new OriginalClassConstructor();
      origin.__name__ = OriginalClassConstructor.name;
      origin.__seatbelt__ = 'service';
      serviceRegister[OriginalClassConstructor.name] = origin;
      return origin;
    } else {
      OriginalClassConstructor[wrappedName] = serviceRegister;
    }
  };
}
