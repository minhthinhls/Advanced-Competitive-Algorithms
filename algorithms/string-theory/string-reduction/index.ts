"use strict";

/**!*****************************!*
 ** PUT THIS ON MAIN ENTRY FILES !
 ** WRITE RESOLVED PATH IN BOTH FILES
 ** [PACKAGE.JSON] AND [TSCONFIG.JSON]
 **!*****************************!*/
require('module-alias/register');

/**
 ** @description The following is the base URL of Hackerrank Problems.
 ** @see {@link https://www.hackerrank.com/challenges/string-reduction/problem}
 **/
import {Stack} from "@/utils/index";

const mapReducer: {[p: string]: string} = {
    ab: 'c',
    ba: 'c',
    ac: 'b',
    ca: 'b',
    bc: 'a',
    cb: 'a',
};

/**
 ** @description - Will failed on these kind of following test case ['aaaabbbb'] and ['cbbcccc'].
 ** @description - Time Complexity of this Algorithm is O(N).
 ** @param {string} str
 ** @returns {number}
 **/
const reduceV1 = (str: string) => {
    /** TODO: To solve case ['aaaabbbb'] and ['cbbcccc'] -> Count all element and arrange them in [maxFrequency, ..., minFrequency] ~!*/
    const stack = new Stack<string>(`${str[0]}`);
    /** Start Looping from the 2nd item ~!*/
    for (let i = 1; i < str.length; i++) {
        let top = stack.peek();
        let curr = str[i];
        // console.log('->', stack, 'top', top, 'curr', curr);
        if (curr !== 'a' && curr !== 'b' && curr !== 'c') {
            throw new EvalError(">>> Do not use Array with value other than [a, b, c] <<<");
        }
        /**
         ** @example
         ** > Stack = [b, b, a] | curr = b
         ** > The top value is 'a';
         **/
        while (curr !== top && stack.size() > 0) {
            // console.log(stack, 'top', top, 'curr', curr);
            top = stack.pop() as string;
            const pair = top + curr;
            curr = mapReducer[pair];
            top = stack.peek();
        }
        /**
         ** @take-note - Make sure to push back the dangling curr value.
         ** @example
         ** > Stack = [] | curr = b
         ** > Stack.push(curr) -> Stack = [b];
         **/
        stack.push(curr);
    }
    return stack.size();
};

/**
 ** You MUST SOLVE this case
 ** @example
 ** > 'aaaa bbbb' -> aa a c b bb -> aa b bbb -> ac bbb -> FAILED [bbbb] -> MUST BE [aa / bb]
 ** ~!*/
const args = ['cab', 'bcab', 'ccccc', 'aaaabbbb', 'bbbcbbaca', 'cbbccccc']; // -> aa/bb, not `bbbb`
args.forEach((str) => {
    return console.log(str, '->', reduceV1(str));
});

/**
 ** @description - For solving Problem in Version 1.
 ** @description - Time Complexity of this Algorithm is O(N).
 ** @take-note: TODO: Count all element and arrange them in [maxFrequency, ..., minFrequency].
 ** @param {string} str
 ** @returns {number}
 **/
const reduceV2 = (str: string) => {
    return str && 0;
};

args.forEach((str) => {
    return console.log(str, '=>', reduceV2(str));
});

/**
 ** @description - To hacky solve this un-manner documentation without Dynamic Programming.
 ** @description - Time Complexity of this Algorithm is O(N).
 ** @param {string} str
 ** @returns {number}
 **/
const reduceV3 = (str: string) => {
    const length = str.length;
    let [na, nb, nc] = [0, 0, 0];
    /** Count Displaying Frequency of all element ~!*/
    for (let i = 0; i < length; i++) {
        const char = str[i];
        switch (char) {
            case 'a':
                na++;
                break;
            case 'b':
                nb++;
                break;
            case 'c':
                nc++;
                break;
        }
    }
    while (true) {
        /** Return immediately when string has every same character. Ex: ['aaa', 'bbb', 'ccc'] ~!*/
        if (na === 0 && nb === 0) break;
        if (nb === 0 && nc === 0) break;
        if (nc === 0 && na === 0) break;

        /** Reduce the 2 largest counter by 1. And increase the smallest counter by 1 ~!*/
        if (na >= nb && nb >= nc) {na--; nb--; nc++}
        else if (na >= nc && nc >= nb) {na--; nc--; nb++}
        else if (nb >= na && na >= nc) {nb--; na--; nc++}
        else if (nb >= nc && nc >= na) {nb--; nc--; na++}
        else if (nc >= na && na >= nb) {nc--; na--; nb++}
        else if (nc >= nb && nb >= na) {nc--; nb--; na++}
    }
    return na + nb + nc;
};

args.forEach((str) => {
    return console.log(str, '===>', reduceV3(str))
});

export default {};
