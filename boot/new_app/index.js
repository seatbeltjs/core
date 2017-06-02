Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("../../");
class NewApp {
    constructor(configFolder, configJson) {
        this.log = new _1.Log('Seatbelt-NewApp');
        this.seatbeltJSON = {};
        this.configFolder = configFolder;
        this.configJson = configJson;
    }
    init() {
        this.log.system('looks like this is your first time strapping your seatbelt, lets set up the framework');
    }
}
NewApp.EXAMPLE_HOME_ROUTE = 'Example Home Route';
NewApp.LOCAL_ENVIRONMENT_VARIABLES = 'Local Environmental Variables';
NewApp.PACKAGE_JSON_SCRIPTS = 'package.json Scripts';
NewApp.HELMET_JS_MIDDLEWARE = 'helmet.js middleware(for site security)';
exports.NewApp = NewApp;
