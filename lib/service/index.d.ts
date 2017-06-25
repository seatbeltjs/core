import { Plugin } from '../../plugins';
import { Decorator } from '../../helpers';
import { Log } from '../../';
export declare namespace Service {
    class Config implements Plugin.BasePlugin {
        log: Log;
        config: Plugin.Config;
    }
    function Use(name: string): Decorator.ParameterDecorator;
    function AllServices(): Decorator.PropertyDecorator;
    function Register(serviceName?: string): Decorator.ClassDecorator;
}
