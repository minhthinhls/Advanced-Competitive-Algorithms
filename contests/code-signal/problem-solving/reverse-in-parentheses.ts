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
 ** @see {@link https://app.codesignal.com/arcade/intro/level-3/9DgaPsE2a7M6M2Hu6}
 ** @description The following is this published solution URL of Code-Signal Problems.
 ** @see {@link https://app.codesignal.com/arcade/intro/level-3/9DgaPsE2a7M6M2Hu6}
 **/

/** Import ES6 Custom Types [Utils && Helper] Dependencies !*/
import type {/*ArrowFunc*/} from "@/types";

/**
 ** @param {string} str - This has type of `abcd(efgh(ijkl)(mnop))`;
 **/
const reverse = (str: string): string => {
    let strBuilder = '';
    const lastIndex = str.length - 1;
    for (let i = lastIndex; i >= 0; i--) {
        strBuilder += str[i];
    }
    return strBuilder;
};

/**
 ** @param {string} str - This has type of `abcd(efgh(ijkl)(mnop))`;
 ** @ts-ignore ~!*/
const resolve = (str: string): string => {
    let finalStr = '';
    let depth = 0;
    /** For recursion strategy !*/
    let stack = '';
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char === "(") {
            depth++;
            stack += "(";
            continue;
        }
        if (char === ")") {
            depth--;
            stack += ")";
            if (depth === 0) {
                /** Remove parentheses: stack === `(45(789))` -> `45(789)`; */
                finalStr += resolve(stack.slice(1, stack.length - 1));
                stack = ''; // Clear Stack;
            }
            continue;
        }

        if (depth === 0) {
            finalStr += char;
        } else {
            stack += char;
        }
    }
    return reverse(finalStr);
};

export default {};
