import { Log } from '../../';
import { Decorator } from '../../helpers';

export namespace ConfigPlugin {
  export declare type Init = () => any;
  export declare type Config = (seatbelt: any) => any;

  export interface BasePlugin {
    log: Log;
    init?: Init;
    config?: Config;
  }

  export interface PluginConfig {
    name: string;
  }

  export function Register(config?: PluginConfig): Decorator.ClassDecorator {
    return (OriginalClassConstructor: Decorator.ClassConstructor): any => {

      class PluginRegister extends OriginalClassConstructor {
        public __seatbeltPlugin: string = 'config';
        public __log: Log = new Log('ServerRegister');
        public name: string = OriginalClassConstructor.name;
        constructor(...params: any[]) {
          super(...params);
          if (config && config.name) {
            this.__seatbeltPlugin = config.name;
          }
          this.__log.system('registering plugin => ', this.name);
        }
      }

      return PluginRegister;
    };
  }
}
