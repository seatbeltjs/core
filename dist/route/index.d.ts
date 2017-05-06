export interface IRouteConfig {
    type: string | string[];
    path: string | string[];
    policies?: string | string[];
}
export declare function DRoute(config: IRouteConfig): any;
