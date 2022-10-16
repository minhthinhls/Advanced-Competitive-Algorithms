export class ComparableHeap {
    /** @type {function(a: T, b: T): boolean} ~!*/
    comparator = (a, b) => a < b; // [Min-Heap] by default.
    /** @type {Array<T>} ~!*/
    heap = [];

    /**
     ** @constructor
     ** @template T
     ** @param {function(a: T, b: T): boolean} comparator
     ** @param {Array<T>} heap
     **/
    constructor(comparator, heap) {
        this.comparator = comparator;
        if (heap && heap.length) {
            this.heap = heap;
        }
        this.build();
    }

    /**
     ** @returns {Array<T>}
     **/
    build() {
        /** Index of last non-leaf node ~!*/
        const startIdx = Math.floor(this.heap.length / 2) - 1;

        /** Perform reverse level order traversal from last non-leaf node and heapify each node ~!*/
        for (let i = startIdx; i >= 0; i--) {
            this.heapify(i);
        }
        return this.heap;
    }

    /**
     ** @description - [Top-Down] Heapify Strategy Approach.
     ** @param {number} root
     ** @returns {Array<T>}
     **/
    heapify(root) {
        let comparator = root; // Initialize comparator as root
        const left = 2 * root + 1; // left = 2*i + 1
        const right = 2 * root + 2; // right = 2*i + 2
        /** If left child is smaller than root ~!*/
        if (left < this.heap.length && this.comparator(this.heap[left], this.heap[comparator])) {
            comparator = left;
        }

        /** If right child is smaller than comparator so far ~!*/
        if (right < this.heap.length && this.comparator(this.heap[right], this.heap[comparator])) {
            comparator = right;
        }

        /** If comparator is not root ~!*/
        if (comparator !== root) {
            this.swap(root, comparator);

            /** Recursively heapify the affected sub-tree ~!*/
            this.heapify(comparator);
        }
    }

    /**
     ** @description - [Bottom-Up] Heapify Strategy Approach.
     ** @param {number} root
     ** @returns {Array<T>}
     **/
    _heapify(root) {
        /** Find parent index ~!*/
        const parent = (root % 2 === 0) ? Math.round(root / 2 - 1) : Math.round((root - 1) / 2);

        /** Check valid parent index ~!*/
        if (parent >= 0) {
            /** For Comparable-Heap: If current node is greater than its parent.
             ** Swap both of them and call heapify again for the parent ~!*/
            if (this.comparator(this.heap[root], this.heap[parent])) {
                this.swap(root, parent);

                /** Recursively heapify the parent node ~!*/
                this._heapify(parent);
            }
        }
    }

    /**
     ** @description - [Push & Returns] the current size from Heap Memory.
     ** @param {T} element
     ** @returns {number}
     **/
    push(element) {
        const size = this.heap.length;

        /** Add new element and increase size by 1 ~!*/
        this.heap[size] = element;

        /** [Bottom-Up] Heapify the last leaf node ~!*/
        this._heapify(size);

        /** Return new size of Heap ~!*/
        return size + 1;
    }

    /**
     ** @description - [Pops & Returns] the Comparator Element from Heap Memory.
     ** @returns {T}
     **/
    pop() {
        const size = this.heap.length;
        /** Swap [First/Root] and [Last/Leaf] element ~!*/
        this.swap(0, size - 1);
        /** Get the last element [Comparator] ~!*/
        const lastElement = this.heap[size - 1];

        /** Decrease size of heap by 1 ~!*/
        this.heap.length = size - 1;

        /** Heapify the root node ~!*/
        this.heapify(0);

        /** Return Comparator Element of Heap ~!*/
        return lastElement;
    }

    /**
     ** @returns {T}
     **/
    peek() {
        return this.heap[0];
    }

    /**
     ** @returns {number}
     **/
    size() {
        return this.heap.length;
    }

    swap(i, j) {
        const swap = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = swap;
    }

}

/** For ES6 Default Import Statement !*/
export default ComparableHeap;

/** For ES5 Default Import Statement !*/
module.exports.default = ComparableHeap;
