export namespace Decorator {
  export type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;

  export type ClassDecorator = (target: ClassConstructor) => ClassConstructor | void;

  export type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;

  export type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;

  export type ClassConstructor = new (...params: any[]) => any;
}
