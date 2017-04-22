import { Log } from '../../log';

export function DExpress(): any {
  return function(OriginalClassConstructor: any) {

    return function () {
      const origin = new OriginalClassConstructor();
      origin.__seatbelt__ = 'server';
      origin.__seatbelt_server__ = require('express');
      origin.__seatbelt_strap__ = function(classesByType: any[]) {
        origin.express = require('express');
        origin.app = origin.express();
        origin.port = process.env.port || 3000;
        origin.log = new Log('Express');

        if (classesByType['route']) {
          classesByType['route'].forEach((route: any) => {
            const policies: any[] = [];
            route.__seatbelt_config__.policies.forEach((routePolicyName: string) => {
              classesByType['policy'].forEach((policy: any) => {
                if (routePolicyName === policy.__name__) {
                  policies.push(policy.policy);
                }
              });
            });

            const policiesPlusController = [
              ...policies,
              route.controller
            ];
            route['__seatbelt_config__'].type.forEach((eachType: string) => {
              route['__seatbelt_config__'].path.forEach((eachPath: string) => {
                this.app[eachType.toLowerCase()](eachPath, ...policiesPlusController);
              });
            });
          });
        }

        origin.app.listen(origin.port, () => {
          origin.log.system(`Example app listening on port ${origin.port}!`);
        });

      };
      return origin;
    };
  };
}
