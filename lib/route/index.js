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
            let Route = class Route extends OriginalClassConstructor {
                constructor() {
                    super();
                    this.__seatbeltConfig = config;
                    this.name = OriginalClassConstructor.name;
                    if (typeof this.__seatbeltConfig.type === 'string') {
                        this.__seatbeltConfig.type = [this.__seatbeltConfig.type];
                    }
                    if (typeof this.__seatbeltConfig.path === 'string') {
                        this.__seatbeltConfig.path = [this.__seatbeltConfig.path];
                    }
                    if (!this.__seatbeltConfig.policies) {
                        this.__seatbeltConfig.policies = [];
                    }
                    if (typeof this.__seatbeltConfig.policies === 'string') {
                        this.__seatbeltConfig.policies = [this.__seatbeltConfig.policies];
                    }
                }
            };
            Route = __decorate([
                plugins_1.Plugin.Register({
                    name: 'route'
                })
            ], Route);
            return Route;
        };
    }
    Route_1.Register = Register;
})(Route = exports.Route || (exports.Route = {}));
