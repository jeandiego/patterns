export type Handler<T extends unknown[] = unknown[]> = (...args: T) => void | Promise<void>
export type Guard<T extends unknown[] = unknown[]> = (next: Handler<T>) => Handler<T>
