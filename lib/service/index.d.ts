import { Plugin } from '../../plugins';
import { Decorator } from '../../helpers';
import { Log } from '../../';
export declare class ServiceConfig implements Plugin.BasePlugin {
    __seatbeltPluginName: string;
    __seatbeltPluginType: string;
    log: Log;
    config: Plugin.Config;
}
export declare namespace Service {
    function Use(name: string): Decorator.PropertyDecorator;
    function AllServices(): Decorator.PropertyDecorator;
    function Register(serviceName?: string): Decorator.ClassDecorator;
}
