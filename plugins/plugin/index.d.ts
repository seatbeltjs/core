import { Decorator } from '../../helpers';
export declare namespace Plugin {
    type Init = (seatbelt: any) => any;
    type Config = (seatbelt: any, cb: Function) => any;
    interface BaseInterface {
        init?: Init;
        config?: Config;
    }
    interface PluginConfigInterface {
        name: string;
    }
    function Register(config: PluginConfigInterface): Decorator.ClassDecorator;
}
