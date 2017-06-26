export declare class Rollup {
    private log;
    private appPath;
    private seatbeltPath;
    constructor(path: string);
    createImports(cb: Function): void;
    createIndex(cb: Function): void;
}
