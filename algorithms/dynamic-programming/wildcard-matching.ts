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
 ** @see {@link https://leetcode.com/problems/wildcard-matching/}
 ** @description The following is the Dynamic Programming Solution for this Leet-Code Problems.
 ** @see {@link https://www.youtube.com/watch?v=3ZDZ-N0EPV0/}
 **/
const io: Array<[[string, string], boolean]> = [
    [["aa", "a"], false],
    [["aa", "*"], true],
    [["cb", "?a"], false],
    [["xaylmz", "x?y*z"], true],
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
    if (card[1] === "*") {
        T[0][1] = 1; // Whether first character is "*" then initiate this to <TRUE>.
    }
    for (let i = 1; i < str.length; i++) {
        for (let j = 1; j < card.length; j++) {
            if (card[j] === "?" || str[i] === card[j]) {
                T[i][j] = T[i - 1][j - 1];
            } else if (card[j] === "*") {
                /** Either pick [Left] or [Top] value !*/
                T[i][j] = T[i][j - 1] || T[i - 1][j];
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
