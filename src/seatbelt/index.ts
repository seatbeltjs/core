import { dirname } from 'path';
import { Log } from '../log';

export interface ISeatbelt {
  strap(): void;
  getRoot(): string;
}

const caller = (): string => {
  return dirname(module.parent.parent.filename);
};

export class Seatbelt implements ISeatbelt {
  public log = new Log('Seatbelt');
  private _root: string = '';
  protected _setRoot(root: string) {
    this._root = root;
  }
  public getRoot(): string {
    return this._root;
  }
  public strap() {
    this._setRoot(caller());
    this.log.system('▬▬▬▬(๑๑)▬▬▬▬ setbelt strapped to', this.getRoot());
  }
}
