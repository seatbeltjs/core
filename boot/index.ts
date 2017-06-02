import { dirname, join } from 'path';
import { existsSync } from 'fs';
import { Log } from '../';
import { NewApp } from './new_app';
import { TSImportCreator } from './ts_import_creator';
import { Rollup } from './rollup';
import { BootApp } from './boot_app';

const CONFIG_FOLDER = '.seatbelt';
const CONFIG_JSON = 'seatbelt.json';

export interface ISeatbelt {
  strap(): void;
  getRoot(): string;
}

const callerName = (): string => {
  if (module.parent && module.parent.parent && module.parent.parent.filename) {
    return dirname(module.parent.parent.filename);
  } else if (module.parent && module.parent.filename) {
    return dirname(module.parent.filename);
  }
};

export class Seatbelt implements ISeatbelt {
  private log = new Log('Seatbelt');
  private _root: string = '';
  private _app: any;
  private _setRoot(root: string) {
    this._root = root;
  }
  public getRoot(): string {
    return this._root;
  }
  private _initConfig(cb: Function) {
    const configFolder = join(this.getRoot(), CONFIG_FOLDER);
    const configFolderExist = existsSync(configFolder);
    const configJson = join(configFolder, CONFIG_JSON);
    const configJsonExist = existsSync(join(this.getRoot(), CONFIG_FOLDER, CONFIG_JSON));

    return cb();
  }
  private _bootApp() {
    return new BootApp(this.getRoot()).init();
  }
  private _createTSImporter() {
    return new TSImportCreator(this.getRoot()).init();
  }
  private _rollUpFiles(cb: Function) {
    const rollup = new Rollup(this.getRoot());
    rollup.initImports();
    return rollup.init(cb);
  }
  public strap() {
    this._setRoot(callerName());
    this.log.system('▬▬▬▬(๑๑)▬▬▬▬ setbelt strapped to', this.getRoot());
    this._createTSImporter();
    this._rollUpFiles(() => {
      this._bootApp();
    });
  }
}
