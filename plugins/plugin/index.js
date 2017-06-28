Object.defineProperty(exports, "__esModule", { value: true });
var Plugin;
(function (Plugin) {
    function Register(config) {
        return function (OriginalClassConstructor) {
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
                value: OriginalClassConstructor.name
            });
            return PluginRegister;
        };
    }
    Plugin.Register = Register;
})(Plugin = exports.Plugin || (exports.Plugin = {}));
