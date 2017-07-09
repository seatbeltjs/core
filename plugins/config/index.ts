import { Log } from '../../';
import { Decorator } from '../../helpers';

export namespace ConfigPlugin {
  export declare type Init = (seatbelt: any) => any;
  export declare type Config = (seatbelt: any, cb: Function) => any;

  export interface BaseInterface {
    init?: Init;
    config?: Config;
  }

  export interface PluginConfigInterface {
    name: string;
  }

  export function Register (config: PluginConfigInterface): Decorator.ClassDecorator {
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
