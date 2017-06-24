import { Log } from '../log';
import { ClassDecorator } from '../../helpers';
export declare namespace Server {
    type Init = () => any;
    type Config = (routes: any[]) => any;
    interface Request {
        allParams: Object;
    }
    interface Response {
        send: (status: number, body: Object) => any;
    }
    interface BaseServer {
        port: number;
        server: Object;
        log: Log;
        conformServerControllerToSeatbeltController: Function;
        init: Init;
        config: Config;
    }
    interface RouteConfig {
        type: string[];
        path: string[];
    }
    interface Route {
        __seatbeltConfig: RouteConfig;
        controller: (request: Request, response: Response, server: Object) => any;
    }
    function Register(): ClassDecorator;
}
