'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');
var fs = require('fs');

const clc = require('cli-color');
const json = require('json-beautify');
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
class Log {
    constructor(type) {
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
        return clc.cyan('{' + this._type + '}');
    }
    getZone() {
        if (this._zone) {
            return clc.yellow('(' + this._zone + ')');
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
        let exportTemplate = 'const exportsObject = {};';
        files.forEach((file, i) => {
            file = file.slice(0, -3);
            importTemplate += `import * as Request${i} from '${file}';\n`;
            exportTemplate += `
for (let variable in Request${i}) {
    if (Request${i} && Request${i}[variable] && Request${i}[variable].prototype) {
        exportsObject[variable + '__${i}'] = new Request${i}[variable]();
    }
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

class Rollup {
    constructor(path$$1) {
        this.log = new Log('Seatbelt-Rollup');
        this.appPath = path$$1;
    }
    init(cb) {
        this.log.system('rolling up files');
        this.seatbeltPath = path.join(this.appPath, '.seatbelt');
        if (!fs.existsSync(this.seatbeltPath)) {
            fs.mkdirSync(this.seatbeltPath);
        }
        
        const rollup = require('rollup');
        return rollup.rollup({
            entry: this.seatbeltPath + '/imports.ts',
            format: 'cjs',
            plugins: [
                require('rollup-plugin-node-resolve')({
                    extensions: ['.ts', '.js', '.json']
                }),
                require('rollup-plugin-typescript')({
                    typescript: require('typescript')
                })
            ],
            dest: this.seatbeltPath + '/index.js'
        })
            .then((bundle) => {
            const result = bundle.generate({
                format: 'cjs'
            });
            fs.writeFileSync(path.join(this.seatbeltPath, 'index.js'), result.code);
            return cb();
        });
    }
}

const express = require('express');
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
const caller = () => {
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
        this._setRoot(caller());
        this.log.system('▬▬▬▬(๑๑)▬▬▬▬ setbelt strapped to', this.getRoot());
        this._createTSImporter();
        this._rollUpFiles(() => {
            this._bootApp();
        })
            .catch((err) => this.log.error(err));
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

const bodyParser = require('body-parser');
function DExpress() {
    return function (OriginalClassConstructor) {
        return function () {
            const origin = new OriginalClassConstructor();
            origin.__seatbelt__ = 'server';
            origin.__seatbelt_strap__ = function (classesByType) {
                origin.express = require('express');
                origin.app = origin.express();
                origin.port = process.env.port || 3000;
                origin.log = new Log('Express');
                origin.app.use(bodyParser.json());
                origin.__controller_wrapper__ = function (controllerFunction, req, res, next) {
                    controllerFunction({
                        req,
                        res,
                        next,
                        reply: (...params) => res.send(...params),
                        params: Object.assign({}, typeof req.params === 'object' ? req.params : {}, typeof req.body === 'object' ? req.body : {}, typeof req.query === 'object' ? req.query : {})
                    });
                };
                if (classesByType['route']) {
                    classesByType['route'].forEach((route) => {
                        const policies = [];
                        route.__seatbelt_config__.policies.forEach((routePolicyName) => {
                            classesByType['policy'].forEach((policy) => {
                                if (routePolicyName === policy.__name__) {
                                    policies.push((req, res, next) => origin.__controller_wrapper__(policy.controller, req, res, next));
                                }
                            });
                        });
                        const policiesPlusController = [
                            ...policies,
                            (req, res, next) => origin.__controller_wrapper__(route.controller, req, res, next)
                        ];
                        route['__seatbelt_config__'].type.forEach((eachType) => {
                            route['__seatbelt_config__'].path.forEach((eachPath) => {
                                origin.app[eachType.toLowerCase()](eachPath, ...policiesPlusController);
                            });
                        });
                    });
                }
                origin.app.listen(origin.port, () => {
                    origin.log.system(`Example app listening on port ${origin.port}!`);
                });
            };
            return origin;
        };
    };
}

function DRestify() {
    return function (OriginalClassConstructor) {
        return function () {
            const origin = new OriginalClassConstructor();
            origin.__seatbelt__ = 'server';
            origin.__seatbelt_strap__ = function (classesByType) {
                origin.restify = require('restify');
                origin.app = origin.restify.createServer();
                origin.port = process.env.port || 3000;
                origin.log = new Log('Express');
                origin.app.use(origin.restify.bodyParser());
                origin.app.use(origin.restify.queryParser());
                origin.__controller_wrapper__ = function (controllerFunction, req, res, next) {
                    controllerFunction({
                        req,
                        res,
                        next,
                        reply: (...params) => res.send(...params),
                        params: Object.assign({}, typeof req.query === 'object' ? req.query : {}, typeof req.params === 'object' ? req.params : {}, typeof req.body === 'object' ? req.body : {})
                    });
                };
                if (classesByType['route']) {
                    classesByType['route'].forEach((route) => {
                        const policies = [];
                        route.__seatbelt_config__.policies.forEach((routePolicyName) => {
                            classesByType['policy'].forEach((policy) => {
                                if (routePolicyName === policy.__name__) {
                                    policies.push((req, res, next) => origin.__controller_wrapper__(policy.controller, req, res, next));
                                }
                            });
                        });
                        const policiesPlusController = [
                            ...policies,
                            (req, res, next) => origin.__controller_wrapper__(route.controller, req, res, next)
                        ];
                        route['__seatbelt_config__'].type.forEach((eachType) => {
                            route['__seatbelt_config__'].path.forEach((eachPath) => {
                                origin.app[eachType.toLowerCase()](eachPath, ...policiesPlusController);
                            });
                        });
                    });
                }
                origin.app.listen(origin.port);
            };
            return origin;
        };
    };
}

function DHapi() {
    return function (OriginalClassConstructor) {
        return function () {
            const origin = new OriginalClassConstructor();
            origin.__seatbelt__ = 'server';
            origin.__seatbelt_strap__ = function (classesByType) {
                this.log = new Log('Hapi');
                this.hapi = require('hapi');
                this.app = new this.hapi.Server();
                this.port = process.env.port || 3000;
                this.log = new Log('Express');
                this.__controller_wrapper__ = function (controllerFunctions, req, reply) {
                    const nextWrapper = (i) => {
                        if (!controllerFunctions[i]) {
                            return reply({ status: 'request failed' }).code(500);
                        }
                        return controllerFunctions[i]({
                            req,
                            reply,
                            next: () => nextWrapper(++i),
                            params: Object.assign({}, typeof req.params === 'object' ? req.params : {}, typeof req.body === 'object' ? req.body : {}, typeof req.payload === 'object' ? req.payload : {}, typeof req.query === 'object' ? req.query : {})
                        });
                    };
                    nextWrapper(0);
                };
                this.app.connection({ port: this.port });
                if (classesByType['route']) {
                    classesByType['route'].forEach((route) => {
                        const policies = [];
                        route.__seatbelt_config__.policies.forEach((routePolicyName) => {
                            classesByType['policy'].forEach((policy) => {
                                if (routePolicyName === policy.__name__) {
                                    policies.push(policy.controller);
                                }
                            });
                        });
                        const policiesPlusController = [
                            ...policies,
                            route.controller
                        ];
                        route['__seatbelt_config__'].type.forEach((eachType) => {
                            route['__seatbelt_config__'].path.forEach((eachPath) => {
                                this.app.route({
                                    method: eachType.toLowerCase(),
                                    path: eachPath,
                                    handler: (request, reply) => origin.__controller_wrapper__(policiesPlusController, request, reply)
                                });
                            });
                        });
                    });
                }
                this.app.start((err) => {
                    if (err) {
                        throw err;
                    }
                    this.log.system(`Server running at: ${this.app.info.uri}`);
                });
            };
            return origin;
        };
    };
}

const body = require('koa-json-body');
function DKoa() {
    return function (OriginalClassConstructor) {
        return function () {
            const origin = new OriginalClassConstructor();
            origin.__seatbelt__ = 'server';
            origin.__seatbelt_strap__ = function (classesByType) {
                this.log = new Log('Koa');
                this.Koa = require('koa');
                this.app = new this.Koa();
                this.port = process.env.port || 3000;
                this.log = new Log('Express');
                this.router = require('koa-router')();
                this.app.use(body({ limit: '10kb', fallback: true }));
                origin.__controller_wrapper__ = function (controllerFunction, ctx, next) {
                    console.log(JSON.stringify(ctx.request));
                    controllerFunction(Object.assign(ctx, {
                        next,
                        reply: (response) => {
                            ctx.body = response;
                        },
                        params: Object.assign({}, typeof ctx.req.params === 'object' ? ctx.req.params : {}, typeof ctx.request.body === 'object' ? ctx.request.body : {}, typeof ctx.request.query === 'object' ? ctx.request.query : {})
                    }));
                };
                if (classesByType['route']) {
                    classesByType['route'].forEach((route) => {
                        const policies = [];
                        route.__seatbelt_config__.policies.forEach((routePolicyName) => {
                            classesByType['policy'].forEach((policy) => {
                                if (routePolicyName === policy.__name__) {
                                    policies.push(policy);
                                }
                            });
                        });
                        route['__seatbelt_config__'].type.forEach((eachType) => {
                            route['__seatbelt_config__'].path.forEach((eachPath) => {
                                policies.forEach(policy => {
                                    this.router[eachType.toLowerCase()](eachPath, (ctx, next) => origin.__controller_wrapper__(policy.controller, ctx, next));
                                });
                                this.router[eachType.toLowerCase()](eachPath, (ctx, next) => origin.__controller_wrapper__(route.controller, ctx, next));
                            });
                        });
                    });
                }
                this.app.use(this.router.routes());
                this.app.listen(this.port);
            };
            return origin;
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
exports.DExpress = DExpress;
exports.DRestify = DRestify;
exports.DKoa = DKoa;
exports.DHapi = DHapi;
exports.DValidateRequest = DValidateRequest;
