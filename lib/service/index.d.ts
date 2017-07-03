import { Decorator } from '../../helpers';
export declare namespace Service {
    function Register(serviceName?: string): Decorator.ClassDecorator;
    function Use(name: string): Decorator.PropertyDecorator;
}
