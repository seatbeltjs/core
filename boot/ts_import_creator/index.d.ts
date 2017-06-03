export declare class TSImportCreator {
    private log;
    private appPath;
    private seatbeltPath;
    private writePath;
    constructor(path: string);
    private _createRollupConfig();
    private _createPath();
    private _createImportsTS(files);
    private _createServerTS(files);
    init(): void;
}
