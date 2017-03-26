'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');
var fs = require('fs');

var clc = require('cli-color');
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
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        params.forEach(function (param) {
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

var TSImportCreator = (function () {
    function TSImportCreator(path$$1) {
        this.log = new Log('Seatbelt-TSImportCreator');
        this.appPath = path$$1;
    }
    TSImportCreator.prototype.init = function () {
        this.log.system('creating ts importer');
    };
    return TSImportCreator;
}());

var Rollup = (function () {
    function Rollup(path$$1) {
        this.log = new Log('Seatbelt-Rollup');
        this.appPath = path$$1;
    }
    Rollup.prototype.init = function () {
        this.log.system('rolling up files');
    };
    return Rollup;
}());

var BootApp = (function () {
    function BootApp() {
        this.log = new Log('Seatbelt-Startup');
    }
    BootApp.prototype.init = function () {
        this.log.system('Booting App');
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
    Seatbelt.prototype._initConfig = function () {
        var configFolder = path.join(this.getRoot(), CONFIG_FOLDER);
        var configFolderExist = fs.existsSync(configFolder);
        var configJson = path.join(configFolder, CONFIG_JSON);
        var configJsonExist = fs.existsSync(path.join(this.getRoot(), CONFIG_FOLDER, CONFIG_JSON));
        if (!configFolderExist && !configJsonExist) {
            return new NewApp(path.join(this.getRoot(), CONFIG_FOLDER), CONFIG_JSON).init();
        }
    };
    Seatbelt.prototype._bootApp = function () {
        return new BootApp().init();
    };
    Seatbelt.prototype._createTSImporter = function () {
        return new TSImportCreator(this.getRoot()).init();
    };
    Seatbelt.prototype._rollUpFiles = function () {
        return new Rollup(this.getRoot()).init();
    };
    Seatbelt.prototype.strap = function () {
        var _this = this;
        this._setRoot(caller());
        this.log.system('▬▬▬▬(๑๑)▬▬▬▬ setbelt strapped to', this.getRoot());
        this._initConfig()
            .then(function () { return _this._createTSImporter(); })
            .then(function () { return _this._rollUpFiles(); })
            .then(function () { return _this._bootApp(); });
    };
    return Seatbelt;
}());

function Route(config) {
    return function (classToDecorate) {
    };
}

function Middleware(config) {
    return function (classToDecorate) {
    };
}

function Policy(config) {
    return function (classToDecorate) {
    };
}

function Validator(config) {
    return function (classToDecorate) {
    };
}

exports.Seatbelt = Seatbelt;
exports.Route = Route;
exports.Middleware = Middleware;
exports.Policy = Policy;
exports.Validator = Validator;
