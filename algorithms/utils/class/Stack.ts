/**
 ** @constructor
 ** @template T
 **/
export class Stack<T extends any> extends Object {

    protected items: Array<T>;
    protected offset: number;

    constructor(...args: Array<T>) {
        super(...args);
        this.items = [...args];
        /** @deprecated **/
        this.offset = 0;
    }

    /**
     ** @template {T}
     ** @param {T} item
     ** @returns {Array<T>}
     **/
    public push(item: T) {
        this.items.push(item);
        return this.items;
    }

    /**
     ** @template {T}
     ** @returns {T}
     **/
    public pop(): T {
        if (this.items.length <= 0) {
            throw new ReferenceError("The Stack has already been empty !");
        }
        return this.items.pop() as T;
    }

    /**
     ** @template {T}
     ** @returns {T}
     **/
    public peek(): T {
        return this.items[this.items.length - 1];
    }

    /**
     ** @returns {number}
     **/
    public size(): number {
        return this.items.length;
    }

    /**
     ** @returns {void}
     **/
    public empty(): void {
        this.items.length = 0;
    }

    /**
     ** @returns {boolean}
     **/
    public isEmpty(): boolean {
        return this.items.length === 0;
    }

}

/** For ES6 Default Import Statement !*/
export default Stack;

/** For ES5 Default Import Statement !*/
module.exports.default = Stack;
