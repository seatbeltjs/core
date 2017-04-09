'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('path');
require('fs');

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

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

var express = require('express');

function Route(config) {
    return function (originalClassConstructor) {
        var RouteConstructor = function () {
            originalClassConstructor.prototype.__seatbelt__ = 'route';
            originalClassConstructor.prototype.__seatbelt_config__ = config;
            return originalClassConstructor.prototype;
        };
        return RouteConstructor;
    };
}

function Middleware(config) {
    return function (originalClassConstructor) {
        return function () {
            var origin = new originalClassConstructor();
            origin.prototype = originalClassConstructor.prototype;
            origin.__seatbelt__ = 'middleware';
            origin.__seatbelt_config__ = config;
            return origin;
        };
    };
}

var HelmetJSMiddleware = (function () {
    function HelmetJSMiddleware() {
        this.middleware = require('helmet')();
    }
    return HelmetJSMiddleware;
}());
HelmetJSMiddleware = __decorate([
    Middleware({
        weight: 1
    })
], HelmetJSMiddleware);


var Request0 = Object.freeze({
	get HelmetJSMiddleware () { return HelmetJSMiddleware; }
});

var HomeRoute = (function () {
    function HomeRoute() {
        this.hello = 'hi';
    }
    HomeRoute.prototype.controller = function (req, res) {
        return res.send('worked');
    };
    return HomeRoute;
}());
HomeRoute = __decorate([
    Route({
        path: '/',
        type: 'GET'
    })
], HomeRoute);


var Request1 = Object.freeze({
	get HomeRoute () { return HomeRoute; }
});

const exportsObject = {};
for (let variable in Request0) {
    if (Request0 && Request0[variable] && Request0[variable].prototype) {
        exportsObject[variable + '__0'] = new Request0[variable]();
    }
}

for (let variable in Request1) {
    if (Request1 && Request1[variable] && Request1[variable].prototype) {
        exportsObject[variable + '__1'] = new Request1[variable]();
    }
}

function allImports() {
  return exportsObject;
}

exports.allImports = allImports;
