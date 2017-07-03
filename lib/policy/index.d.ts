import { Decorator } from '../../helpers';
export declare namespace Policy {
    interface BaseInterface {
        controller: (req: Request.BaseInterface, res: Response.BaseInterface, server?: Object) => any;
    }
    namespace Response {
        interface BaseInterface {
            next: () => any;
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
    function Register(): Decorator.ClassDecorator;
    function Use(policyNames: string | string[]): Decorator.MethodDecorator;
}
