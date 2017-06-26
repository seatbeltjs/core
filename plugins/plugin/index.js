Object.defineProperty(exports, "__esModule", { value: true });
let i = 0;
var Plugin;
(function (Plugin) {
    function Register(config) {
        return function (OriginalClassConstructor) {
            const createNameExtension = () => {
                i = i + 1;
                return '_Plugin_' + OriginalClassConstructor.name + i;
            };
            class PluginRegister extends OriginalClassConstructor {
                constructor() {
                    super(...arguments);
                    this.__seatbeltPluginName = config.name;
                    this.__seatbeltPluginType = 'plugin';
                }
            }
            PluginRegister.prototype = OriginalClassConstructor.prototype;
            PluginRegister.constructor = OriginalClassConstructor.constructor;
            Object.defineProperty(PluginRegister, 'name', {
                value: createNameExtension()
            });
            return PluginRegister;
        };
    }
    Plugin.Register = Register;
})(Plugin = exports.Plugin || (exports.Plugin = {}));
