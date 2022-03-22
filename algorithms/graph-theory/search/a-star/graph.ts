/* eslint valid-jsdoc: "off", complexity: "off", no-unused-vars: "off", no-multi-assign: "off", @typescript-eslint/naming-convention: "off" */

/** @ts-nocheck - Turn this on to ignore this file !*/

"use strict";

declare type Nullable<T> = T | null;

import GNode from "./gnode";

const __Default_Map__ = [
    [0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0],
    [0x0, 0x0, 0x0, NaN, NaN, 0x0, 0x0],
    [0x0, 0x0, 0x0, 0x0, NaN, 0x0, 0x0],
    [0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0],
];

export class Graph {

    private readonly root: GNode;
    private readonly dest: GNode;
    private readonly graph: Array<Array<GNode>>;

    private readonly maxHeight: number;
    private readonly maxWidth: number;

    /** The HashSet of Nodes to be evaluated ~!*/
    private readonly __OPEN__: Set<GNode> = new Set();
    /** The HashSet of Nodes already evaluated ~!*/
    private readonly __CLOSE__: Set<GNode> = new Set();

    constructor(root: [number, number] | GNode, dest: [number, number] | GNode, map: Array<Array<number | GNode>> = __Default_Map__) {
        /** For Dependency Injection & Inversion of Control ~!*/
        const inject = {
            /** Every GNode can now populate its surrounding area without fully knowledgeable of this Graph ~!*/
            populate: (node: GNode) => this.populate(node),
            /** Every GNode can now check whether its Root GNode without fully knowledgeable of this Graph ~!*/
            isRoot: (node: GNode) => node === this.root,
            /** Every GNode can now refer its heuristic cost without fully knowledgeable of this Graph ~!*/
            hCost: (node: GNode) => {
                /** Case 1: Same Row or Same Column ~!*/
                if (this.dest.x === node.x) {
                    return this.dest.y - node.y;
                }
                if (this.dest.y === node.y) {
                    return this.dest.x - node.x;
                }
                /** Case 2: Diagonally Distance ~!*/
                const dunit = 1.4; // Sqrt(2);
                const xDistance = Math.abs(this.dest.x - node.x);
                const yDistance = Math.abs(this.dest.y - node.y);
                const diagonalDistance = Math.min(xDistance, yDistance);
                const hamiltonDistance = diagonalDistance * dunit + Math.max(xDistance, yDistance) - diagonalDistance;
                return Number.parseFloat(hamiltonDistance.toFixed(1));
                /** @deprecated ~!*/
                // const hCost = Math.sqrt(Math.abs(this.dest.x - node.x) ** 2 + Math.abs(this.dest.y - node.y) ** 2);
                // return Number.parseFloat(hCost.toFixed(1));
            },
        };
        this.root = root instanceof GNode ? root : new GNode({x: root[0], y: root[1]}, {...inject});
        this.dest = dest instanceof GNode ? dest : new GNode({x: dest[0], y: dest[1]}, {...inject});
        const numRow = this.maxHeight = map.length;
        const baseCol = this.maxWidth = map[0].length;
        for (let row = 0; row < numRow; row++) {
            const numCol = map[row].length;
            if (numCol !== baseCol) {
                throw new EvalError("Your Map Shape was not typed as Rectangle");
            }
            for (let col = 0; col < baseCol; col++) {
                const node = map[row][col];
                if (typeof node !== "number" || isNaN(node)) {
                    /** Skip this Node since it cannot be traverse ~!*/
                    continue;
                }
                /** For Reference Comparison. Will not create new GNode ~!*/
                if (root[0] === row && root[1] === col) {
                    map[row][col] = this.root;
                    continue;
                }
                /** For Reference Comparison. Will not create new GNode ~!*/
                if (dest[0] === row && dest[1] === col) {
                    map[row][col] = this.dest;
                    continue;
                }
                /** Convert all value within ``${map}`` into GNode ~!*/
                map[row][col] = new GNode({x: row, y: col}, {...inject});
            }
        }
        this.graph = map as Array<Array<GNode>>;
        /** Push the Starting Node to Evaluate HashSet ~!*/
        this.__OPEN__.add(this.root);
    }

    /**
     ** @description - Get the Graph Cost between 2 GNode.
     ** @see {@link https://www.youtube.com/watch?v=-L-WgKMFuhE&t=400s}
     ** @param {GNode} curr
     ** @param {GNode} prev
     ** @returns {number}
     **/
    private getSubCost(curr: GNode, prev: GNode): number {
        /** At the first time get cost of GNode, its parent will be ``${Root}`` GNode ~!*/
        const gCost = Math.sqrt(Math.abs(curr.x - prev.x) ** 2 + Math.abs(curr.y - prev.y) ** 2);
        return Number.parseFloat(gCost.toFixed(1));
    }

