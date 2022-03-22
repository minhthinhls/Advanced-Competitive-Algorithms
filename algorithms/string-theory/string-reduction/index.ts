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
    const stack = new Stack<string>(`${str[0]}`);
    /** Start Looping from the 2nd item ~!*/
    for (let i = 1; i < str.length; i++) {
        let top = stack.peek();
        let curr = str[i];
        if (curr !== 'a' && curr !== 'b' && curr !== 'c') {
            throw new EvalError(">>> Do not use Array with value other than [a, b, c] <<<");
        }
        /**
         ** @example
         ** > Stack = [b, b, a] | curr = b
         ** > The top value is 'a';
         **/
        while (curr !== top && stack.size() > 0) {
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
 ** > 'aaaabbbb' -> aaa[c]bbb -> aa[b]bbb -> a[c]bbb -> FAILED [bbbb] -> MUST BE [aa / bb]
 ** ~!*/
const args = ['cab', 'bcab', 'ccccc', 'aaaabbbb', 'bbbcbbaca', 'cbbccccc'];
args.forEach((str) => {
    return console.log(str, '->', reduceV1(str));
});

declare type Key = 'a' | 'b' | 'c';

const topologicalKeySort = (object: Object) => {
    const keys = Object.keys(object);
    const sorted = keys.map((key) => {
        return [key, {[key]: object[key]}] as [string, Object];
    }).sort(([k1, o1], [k2, o2]) => {
        return o1[k1] > o2[k2] ? -1 : 1;
    }).reduce((prev, [key, object]) => {
        prev[key] = object[key];
        return prev;
    }, {} as Object);
    return sorted as Record<Key, number>;
};

const getCounter = (): Record<Key, number> & Required<{sortKey: () => Record<Key, number>}> => {
    const counter = {a: 0, b: 0, c: 0};
    Object.assign(Object.getPrototypeOf(counter), {sortKey: () => topologicalKeySort(counter)});
    return counter as Record<Key, number> & Required<{sortKey: () => Record<Key, number>}>;
};

/**
 ** @description - For solving Problem in Version 1.
 ** @description - Time Complexity of this Algorithm is O(N).
 ** @take-note: TODO: Count all element and arrange them in [maxFrequency, ..., minFrequency].
 ** @param {string} str
 ** @returns {number}
 **/
const reduceV2 = (str: string) => {
    const length = str.length;
    const counter = getCounter();
    /** Count Displaying Frequency of all element ~!*/
    for (let i = 0; i < length; i++) {
        const char = str[i];
        switch (char) {
            case 'a':
                counter.a++;
                break;
            case 'b':
                counter.b++;
                break;
            case 'c':
                counter.c++;
                break;
        }
    }
    /** @Step1: Re-Arrange Array [a, b, c, b, c, c, c, c] into [c, c, c, c, c, b, b, a] ~!*/
    let sortStr = '';
    const counterArr = [...Object.keys(counter.sortKey())] as [Key, Key, Key];
    for (const key of counterArr) {
        /** Frequency display of current key ~!*/
        const frequency = counter[key];
        for (let i = 0; i < frequency; i++) {
            sortStr += key;
        }
    }

    /**
     ** @take-note: TODO: This function still failed at ['b', 'b', 'b', 'b', 'a', 'a', 'a', 'a'].
     ** @description - Because it has not yet decided favourable traversing segment.
     ** @example
     ** @step1: ['b', 'b', 'b', 'c', 'a', 'a', 'a']; // Num A equals Num B left.
     ** @step2: ['b', 'b', 'a', 'a', 'a', 'a']; // Must take the segment between [a] and [b].
     ** @step3: ['b', 'c', 'a', 'a', 'a']; // Not at this point, do not take [b] and [c]. Instead take [c] and [a].
     ** @step4: ['b', 'b', 'a', 'a']; // Num A equals Num B left.
     ** @step5: ['b', 'c', 'a']; // Num A equals Num B left.
     ** @step6: ['a', 'a'] || ['b', 'b']; // Either take [b] and [c] or [c] and [a].
     ** ~!*/
    return reduceV1(sortStr);
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
