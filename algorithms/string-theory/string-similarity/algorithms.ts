/* eslint valid-jsdoc: "off", complexity: "off", no-unused-vars: "off", @typescript-eslint/naming-convention: "off" */

/** @ts-nocheck - Turn this on to ignore this file !*/

"use strict";

/** Import ES6 Custom Types [Utils && Helper] Dependencies !*/
import type {/*ArrowFunc*/} from "@/types";

/**!*****************************!*
 ** PUT THIS ON MAIN ENTRY FILES !
 ** WRITE RESOLVED PATH IN BOTH FILES
 ** [PACKAGE.JSON] AND [TSCONFIG.JSON]
 **!*****************************!*/
require("module-alias/register");

/**
 ** @example
 ** > const set = genPrefixHashSet('abcdefgh');
 ** > // set === Set(['a', 'ab', 'abc', 'abcd', 'abcde', 'abcdef', 'abcdefg', 'abcdefgh']) ;
 ** @param {string} str
 ** @returns {Set<string>}
 ** @ts-ignore ~!*/
export const genPrefixHashSet = (str: string): Set<string> => {
    const __HashSet__ = new Set<string>();
    const length = str.length;
    let curr = '';
    for (let i = 0; i < length; i++) {
        const char = str[i];
        __HashSet__.add(curr += char);
    }
    return __HashSet__;
};

/**
 ** @example
 ** > const set = genSuffixArray('abcdefgh');
 ** > // set === Set(['abcdefgh', 'bcdefgh', 'cdefgh', 'defgh', 'efgh', 'fgh', 'gh', 'h']) ;
 ** @param {string} str
 ** @returns {Set<string>}
 ** @ts-ignore ~!*/
export const genSuffixArray = (str: string): Set<string> => {
    const __HashSet__ = new Set<string>();
    const length = str.length;
    let curr = '';
    for (let i = 0; i < length; i++) {
        const char = str[i];
        __HashSet__.add(curr += char);
    }
    return __HashSet__;
};

/**
 ** @description - Time Complexity of this Algorithm is O(N + M).
 ** @description - Space Complexity of this Algorithm is O(N + M).
 ** @param {string} str
 ** @returns {[number, Array<number>]}
 **/
export const __Z_Algorithm__ = (str: string): [number, Array<number>] => {
    let leftBound = 0;
    let rightBound = 0;
    /** The first value of Z Function should be the length of input string ~!*/
    const Z = [str.length];
    const length = str.length;

    for (let i = 1; i < length; i++) {
        if (i > rightBound) {
            /** @description: Refresh Boundary Box to the latest current Index ~!*/
            leftBound = rightBound = i;
            /** @description: Conventional Comparable Operation to find the Frequency Number ~!*/
            while (rightBound < length && str[rightBound] === str[rightBound - leftBound]) {
                rightBound++;
            }
            /** @description: The Display Frequency are actually the width of the Box ~!*/
            Z[i] = rightBound - leftBound;
            /** @description: The Right Bound of the Box must not contains the different character ~!*/
            rightBound--;
            continue;
        }
        /** @description: Since the current Index smaller than Right Bound. Current Operation fallen into Close Box ~!*/
        const prev = i - leftBound;
        /** @description: Whether the cached value not yet exceed Right Bound ~!*/
        if (Z[prev] + i < rightBound + 1) {
            Z[i] = Z[prev];
            continue;
        }
        /** @description: Further Comparison on Exceeding Right Boundary ~!*/
        leftBound = i;
        /** @description: Box Comparable Operation to find the Frequency Number ~!*/
        while (rightBound < length && str[rightBound] === str[rightBound - leftBound]) {
            rightBound++;
        }
        /** @description: The Display Frequency are actually the width of the Box ~!*/
        Z[i] = rightBound - leftBound;
        /** @description: The Right Bound of the Box must not contains the different character ~!*/
        rightBound--;
    }

    return [Z.reduce((prev, curr) => prev + curr, 0), Z];
};

export default __Z_Algorithm__;
