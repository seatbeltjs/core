export declare type IPolicyConstructor = new () => {
  controller: Function;
};

const policyRegister: any = {};

export function DPolicy(policyNames?: string|string[]): Function {
  return (OriginalClassConstructor: IPolicyConstructor, wrappedName: any, valueObject: any): any => {
    if (typeof OriginalClassConstructor === 'function') {
      class Policy extends OriginalClassConstructor {
        public __seatbelt__: string = 'policy';
        public __name__: string = OriginalClassConstructor.name;
        public name: string = OriginalClassConstructor.name;
        constructor() {
          super();
          policyRegister[OriginalClassConstructor.name.toLowerCase()] = this.controller;
        };
      }
      return Policy;
    } else if (valueObject && typeof valueObject.value === 'function') {
      if (typeof policyNames === 'string') {
        policyNames = [policyNames];
      }
      if (Array.isArray(policyNames)) {
        policyNames.forEach(policyName => {
          policyName = policyName.toLowerCase();
          const originalFunction = valueObject.value;
          valueObject.value = function (controls: any, ...params: any[]) {
            const next = () => {
              return originalFunction.apply(this, [controls, ...params]);
            };
            const policyControls: any = Object.assign({}, controls, { next });
            return policyRegister[policyName](policyControls, ...params);
          };
        });
      }
    }
  };
}
