'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');
var fs = require('fs');

const chalk = require('chalk');
const json = require('json-beautify');
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
        return json(jsonObject);
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
            param = param.toString();
            if (typeof param === 'object') {
                param = this._json(param);
            }
            if (typeof param === 'function') {
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

const inquirer = require('inquirer');
class NewApp {
    constructor(configFolder, configJson) {
        this.log = new Log('Seatbelt-NewApp');
        this.seatbeltJSON = {};
        this.configFolder = configFolder;
        this.configJson = configJson;
    }
    init() {
        this.log.system('looks like this is your first time strapping your seatbelt, lets set up the framework');
        return inquirer.prompt([
            {
                type: 'checkbox',
                message: 'Deselect any set up options that you do not want to keep, then press [enter] to continue',
                name: 'options',
                choices: [
                    {
                        name: NewApp.EXAMPLE_HOME_ROUTE,
                        checked: true
                    },
                    {
                        name: NewApp.LOCAL_ENVIRONMENT_VARIABLES,
                        checked: true
                    },
                    {
                        name: NewApp.PACKAGE_JSON_SCRIPTS,
                        checked: true
                    },
                    {
                        name: NewApp.HELMET_JS_MIDDLEWARE,
                        checked: true
                    }
                ]
            }
        ])
            .then((answers) => {
            answers.options.forEach((option) => {
                switch (option) {
                    case NewApp.EXAMPLE_HOME_ROUTE:
                        this.log.system('creating example home route');
                        break;
                    case NewApp.LOCAL_ENVIRONMENT_VARIABLES:
                        this.log.system('creating local environment variables');
                        break;
                    case NewApp.PACKAGE_JSON_SCRIPTS:
                        this.log.system('creating package json scripts');
                        break;
                    case NewApp.HELMET_JS_MIDDLEWARE:
                        this.log.system('creating helmet js middleware');
                        break;
                }
            });
            this.log.system('creating json config');
        });
    }
}
NewApp.EXAMPLE_HOME_ROUTE = 'Example Home Route';
NewApp.LOCAL_ENVIRONMENT_VARIABLES = 'Local Environmental Variables';
NewApp.PACKAGE_JSON_SCRIPTS = 'package.json Scripts';
NewApp.HELMET_JS_MIDDLEWARE = 'helmet.js middleware(for site security)';

const scanFolder = require('scan-folder');
class TSImportCreator {
    constructor(path$$1) {
        this.log = new Log('Seatbelt-TSImportCreator');
        this.appPath = path$$1;
    }
    _createImportsTS(files) {
        this.seatbeltPath = path.join(this.appPath, '.seatbelt');
        this.writePath = path.join(this.seatbeltPath, 'imports.ts');
        let importTemplate = '';
        let exportTemplate = '\nconst exportsObject = {};\n';
        files.forEach((file, i) => {
            file = file.slice(0, -3);
            importTemplate += `import * as Request${i} from '${file}';\n`;
            exportTemplate += `
if (Request${i} && typeof Request${i} === 'object') {
  Object.keys(Request${i}).forEach(variable => {
    if (Request${i}[variable] && Request${i}[variable].prototype) {
      exportsObject[variable + '__${i}'] = new Request${i}[variable]();
    }
  });
}
`;
        });
        let exportStatement = `
export function allImports() {
  return exportsObject;
}
`;
        if (!fs.existsSync(this.seatbeltPath)) {
            fs.mkdirSync(this.seatbeltPath);
        }
        const fullTemplate = importTemplate + exportTemplate + exportStatement;
        this.log.system('writing to path', this.writePath, '' + fullTemplate.length);
        fs.writeFileSync(this.writePath, fullTemplate);
    }
    init() {
        this.log.system('creating ts importer');
        const files = scanFolder(this.appPath, 'ts', true).filter((path$$1) => path$$1.indexOf('/.seatbelt/') === -1);
        this.log.system('files found', files);
        this._createImportsTS(files);
    }
}

const spawn = require('child_process').spawn;
class Rollup {
    constructor(path$$1) {
        this.log = new Log('Seatbelt-Rollup');
        this.appPath = path$$1;
    }
    init(cb) {
        this.seatbeltPath = path.join(this.appPath, '.seatbelt');
        this.log.system('rolling up files to path', this.seatbeltPath);
        if (!fs.existsSync(this.seatbeltPath)) {
            fs.mkdirSync(this.seatbeltPath);
        }
        const rollup = require('rollup');
        const npmSpawn = spawn(`npm`, ['bin']);
        let npmBin;
        npmSpawn.stdout.on('data', (data) => {
            npmBin = data.toString().replace(/\n/g, '');
            const rollupSpawn = spawn(`node`, [`${npmBin}/rollup`, '--config', this.seatbeltPath + '/rollupconfig.js', '--input', this.seatbeltPath + '/imports.ts', '--output', this.seatbeltPath + '/index.js']);
            rollupSpawn.stdout.on('data', (data) => {
                this.log.system(`[rollup]: ${data}`);
            });
            rollupSpawn.stderr.on('data', (data) => {
                this.log.error(`[rollup] error: ${data}`);
            });
            rollupSpawn.on('close', (code) => {
                cb();
            });
        });
    }
}

class BootApp {
    constructor(path$$1) {
        this.log = new Log('Seatbelt-Startup');
        this.appPath = path$$1;
    }
    init() {
        this.log.system('Booting App');
        this.log.debug(path.join(this.appPath, '.seatbelt'));
        const allImports = require(path.join(this.appPath, '.seatbelt')).allImports;
        const classesByType = {};
        let bootServer;
        const importedClasses = allImports();
        Object.keys(importedClasses).forEach(key => {
            if (importedClasses[key].__seatbelt__ === 'server') {
                bootServer = importedClasses[key];
            }
            else {
                if (!classesByType[importedClasses[key].__seatbelt__]) {
                    classesByType[importedClasses[key].__seatbelt__] = [];
                }
                classesByType[importedClasses[key].__seatbelt__].push(importedClasses[key]);
            }
        });
        if (bootServer) {
            this.log.info('starting server');
            this.server = bootServer.__seatbelt_strap__(classesByType);
        }
        else {
            this.log.error('CRITICAL: No Server Defined');
        }
    }
}

const CONFIG_FOLDER = '.seatbelt';
const CONFIG_JSON = 'seatbelt.json';
const callerName = () => {
    return path.dirname(module.parent.parent.filename);
};
class Seatbelt {
    constructor() {
        this.log = new Log('Seatbelt');
        this._root = '';
    }
    _setRoot(root) {
        this._root = root;
    }
    getRoot() {
        return this._root;
    }
    _initConfig(cb) {
        const configFolder = path.join(this.getRoot(), CONFIG_FOLDER);
        const configFolderExist = fs.existsSync(configFolder);
        const configJson = path.join(configFolder, CONFIG_JSON);
        const configJsonExist = fs.existsSync(path.join(this.getRoot(), CONFIG_FOLDER, CONFIG_JSON));
        if (!configFolderExist && !configJsonExist) {
            return new NewApp(path.join(this.getRoot(), CONFIG_FOLDER), CONFIG_JSON).init()
                .then(() => cb());
        }
        return cb();
    }
    _bootApp() {
        return new BootApp(this.getRoot()).init();
    }
    _createTSImporter() {
        return new TSImportCreator(this.getRoot()).init();
    }
    _rollUpFiles(cb) {
        return new Rollup(this.getRoot()).init(cb);
    }
    strap() {
        this._setRoot(callerName());
        this.log.system('▬▬▬▬(๑๑)▬▬▬▬ setbelt strapped to', this.getRoot());
        this._createTSImporter();
        this._rollUpFiles(() => {
            this._bootApp();
        });
    }
}

function DRoute(config) {
    return function (OriginalClassConstructor) {
        return function () {
            const origin = new OriginalClassConstructor();
            if (typeof config.type === 'string') {
                config.type = [config.type];
            }
            if (typeof config.path === 'string') {
                config.path = [config.path];
            }
            if (!config.policies) {
                config.policies = [];
            }
            if (typeof config.policies === 'string') {
                config.policies = [config.policies];
            }
            origin.__seatbelt_config__ = config;
            origin.__seatbelt__ = 'route';
            return origin;
        };
    };
}

function DPolicy(config) {
    return (OriginalClassConstructor) => {
        return function () {
            const origin = OriginalClassConstructor.prototype;
            if (config && config.name) {
                origin.__name__ = config.name;
            }
            else {
                origin.__name__ = OriginalClassConstructor.name;
            }
            origin.__seatbelt__ = 'policy';
            return OriginalClassConstructor.prototype;
        };
    };
}

const Joi = require('joi');
function DValidateRequest(requiredParams) {
    return function (hostClass, functionName, functionAttributes) {
        const originalMethod = functionAttributes.value;
        functionAttributes.value = (route) => {
            console.log('decorator called', requiredParams.isJoi);
            Joi.validate(route.params, requiredParams, (err) => {
                if (!err) {
                    return originalMethod(route);
                }
                else {
                    route.reply(err);
                }
            });
        };
    };
}

exports.Seatbelt = Seatbelt;
exports.DRoute = DRoute;
exports.DPolicy = DPolicy;
exports.DValidateRequest = DValidateRequest;
