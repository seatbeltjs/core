import { ConfigPlugin, Plugin } from '../../plugins';
import { Decorator } from '../../helpers';
import { Log } from '../../';

const __allServices: any = {};

export class ServiceConfig implements Plugin.BasePlugin {
  public __seatbeltPluginName: string = 'ServiceConfig';
  public __seatbeltPluginType: string = 'config';
  public log: Log = new Log('ServiceConfig');

  public config: Plugin.Config = function(seatbelt: any) {
    Object.getOwnPropertyNames(seatbelt.plugins).forEach((key: string) => {
      this.log.debug('==> key', key);
      seatbelt.plugins[key].forEach((plugin: any) => {
        if (typeof plugin === 'object') {
          Object.getOwnPropertyNames(plugin).forEach((pluginKey: string) => {
            console.log(pluginKey)
            if (typeof plugin[pluginKey] === 'object' && plugin[pluginKey].__serviceName) {
              // this.log('found', JSON.stringify(plugin[pluginKey].__serviceName));
            }
          });
        }
      });
    });
  };
}

export namespace Service {

  export function Use(name: string): Decorator.PropertyDecorator {
    return function(target: any, key: string): void  {

      delete target[key];

      Object.defineProperty(target, key, {
        get: function() { return (() => __allServices[key]) },
        enumerable: true,
        configurable: false
      });

    };

  }

  export function AllServices(): Decorator.PropertyDecorator {
    return (target: any, propertyKey: string | symbol): void => {
      target[propertyKey] = __allServices;
    };
  }

  export function Register(serviceName?: string): Decorator.ClassDecorator {
    return (OriginalClassConstructor: Decorator.ClassConstructor): any => {
      @Plugin.Register({
        name: 'service'
      })
      class Service extends OriginalClassConstructor {
        public name: string = OriginalClassConstructor.name;
        constructor() {
          super();
        }
      }
      __allServices[OriginalClassConstructor.name] = new Service();

      return Service;
    };
  }
}
