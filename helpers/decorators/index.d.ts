export declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
export declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
export declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
export declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
export declare function isClassDecorator(constructorFunction: any): Boolean;
export declare function isPropertyDecorator(constructorFunction: any): Boolean;
