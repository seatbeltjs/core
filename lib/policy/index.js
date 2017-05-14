Object.defineProperty(exports, "__esModule", { value: true });
const policyRegister = {};
function DPolicy(policyNames) {
    return (OriginalClassConstructor, wrappedName, valueObject) => {
        if (typeof OriginalClassConstructor === 'function') {
            return class extends OriginalClassConstructor {
                constructor() {
                    super();
                    this.__name__ = OriginalClassConstructor.name;
                    this.__seatbelt__ = 'policy';
                    policyRegister[OriginalClassConstructor.name.toLowerCase()] = this.controller;
                }
                ;
            };
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
                            return originalFunction(controls, ...params);
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
