import { Log } from '../../';
import { Decorator } from '../../helpers';

export namespace Plugin {
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

  export function Register(config: PluginConfig): Decorator.ClassDecorator {
    return function (OriginalClassConstructor: Decorator.ClassConstructor): any {

      class PluginRegister extends OriginalClassConstructor {
        public __seatbeltPluginName: string = config.name;
        public __seatbeltPluginType: string = 'plugin';
        public __log: Log = new Log('ServerRegister');
        public name: string = OriginalClassConstructor.name;

      }

      PluginRegister.prototype = OriginalClassConstructor.prototype;
      PluginRegister.constructor = OriginalClassConstructor.constructor;

      return PluginRegister;
    };
  }
}
