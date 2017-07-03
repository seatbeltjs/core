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
    namespace Response {
        interface BaseInterface {
            send: (status: number, body: Object) => any;
            ok: (body: Object) => any;
            created: (body: Object) => any;
            badRequest: (body: Object) => any;
            unauthorized: (body: Object) => any;
            forbidden: (body: Object) => any;
            notFound: (body: Object) => any;
            serverError: (body: Object) => any;
        }
    }
    namespace Request {
        interface BaseInterface {
            allParams: Object;
        }
    }
    interface BaseInterface {
        controller: (req: Request.BaseInterface, res: Response.BaseInterface, server?: Object) => any;
    }
    function Register(config: IRouteConfig): Decorator.ClassDecorator;
}
