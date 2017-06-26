var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugins_1 = require("../../plugins");
const _1 = require("../../");
const policyRegister = {};
var Policy;
(function (Policy_1) {
    function Register() {
        return (OriginalClassConstructor) => {
            let Policy = class Policy extends OriginalClassConstructor {
            };
            Policy = __decorate([
                plugins_1.Plugin.Register({
                    name: 'policy'
                })
            ], Policy);
            policyRegister[OriginalClassConstructor.name.toLowerCase()] = new Policy();
            Policy.prototype = OriginalClassConstructor.prototype;
            Policy.constructor = OriginalClassConstructor.constructor;
            Object.defineProperty(Policy, 'name', {
                value: OriginalClassConstructor.name + Policy.name
            });
            return Policy;
        };
    }
    Policy_1.Register = Register;
    function Use(policyNames) {
        return (OriginalClassConstructor, wrappedName, valueObject) => {
            if (typeof policyNames === 'string') {
                policyNames = [policyNames];
            }
            if (!Array.isArray(policyNames)) {
                const log = new _1.Log('policies');
                return log.system('cannot use policies, no policies defined');
            }
            policyNames.forEach(policyName => {
                policyName = policyName.toLowerCase();
                const originalFunction = valueObject.value;
                valueObject.value = function (req, res, server) {
                    const next = () => {
                        return originalFunction.apply(this, [req, res, server]);
                    };
                    const policyRes = Object.assign({}, res, { next });
                    return policyRegister[policyName].controller(req, policyRes, server);
                };
            });
        };
    }
    Policy_1.Use = Use;
})(Policy = exports.Policy || (exports.Policy = {}));
