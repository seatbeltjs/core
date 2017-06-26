var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugins_1 = require("../../plugins");
const _1 = require("../../");
const __allServices = {};
class ServiceConfig {
    constructor() {
        this.__seatbeltPluginName = 'ServiceConfig';
        this.__seatbeltPluginType = 'config';
        this.log = new _1.Log('ServiceConfig');
        this.config = function (seatbelt) {
            Object.getOwnPropertyNames(seatbelt.plugins).forEach((key) => {
                this.log.debug('==> key', key);
                seatbelt.plugins[key].forEach((plugin) => {
                    if (typeof plugin === 'object') {
                        Object.getOwnPropertyNames(plugin).forEach((pluginKey) => {
                            console.log(pluginKey);
                            if (typeof plugin[pluginKey] === 'object' && plugin[pluginKey].__serviceName) {
                            }
                        });
                    }
                });
            });
        };
    }
}
exports.ServiceConfig = ServiceConfig;
var Service;
(function (Service_1) {
    function Use(name) {
        return function (target, key) {
            delete target[key];
            Object.defineProperty(target, key, {
                get: function () { return (() => __allServices[key]); },
                enumerable: true,
                configurable: false
            });
        };
    }
    Service_1.Use = Use;
    function AllServices() {
        return (target, propertyKey) => {
            target[propertyKey] = __allServices;
        };
    }
    Service_1.AllServices = AllServices;
    function Register(serviceName) {
        return (OriginalClassConstructor) => {
            let Service = class Service extends OriginalClassConstructor {
                constructor() {
                    super();
                    this.name = OriginalClassConstructor.name;
                }
            };
            Service = __decorate([
                plugins_1.Plugin.Register({
                    name: 'service'
                })
            ], Service);
            __allServices[OriginalClassConstructor.name] = new Service();
            return Service;
        };
    }
    Service_1.Register = Register;
})(Service = exports.Service || (exports.Service = {}));
