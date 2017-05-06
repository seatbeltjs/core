import { Log } from '../../log';
const inquirer = require('inquirer');

export class NewApp {
  private static EXAMPLE_HOME_ROUTE: string = 'Example Home Route';
  private static LOCAL_ENVIRONMENT_VARIABLES: string = 'Local Environmental Variables';
  private static PACKAGE_JSON_SCRIPTS: string = 'package.json Scripts';
  private static HELMET_JS_MIDDLEWARE: string = 'helmet.js middleware(for site security)';
  private log = new Log('Seatbelt-NewApp');
  private seatbeltJSON: Object = {};
  private configFolder: string;
  private configJson: string;
  constructor(configFolder: string, configJson: string) {
    this.configFolder = configFolder;
    this.configJson = configJson;
  }
  public init() {
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
    .then((answers: any) => {
      answers.options.forEach((option: string) => {
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
