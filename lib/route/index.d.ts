import { Decorator } from '../../helpers';
export interface IRouteConfig {
    type: string | string[];
    path: string | string[];
    policies?: string | string[];
}
export declare namespace Route {
    type RouteConstructor = new () => {
        controller: Function;
    };
    interface BaseRoute {
        controller: Function;
    }
    function Register(config: IRouteConfig): Decorator.ClassDecorator;
}
