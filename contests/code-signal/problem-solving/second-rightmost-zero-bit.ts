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
 ** @see {@link https://app.codesignal.com/arcade/code-arcade/corner-of-0s-and-1s/9nSj6DgqLDsBePJha/}
 ** @description The following is this published solution URL of Code-Signal Problems.
 ** @see {@link https://qelifeblog.wordpress.com/2017/06/24/codefights-second-rightmost-zero-bit/}
 **/

/** Import ES6 Custom Types [Utils && Helper] Dependencies !*/
import type {/*ArrowFunc, Nullable*/} from "@/types";

export function solution(n: number, k?: number): number {
    return ~(k = n | n + 1) & k + 1;
}

export default {};
