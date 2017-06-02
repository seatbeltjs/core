import { Log } from '../log';

declare type IServerRegisterConstructor = new () => {
  __name__: string;
  __seatbelt__: string;
};

export function DRegisterServer(): Function {
  return (OriginalClassConstructor: IServerRegisterConstructor): any => {
    if (typeof OriginalClassConstructor === 'function') {
      class ServerRegister extends OriginalClassConstructor {
        public log: Log = new Log('ServerRegister');
        public name: string = OriginalClassConstructor.name;
        public __name__: string = OriginalClassConstructor.name;
        public __seatbelt__: string = 'server';
        constructor() {
          super();
          this.log.system('registering server');
        }
      }
      return ServerRegister;
    } else {
      const log = new Log('ServerRegister');
      log.system('server wrapper cannot be used as a property wrapper');
    }
  };
}
