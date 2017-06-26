import { Plugin } from '../../plugins';
import { Decorator } from '../../helpers';
import { Log, Route } from '../../';

const policyRegister: any = {};

export namespace Policy {
  export function Register(): Decorator.ClassDecorator {
    return (OriginalClassConstructor: Decorator.ClassConstructor&Route.RouteConstructor): any => {
      @Plugin.Register({
        name: 'policy'
      })
      class Policy extends OriginalClassConstructor {}

      policyRegister[OriginalClassConstructor.name.toLowerCase()] = new Policy();

      Policy.prototype = OriginalClassConstructor.prototype;
      Policy.constructor = OriginalClassConstructor.constructor;
      Object.defineProperty(Policy, 'name', {
        value: OriginalClassConstructor.name + Policy.name
      });

      return Policy;
    };
  }

  export function Use(policyNames: string|string[]): Decorator.MethodDecorator {
    return (OriginalClassConstructor: Decorator.ClassConstructor, wrappedName: any, valueObject: any): any => {

      if (typeof policyNames === 'string') {
        policyNames = [policyNames];
      }

      if (!Array.isArray(policyNames)) {
        const log = new Log('policies');
        return log.system('cannot use policies, no policies defined');
      }

      policyNames.forEach(policyName => {
        policyName = policyName.toLowerCase();
        const originalFunction = valueObject.value;
        valueObject.value = function (req: any, res: any, server: any) {
          const next = () => {
            return originalFunction.apply(this, [req, res, server]);
          };
          const policyRes: any = Object.assign({}, res, { next });
          return policyRegister[policyName].controller(req, policyRes, server);
        };
      });
    };
  }
}
