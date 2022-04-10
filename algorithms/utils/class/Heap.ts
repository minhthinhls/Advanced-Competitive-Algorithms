/**
 ** @constructor
 ** @template T
 **/
export class Heap<T extends string | number> extends Object {

    protected readonly heap: Array<T>;

    constructor(arg: T | Array<T>, ...args: Array<T>) {
        super(...args);
        const __TYPE_ERROR_MESSAGE__ = '>>> NOT SUPPORTED METHOD ARGUMENTS <<<';
        if (typeof arg === "object" && Array.isArray(arg)) {
            if (args[0] !== undefined) {
                throw new TypeError(__TYPE_ERROR_MESSAGE__);
            }
            for (let i = 0; i < arg.length; i++) {
                const element = arg[i];
                if (typeof element !== "string" && typeof element !== "number") {
                    throw new TypeError(__TYPE_ERROR_MESSAGE__);
                }
            }
            this.heap = arg;
            return this;
        }
        const argv = [arg, ...args];
        for (let i = 0; i < argv.length; i++) {
            const element = argv[i];
            if (typeof element !== "string" && typeof element !== "number") {
                throw new TypeError(__TYPE_ERROR_MESSAGE__);
            }
        }
        this.heap = [arg, ...args];
        return this;
    }

    protected format = <T extends string | number>(value: T, placeholder: number): string => {
        if (!value && value !== 0) {
            return "-".repeat(placeholder);
        }
        const number = Number.call(null, value).toString();
        const size = number.length;
        if (size > placeholder) {
            throw new EvalError(">>> Place-Holder is smaller than Number Length <<<");
        }
        const pads = (placeholder - size) >> 1;
        return "-".repeat(pads) + number + "-".repeat(placeholder - size - pads);
    };

    protected swap<K extends number>(a: K, b: K): void {
        const swap = this.heap[a];
        this.heap[a] = this.heap[b];
        this.heap[b] = swap;
    }

    /**
     ** @description - [Top-Down] Heapify Strategy Approach.
     ** @param {number} node
     ** @param {number} rootIndex
     ** @returns {Array<T>}
     **/
    protected heapify(node: number, rootIndex: number) {
        let largest = rootIndex; // Initialize largest as root
        const left = 2 * rootIndex + 1; // left = 2*i + 1
        const right = 2 * rootIndex + 2; // right = 2*i + 2

        /** If left child is larger than root ~!*/
        if (left < node && this.heap[left] > this.heap[largest]) {
            largest = left;
        }

        /** If right child is larger than largest so far ~!*/
        if (right < node && this.heap[right] > this.heap[largest]) {
            largest = right;
        }

        /** If largest is not root ~!*/
        if (largest != rootIndex) {
            this.swap(rootIndex, largest);

            /** Recursively heapify the affected sub-tree ~!*/
            this.heapify(node, largest);
        }
    }

    /**
     ** @description - [Bottom-Up] Heapify Strategy Approach.
     ** @param {number} rootIndex
     ** @returns {Array<T>}
     **/
    protected _heapify(rootIndex?: number) {
        rootIndex = rootIndex || this.heap.length - 1;
        /** Find parent index ~!*/
        const parent = (rootIndex % 2 === 0) ? Math.round(rootIndex / 2 - 1) : Math.round((rootIndex - 1) / 2);

        if (this.heap[parent] > 0) {
            /** For Max-Heap: If current node is greater than its parent.
             /** Swap both of them and call heapify again for the parent ~!*/
            if (this.heap[rootIndex] > this.heap[parent]) {
                this.swap(rootIndex, parent);

                /** Recursively heapify the parent node ~!*/
                this._heapify(parent);
            }
        }
    }

    /**
     ** @param {number} [rootIndex]
     ** @returns {Array<T>}
     **/
    public build(rootIndex?: number) {
        rootIndex = rootIndex || this.heap.length;
        /** Index of last non-leaf node ~!*/
        const startIdx = Math.floor(rootIndex / 2) - 1;

        /** Perform reverse level order traversal from last non-leaf node and heapify each node ~!*/
        for (let i = startIdx; i >= 0; i--) {
            this.heapify(rootIndex, i);
        }
        return this.heap;
    }

    /**
     ** @description - [Pops & Returns] the Max Element from Heap Memory.
     ** @returns {T}
     **/
    public pop(): T {
        const size = this.heap.length;
        /** Swap [First/Root] and [Last/Leaf] element ~!*/
        this.swap(0, size - 1);
        /** Get the last element [Max] ~!*/
        const lastElement = this.heap[size - 1];

        /** Decrease size of heap by 1 ~!*/
        this.heap.length = size - 1;

        /** Heapify the root node ~!*/
        this.heapify(this.heap.length, 0);

        /** Return Max Element of Heap ~!*/
        return lastElement;
    }

    /**
     ** @description - [Push & Returns] the current size from Heap Memory.
     ** @returns {number}
     **/
    public push(element: T): number {
        const size = this.heap.length;

        /** Add new element and increase size by 1 ~!*/
        this.heap[size] = element;

        /** [Bottom-Up] Heapify the last leaf node ~!*/
        this._heapify();

        /** Return new size of Heap ~!*/
        return size + 1;
    }

