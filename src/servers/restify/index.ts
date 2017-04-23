import { Log } from '../../log';

export function DRestify(): any {
  return function(OriginalClassConstructor: any) {

    return function () {
      const origin = new OriginalClassConstructor();
      origin.__seatbelt__ = 'server';
      origin.__seatbelt_strap__ = function(classesByType: any) {
        origin.restify = require('restify');
        origin.app = origin.restify.createServer();
        origin.port = process.env.port || 3000;
        origin.log = new Log('Express');
        origin.__controller_wrapper__ = function (controllerFunction: Function, req: any, res: any, next: Function) {
          controllerFunction({
            req,
            res,
            next,
            reply: (...params: any[]) => res.send(...params)
          });
        };

        if (classesByType['route']) {
          classesByType['route'].forEach((route: any) => {
            const policies: any[] = [];
            route.__seatbelt_config__.policies.forEach((routePolicyName: string) => {
              classesByType['policy'].forEach((policy: any) => {
                if (routePolicyName === policy.__name__) {
                  policies.push((req: any, res: any, next: Function) => origin.__controller_wrapper__(policy.controller, req, res, next));
                }
              });
            });

            const policiesPlusController = [
              ...policies,
              (req: any, res: any, next: Function) => origin.__controller_wrapper__(route.controller, req, res, next)
            ];
            route['__seatbelt_config__'].type.forEach((eachType: string) => {
              route['__seatbelt_config__'].path.forEach((eachPath: string) => {
                origin.app[eachType.toLowerCase()](eachPath, ...policiesPlusController);
              });
            });
          });
        }

        origin.app.listen(origin.port);
      };
      return origin;
    };
  };
}
