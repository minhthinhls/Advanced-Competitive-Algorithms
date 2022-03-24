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
 ** @see {@link https://www.hackerrank.com/challenges/stockmax/problem}
 **/
const io: Array<[Array<number>, number]> = [
    [[5, 3, 2], 0],
    [[1, 2, 100], 197],
    [[1, 3, 1, 2], 3],
    [[1, 3, 5, 5, 3, 2], 6],
];

export const stockMax = (prices: Array<number>): number => {
    /** Clone the original array for creating Await Max Stock Array ~!*/
    const _prices = [...prices];
    /** Firstly must sort the array ~!*/
    _prices.sort((a, b) => a - b);
    /** Create counter via frequency HashMap ~!*/
    const frequencyMap: Record<number, number> = {};
    for (let i = 0; i < _prices.length; i++) {
        const value = _prices[i];
        if (!frequencyMap[value]) {
            frequencyMap[value] = 1;
            continue;
        }
        frequencyMap[value]++;
    }
    let dailyMaxStock = _prices.pop() as number;
    let profit = 0;
    /** Loop the original array and await for the highest stock to appear ~!*/
    for (let i = 0; i < prices.length; i++) {
        const stock = prices[i];
        /** TODO: Reduce the counter of that value by 1 after every iteration ~!*/
        frequencyMap[stock]--;
        if (stock !== dailyMaxStock) {
            /** TODO: Keep stock ~!*/
            profit += dailyMaxStock - stock;
        } else {
            dailyMaxStock = 0;
            /** TODO: Sell stock & Pop new maxStock. If counter maxStock -> 0, then reduce to another maxStock via pop() ~!*/
            while (!dailyMaxStock) {
                /** Algorithm ends since there were no more day to check ~!*/
                if (_prices.length < 1) {
                    return profit;
                }
                const nextDailyMaxStock = _prices.pop() as number;
                if (frequencyMap[nextDailyMaxStock] < 1) {
                    continue;
                }
                dailyMaxStock = nextDailyMaxStock;
            }
        }
    }
    /** Extract the Highest Expect Stock ~!*/
    return profit;
};

io.forEach(([input, output], index) => {
    const maxStock = stockMax(input);
    return console.log('> @test:', index, 'size:', input.length, 'output:', maxStock, 'expect:', output, 'PASSED:', maxStock === output);
});

export default {};
