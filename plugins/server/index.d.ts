import { Plugin } from '../plugin';
import { Decorator } from '../../helpers';
export declare namespace ServerPlugin {
    type Init = () => any;
    type Config = (routes: any[]) => any;
    interface Request {
        allParams: Object;
    }
    interface Response {
        send: (status: number, body: Object) => any;
    }
    interface BaseServer extends Plugin.BasePlugin {
        port: number;
        server: Object;
        conformServerControllerToSeatbeltController: Function;
    }
    interface RouteConfig {
        type: string[];
        path: string[];
    }
    interface Route {
        __routeConfig: RouteConfig;
        controller: (request: Request, response: Response, server: Object) => any;
    }
    interface PluginConfig {
        name: string;
    }
    function Register(config: PluginConfig): Decorator.ClassDecorator;
}
