Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../log");
function DRegisterPlugin(pluginConfig) {
    return (OriginalClassConstructor) => {
        if (typeof OriginalClassConstructor === 'function') {
            class ServerRegister extends OriginalClassConstructor {
                constructor() {
                    super();
                    this.log = new log_1.Log('ServerRegister');
                    this.name = OriginalClassConstructor.name;
                    this.__seatbelt_plugin_name__ = pluginConfig.pluginName;
                    if (pluginConfig.hook) {
                        this.__seatbelt_hook__ = pluginConfig.hook;
                    }
                    this.log.system('registering server');
                }
            }
            return ServerRegister;
        }
        else {
            const log = new log_1.Log('ServerRegister');
            log.system('server wrapper cannot be used as a property wrapper');
        }
    };
}
exports.DRegisterPlugin = DRegisterPlugin;
