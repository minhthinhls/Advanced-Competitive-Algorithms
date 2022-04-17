/* eslint valid-jsdoc: "off", complexity: "off", no-unused-vars: "off", @typescript-eslint/naming-convention: "off" */

/** @ts-nocheck - Turn this on to ignore this file !*/

"use strict";

/**!*****************************!*
 ** PUT THIS ON MAIN ENTRY FILES !
 ** WRITE RESOLVED PATH IN BOTH FILES
 ** [PACKAGE.JSON] AND [TSCONFIG.JSON]
 **!*****************************!*/
require("module-alias/register");

/** @ts-ignore ~!*/
import reader from "@/reader";

/**
 ** @description The following is the base URL of Code-Signal Problems.
 ** @see {@link https://app.codesignal.com/arcade/code-arcade/loop-tunnel/RcK4vupi8sFhakjnh/}
 ** @description The following is this published solution URL of Code-Signal Problems.
 ** @see {@link https://app.codesignal.com/arcade/code-arcade/loop-tunnel/RcK4vupi8sFhakjnh/}
 **/
const io: Array<[[number, number], number]> = [
    /** All divisible pairs ~!*/
    [[1, 9], 9], // GCD == 1
    [[2, 4], 6], // GCD == 2
    [[4, 16], 22], // GCD == 4
    [[3, 9], 13], // GCD == 3
    [[9, 45], 61], // GCD == 9
    [[33, 99], 163], // GCD == 33
    /** All indivisible pairs with [GCD == 1] ~!*/
    [[3, 4], 6], // GCD == 1
    [[2, 5], 6], // GCD == 1
    [[7, 3], 7 + 3 - 1], // GCD == 1
    [[11, 3], 11 + 3 - 1], // GCD == 1
    [[11, 7], 11 + 7 - 1], // GCD == 1
    [[27, 7], 27 + 7 - 1], // GCD == 1
    [[17, 13], 17 + 13 - 1], // GCD == 1
    [[89, 33], 89 + 33 - 1], // GCD == 1
    /** All indivisible pairs with [GCD != 1] ~!*/
    [[33, 44], 86], // GCD == 11
    [[33, 45], 79], // GCD == 3
    [[33, 88], 130], // GCD == 11
    [[66666, 88888], 177774], // GCD == 22222
];

/** Import ES6 Custom Types [Utils && Helper] Dependencies !*/
import type {/*ArrowFunc, Nullable*/} from "@/types";

/**
 ** @param {number} a
 ** @param {number} b
 ** @returns {number}
 **/
export const gcd = (a: number, b: number): number => {
    if (!b) return a;
    return gcd(b, a % b);
};

/**
 ** @description - Count Cross-Section Black Cells
 ** @param {number} n
 ** @param {number} m
 ** @returns {number}
 **/
export const count = (n: number, m: number): number => {
    if (n > m) {
        let s = n;
        n = m;
        m = s;
    }
    let r = 0, t = 0, s = 0;
    for (let i = 0; i < n / gcd(m, n); i++) {
        t = m / n + r;
        s += Math.ceil(t);
        r = (t - 0.000001) % 1;
    }
    return gcd(m, n) * s + (gcd(m, n) - 1) * 2;
};

export const solution = (m: number, n: number): number => {
    const [max, min] = [Math.max(m, n), Math.min(m, n)];
    /** @example [[1x2 -> 2], [2x4 -> 6], [4x8 -> 14], [8x16 -> 30]] */
    if (max % min === 0) { // Which mean: [GCD(max, min) == min]
        /** @example: [(max / min) * (min)] is the basic of each row !*/
        /** @example: [+2] is the extra points from 1st and last row !*/
        /** @example: [2 * (min - 2)] is the extra points between 2nd and last row !*/
        return (min) * (max / min) + 2 * (min - 2) + 2; // Expression: [max + 2 * min - 2];
    }
    if (gcd(m, n) === 1) {
        return max + min - 1;
    }
    return max + min + gcd(m, n) - 2;
};

export const fastest = (m: number, n: number): number => {
    return m + n + gcd(m, n) - 2;
};

io.forEach(([input, output], index) => {
    const result = fastest(...input);
    return console.log('> @test:', index, 'input:', input, 'output:', result, 'expect:', output, 'PASSED:', result === output);
});

export default {};
