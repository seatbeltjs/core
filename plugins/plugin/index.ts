import { Log } from '../../';
import { Decorator } from '../../helpers';

export namespace Plugin {
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

      class PluginRegister extends OriginalClassConstructor {
        public __seatbeltPluginName: string = config.name;
        public __seatbeltPluginType: string = 'plugin';
      }

      PluginRegister.prototype = OriginalClassConstructor.prototype;
      PluginRegister.constructor = OriginalClassConstructor.constructor;

      Object.defineProperty(PluginRegister, 'name', {
        value: OriginalClassConstructor.name
      });

      return PluginRegister;
    };
  }
}
