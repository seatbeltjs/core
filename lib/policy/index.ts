import { Plugin } from '../../plugins';
import { Decorator } from '../../helpers';
import { Log, Route } from '../../';

const policyRegister: any = {};

export namespace Policy {
  export interface BaseInterface {
    controller: (req: Request.BaseInterface, res: Response.BaseInterface, server?: Object) => any;
  }

  export namespace Response {
    export interface BaseInterface {
      next: () => any;
      send: (status: number, body: Object) => any;
      ok: (body: Object) => any;
      created: (body: Object) => any;
      badRequest: (body: Object) => any;
      unauthorized: (body: Object) => any;
      forbidden: (body: Object) => any;
      notFound: (body: Object) => any;
      serverError: (body: Object) => any;
    }
  }

  export namespace Request {
    export interface BaseInterface {
      allParams: Object;
    }
  }

  export function Register(): Decorator.ClassDecorator {
    return (OriginalClassConstructor: Decorator.ClassConstructor): any => {
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
