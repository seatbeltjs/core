Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("../../");
const path_1 = require("path");
class BootApp {
    constructor(path) {
        this.log = new _1.Log('Seatbelt-Startup');
        this.appPath = path;
    }
    init() {
        this.log.system('Booting App');
        require('nodemon')({
            script: path_1.join(this.appPath, '.seatbelt', 'server.js'),
            verbose: true
        });
    }
}
exports.BootApp = BootApp;
