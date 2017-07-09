import { dirname, join } from 'path';
import { Log } from '../';
import { TSImportCreator } from './ts_import_creator';
import { Rollup } from './rollup';
import { BootApp } from './boot_app';
import { existsSync, unlinkSync, mkdirSync, writeFileSync, readdirSync, statSync, rmdirSync } from 'fs';

const CONFIG_FOLDER = '.seatbelt';
const CONFIG_JSON = 'seatbelt.json';

export interface ISeatbelt {
  strap(): void;
  getRoot(): string;
}

const removeFolder = function removeFolder(location: string) {
  const files = readdirSync(location);
  files.forEach((file: string) => {
    file = location + '/' + file;
    const stat = statSync(file);
    if (stat.isDirectory()) {
      return removeFolder(file);
    } else {
      unlinkSync(file);
    }
  });
  rmdirSync(location);
};

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

  public init() {
    this._setRoot(callerName());
    if (existsSync(join(this.getRoot(), '.seatbelt'))) {
      removeFolder(join(this.getRoot(), '.seatbelt'));
    }
    mkdirSync(join(this.getRoot(), '.seatbelt'));
    this.log.system('▬▬▬▬(๑๑)▬▬▬▬ setbelt strapped to', this.getRoot());
    this._createTSImporter();
    this._rollUpFiles(() => {
      this._bootApp();
    });
  }

  public strap = this.init;

  private _setRoot(root: string) {
    this._root = root;
  }

  public getRoot(): string {
    return this._root;
  }

  private _bootApp() {
    return new BootApp(this.getRoot()).init();
  }

  private _createTSImporter() {
    return new TSImportCreator(this.getRoot()).init();
  }

  private _rollUpFiles(cb: Function) {
    const rollup = new Rollup(this.getRoot());
    rollup.createImports(() => {
      return rollup.createIndex(cb);
    });
  }

}
