import { ConfigPlugin, Plugin } from '../../plugins';
import { Decorator } from '../../helpers';
import { Log } from '../../';

const allServices: any = {};

export namespace Service {

  export class Config implements Plugin.BasePlugin {
    public log: Log = new Log('ServiceConfig');
    public config: Plugin.Config = function(seatbelt: any) {
      Object.keys(seatbelt.plugins).forEach((key: string) => {
        seatbelt.plugins[key].forEach((plugin: any) => {
          if (typeof plugin === 'object') {
            Object.keys(plugin).forEach((pluginKey: string) => {
              if (plugin[pluginKey].__serviceName) {
                plugin[pluginKey] = allServices[plugin[pluginKey].__serviceName];
              }
            });
          }
        });
      });
    };
  }

  export function Use(name: string): Decorator.ParameterDecorator {
    return (hostClass: any, functionName: string, functionAttributes: any): any => {
      functionAttributes.value = {__serviceName: name};
    };
  }

  export function AllServices(): Decorator.PropertyDecorator {
    return (target: any, propertyKey: string | symbol): void => {
      target[propertyKey] = allServices;
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
      return Service;
    };
  }
}
