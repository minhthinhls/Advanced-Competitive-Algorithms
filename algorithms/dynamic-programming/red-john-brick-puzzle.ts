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
 ** @see {@link https://www.hackerrank.com/challenges/red-john-is-back/problem}
 **/
const io: Array<[number, number]> = [
    [1, 0],
    [3, 0],
    [5, 2],
    [7, 3],
    [8, 4],
];

export const arrange = (bricks: number): number => {
    /** Extract the Highest Expect Stock ~!*/
    console.log(bricks);
    return 0;
};

io.forEach(([input, output], index) => {
    const result = arrange(input);
    return console.log('> @test:', index, 'output:', result, 'expect:', output, 'PASSED:', result === output);
});

export default {};
