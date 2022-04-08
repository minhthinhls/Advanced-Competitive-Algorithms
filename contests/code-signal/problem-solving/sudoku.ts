/* eslint valid-jsdoc: "off", complexity: "off", no-unused-vars: "off", @typescript-eslint/naming-convention: "off" */

/** @ts-nocheck - Turn this on to ignore this file !*/

"use strict";

/**!*****************************!*
 ** PUT THIS ON MAIN ENTRY FILES !
 ** WRITE RESOLVED PATH IN BOTH FILES
 ** [PACKAGE.JSON] AND [TSCONFIG.JSON]
 **!*****************************!*/
require("module-alias/register");

/**
 ** @description The following is the base URL of Code-Signal Problems.
 ** @see {@link https://app.codesignal.com/arcade/intro/level-12/tQgasP8b62JBeirMS/}
 ** @description The following is this published solution URL of Code-Signal Problems.
 ** @see {@link https://app.codesignal.com/arcade/intro/level-12/tQgasP8b62JBeirMS/}
 **/

/** Import ES6 Custom Types [Utils && Helper] Dependencies !*/
import type {/*ArrowFunc, Nullable*/} from "@/types";

/**
 ** @template T
 ** @param {Array<T>} args
 ** @constructor
 ** @returns {Set<T>}
 **/
const HashSet = <T>(...args: Array<T>) => new Set<T>(args);

/**
 ** @returns {boolean} - Return <true> when matching Sudoku Grid Condition.
 **/
const check3xGrid = (matrix: Array<Array<number>>, [x, y]: [number, number]): boolean => {
    if (x % 3 !== 1 || y % 3 !== 1) return true;
    const set = HashSet<number>();
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if (set.has(matrix[i][j])) return false;
            set.add(matrix[i][j]);
        }
    }
    return true;
};

const sudoku = (grid: Array<Array<number>>): boolean => {
    const rowSet = Array.from({length: 9}, () => HashSet<number>());
    const columnSet = Array.from({length: 9}, () => HashSet<number>());
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const value = grid[i][j];
            if (rowSet[i].has(value) || columnSet[j].has(value) || !check3xGrid(grid, [i, j])) {
                return false;
            }
            rowSet[i].add(value);
            columnSet[j].add(value);
        }
    }
    return true;
};

export function solution(matrix: Array<Array<number>>): boolean {
    return sudoku(matrix);
}

export default {};
