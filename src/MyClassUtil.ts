import { MyClass } from './MyClass.js';

export function create(name: string): MyClass {
    return new MyClass(name);
}

export function isMyClass(val: unknown): val is MyClass {
    return val instanceof MyClass;
}
