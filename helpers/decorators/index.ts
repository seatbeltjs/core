export type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;

export type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;

export type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;

export type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;

export function isClassDecorator (constructorFunction: any): Boolean {
  return typeof constructorFunction === 'function';
}

export function isPropertyDecorator (constructorFunction: any): Boolean {
  return typeof constructorFunction !== 'function';
}
