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

  export function Register(config: PluginConfig): Decorator.ClassDecorator {
    return function (OriginalClassConstructor: Decorator.ClassConstructor): any {

      class PluginConfigRegister extends OriginalClassConstructor {
        public __seatbeltPluginName: string = config.name;
        public __seatbeltPluginType: string = 'config';
        public __log: Log = new Log('ServerRegister');
        public name: string = OriginalClassConstructor.name;

      }

      PluginConfigRegister.prototype = OriginalClassConstructor.prototype;
      PluginConfigRegister.constructor = OriginalClassConstructor.constructor;

      return PluginConfigRegister;
    };
  }
}
