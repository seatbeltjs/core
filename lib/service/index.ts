import { ConfigPlugin, Plugin } from '../../plugins';
import { Decorator } from '../../helpers';
import { Log } from '../../';

const __allServices: any = {};

export namespace Service {
  export function Register(serviceName?: string): Decorator.ClassDecorator {
    return (OriginalClassConstructor: Decorator.ClassConstructor): any => {
      @Plugin.Register({
        name: 'service'
      })
      class Service extends OriginalClassConstructor {}

      Service.prototype = OriginalClassConstructor.prototype;
      Service.constructor = OriginalClassConstructor.constructor;
      Object.defineProperty(Service, 'name', {
        value: OriginalClassConstructor.name + Service.name
      });

      __allServices[OriginalClassConstructor.name.toLowerCase()] = new Service();
    };
  }

  export function Use(name: string): Decorator.PropertyDecorator {
    return function(target: any, key: string): void  {
      delete target[key];

      Object.defineProperty(target, key, {
        get() { return __allServices[name.toLowerCase()]; },
        enumerable: true,
        configurable: true
      });
    };
  }
}
