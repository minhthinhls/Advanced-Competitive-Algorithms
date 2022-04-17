/**
 ** @constructor
 ** @template T
 **/
export class Queue<T extends any> extends Object {

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
    public enqueue(item: T): Array<T> {
        this.items.push(item);
        return this.items;
    }

    /**
     ** @private
     ** @deprecated
     ** @template {T}
     ** @returns {T}
     ** @ts-ignore ~!*/
    private _dequeue(): T {
        /** If the queue is empty, return immediately !*/
        if (this.items.length === 0) {
            throw new ReferenceError("The Queue has already been empty !");
        }

        /** Store the item at the front of the queue !*/
        const item = this.items[this.offset];

        /** increment the offset and remove the free space if necessary !*/
        if (++this.offset * 2 >= this.items.length) {
            this.items = this.items.slice(this.offset);
            this.offset = 0;
        }

        /** Return the dequeued item !*/
        return item;
    }

    /**
     ** @template {T}
     ** @returns {T}
     **/
    public dequeue(): T {
        /** If the queue is empty, return immediately !*/
        if (this.items.length === 0) {
            throw new ReferenceError("The Queue has already been empty !");
        }

        /** Return the dequeued item !*/
        return this.items.shift() as T;
    }

    /**
     ** @private
     ** @deprecated
     ** @template {T}
     ** @returns {T}
     ** @ts-ignore ~!*/
    private _peek(): T {
        return this.items[this.offset];
    }

    /**
     ** @template {T}
     ** @returns {T}
     **/
    public peek(): T {
        return this.items[0];
    }

    /**
     ** @private
     ** @deprecated
     ** @returns {number}
     ** @ts-ignore ~!*/
    private _size(): number {
        return this.items.length - this.offset;
    }

    /**
     ** @returns {number}
     **/
    public size(): number {
        return this.items.length;
    }

    /**
     ** @returns {boolean}
     **/
    public isEmpty(): boolean {
        return this.items.length === 0;
    }

}

/** For ES6 Default Import Statement !*/
export default Queue;

/** For ES5 Default Import Statement !*/
module.exports.default = Queue;
