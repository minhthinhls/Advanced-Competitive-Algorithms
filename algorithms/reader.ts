/* eslint valid-jsdoc: "off", complexity: "off", no-unused-vars: "off", @typescript-eslint/naming-convention: "off" */

/** @ts-nocheck - Turn this on to ignore this file !*/

"use strict";

/** Import Node Native Dependencies !*/
import * as fs from "fs";
/** Import Node Native Dependencies !*/
import * as path from "path";
/** Import Node Native Dependencies !*/
import * as readline from "readline";

/** Import ES6 Custom Types [Utils && Helper] Dependencies !*/
import type {/*ArrowFunc*/} from "@/types";

/**!*****************************!*
 ** PUT THIS ON MAIN ENTRY FILES !
 ** WRITE RESOLVED PATH IN BOTH FILES
 ** [PACKAGE.JSON] AND [TSCONFIG.JSON]
 **!*****************************!*/
require("module-alias/register");

export const __FileReader__ = (filePath: string) => readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, '..', `${filePath}`)),
    crlfDelay: Infinity,
});

export default (filePath: string, callback: (data: string, line: number) => any, line?: Array<number> | number) => {
    let currLine = 0;
    __FileReader__(filePath).on('line', (data) => {
        currLine += 1;
        if (!line) {
            return callback(data, currLine);
        }
        if (typeof line === "object" && Array.isArray(line)) {
            return line.includes(currLine) && callback(data, currLine);
        }
        if (line !== currLine) {
            return void 0;
        }
        return callback(data, currLine);
    });
};
