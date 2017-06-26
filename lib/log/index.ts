import * as chalk from 'chalk';
const prettyoutput = require('prettyoutput');

const error = (...params: string[]) => chalk.red.bold(...params);
const warn = (...params: string[]) => chalk.yellow.bold(...params);
const debug = (...params: string[]) => chalk.blue(...params);
const verbose = (...params: string[]) => chalk.cyan(...params);
const info = (...params: string[]) => chalk.cyan(...params);
const system = (...params: string[]) => chalk.yellow(...params);
const silly = () => {
  return '[' +
    chalk.yellow('S') +
    chalk.red('I') +
    chalk.green('L') +
    chalk.blue('L') +
    chalk.yellow('Y') +
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
  private _console: Console = console;
  private _type: string;
  private _zone: string;
  private _json(jsonObject: any) {
    if (!Array.isArray(jsonObject)) {
      this._console.log('\n', prettyoutput(jsonObject));
    } else {
      this._console.log('\n', prettyoutput(jsonObject));
    }
    return 'json';
  }
  public setType(type: string) {
    this._type = type;
  }
  public setZone(zone: string) {
    this._zone = zone;
  }
  public getType(): string {
    return chalk.cyan('{' + this._type + '}\n');
  }
  public getZone(): string {
    if (this._zone) {
      return chalk.yellow('(' + this._zone + ')');
    } else {
      return '';
    }
  }
  private _log(...params: any[]) {
    params.forEach(param => {
      if (typeof param === 'object') {
        param = this._json(param);
      }
      if (param === undefined) {
        param = 'undefined';
      }
      if (typeof param !== 'string' && typeof param !== 'object' && param.toString) {
        param = param.toString();
      }
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
