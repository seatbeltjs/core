var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("../");
const serviceRegister = {};
function DService(serviceName) {
    return (OriginalClassConstructor, wrappedName, valueObject) => {
        if (typeof OriginalClassConstructor === 'function') {
            let Service = class Service extends OriginalClassConstructor {
                constructor() {
                    super();
                    this.name = OriginalClassConstructor.name;
                }
            };
            Service = __decorate([
                _1.DRegisterPlugin({
                    pluginName: 'service',
                    hook: function (seatbelt) {
                        Object.keys(seatbelt).forEach((key) => {
                            if (Array.isArray(seatbelt[key])) {
                                seatbelt[key].forEach((plugin) => {
                                    if (typeof plugin === 'object') {
                                        console.log('>>>', plugin.name);
                                        Object.keys(plugin).forEach((pluginKey) => {
                                            console.log(pluginKey);
                                        });
                                    }
                                });
                            }
                        });
                    }
                })
            ], Service);
            return Service;
        }
    };
}
exports.DService = DService;
