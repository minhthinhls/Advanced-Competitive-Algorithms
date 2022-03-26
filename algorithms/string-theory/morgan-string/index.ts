"use strict";

/**!*****************************!*
 ** PUT THIS ON MAIN ENTRY FILES !
 ** WRITE RESOLVED PATH IN BOTH FILES
 ** [PACKAGE.JSON] AND [TSCONFIG.JSON]
 **!*****************************!*/
require('module-alias/register');

/**
 ** @description The following is the base URL of Hackerrank Problems.
 ** @see {@link https://www.hackerrank.com/challenges/morgan-and-a-string/problem}
 ** @description The following is this published solution URL of Hackerrank Problems.
 ** @see {@link https://www.hackerrank.com/challenges/morgan-and-a-string/forum/comments/1101785}
 **/
const io: Array<[[string, string], string]> = [
    [['JACK', 'DANIEL'], 'DAJACKNIEL'],
    [['ABACABA', 'ABACABA'], 'AABABACABACABA'],
];

/**
 ** @description - To hacky solve this un-manner documentation without Dynamic Programming.
 ** @description - Time Complexity of this Algorithm is O(N).
 ** @overcome - The reason why appending 'z' is due to this character does not affect comparison operator {a < b}.
 ** @param {string} a
 ** @param {string} b
 ** @returns {Generator<string>}
 **/
const gMorgan = function* (a: string, b: string) {
    a += 'z';
    b += 'z';

    while (a !== 'z' || b !== 'z') {
        if (a < b) {
            yield a[0];
            a = a.slice(1);
        } else {
            yield b[0];
            b = b.slice(1);
        }
    }
};

/**
 ** @description - To hacky solve this un-manner documentation without Dynamic Programming.
 ** @description - Time Complexity of this Algorithm is O(N).
 ** @overcome - The reason why appending 'z' is due to this character does not affect comparison operator {a < b}.
 ** @param {string} a
 ** @param {string} b
 ** @returns {string}
 **/
const fMorgan = (a: string, b: string) => {
    a += 'z';
    b += 'z';
    let str = '';

    while (a !== 'z' || b !== 'z') {
        /**
         ** @take-note: When you dont append 'z' at the end of string. The following Operation
         ** @operation: {a < b} will work incorrectly. Since '' is falsy -> ['' < 'ABC' === true]
         ** @overcome: Append 'z' to the end will result in ['z' < 'ABCz' === false]
         ** ~!*/
        if (a < b) {
            str += a[0];
            a = a.slice(1);
        } else {
            str += b[0];
            b = b.slice(1);
        }
    }
    return str;
};

const morganAndString = (a: string, b: string) => {
    return [...gMorgan(a, b)].join("");
};

io.forEach(([input, output], index) => {
    console.log('> @test:', index, morganAndString(...input) === output);
    return console.log('> @test:', index, fMorgan(...input) === output);
});

export default {};
