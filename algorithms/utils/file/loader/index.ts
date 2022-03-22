/**!*****************************!*
 ** PUT THIS ON MAIN ENTRY FILES !
 ** WRITE RESOLVED PATH IN BOTH FILES
 ** [PACKAGE.JSON] AND [TSCONFIG.JSON]
 **!*****************************!*/
require("module-alias/register");

import * as path from "path";
/** Import Glob Dependencies !*/
import * as globFileMatcher from "glob"; // import globFileMatcher = require('glob');

/** Import Global Globs Defined Types !*/
import type {IOptions} from "glob";

/**
 ** @see {@link https://github.com/isaacs/node-glob#options} - Click to see Glob Options
 ** @template GInstance, TOptions
 ** @param {GInstance} inject
 ** @param {string} [targetPath]
 ** @param {TOptions} [options]
 ** @returns {void}
 **/
export const __FileLoader__ = <GInstance, TOptions extends IOptions = IOptions>(inject: GInstance, targetPath?: string, options?: TOptions) => {
    const rootDir = path.resolve(__dirname, "../../../..");
    globFileMatcher(`${rootDir}/${targetPath || 'app/router/**/*.js'}`, {...options}, (error, files) => {
        if (error) throw error;
        files.forEach((file) => require(file)(inject));
    });
};

/** For ES5 Import Statement !*/
module.exports = {
    exec: __FileLoader__,
};
