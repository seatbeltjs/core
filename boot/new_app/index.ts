import { Log } from '../../';

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
  }
}
