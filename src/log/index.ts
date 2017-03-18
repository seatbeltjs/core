const clc = require('cli-color');

const error = clc.red.bold;
const warn = clc.yellow.bold;
const debug = clc.blue;
const verbose = clc.cyan;
const info = clc.cyan;
const system = clc.yellow;
const silly = () => {
  return '[' +
    clc.yellow('S') +
    clc.red('I') +
    clc.green('L') +
    clc.blue('L') +
    clc.yellow('Y') +
    ']';
};

export interface ILog {
  error(...params: any[]): void;
  err(...params: any[]): void;
  warn(...params: any[]): void;
  warning(...params: any[]): void;
  debug(...params: any[]): void;
  verbose(...params: any[]): void;
  info(...params: any[]): void;
  system(...params: any[]): void;
  sys(...params: any[]): void;
}

export class Log implements ILog {
  constructor(type: string) {
    if (type) {
      this.setType(type);
    }
  }
  private _type: string;
  private _zone: string;
  public setType(type: string) {
    this._type = type;
  }
  public setZone(zone: string) {
    this._zone = zone;
  }
  public getType(): string {
    return clc.cyan('{' + this._type + '}');
  }
  public getZone(): string {
    if (this._zone) {
      return clc.yellow('(' + this._zone + ')');
    } else {
      return '';
    }

  }
  private _log(...params: any[]) {
    params.forEach(param => {
      process.stdout.write(param);
      process.stdout.write(' ');
    });
    process.stdout.write('\n');
  }
  public error(...params: any[]) {
    this._log(error('[ERROR]'), this.getType(), this.getZone(), ...params);
  }
  public err(...params: any[]) {
    this.error(...params);
  }
  public warn(...params: any[]) {
    this._log(warn('[WARNING]'), this.getType(), this.getZone(), ...params);
  }
  public warning(...params: any[]) {
    this.warn(...params);
  }
  public debug(...params: any[]) {
    this._log(debug('[DEBUG]'), this.getType(), this.getZone(), ...params);
  }
  public verbose(...params: any[]) {
    this._log(verbose('[VERBOSE]'), this.getType(), this.getZone(), ...params);
  }
  public info(...params: any[]) {
    this._log(info('[INFO]'), this.getType(), this.getZone(), ...params);
  }
  public system(...params: any[]) {
    this._log(system('[SYSTEM]'), this.getType(), this.getZone(), ...params);
  }
  public sys(...params: any[]) {
    this.system(...params);
  }
  public silly(...params: any[]) {
    this._log(silly(), this.getType(), this.getZone(), ...params);
  }
}
