import { Log } from '../../log';
import { join } from 'path';

export class BootApp {
  private log = new Log('Seatbelt-Startup');
  private server: any;
  private appPath: string;
  constructor(path: string) {
    this.appPath = path;
  }
  public init() {
    this.log.system('Booting App');
    this.log.debug(join(this.appPath, '.seatbelt'));
    const allImports = require(join(this.appPath, '.seatbelt')).allImports;

    const classesByType = {};
    let bootServer: any;

    const importedClasses = allImports();
    Object.keys(importedClasses).forEach(key => {
      if (importedClasses[key].__seatbelt__ === 'server') {
        bootServer = <any>importedClasses[key];
      } else {
        if (!<any>classesByType[importedClasses[key].__seatbelt__]) {
          classesByType[importedClasses[key].__seatbelt__] = [];
        }
        classesByType[importedClasses[key].__seatbelt__].push(importedClasses[key]);
      }
    });

    if (bootServer) {
      this.log.info('starting server');
      this.server = bootServer.__seatbelt_strap__(classesByType);
    } else {
      this.log.error('CRITICAL: No Server Defined');
    }

  }
}
