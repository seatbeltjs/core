var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugins_1 = require("../../plugins");
const __allServices = {};
var Service;
(function (Service_1) {
    function Register(serviceName) {
        return (OriginalClassConstructor) => {
            let Service = class Service extends OriginalClassConstructor {
            };
            Service = __decorate([
                plugins_1.Plugin.Register({
                    name: 'service'
                })
            ], Service);
            Service.prototype = OriginalClassConstructor.prototype;
            Service.constructor = OriginalClassConstructor.constructor;
            Object.defineProperty(Service, 'name', {
                value: OriginalClassConstructor.name + Service.name
            });
            __allServices[OriginalClassConstructor.name.toLowerCase()] = new Service();
        };
    }
    Service_1.Register = Register;
    function Use(name) {
        return function (target, key) {
            delete target[key];
            Object.defineProperty(target, key, {
                get: function () { return __allServices[name.toLowerCase()]; },
                enumerable: true,
                configurable: true
            });
        };
    }
    Service_1.Use = Use;
    function UseAll() {
        return (target, key) => {
            delete target[key];
            Object.defineProperty(target, key, {
                get: function () { return __allServices; },
                enumerable: true,
                configurable: true
            });
        };
    }
    Service_1.UseAll = UseAll;
})(Service = exports.Service || (exports.Service = {}));
