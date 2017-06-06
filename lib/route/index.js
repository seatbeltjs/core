var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("../");
function DRoute(config) {
    return function (OriginalClassConstructor) {
        let Route = class Route extends OriginalClassConstructor {
            constructor() {
                super();
                this.__seatbelt_config__ = config;
                this.name = OriginalClassConstructor.name;
                if (typeof this.__seatbelt_config__.type === 'string') {
                    this.__seatbelt_config__.type = [this.__seatbelt_config__.type];
                }
                if (typeof this.__seatbelt_config__.path === 'string') {
                    this.__seatbelt_config__.path = [this.__seatbelt_config__.path];
                }
                if (!this.__seatbelt_config__.policies) {
                    this.__seatbelt_config__.policies = [];
                }
                if (typeof this.__seatbelt_config__.policies === 'string') {
                    this.__seatbelt_config__.policies = [this.__seatbelt_config__.policies];
                }
            }
        };
        Route = __decorate([
            _1.DRegisterPlugin({
                pluginName: 'route'
            })
        ], Route);
        return Route;
    };
}
exports.DRoute = DRoute;
