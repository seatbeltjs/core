import { Log } from '../log';

declare type IServerRegisterConstructor = new () => {
  __name__: string;
  __seatbelt__: string;
};

export type IPluginConfig = {
  pluginName: string;
  hook?: Function;
};

export function DRegisterPlugin(pluginConfig: IPluginConfig): Function {
  return (OriginalClassConstructor: IServerRegisterConstructor): any => {
    if (typeof OriginalClassConstructor === 'function') {
      class ServerRegister extends OriginalClassConstructor {
        public log: Log = new Log('ServerRegister');
        public name: string = OriginalClassConstructor.name;
        public __seatbeltPlugin: string = pluginConfig.pluginName;
        public __seatbelt_hook__?: Function;
        constructor() {
          super();
          if (pluginConfig.hook) {
            this.__seatbelt_hook__ = pluginConfig.hook;
          }
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
