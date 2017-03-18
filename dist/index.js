'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');

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
    Seatbelt.prototype.strap = function () {
        this._setRoot(caller());
        this.log.system('▬▬▬▬(๑๑)▬▬▬▬ setbelt strapped to', this.getRoot());
    };
    return Seatbelt;
}());

var Get = (function () {
    function Get() {
    }
    Get.prototype.get = function () {
        console.log('get strapped');
    };
    return Get;
}());

var Post = (function () {
    function Post() {
    }
    Post.prototype.post = function () {
        console.log('post strapped');
    };
    return Post;
}());

var Put = (function () {
    function Put() {
    }
    Put.prototype.put = function () {
        console.log('put strapped');
    };
    return Put;
}());

var Delete = (function () {
    function Delete() {
    }
    Delete.prototype.strap = function () {
        console.log('delete strapped');
    };
    return Delete;
}());

var Middleware = (function () {
    function Middleware() {
    }
    Middleware.prototype.middleware = function () {
        console.log('middleware strapped');
    };
    return Middleware;
}());

var Policy = (function () {
    function Policy() {
    }
    Policy.prototype.policy = function () {
        console.log('policy strapped');
    };
    return Policy;
}());

var Validator = (function () {
    function Validator() {
    }
    Validator.prototype.validator = function () {
        console.log('validator strapped');
    };
    return Validator;
}());

exports.Seatbelt = Seatbelt;
exports.Get = Get;
exports.Post = Post;
exports.Put = Put;
exports.Delete = Delete;
exports.Middleware = Middleware;
exports.Policy = Policy;
exports.Validator = Validator;
