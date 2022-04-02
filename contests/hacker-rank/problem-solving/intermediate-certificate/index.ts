/* eslint valid-jsdoc: "off", complexity: "off", no-unused-vars: "off", @typescript-eslint/naming-convention: "off" */

/** @ts-nocheck - Turn this on to ignore this file !*/

"use strict";

/**!*****************************!*
 ** PUT THIS ON MAIN ENTRY FILES !
 ** WRITE RESOLVED PATH IN BOTH FILES
 ** [PACKAGE.JSON] AND [TSCONFIG.JSON]
 **!*****************************!*/
require("module-alias/register");

/** Import ES6 Custom Types [Utils && Helper] Dependencies !*/
import type {/*ArrowFunc*/} from "@/types";

/**
 ** @param {number} arraySize
 ** @param {number} maxArraySum
 ** @param {number} startIndex
 ** @returns {number}
 ** @ts-ignore ~!*/
const maxElement = (arraySize: number, maxArraySum: number, startIndex: number): number => {
    // Write your code here
    let step = 0;
    let leftBound = startIndex;
    let rightBound = startIndex;
    let sum = arraySize;
    while (sum <= maxArraySum) {
        step++;
        const dLeft = startIndex - leftBound--;
        const dRight = rightBound++ - startIndex;
        if (leftBound < 0) {
            leftBound = 0;
        }
        if (rightBound >= arraySize) {
            rightBound = arraySize - 1;
        }
        /** The cost to increase all adjacent value by 1 ~!*/
        const cost = dLeft + dRight + 1;
        sum += cost;
    }
    return step;
}

export default {};
