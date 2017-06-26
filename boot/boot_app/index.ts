import { Log } from '../../';
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

    require('nodemon')({
      script: join(this.appPath, '.seatbelt'),
      verbose: true
    });

  }
}
