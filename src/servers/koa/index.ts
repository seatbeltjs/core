import { Log } from '../../log';

export function DKoa(): any {
  return function(OriginalClassConstructor: any) {

    return function () {
      const origin = new OriginalClassConstructor();
      origin.__seatbelt__ = 'server';
      origin.__seatbelt_strap__ = function(classesByType: any) {
        this.log = new Log('Koa');
        this.Koa = require('koa');
        this.app = new this.Koa();
        this.port = process.env.port || 3000;
        this.log = new Log('Express');
        this.router = require('koa-router')();
        origin.__controller_wrapper__ = function (controllerFunction: Function, ctx: any, next: Function) {
          controllerFunction(Object.assign(ctx,
            {
              next,
              reply: (response: any) => {
                ctx.body = response;
              }
            }
          ));
        };
        if (classesByType['route']) {
          classesByType['route'].forEach((route: any) => {
            const policies: any[] = [];
            route.__seatbelt_config__.policies.forEach((routePolicyName: string) => {
              classesByType['policy'].forEach((policy: any) => {
                if (routePolicyName === policy.__name__) {
                  policies.push(policy);
                }
              });
            });

            route['__seatbelt_config__'].type.forEach((eachType: string) => {
              route['__seatbelt_config__'].path.forEach((eachPath: string) => {
                policies.forEach(policy => {
                  this.router[eachType.toLowerCase()](eachPath, (ctx: any, next: Function) => origin.__controller_wrapper__(policy.controller, ctx, next));
                });
                this.router[eachType.toLowerCase()](eachPath, (ctx: any, next: Function) => origin.__controller_wrapper__(route.controller, ctx, next));
              });
            });
          });
        }
        this.app.use(this.router.routes());
        this.app.listen(this.port);
      };
      return origin;
    };
  };
}
