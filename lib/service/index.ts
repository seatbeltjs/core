import { DRegisterPlugin } from '../';

declare type IServiceConstructor = new () => {
  __seatbeltPlugin: string;
};

const serviceRegister: any = {};

export function DService(serviceName?: string): Function {
  return (OriginalClassConstructor: IServiceConstructor, wrappedName?: string, valueObject?: any): any => {
    if (typeof OriginalClassConstructor === 'function') {
      @DRegisterPlugin({
        pluginName: 'service',
        hook: function(seatbelt: any) {
          Object.keys(seatbelt).forEach((key: string) => {
            if (Array.isArray(seatbelt[key])) {
              seatbelt[key].forEach((plugin: any) => {
                if (typeof plugin === 'object') {
                  console.log('>>>', plugin.name);
                  Object.keys(plugin).forEach((pluginKey: string) => {
                    console.log(pluginKey);
                  })
                }
              });
            }
          });
        }
      })
      class Service extends OriginalClassConstructor {
        public name: string = OriginalClassConstructor.name;
        constructor() {
          super();
        }
      }
      return Service;
    }
  };
}
