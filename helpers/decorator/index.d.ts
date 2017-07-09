export declare namespace Decorator {
    type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
    type ClassDecorator = (target: ClassConstructor) => ClassConstructor | void;
    type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
    type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
    type ClassConstructor = new (...params: any[]) => any;
}
