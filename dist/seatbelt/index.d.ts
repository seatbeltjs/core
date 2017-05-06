export interface ISeatbelt {
    strap(): void;
    getRoot(): string;
}
export declare class Seatbelt implements ISeatbelt {
    private log;
    private _root;
    private _app;
    private _setRoot(root);
    getRoot(): string;
    private _initConfig(cb);
    private _bootApp();
    private _createTSImporter();
    private _rollUpFiles(cb);
    strap(): void;
}
