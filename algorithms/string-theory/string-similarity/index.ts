"use strict";

/**!*****************************!*
 ** PUT THIS ON MAIN ENTRY FILES !
 ** WRITE RESOLVED PATH IN BOTH FILES
 ** [PACKAGE.JSON] AND [TSCONFIG.JSON]
 **!*****************************!*/
require('module-alias/register');

/** @ts-ignore ~!*/
import reader from "@/reader";

/**
 ** @description The following is the base URL of Hackerrank Problems.
 ** @see {@link https://www.hackerrank.com/challenges/string-similarity/problem}
 ** @tutorial The following is the tutorial URL of Hackerrank Problems.
 ** @see {@link https://www.youtube.com/watch?v=CpZh4eF8QBw}
 **/
const io: Array<[string, number]> = [
    ['aabxaabxcaabxaabxay', 41],
    ['ababbababab', 23],
    ['ababaa', 11],
    ['aaaab', 11],
    ['aa', 3],
];

/**
 ** @description - Further Comparison on the next suffix string.
 ** @example
 ** > const str = ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'b'];
 ** // Because substring from index {[2 -> 7]: ['a', 'b', 'a', 'b', 'a', 'b']}
 ** // Match the prefixed substring {[0 -> 5]: ['a', 'b', 'a', 'b', 'a', 'b']}
 ** > return console.log(fCompare(str, 2, 0) === 6); // true;
 ** @param {string} str
 ** @param {number} currIndex
 ** @param {number} prevIndex
 ** @returns {number}
 **/
const fCompare = (str: string, currIndex: number, prevIndex: number = 0): number => {
    let counter = 0;
    /** The Suffix Index of Pointers. Start from the Begin of String ~!*/
    let prefixIndex = prevIndex;
    let suffixIndex = currIndex;
    let preFixChar = str[prevIndex];
    let sufFixChar = str[currIndex];
    /** @take-note: Be careful of Array Index Out Of Bound Exception ~!*/
    while (preFixChar === sufFixChar && suffixIndex < str.length) {
        counter++;
        preFixChar = str[++prefixIndex];
        sufFixChar = str[++suffixIndex];
    }
    return counter;
};

/**
 ** @description - Time Complexity of this Algorithm is O(N + M).
 ** @description - Space Complexity of this Algorithm is O(N + M).
 ** @test-failed - Only 8/13 Test Passed.
 ** @param {string} str
 ** @returns {string}
 ** @ts-ignore ~!*/
const _similar = (str: string): [number, Array<number>] => {
    let rightBound = -1;
    /** The first value of Z Function should be the length of input string ~!*/
    const Z = [str.length];
    const length = str.length;
    /** Left Bound of Z-Algorithm is the current Index ~!*/
    for (let leftBound = 1; leftBound < length; leftBound++) {
        let currCounter = fCompare(str, leftBound);
        if (currCounter < 2) {
            Z[leftBound] = currCounter;
            continue;
        }
        Z[leftBound] = currCounter;
        /** @see {@link https://www.youtube.com/watch?v=CpZh4eF8QBw&t=480s} ~!*/
        rightBound = leftBound + currCounter - 1;
        /** @example: Here [${currCounter} === 4] according to the following Youtube Video ~!*/
        for (let j = 1; j < currCounter; j++) {
            let prevCounter = Z[j];
            leftBound++; /** Increasing Index as well as Left Bound ~!*/
            /** @see {@link https://www.youtube.com/watch?v=CpZh4eF8QBw&t=640s} ~!*/
            if (prevCounter + leftBound > rightBound) {
                /** @description: Further Comparison here ~!*/
                const furtherCounter = fCompare(str, rightBound + 1, prevCounter);
                prevCounter = (rightBound - leftBound + 1) + furtherCounter;
                rightBound += furtherCounter;
                /** @description: Reset Loop Index after every Further Comparison ~!*/
                j = 0;
                currCounter = prevCounter;
            }
            Z.push(prevCounter);
        }
        /** @description: Avoid wrong current index execution ~!*/
        leftBound--;
    }

    return [Z.reduce((prev, curr) => prev + curr, 0), Z];
};

/**
 ** @description - Time Complexity of this Algorithm is O(N + M).
 ** @description - Space Complexity of this Algorithm is O(N + M).
 ** @test-failed - Only 8/13 Test Passed.
 ** @param {string} str
 ** @returns {string}
 ** @ts-ignore ~!*/
const __similar = (str: string): [number, Array<number>] => {
    let rightBound = -1;
    let cacheIndex = -1;
    /** The first value of Z Function should be the length of input string ~!*/
    const Z = [str.length];
    const length = str.length;
    /** Left Bound of Z-Algorithm is the current Index ~!*/
    for (let leftBound = 1; leftBound < length; leftBound++) {
        if (leftBound > rightBound) {
            const currCounter = fCompare(str, leftBound);
            Z[leftBound] = currCounter;
            rightBound = leftBound + currCounter - 1;
            cacheIndex = leftBound;
            continue;
        }
        let currCounter = Z[leftBound - cacheIndex];
        /** @see {@link https://www.youtube.com/watch?v=CpZh4eF8QBw&t=640s} ~!*/
        if (currCounter + leftBound > rightBound) {
            /** @description: Further Comparison here ~!*/
            const furtherCounter = fCompare(str, rightBound + 1, currCounter);
            currCounter = rightBound - leftBound + 1;
            Z[leftBound] = currCounter + furtherCounter;
            rightBound += furtherCounter;
            /** @description: Reset Loop Index after every Further Comparison ~!*/
            continue;
        }
        Z[leftBound] = currCounter;
    }

    return [Z.reduce((prev, curr) => prev + curr, 0), Z];
};

import similar from "./algorithms";

reader('algorithms/string-theory/string-similarity/input05.txt', (str, line) => {
    const expect = [void 0, void 0, 37987996, 138480603, 82127288, 186551843, 354913330, 11495967, 24137601, 138087, 45302824, 30700625];
    for (let i = 0, j = 1; j < str.length; i++, j++) {
        if (str[i] === str[j]) {
            /* [[Optional Operations Placeholder]] */
        }
    }
    const [count] = similar(str);
    return console.log('> @test:', line, 'size:', str.length, 'output:', count, 'expect:', expect[2], 'PASSED:', count === expect[2]);
}, 2);

io.forEach(([input, output], index) => {
    const [count, _Z] = similar(input);
    return console.log('> @test:', index, 'size:', input.length, 'output:', count, 'expect:', output, 'PASSED:', count === output);
});

export default {};
