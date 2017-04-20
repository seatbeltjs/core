'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');
var fs = require('fs');

var clc = require('cli-color');
var json = require('json-beautify');
var error = clc.red.bold;
var warn = clc.yellow.bold;
var debug = clc.blue;
var verbose = clc.cyan;
var info = clc.cyan;
var system = clc.yellow;
var silly = function () {
    return '[' +
        clc.yellow('S') +
        clc.red('I') +
        clc.green('L') +
        clc.blue('L') +
        clc.yellow('Y') +
        ']';
};
var Log = (function () {
    function Log(type) {
        if (type) {
            this.setType(type);
        }
    }
    Log.prototype._json = function (jsonObject) {
        return json(jsonObject);
    };
    Log.prototype.setType = function (type) {
        this._type = type;
    };
    Log.prototype.setZone = function (zone) {
        this._zone = zone;
    };
    Log.prototype.getType = function () {
        return clc.cyan('{' + this._type + '}');
    };
    Log.prototype.getZone = function () {
        if (this._zone) {
            return clc.yellow('(' + this._zone + ')');
        }
        else {
            return '';
        }
    };
    Log.prototype._log = function () {
        var _this = this;
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        params.forEach(function (param) {
            if (typeof param === 'object') {
                param = _this._json(param);
            }
            process.stdout.write(param);
            process.stdout.write(' ');
        });
        process.stdout.write('\n');
    };
    Log.prototype.error = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this._log.apply(this, [error('[ERROR]'), this.getType(), this.getZone()].concat(params));
    };
    Log.prototype.err = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.error.apply(this, params);
    };
    Log.prototype.warn = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this._log.apply(this, [warn('[WARNING]'), this.getType(), this.getZone()].concat(params));
    };
    Log.prototype.warning = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.warn.apply(this, params);
    };
    Log.prototype.debug = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this._log.apply(this, [debug('[DEBUG]'), this.getType(), this.getZone()].concat(params));
    };
    Log.prototype.verbose = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this._log.apply(this, [verbose('[VERBOSE]'), this.getType(), this.getZone()].concat(params));
    };
    Log.prototype.info = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this._log.apply(this, [info('[INFO]'), this.getType(), this.getZone()].concat(params));
    };
    Log.prototype.system = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this._log.apply(this, [system('[SYSTEM]'), this.getType(), this.getZone()].concat(params));
    };
    Log.prototype.sys = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.system.apply(this, params);
    };
    Log.prototype.silly = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this._log.apply(this, [silly(), this.getType(), this.getZone()].concat(params));
    };
    return Log;
}());

var inquirer = require('inquirer');
var NewApp = (function () {
    function NewApp(configFolder, configJson) {
        this.log = new Log('Seatbelt-NewApp');
        this.seatbeltJSON = {};
        this.configFolder = configFolder;
        this.configJson = configJson;
    }
    NewApp.prototype.init = function () {
        var _this = this;
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
            .then(function (answers) {
            answers.options.forEach(function (option) {
                switch (option) {
                    case NewApp.EXAMPLE_HOME_ROUTE:
                        _this.log.system('creating example home route');
                        break;
                    case NewApp.LOCAL_ENVIRONMENT_VARIABLES:
                        _this.log.system('creating local environment variables');
                        break;
                    case NewApp.PACKAGE_JSON_SCRIPTS:
                        _this.log.system('creating package json scripts');
                        break;
                    case NewApp.HELMET_JS_MIDDLEWARE:
                        _this.log.system('creating helmet js middleware');
                        break;
                }
            });
            _this.log.system('creating json config');
        });
    };
    return NewApp;
}());
NewApp.EXAMPLE_HOME_ROUTE = 'Example Home Route';
NewApp.LOCAL_ENVIRONMENT_VARIABLES = 'Local Environmental Variables';
NewApp.PACKAGE_JSON_SCRIPTS = 'package.json Scripts';
NewApp.HELMET_JS_MIDDLEWARE = 'helmet.js middleware(for site security)';

var scanFolder = require('scan-folder');
var TSImportCreator = (function () {
    function TSImportCreator(path$$1) {
        this.log = new Log('Seatbelt-TSImportCreator');
        this.appPath = path$$1;
    }
    TSImportCreator.prototype._createImportsTS = function (files) {
        var importTemplate = '';
        var exportTemplate = 'const exportsObject = {};';
        files.forEach(function (file, i) {
            file = file.slice(0, -3);
            importTemplate += "import * as Request" + i + " from '" + file + "';\n";
            exportTemplate += "\nfor (let variable in Request" + i + ") {\n    if (Request" + i + " && Request" + i + "[variable] && Request" + i + "[variable].prototype) {\n        exportsObject[variable + '__" + i + "'] = new Request" + i + "[variable]();\n    }\n}\n";
        });
        var exportStatement = "\nexport function allImports() {\n  return exportsObject;\n}\n    ";
        this.log.system();
        this.seatbeltPath = path.join(this.appPath, '.seatbelt');
        if (!fs.existsSync(this.seatbeltPath)) {
            fs.mkdirSync(this.seatbeltPath);
        }
        
        fs.writeFileSync(path.join(this.seatbeltPath, 'imports.ts'), importTemplate + exportTemplate + exportStatement);
    };
    TSImportCreator.prototype.init = function () {
        this.log.system('creating ts importer');
        var files = scanFolder(this.appPath, 'ts', true).filter(function (path$$1) { return path$$1.indexOf('/.seatbelt/') === -1; });
        this.log.system('files found', files);
        this._createImportsTS(files);
    };
    return TSImportCreator;
}());

