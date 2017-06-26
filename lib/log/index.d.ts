export interface ILog {
    error(...params: any[]): void;
    err(...params: any[]): void;
    warn(...params: any[]): void;
    warning(...params: any[]): void;
    debug(...params: any[]): void;
    verbose(...params: any[]): void;
    info(...params: any[]): void;
    system(...params: any[]): void;
    sys(...params: any[]): void;
}
export declare class Log implements ILog {
    constructor(type: string);
    private _console;
    private _type;
    private _zone;
    private _json(jsonObject);
    setType(type: string): void;
    setZone(zone: string): void;
    getType(): string;
    getZone(): string;
    private _log(...params);
    error(...params: any[]): void;
    err(...params: any[]): void;
    warn(...params: any[]): void;
    warning(...params: any[]): void;
    debug(...params: any[]): void;
    verbose(...params: any[]): void;
    info(...params: any[]): void;
    system(...params: any[]): void;
    sys(...params: any[]): void;
    silly(...params: any[]): void;
}
