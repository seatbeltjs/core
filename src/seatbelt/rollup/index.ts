import { Log } from '../../log';

export class Rollup {
  private log = new Log('Seatbelt-Rollup');
  private appPath: string;
  constructor(path: string) {
    this.appPath = path;
  }
  public init() {
    this.log.system('rolling up files');
  }
};
