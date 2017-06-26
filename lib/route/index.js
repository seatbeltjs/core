var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugins_1 = require("../../plugins");
var Route;
(function (Route_1) {
    function Register(config) {
        return function (OriginalClassConstructor) {
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
            let Route = class Route extends OriginalClassConstructor {
                constructor() {
                    super(...arguments);
                    this.__routeConfig = config;
                    this.name = OriginalClassConstructor.name;
                }
            };
            Route = __decorate([
                plugins_1.Plugin.Register({
                    name: 'route'
                })
            ], Route);
            Route.prototype = OriginalClassConstructor.prototype;
            Route.constructor = OriginalClassConstructor.constructor;
            return Route;
        };
    }
    Route_1.Register = Register;
})(Route = exports.Route || (exports.Route = {}));
