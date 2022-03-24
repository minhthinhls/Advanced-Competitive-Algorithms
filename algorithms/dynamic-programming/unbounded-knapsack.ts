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
 ** @description The following is the base URL of Hackerrank Problems.
 ** @see {@link https://www.hackerrank.com/challenges/unbounded-knapsack/problem}
 ** @description The following is the tutorial URL of Hackerrank Problems.
 ** @see {@link https://www.youtube.com/watch?v=8LusJS5-AGo}
 ** @description The following is the Recursion Solution of Hackerrank Problems.
 ** @see {@link https://www.hackerrank.com/challenges/unbounded-knapsack/forum/comments/1012455}
 **/
const io: Array<[[Array<number>, number], number]> = [
    [[[1, 6, 9], 12], 12],
    [[[3, 7, 9], 11], 10],
    [[[3, 7, 9, 11], 13], 13],
    [[[3, 4, 4, 4, 8], 9], 9],
];

export const knapsack = (arr: Array<number>, target: number): number => {
    /** Extract the Highest Expect Stock ~!*/
    console.log(arr, target);
    return 0;
};

io.forEach(([input, output], index) => {
    const result = knapsack(...input);
    return console.log('> @test:', index, 'size:', input.length, 'output:', result, 'expect:', output, 'PASSED:', result === output);
});

export default {};
