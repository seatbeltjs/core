import { Plugin } from '../plugin';
import { Decorator } from '../../helpers';
import { Request, Response } from '../../';
export declare namespace ServerPlugin {
    type Init = () => any;
    type Config = (routes: any[]) => any;
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
        controller: (request: Request.Base, response: Response.Base, server: Object) => any;
    }
    interface PluginConfig {
        name: string;
    }
    function Register(config: PluginConfig): Decorator.ClassDecorator;
}
