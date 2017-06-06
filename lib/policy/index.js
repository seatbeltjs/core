var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("../");
const policyRegister = {};
function DPolicy(policyNames) {
    return (OriginalClassConstructor, wrappedName, valueObject) => {
        if (typeof OriginalClassConstructor === 'function') {
            let Policy = class Policy extends OriginalClassConstructor {
                constructor() {
                    super();
                    this.name = OriginalClassConstructor.name;
                    policyRegister[OriginalClassConstructor.name.toLowerCase()] = this.controller;
                }
                ;
            };
            Policy = __decorate([
                _1.DRegisterPlugin({
                    pluginName: 'policy'
                })
            ], Policy);
            return Policy;
        }
        else if (valueObject && typeof valueObject.value === 'function') {
            if (typeof policyNames === 'string') {
                policyNames = [policyNames];
            }
            if (Array.isArray(policyNames)) {
                policyNames.forEach(policyName => {
                    policyName = policyName.toLowerCase();
                    const originalFunction = valueObject.value;
                    valueObject.value = function (controls, ...params) {
                        const next = () => {
                            return originalFunction.apply(this, [controls, ...params]);
                        };
                        const policyControls = Object.assign({}, controls, { next });
                        return policyRegister[policyName](policyControls, ...params);
                    };
                });
            }
        }
    };
}
exports.DPolicy = DPolicy;
