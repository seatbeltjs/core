import { Decorator } from '../../helpers';
export declare namespace Policy {
    function Register(): Decorator.ClassDecorator;
    function Use(policyNames: string | string[]): Decorator.MethodDecorator;
}
