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
 ** @see {@link https://app.codesignal.com/arcade/code-arcade/corner-of-0s-and-1s/b5z4P2r2CGCtf8HCR/}
 ** @description The following is this published solution URL of Code-Signal Problems.
 ** @see {@link https://app.codesignal.com/arcade/code-arcade/corner-of-0s-and-1s/b5z4P2r2CGCtf8HCR/}
 **/

/** Import ES6 Custom Types [Utils && Helper] Dependencies !*/
import type {/*ArrowFunc, Nullable*/} from "@/types";

export function solution(n: number, k: number): number {
    /** @Step1: 1 << (k - 1)
     ** @example: k === 3
     ** @returns: 0001 -> 1000 === 8 ~!*/
    /**--------------------------------*/
    /** @Step2: Flip all bits
     ** @example: ~(1 << (k - 1))
     ** @returns: 1000 -> 0111 ~!*/
    /**--------------------------------*/
    /** @Step3: Join all bits
     ** @example: n == 12 == 1100
     ** @returns: [1100 & 0111] === 0100 ~!*/
    return n & ~(1 << (k - 1)); // Turn-off Kth-bits
}

export default {};
