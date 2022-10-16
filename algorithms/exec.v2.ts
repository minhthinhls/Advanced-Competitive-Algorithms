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
// require('./dynamic-programming/stock-maximize');
// require('./dynamic-programming/unbounded-knapsack');
// require('./dynamic-programming/wildcard-matching');
// require('./dynamic-programming/regex-matching');
// require('$/contests/code-signal/problem-solving/count-black-cells');

/** @filepath: `${C:\Users\MinhThinh}` ~!*/
// require('../../../cluster.test.sh');
// require('../../../mongo-cluster.sh');
// require('../../../mongo-cluster.bat');
// require('../../../mongo-compose.yml');
// require('../../../mongod-master.bat');
// require('../../../mongod-slave-1.bat');
// require('../../../mongod-slave-2.bat');

/**
 ** @param {Array<number>} arr
 ** @returns number
 ** @ts-ignore ~!*/
function solution(arr: Array<number>): number {
    for (let i = 1; i < arr.length; i++) {
        // const prev = arr[i - 1];
        // const curr = arr[i];
    }

    return 0;
}

/**
 ** - Longest Adjacent Increasing Sub-Sequence
 ** @see {@link https://www.youtube.com/watch?v=cjWnW0hdF1Y} - NOT THIS PROBLEM. JUST FOR REFERENCE !!!
 ** @example
 ** > lis([1, 2, 5, 3, 7, 4]) === [3, 2, 1, 2, 1, 1];
 ** @param {Array<number>} arr
 ** @ts-ignore ~!*/
const lis = (arr: Array<number>): Array<number> => {
    const size = arr.length;
    const counter: Array<number> = new Array(size).fill(1);
    for (let i = size - 2; i >= 0; i--) {
        if (arr[i] < arr[i + 1]) {
            counter[i] += counter[i + 1];
        }
    }
    return counter;
};

// console.log(lis([1, 2, 5, 3, 7, 4]));
//                  [3, 2, 1, 2, 1, 1];

let str = '';
const mapper: {[p: string]: number} = {};
for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (!mapper[char]) {
        mapper[char] = 1;
    } else {
        mapper[char]++;
    }
}

/**
 ** @description - Make sure hashed in `${smaller}-${larger}` value
 ** @param {number} a
 ** @param {number} b
 ** @returns {string}
 ** @ts-ignore ~!*/
const hash = (a: number, b: number): string => {
    if (a < b) {
        return a + '-' + b;
    }
    return b + '-' + a;
};

/**
 ** @param {number} a
 ** @param {number} b
 ** @returns {number}
 ** @ts-ignore ~!*/
const gcd = (a: number, b: number): number => {
    if (!b) return a;
    return gcd(b, a % b);
};

/**
 ** @param {number} n
 ** @returns {number}
 ** @ts-ignore ~!*/
const sumDigits = (n: number): number => {
    let sum = 0;
    while (n > 0) {
        const mod = n % 10;
        sum += mod;
        n = (n - mod) / 10;
    }
    return sum;
};

/** @description - Function to count the divisors !*/
const countDivisors = (n: number): number => {
    let counter = 0;
    for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i == 0) {
            /** If divisors are equal, count only one !*/
            if (n / i === i) counter++;
            /** Otherwise count both !*/
            else counter = counter + 2;
        }
    }
    return counter;
};

/**
 ** @param {number} start
 ** @param {number} finish
 ** @returns {Array<number>}
 ** @ts-ignore ~!*/
const range = (start: number, finish: number): Array<number> => {
    if (finish < start) return [];
    return Array.from({length: finish - start + 1}, () => start++);
};

/**
 ** @param {Array<number>} args
 ** @returns {number}
 ** @ts-ignore ~!*/
const sum = (...args: Array<number>): number => {
    return args.reduce((prev, curr) => prev + curr, 0);
};

/** @description - Solve this problem within O(N*sqrt(N)) Time-Complexity
 ** @ts-ignore ~!*/
const weak = (n: number): [number, number] => {
    const mapper: {[p: number]: number} = {};
    const weakness = new Array(n).fill(0);
    let maxDiv = 0;
    for (let i = 1; i <= n; i++) {
        const nDiv = countDivisors(i);
        if (nDiv > maxDiv) maxDiv = nDiv;
        if (!mapper[nDiv]) {
            mapper[nDiv] = 1;
        } else {
            mapper[nDiv]++;
        }
        weakness[i - 1] = range(nDiv + 1, maxDiv).reduce((prev, curr) => {
            if (!mapper[curr]) return prev;
            return prev + mapper[curr];
        }, 0);
    }
    const max = Math.max(...weakness);
    return [max, weakness.reduce((prev, curr) => {
        return curr === max ? prev + 1 : prev;
    }, 0)];
};

(() => {
    // console.log('>', sum(...range(1,3)));
    console.log(6 / Math.sqrt(2));
    console.log('gcd:', gcd(26, 30));
    return void 0;
})();

/*import {Heap} from "@/utils";
const heap = new Heap<number>([1, 3, 5, 4, 6, 13, 10, 9, 8, 15, 17]/!*.sort(() => .5 - Math.random())*!/);
heap.print(); heap.build(); heap.print(); heap.push(100); heap.print();
console.log('max:', heap.pop()); heap.print();*/

export default {};