    /**
     ** @template {T}
     ** @returns {T}
     **/
    public peek(): T {
        return this.heap[0];
    }

    /**
     ** @returns {number}
     **/
    public size(): number {
        return this.heap.length;
    }

    /**
     ** @deprecated
     ** @returns {void}
     **/
    public display(): void {
        const size = this.heap.length;
        const maxDigit = Math.max(...this.heap as Array<number>);
        const maxSpace = " ".repeat(Math.floor(Math.log10(maxDigit)));
        /** Log <base 2> of Size ~!*/
        const maxDepth = Math.floor(Math.log(size) / Math.log(2));
        console.log("------------------------------------------");
        console.log(">>> Array representation of Heap Array <<<");
        console.log("------------------------------------------\n");

        let str = ''; /** Heap string builder ~!*/
        for (let d = maxDepth; d >= 0; d--) {
            /** Number of layers, we build this backwards ~!*/
            let layerLength = Math.pow(2, d);
            /** Numbers per layer ~!*/

            let line = ''; /** Line string builder ~!*/
            for (let i = layerLength; i < Math.pow(2, d + 1); i++) {
                /** Before spaces only on not-last layer ~!*/
                if (d != maxDepth) {
                    line += " ".repeat(Math.pow(2, maxDepth - d));
                }
                /** Extra spaces for long lines ~!*/
                let loops = maxDepth - d;
                if (loops >= 2) {
                    loops -= 2;
                    while (loops >= 0) {
                        line += " ".repeat(Math.pow(2, loops));
                        loops--;
                    }
                }

                /** Add in the number ~!*/
                if (i <= size) {
                    // line += this.heap[i]; /** Add leading zeros ~!*/
                    line += maxSpace + require('util').format("%s", this.heap[i - 1]);
                } else {
                    line += "--";
                }

                line += " ".repeat(Math.pow(2, maxDepth - d)); /** After spaces ~!*/
                /** Extra spaces for long lines ~!*/
                loops = maxDepth - d;
                if (loops >= 2) {
                    loops -= 2;
                    while (loops >= 0) {
                        line += " ".repeat(Math.pow(2, loops));
                        loops--;
                    }
                }
            }
            str = line.toString() + "\n" + str; /** Prepend line ~!*/
        }
        str += "\n" + "------------------------------------------";
        return console.log(str);
    }

    /**
     ** @description - Modern Heap Display Method designed by @EdgarHuynh.
     ** @returns {void}
     **/
    public print(): void {
        const size = this.heap.length;
        const maxDigit = Math.max(...this.heap as Array<number>);
        /** Place holder must be odds [1, 3, 5, 7, 9, 11, ...] ~!*/
        const placeholder = (Number.call(null, maxDigit).toString().length & ~1) + 1;
        /** Max Depth of Binary Search Tree from [0] to [N] ~!*/
        const maxDepth = Math.floor(Math.log(size) / Math.log(2)); // Min Depth = 0; [Root Level]
        /** Total Spaces of Line == <The Amount of placeholders> && <The Amount of Space-1 between Placeholders> ~!*/
        const totalLineSpaces = placeholder * (2 ** maxDepth) + (2 ** maxDepth - 1);
        /** Calculate the spaces need to pad to the Rear-Side and Between each Placeholders ~!*/
        const calculateSpace = (level: number): [number, number] => {
            /** @equation: ${TotalSpaces} - ${placeholder} * (2 ^ level) == 2x + (2 ^ level - 1)(2x + 1) ~!*/
            /** @constraint: ${BetweenSpaces} == (2x + 1) <- Space between each placeholders ~!*/
            const rear = (totalLineSpaces - (placeholder + 1) * (2 ** level) + 1) / Math.pow(2, level + 1);
            return [rear, 2 * rear + 1];
        };
        console.log("------------------------------------------");
        console.log(">>> Array representation of Heap Array <<<");
        console.log("------------------------------------------\n");

        let str = ''; /** Heap string builder ~!*/
        for (let level = 0; level <= maxDepth; level++) {
            const [rear, middle] = calculateSpace(level);
            if (level === 0) {
                str += " ".repeat(rear) + this.format(this.heap[0], placeholder) + " ".repeat(rear) + "\n";
                continue;
            }
            const elements: Array<string> = [];
            /** @description: Looping through each Tree-Layer. Ranged from [2^level - 1] to [2^(level+1) - 2] ~!*/
            for (let i = Math.pow(2, level) - 1; i <= Math.pow(2, level + 1) - 2; i++) {
                elements.push(this.format(this.heap[i], placeholder));
            }
            str += " ".repeat(rear) + elements.join(" ".repeat(middle)) + " ".repeat(rear) + "\n";
        }
        str += "\n" + "------------------------------------------";
        return console.log(str);
    }

}

/** For ES6 Default Import Statement !*/
export default Heap;

/** For ES5 Default Import Statement !*/
module.exports.default = Heap;
