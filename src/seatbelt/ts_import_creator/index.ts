import { Log } from '../../log';

export class TSImportCreator {
  private log = new Log('Seatbelt-TSImportCreator');
  private appPath: string;
  constructor(path: string) {
    this.appPath = path;
  }
  public init() {
    this.log.system('creating ts importer');
  }
};