var Rollup = (function () {
    function Rollup(path$$1) {
        this.log = new Log('Seatbelt-Rollup');
        this.appPath = path$$1;
    }
    Rollup.prototype.init = function (cb) {
        var _this = this;
        this.log.system('rolling up files');
        this.seatbeltPath = path.join(this.appPath, '.seatbelt');
        if (!fs.existsSync(this.seatbeltPath)) {
            fs.mkdirSync(this.seatbeltPath);
        }
        
        var rollup = require('rollup');
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
            .then(function (bundle) {
            var result = bundle.generate({
                format: 'cjs'
            });
            fs.writeFileSync(path.join(_this.seatbeltPath, 'index.js'), result.code);
            return cb();
        });
    };
    return Rollup;
}());

var express = require('express');
var BootApp = (function () {
    function BootApp(path$$1) {
        this.log = new Log('Seatbelt-Startup');
        this.port = process.env.port || 3000;
        this.appPath = path$$1;
    }
    BootApp.prototype.init = function () {
        var _this = this;
        this.log.system('Booting App');
        var allImports = require(path.join(this.appPath, '.seatbelt')).allImports;
        var classesByType = {};
        var importedClasses = allImports();
        Object.keys(importedClasses).forEach(function (key) {
            if (!classesByType[importedClasses[key].__seatbelt__]) {
                classesByType[importedClasses[key].__seatbelt__] = [];
            }
            classesByType[importedClasses[key].__seatbelt__].push(importedClasses[key]);
        });
        this.app = express();
        if (classesByType['middleware']) {
            classesByType['middleware'].sort(function (a, b) { return (a.__seatbelt_config__.weight - b.__seatbelt_config__.weight); });
            classesByType['middleware'].forEach(function (middleware) {
                if (middleware.middleware && Array.isArray(middleware.middleware)) {
                    middleware.middleware.forEach(function (middleware) {
                        if (typeof middleware === 'function') {
                            _this.app.use(middleware);
                        }
                    });
                }
                else if (middleware.middleware && typeof middleware.middleware === 'function') {
                    _this.app.use(middleware.middleware);
                }
            });
        }
        if (classesByType['route']) {
            classesByType['route'].forEach(function (route) {
                var policies = [];
                if (Array.isArray(route.policies) && classesByType['policy']) {
                    route.policies.forEach(function (routePolicyName) {
                        classesByType['policy'].forEach(function (policy) {
                            if (routePolicyName === policy.__name__) {
                                policies.push(policy.policy);
                            }
                        });
                    });
                }
                var policiesPlusController = policies.concat([
                    route.controller
                ]);
                (_a = _this.app)[route['__seatbelt_config__'].type.toLowerCase()].apply(_a, [route['__seatbelt_config__'].path].concat(policiesPlusController));
                var _a;
            });
        }
        this.app.listen(this.port, function () {
            _this.log.system("Example app listening on port " + _this.port + "!");
        });
    };
    return BootApp;
}());

var CONFIG_FOLDER = '.seatbelt';
var CONFIG_JSON = 'seatbelt.json';
var caller = function () {
    return path.dirname(module.parent.parent.filename);
};
var Seatbelt = (function () {
    function Seatbelt() {
        this.log = new Log('Seatbelt');
        this._root = '';
    }
    Seatbelt.prototype._setRoot = function (root) {
        this._root = root;
    };
    Seatbelt.prototype.getRoot = function () {
        return this._root;
    };
    Seatbelt.prototype._initConfig = function (cb) {
        var configFolder = path.join(this.getRoot(), CONFIG_FOLDER);
        var configFolderExist = fs.existsSync(configFolder);
        var configJson = path.join(configFolder, CONFIG_JSON);
        var configJsonExist = fs.existsSync(path.join(this.getRoot(), CONFIG_FOLDER, CONFIG_JSON));
        if (!configFolderExist && !configJsonExist) {
            return new NewApp(path.join(this.getRoot(), CONFIG_FOLDER), CONFIG_JSON).init()
                .then(function () { return cb(); });
        }
        return cb();
    };
    Seatbelt.prototype._bootApp = function () {
        return new BootApp(this.getRoot()).init();
    };
    Seatbelt.prototype._createTSImporter = function () {
        return new TSImportCreator(this.getRoot()).init();
    };
    Seatbelt.prototype._rollUpFiles = function (cb) {
        return new Rollup(this.getRoot()).init(cb);
    };
    Seatbelt.prototype.strap = function () {
        var _this = this;
        this._setRoot(caller());
        this.log.system('▬▬▬▬(๑๑)▬▬▬▬ setbelt strapped to', this.getRoot());
        this._createTSImporter();
        this._rollUpFiles(function () {
            _this._bootApp();
        });
    };
    return Seatbelt;
}());

function Route(config) {
    return function (OriginalClassConstructor) {
        return function () {
            var origin = new OriginalClassConstructor();
            origin.__seatbelt_config__ = config;
            origin.__seatbelt__ = 'route';
            return origin;
        };
    };
}

function Middleware(config) {
    return function (OriginalClassConstructor) {
        return function () {
            var origin = new OriginalClassConstructor();
            origin.__seatbelt__ = 'middleware';
            origin.__seatbelt_config__ = config;
            return origin;
        };
    };
}

function Policy(config) {
    return function (OriginalClassConstructor) {
        return function () {
            var origin = OriginalClassConstructor.prototype;
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

exports.Seatbelt = Seatbelt;
exports.Route = Route;
exports.Middleware = Middleware;
exports.Policy = Policy;