    /**
     ** @private
     ** - From [x: number, y: number] coordinate.
     ** - Get corresponding GNode from Graph Instance.
     ** @dependency-injection
     ** @param {Array<number>} coordinate
     ** @param {Nullable<GNode>} parent
     ** @returns {Nullable<GNode>}
     **/
    private getNode(coordinate: [number, number], parent: Nullable<GNode>): Nullable<GNode> {
        const [x, y] = coordinate;
        const maxWidth = this.graph[0].length - 1;
        const maxHeight = this.graph.length - 1;
        /** Handle Array Out Of Bound Exception ~!*/
        if (x < 0 || x > maxHeight) {
            return null;
        }
        /** Handle Array Out Of Bound Exception ~!*/
        if (y < 0 || y > maxWidth) {
            return null;
        }
        const __G_Node__: GNode | typeof NaN = this.graph[x][y];
        /** Handle Not Traversable GNode ~!*/
        if (typeof __G_Node__ === "number" && isNaN(__G_Node__)) {
            return null;
        }
        /** When populating children GNode from parent GNode ~!*/
        if (typeof parent === "object" && parent instanceof GNode) {
            /** @dangerous - Causing Extremely Harmful Error ~!*/
            if (__G_Node__.isRoot()) {
                /** @take-note - MUST NOT MODIFY ROOT NODE PARENT POINTER ~!*/
                return null;
            }
            const currParent = __G_Node__.getParent();
            /** Set GNode Parent when it has been populated by ``${parentNode}`` ~!*/
            if (!currParent) {
                __G_Node__.setParent(parent);
            } else {
                /** The new Function Cost to be compared to old ``${fCost}`` ~!*/
                const fCost = parent.gCost() + this.getSubCost(__G_Node__, parent) + __G_Node__.hCost();
                /** Set the new Parent GNode because the Path is shorter ~!*/
                if (fCost < __G_Node__.fCost()) {
                    __G_Node__.setParent(parent);
                }
            }
        }
        return __G_Node__;
    }

    /**
     ** @private
     ** @dependency-injection
     ** @param {GNode} node
     ** @returns {Array<GNode>}
     **/
    private getNodeNeighbour(node: GNode): Array<GNode> {
        if (!this.root || !this.dest) {
            throw new EvalError("Please specify starting GNode and ending GNode");
        }
        const {x, y} = node;
        return [
            this.getNode([x, y - 1], node || null), // Left
            this.getNode([x, y + 1], node || null), // Right
            this.getNode([x - 1, y], node || null), // Up
            this.getNode([x + 1, y], node || null), // Down
            this.getNode([x - 1, y - 1], node || null), // Left-Up
            this.getNode([x - 1, y + 1], node || null), // Right-Up
            this.getNode([x + 1, y - 1], node || null), // Left-Down
            this.getNode([x + 1, y + 1], node || null), // Right-Down
        ].filter((node): node is GNode => node !== null).sort((a, b) => {
            return a.fCost() < b.fCost() ? -1 : 1;
        });
    }

    /**
     ** @private
     ** @dependency-injection
     ** @param {GNode} node
     ** @returns {Array<GNode>}
     **/
    private populate(node: GNode): Array<GNode> {
        const neighbours = this.getNodeNeighbour(node);
        for (const neighbour of neighbours) {
            if (this.__CLOSE__.has(neighbour)) {
                /** Whether Neighbour Node has been traversed -> Skip ~!*/
                continue;
            }
            /** Add Neighbour Node to Open List when it has not yet been added ~!*/
            if (!this.__OPEN__.has(neighbour)) {
                this.__OPEN__.add(neighbour);
            }
        }
        return neighbours;
    }

    /**
     ** @private
     ** @deprecated
     ** - The GNode that has lowest [[ FCost = GCost + HCost ]]
     ** @returns {GNode}
     **/
    public getLowestCostNode(): GNode {
        /** @ts-ignore ~!*/
        const nodes: Array<GNode> = [...this.__OPEN__];
        let [minCostNode] = nodes.splice(0, 1);
        let minCost = minCostNode.fCost();
        for (const node of nodes) {
            const fCost = node.fCost();
            if (fCost < minCost) {
                minCostNode = node;
                minCost = fCost;
            }
        }
        /** Add Min-Cost Node to [CLOSED] HashSet ~!*/
        this.__CLOSE__.add(minCostNode);
        /** Remove Min-Cost Node from [OPEN] HashSet ~!*/
        this.__OPEN__.delete(minCostNode);

        return minCostNode;
    }

    private getPath(): Array<GNode> {
        if (!this.root || !this.dest) {
            throw new EvalError("Please specify starting GNode and ending GNode");
        }
        while (this.__OPEN__.size > 0) {
            const currNode = this.getLowestCostNode();
            currNode.populate();
            if (currNode === this.dest) {
                console.log("> Found the path !!!");
                let curr: Nullable<GNode> = currNode;
                const path: Array<GNode> = [];
                while (curr) {
                    path.push(curr);
                    curr = curr.getParent();
                }
                path.forEach(node => console.log('>', node?.x, node?.y));
                return path;
            }
        }

        return [];
    }

    public print(): void {
        console.time('> @total time');
        const path = this.getPath();
        console.timeEnd('> @total time');

        for (let row = 0; row < this.maxHeight; row++) {
            const args: Array<string> = [];
            for (let col = 0; col < this.maxWidth; col++) {
                const node = this.graph[row][col];
                /** Value is [NaN] here ~!*/
                if (typeof node === "number") {
                    args.push("|");
                    /** Skip this Node since it cannot be traverse ~!*/
                    continue;
                }
                /** Value is [Root Node] here ~!*/
                if (node === this.root) {
                    args.push("^");
                    continue;
                }
                /** Value is [Target Node] here ~!*/
                if (node === this.dest) {
                    args.push("$");
                    continue;
                }
                /** Value is [Target Node] here ~!*/
                if (path.includes(node)) {
                    args.push("*");
                    continue;
                }
                args.push("-");
            }
            console.log(...args);
        }
    }

}

/** For ES6 Default Import Statement !*/
export default Graph;

/** For ES5 Default Import Statement !*/
module.exports.default = Graph;
