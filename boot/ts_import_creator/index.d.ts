export declare class TSImportCreator {
    private log;
    private appPath;
    private seatbeltPath;
    init(): void;
    private writePath;
    constructor(path: string);
    private _createRollupConfig();
    private _createPath();
    private _createImportsTS(files);
    private _createServerTS(files);
}
