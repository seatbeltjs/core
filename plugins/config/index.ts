import { Log } from '../../';
import { Decorator } from '../../helpers';

let i = 0;

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

      const createNameExtension = () => {
        i = i + 1;
        return '_PluginConfig_' + OriginalClassConstructor.name + i;
      };

      class PluginConfigRegister extends OriginalClassConstructor {
        public __seatbeltPluginName: string = config.name;
        public __seatbeltPluginType: string = 'config';
      }

      PluginConfigRegister.prototype = OriginalClassConstructor.prototype;
      PluginConfigRegister.constructor = OriginalClassConstructor.constructor;
      Object.defineProperty(PluginConfigRegister, 'name', {
        value: createNameExtension()
      });

      return PluginConfigRegister;
    };
  }
}
