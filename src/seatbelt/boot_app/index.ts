import { Log } from '../../log';
import { Express } from 'express';
import { join } from 'path';

const express = require('express');

export class BootApp {
  private log = new Log('Seatbelt-Startup');
  private app: Express;
  private port: number = process.env.port || 3000;
  private appPath: string;
  constructor(path: string) {
    this.appPath = path;
  }
  public init() {
    this.log.system('Booting App');
    const allImports = require(join(this.appPath, '.seatbelt')).allImports;

    const classesByType = {};

    const importedClasses = allImports();
    Object.keys(importedClasses).forEach(key => {
      if (!classesByType[importedClasses[key].__seatbelt__]) {
        classesByType[importedClasses[key].__seatbelt__] = [];
      }
      classesByType[importedClasses[key].__seatbelt__].push(importedClasses[key]);
    });

    this.app = express();

    if (classesByType['middleware']) {
      classesByType['middleware'].sort((a: any, b: any) => (a.__seatbelt_config__.weight - b.__seatbelt_config__.weight));
      classesByType['middleware'].forEach((middleware: any) => {
        if (middleware.middleware && typeof middleware.middleware === 'function') {
          this.app.use(middleware.middleware);
        }
      });
    }

    if (classesByType['route']) {
      classesByType['route'].forEach((route: any) => {
        const policies: any[] = [];
        if (Array.isArray(route.policies) && classesByType['policy']) {
          route.policies.forEach((routePolicyName: string) => {
            classesByType['policy'].forEach((policy: any) => {
              if (routePolicyName === policy.__name__) {
                policies.push(policy.policy);
              }
            });
          });
        }

        const policiesPlusController = [
          ...policies,
          route.controller
        ];
        this.app[route['__seatbelt_config__'].type.toLowerCase()](route['__seatbelt_config__'].path, ...policiesPlusController);
      });
    }

    this.app.listen(this.port, () => {
      this.log.system(`Example app listening on port ${this.port}!`);
    });

  }
}
