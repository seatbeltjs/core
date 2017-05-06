"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../log");
const path_1 = require("path");
class BootApp {
    constructor(path) {
        this.log = new log_1.Log('Seatbelt-Startup');
        this.appPath = path;
    }
    init() {
        this.log.system('Booting App');
        this.log.debug(path_1.join(this.appPath, '.seatbelt'));
        const allImports = require(path_1.join(this.appPath, '.seatbelt')).allImports;
        const classesByType = {};
        let bootServer;
        const importedClasses = allImports();
        Object.keys(importedClasses).forEach(key => {
            if (importedClasses[key].__seatbelt__ === 'server') {
                bootServer = importedClasses[key];
            }
            else {
                if (!classesByType[importedClasses[key].__seatbelt__]) {
                    classesByType[importedClasses[key].__seatbelt__] = [];
                }
                classesByType[importedClasses[key].__seatbelt__].push(importedClasses[key]);
            }
        });
        if (bootServer) {
            this.log.info('starting server');
            this.server = bootServer.__seatbelt_strap__(classesByType);
        }
        else {
            this.log.error('CRITICAL: No Server Defined');
        }
    }
}
exports.BootApp = BootApp;
