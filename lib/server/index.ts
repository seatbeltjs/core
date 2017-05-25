declare type IServerRegisterConstructor = new () => {
  __name__: string;
  __seatbelt__: string;
};
export function DRegisterServer(): Function {
  return (OriginalClassConstructor: IServerRegisterConstructor): any => {
    if (typeof OriginalClassConstructor === 'function') {
      return class extends OriginalClassConstructor {
        constructor() {
          super();
          console.log('registering server');
          this.__name__ = OriginalClassConstructor.name;
          this.__seatbelt__ = 'server';
        }
      };
    } else {
      console.log('server wrapper cannot be used as a property wrapper');
    }
  };
}
