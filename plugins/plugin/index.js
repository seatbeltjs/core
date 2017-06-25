Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("../../");
var Plugin;
(function (Plugin) {
    function Register(config) {
        return (OriginalClassConstructor) => {
            class PluginRegister extends OriginalClassConstructor {
                constructor(...params) {
                    super(...params);
                    this.__seatbeltPlugin = OriginalClassConstructor.name;
                    this.__log = new _1.Log('ServerRegister');
                    this.name = OriginalClassConstructor.name;
                    if (config && config.name) {
                        this.__seatbeltPlugin = config.name;
                    }
                    this.__log.system('registering plugin => ', this.name);
                }
            }
            return PluginRegister;
        };
    }
    Plugin.Register = Register;
})(Plugin = exports.Plugin || (exports.Plugin = {}));
