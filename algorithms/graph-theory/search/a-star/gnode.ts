/* eslint valid-jsdoc: "off", complexity: "off", no-unused-vars: "off", @typescript-eslint/naming-convention: "off" */

/** @ts-nocheck - Turn this on to ignore this file !*/

"use strict";

declare type Nullable<T> = T | null;

const round = (value: number) => {
    return Number.parseFloat(value.toFixed(1));
};

export class GNode {
    public readonly x: number;
    public readonly y: number;
    /** Determine where this GNode discovered by which shortest Parent GNode ~!*/
    private parent: Nullable<GNode>;
    /** Placeholder for holding the traversed graph cost created by corresponding parent ~!*/
    private prevGraphCost: Nullable<number> = 0;
    /** Placeholder for holding the traversed heuristic cost created by destination GNode ~!*/
    private prevHeuristicCost: Nullable<number> = 0;
    /** Placeholder for holding the traversed function cost created by corresponding parent ~!*/
    private prevFunctionCost: Nullable<number> = 0;
    /** This function was injected via Graph Instance. Allow each GNode to expand its surrounding area ~!*/
    public readonly populate: () => Array<GNode>;
    /** This function was injected via Graph Instance. Allow each GNode to check whether its Root GNode ~!*/
    public readonly isRoot: () => boolean;
    /** This function was injected via Graph Instance. Allow each GNode to refer its heuristic cost ~!*/
    public readonly hCost: () => number;

    constructor(coordinate: Required<{x: number, y: number}>, inject: Required<{
        populate: (node: GNode) => Array<GNode>;
        isRoot: (node: GNode) => boolean;
        hCost: (node: GNode) => number;
    }>) {
        this.x = coordinate.x;
        this.y = coordinate.y;
        /** Every GNode can now populate its surrounding area without fully knowledgeable of this Graph ~!*/
        this.populate = () => inject.populate(this);
        /** Every GNode can now check whether its Root GNode without fully knowledgeable of this Graph ~!*/
        this.isRoot = () => inject.isRoot(this);
        /** Every GNode can now refer its heuristic cost without fully knowledgeable of this Graph ~!*/
        this.hCost = () => {
            /** For Caching Purpose. Will Never Re-Calculate on changing Parent GNode ~!*/
            if (this.prevHeuristicCost) {
                return this.prevHeuristicCost;
            }
            /** When changing GNode Parent, this value will NOT be updated ~!*/
            return this.prevHeuristicCost = round(inject.hCost(this));
        };
    }

    /**
     ** - Traverse Parents GNode to calculate Graph Cost.
     ** @cache - This function also cache ``${gCost}`` value.
     ** @returns {number}
     **/
    public gCost(): number {
        /** Applied for Root Node ~!*/
        if (!this.parent) {
            return 0;
        }
        /** For Caching Purpose. Will Re-Calculate on changing Parent GNode ~!*/
        if (this.prevGraphCost) {
            return this.prevGraphCost;
        }
        /** When changing GNode Parent, this value will be updated also ~!*/
        const currGraphCost = Math.sqrt(Math.abs(this.x - this.parent.x) ** 2 + Math.abs(this.y - this.parent.y) ** 2);
        /** @description: `${currGraphCost}` will be [1] if ${parent} && ${child} adjacent. Otherwise diagonally, the value will be [1.4] ~!*/
        return this.prevGraphCost = round(currGraphCost + this.parent.gCost());
    }

    /**
     ** - Traverse Parents GNode to calculate Function Cost.
     ** @cache - This function also cache ``${fCost}`` value.
     ** @returns {number}
     **/
    public fCost(): number {
        /** Applied for Root Node ~!*/
        if (!this.parent) {
            return this.hCost();
        }
        /** For Caching Purpose. Will Re-Calculate on changing Parent GNode ~!*/
        if (this.prevFunctionCost) {
            return this.prevFunctionCost;
        }
        /** When changing GNode Parent, this value will be updated also ~!*/
        return this.prevFunctionCost = round(this.gCost() + this.hCost());
    }

    /**
     ** @returns {Nullable<GNode>}
     **/
    public getParent(): Nullable<GNode> {
        return this.parent;
    }

    /**
     ** @description - Checking whether this GNode created by Root GNode ?
     ** @returns {boolean}
     **/
    private isFromRoot(): boolean {
        const node = this.getParent();
        if (!node) {
            return false;
        }
        return node.isRoot();
    }

    /**
     ** @param {GNode} node
     ** @returns {void}
     **/
    public setParent(node: GNode): void {
        /** When this GNode populated from Root GNode. It must not be mutated ~!*/
        if (this.isFromRoot()) {
            return;
        }
        this.parent = node;
        /** Force GNode Path to Re-Calculate Graph Cost once again ~!*/
        this.prevGraphCost = null;
        /** Force GNode Path to Re-Calculate Function Cost once again ~!*/
        this.prevFunctionCost = null;
    }

}

/** For ES6 Default Import Statement !*/
export default GNode;

/** For ES5 Default Import Statement !*/
module.exports.default = GNode;
