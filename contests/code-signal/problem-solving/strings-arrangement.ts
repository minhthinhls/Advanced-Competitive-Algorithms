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
 ** @see {@link https://app.codesignal.com/arcade/intro/level-7/PTWhv2oWqd6p4AHB9/}
 ** @description The following is this published solution URL of Code-Signal Problems.
 ** @see {@link https://app.codesignal.com/arcade/intro/level-7/PTWhv2oWqd6p4AHB9/}
 **/

/** Import ES6 Custom Types [Utils && Helper] Dependencies !*/
import type {ArrowFunc, Nullable} from "@/types";

/**
 ** @returns {boolean} - Return <true> if only one character different.
 ** Otherwise return <false> which is larger than 1 or exactly match 0.
 **/
const compare: ArrowFunc<boolean> = (s1: string, s2: string): boolean => {
    let counter = 0;
    for (let i = 0; i < s1.length; i++) {
        if (s1[i] !== s2[i]) {
            counter++;
        }
        if (counter > 1) { // Handle ["aaa", "aaa"];
            return false;
        }
    }
    return counter === 1;
};

const recursive: ArrowFunc<boolean> = (picked: Nullable<string>, lefts: Array<string>): boolean => {
    if (lefts.length < 2) {
        return compare(picked as string, lefts[0]); // Base-case.
    }
    let __joint__ = false;
    /** Check for all possible arrangements recursively !*/
    for (let i = 0; i < lefts.length; i++) {
        const pick = lefts[i];
        const leftovers = [...lefts.slice(0, i), ...lefts.slice(i + 1)];
        /** In case not different exactly by one character. Skip immediately !*/
        if (picked !== null && !compare(pick, picked)) {
            continue; // For the 1st loop, [picked === null]. So ignore this skip mechanism.
        }
        /** At least 1 permutation satisfy -> Consider: <true> ~!*/
        __joint__ = __joint__ || recursive(pick, leftovers);
    }
    /** The chain must contains all true !!!*/
    return __joint__;
};

export function solution(arr: Array<string>): boolean {
    return recursive(null, arr);
}

export default {};
