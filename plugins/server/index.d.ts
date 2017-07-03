import { Route } from '../../';
import { Plugin } from '../plugin';
import { Decorator } from '../../helpers';
export declare namespace ServerPlugin {
    type Init = (seatbelt: any) => any;
    type Config = (seatbelt: any, cb: Function) => any;
    interface BaseInterface extends Plugin.BaseInterface {
        port: number;
        server: Object;
        conformServerControllerToSeatbeltController: Function;
    }
    interface RouteConfigInterface {
        type: string[];
        path: string[];
    }
    interface RouteInterface {
        __routeConfig: RouteConfigInterface;
        controller: (request: Route.Request.BaseInterface, response: Route.Response.BaseInterface, server: Object) => any;
    }
    interface PluginConfigInterface {
        name: string;
    }
    function Register(config: PluginConfigInterface): Decorator.ClassDecorator;
}
