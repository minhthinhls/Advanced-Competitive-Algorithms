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
 ** @description The following is the base URL of Hackerrank Problems.
 ** @see {@link https://app.codesignal.com/arcade/intro/level-2/2mxbGwLzvkTCKAJMG}
 ** @description The following is this published solution URL of Code Signal Problems.
 ** @see {@link https://stackoverflow.com/questions/43017251/solve-almostincreasingsequence-codefights}
 **/

/** Import ES6 Custom Types [Utils && Helper] Dependencies !*/
import type {/*ArrowFunc*/} from "@/types";

/**
 ** @param {Array<number>} arr
 ** @param {number} deleteIndex
 ** @returns {Array<number>}
 ** @param deleteIndex
 **/
const remove = (arr: Array<number>, deleteIndex: number): Array<number> => {
    const _1st_Half = arr.slice(0, deleteIndex);
    const _2nd_Half = arr.slice(deleteIndex + 1, arr.length);
    return [..._1st_Half, ..._2nd_Half];
};

const partition = (arr: Array<number>): [number, number] | void => {
    /** Return the first index of a pair of elements where the earlier
     ** element is not less than the later elements. If no such pair
     ** exists, return <void> !*/
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] >= arr[i]) {
            return [i - 1, i];
        }
    }
    return void 0;
};

/**
 ** @param {Array<number>} arr
 ** @returns {boolean}
 ** @ts-ignore ~!*/
const solution = (arr: Array<number>): boolean => {
    /** Return whether it is possible to obtain a strictly increasing
     ** sequence by removing no more than one element from the array. */
    const pivot = partition(arr);
    if (!pivot) {
        return true; // Array already in increasing order.
    }
    const [_1st_Pivot, _2nd_Pivot] = pivot;
    // Imma solve this problem within Order(N) Time Complexity.
    if (!partition(remove(arr, _1st_Pivot))) {
        return true;
    }
    return !partition(remove(arr, _2nd_Pivot));
}

export default {};
