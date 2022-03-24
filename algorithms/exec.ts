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

// require('./graph-theory/search/a-star');
// require('./string-theory/string-reduction');
// require('./string-theory/morgan-string');
// require('./string-theory/string-similarity');

import {Heap} from "@/utils";

const heap = new Heap<number>([1, 3, 5, 4, 6, 13, 10, 9, 8, 15, 17]/*.sort(() => .5 - Math.random())*/);
heap.print();
heap.build();
heap.print();
heap.push(100);
heap.print();
console.log('max:', heap.pop());
heap.print();

export default {};
