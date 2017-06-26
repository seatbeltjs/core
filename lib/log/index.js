Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const prettyoutput = require('prettyoutput');
const error = (...params) => chalk.red.bold(...params);
const warn = (...params) => chalk.yellow.bold(...params);
const debug = (...params) => chalk.blue(...params);
const verbose = (...params) => chalk.cyan(...params);
const info = (...params) => chalk.cyan(...params);
const system = (...params) => chalk.yellow(...params);
const silly = () => {
    return '[' +
        chalk.yellow('S') +
        chalk.red('I') +
        chalk.green('L') +
        chalk.blue('L') +
        chalk.yellow('Y') +
        ']';
};
class Log {
    constructor(type) {
        this._c = console;
        if (type) {
            this.setType(type);
        }
    }
    _json(jsonObject) {
        if (!Array.isArray(jsonObject)) {
            console.log(prettyoutput(jsonObject));
        }
        else {
            console.log(prettyoutput(jsonObject));
        }
        return 'json';
    }
    setType(type) {
        this._type = type;
    }
    setZone(zone) {
        this._zone = zone;
    }
    getType() {
        return chalk.cyan('{' + this._type + '}\n');
    }
    getZone() {
        if (this._zone) {
            return chalk.yellow('(' + this._zone + ')');
        }
        else {
            return '';
        }
    }
    _log(...params) {
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
    error(...params) {
        this._log(error('[ERROR]'), this.getType(), this.getZone(), ...params);
    }
    err(...params) {
        this.error(...params);
    }
    warn(...params) {
        this._log(warn('[WARNING]'), this.getType(), this.getZone(), ...params);
    }
    warning(...params) {
        this.warn(...params);
    }
    debug(...params) {
        this._log(debug('[DEBUG]'), this.getType(), this.getZone(), ...params);
    }
    verbose(...params) {
        this._log(verbose('[VERBOSE]'), this.getType(), this.getZone(), ...params);
    }
    info(...params) {
        this._log(info('[INFO]'), this.getType(), this.getZone(), ...params);
    }
    system(...params) {
        this._log(system('[SYSTEM]'), this.getType(), this.getZone(), ...params);
    }
    sys(...params) {
        this.system(...params);
    }
    silly(...params) {
        this._log(silly(), this.getType(), this.getZone(), ...params);
    }
}
exports.Log = Log;
