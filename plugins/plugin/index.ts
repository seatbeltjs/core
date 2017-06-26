import { Log } from '../../';
import { Decorator } from '../../helpers';

let i = 0;

export namespace Plugin {
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
        return '_Plugin_' + OriginalClassConstructor.name + i;
      };

      class PluginRegister extends OriginalClassConstructor {
        public __seatbeltPluginName: string = config.name;
        public __seatbeltPluginType: string = 'plugin';
      }

      PluginRegister.prototype = OriginalClassConstructor.prototype;
      PluginRegister.constructor = OriginalClassConstructor.constructor;

      Object.defineProperty(PluginRegister, 'name', {
        value: createNameExtension()
      });

      return PluginRegister;
    };
  }
}
