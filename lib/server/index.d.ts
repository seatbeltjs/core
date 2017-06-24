export interface IServerRequest {
    allParams: any;
}
export interface IServerResponse {
    send: (status: number, body: any) => any;
}
export interface IServerSeatbeltConfig {
    type: string[];
    path: string[];
}
export interface IServerRoute {
    controller: (request: IServerRequest, response: IServerResponse, server: any) => any;
    __seatbelt_config__: IServerSeatbeltConfig;
}
export declare function DServerRegister(): Function;
