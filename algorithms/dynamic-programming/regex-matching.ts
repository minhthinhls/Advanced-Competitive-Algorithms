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

/** @ts-ignore ~!*/
import reader from "@/reader";

/**
 ** @description The following is the base URL of Leet-Code Problems.
 ** @see {@link https://leetcode.com/problems/regular-expression-matching/}
 ** @description The following is the Dynamic Programming Solution for this Leet-Code Problems.
 ** @see {@link https://www.youtube.com/watch?v=l3hda49XcDE/}
 **/
const io: Array<[[string, string], boolean]> = [
    [["aa", "a"], false],
    [["aa", "a*"], true],
    [["ab", ".*"], true],
    [["xaabyc", "xa*b.c"], true],
];

/**
 ** @description - Replace multiple wildcard `***` into single `*`
 ** @example
 ** > reduce('abc***def**gh*'); // Returns 'abc*def*gh*';
 ** @param {string} str
 ** @returns {string}
 **/
export const reduce = (str: string): string => {
    const size = str.length;
    let strBuilder = '';
    for (let i = 0; i < size; i++) {
        const curr = str[i];
        const top = strBuilder[strBuilder.length - 1];
        if (top !== "*" || curr !== "*") {
            strBuilder += curr;
        }
    }
    return strBuilder;
};

export const match = (str: string, card: string): boolean => {
    /** Append exactly one space before each string for Empty Wild-card Comparison ~!*/
    str = ' ' + str;
    card = ' ' + reduce(card);
    /** Construct 2D Matrix Array with all <FALSE> value ~!*/
    const T = Array.from({length: str.length}, () => new Array(card.length).fill(0));
    T[0][0] = 1; // Since "" will always equals "";
    /** Dealing with RegExp Pattern as [`a*`, `a*b*`, `a*b*c*`] ~!*/
    for (let i = 1 ; i < card.length; i++) {
        if (card[i] === "*") {
            /** The above patterns will match empty string "" at the beginning ~!*/
            T[0][i] = T[0][i - 2];
        }
    }
    for (let i = 1; i < str.length; i++) {
        for (let j = 1; j < card.length; j++) {
            /** When the current character match. Check for the cached of previous character ~!*/
            if (card[j] === "." || str[i] === card[j]) {
                T[i][j] = T[i - 1][j - 1];
            } else if (card[j] === "*") {
                /** Consider `---a*` with `a*` behave as empty matcher `` !*/
                T[i][j] = T[i][j - 2]; // Remove `a*` from Regex and check cached from previous 2 steps [[_LEFT_]].
                /** Either Regex has `---.*` or `---a*`. This will always match character `a` pick [Left] or [Top] value !*/
                if (card[j - 1] === "." || card[j - 1] === str[i]) {
                    /** Thus we can consider `a` belongs to multi-match `a*` -> Pick from the [[_TOP_]] ~!*/
                    /** @see {@link https://www.youtube.com/watch?v=l3hda49XcDE&t=620s} ~!*/
                    T[i][j] = T[i][j] || T[i - 1][j]; // Use cached value from the 2-steps [[_LEFT_]] or from the [[_TOP_]].
                }
            } else {
                T[i][j] = 0;
            }
        }
    }
    return Boolean(T[str.length - 1][card.length - 1]);
};

io.forEach(([input, output], index) => {
    const result = match(...input);
    return console.log('> @test:', index, 'size:', input.length, 'output:', result, 'expect:', output, 'PASSED:', result === output);
});

export default {};
