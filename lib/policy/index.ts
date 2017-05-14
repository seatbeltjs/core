export declare type IConstructor = new () => {
  controller: Function;
};

const policyRegister: any = {};

export function DPolicy(policyNames?: string|string[]): Function {
  return (OriginalClassConstructor: IConstructor, wrappedName: any, valueObject: any): any => {
    if (typeof OriginalClassConstructor === 'function') {
      return class extends OriginalClassConstructor {
        public __seatbelt__: string;
        public __name__: string;
        constructor() {
          super();
          this.__name__ = OriginalClassConstructor.name;
          this.__seatbelt__ = 'policy';
          policyRegister[OriginalClassConstructor.name.toLowerCase()] = this.controller;
        };
      };
    } else if (valueObject && typeof valueObject.value === 'function') {
      if (typeof policyNames === 'string') {
        policyNames = [policyNames];
      }
      if (Array.isArray(policyNames)) {
        policyNames.forEach(policyName => {
          policyName = policyName.toLowerCase();
          const originalFunction = valueObject.value;
          valueObject.value = function(controls: any, ...params: any[]) {
            const next = () => {
              return originalFunction(controls, ...params);
            };
            const policyControls: any = Object.assign({}, controls, { next });
            return policyRegister[policyName](policyControls, ...params);
          };
        });
      }
    }
  };
}
