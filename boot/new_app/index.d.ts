export declare class NewApp {
    private static EXAMPLE_HOME_ROUTE;
    private static LOCAL_ENVIRONMENT_VARIABLES;
    private static PACKAGE_JSON_SCRIPTS;
    private static HELMET_JS_MIDDLEWARE;
    private log;
    private seatbeltJSON;
    private configFolder;
    private configJson;
    constructor(configFolder: string, configJson: string);
    init(): void;
}
