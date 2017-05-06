"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../log");
const inquirer = require('inquirer');
class NewApp {
    constructor(configFolder, configJson) {
        this.log = new log_1.Log('Seatbelt-NewApp');
        this.seatbeltJSON = {};
        this.configFolder = configFolder;
        this.configJson = configJson;
    }
    init() {
        this.log.system('looks like this is your first time strapping your seatbelt, lets set up the framework');
        return inquirer.prompt([
            {
                type: 'checkbox',
                message: 'Deselect any set up options that you do not want to keep, then press [enter] to continue',
                name: 'options',
                choices: [
                    {
                        name: NewApp.EXAMPLE_HOME_ROUTE,
                        checked: true
                    },
                    {
                        name: NewApp.LOCAL_ENVIRONMENT_VARIABLES,
                        checked: true
                    },
                    {
                        name: NewApp.PACKAGE_JSON_SCRIPTS,
                        checked: true
                    },
                    {
                        name: NewApp.HELMET_JS_MIDDLEWARE,
                        checked: true
                    }
                ]
            }
        ])
            .then((answers) => {
            answers.options.forEach((option) => {
                switch (option) {
                    case NewApp.EXAMPLE_HOME_ROUTE:
                        this.log.system('creating example home route');
                        break;
                    case NewApp.LOCAL_ENVIRONMENT_VARIABLES:
                        this.log.system('creating local environment variables');
                        break;
                    case NewApp.PACKAGE_JSON_SCRIPTS:
                        this.log.system('creating package json scripts');
                        break;
                    case NewApp.HELMET_JS_MIDDLEWARE:
                        this.log.system('creating helmet js middleware');
                        break;
                }
            });
            this.log.system('creating json config');
        });
    }
}
NewApp.EXAMPLE_HOME_ROUTE = 'Example Home Route';
NewApp.LOCAL_ENVIRONMENT_VARIABLES = 'Local Environmental Variables';
NewApp.PACKAGE_JSON_SCRIPTS = 'package.json Scripts';
NewApp.HELMET_JS_MIDDLEWARE = 'helmet.js middleware(for site security)';
exports.NewApp = NewApp;
