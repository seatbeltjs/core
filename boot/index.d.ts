export interface ISeatbelt {
    strap(): void;
    getRoot(): string;
}
export declare class Seatbelt implements ISeatbelt {
    private log;
    private _root;
    private _app;
    init(): void;
    strap: () => void;
    private _setRoot(root);
    getRoot(): string;
    private _bootApp();
    private _createTSImporter();
    private _rollUpFiles(cb);
}
