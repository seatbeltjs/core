import { Log } from '../../';
import { Decorator } from '../../helpers';

export namespace ConfigPlugin {
  export declare type Init = () => any;
  export declare type Config = (seatbelt: any) => any;

  export interface BasePlugin {
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
      }

      PluginConfigRegister.prototype = OriginalClassConstructor.prototype;
      PluginConfigRegister.constructor = OriginalClassConstructor.constructor;
      Object.defineProperty(PluginConfigRegister, 'name', {
        value: OriginalClassConstructor.name
      });

      return PluginConfigRegister;
    };
  }
}
