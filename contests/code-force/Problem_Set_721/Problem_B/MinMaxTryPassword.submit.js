"use strict";

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", (inputStdin) => {
    inputString += inputStdin;
});

process.stdin.on("end", () => {
    inputString = inputString.split("\n");
    main();
});

/**
 ** - Please refer to the following URL for LICENSE
 ** - {@link https://gitlab.com/naks.studycare/problem-solving-with-javascript-and-node.js/-/blob/master/template.js}
 **/
const readline = () => {
    return inputString[currentLine++];
};

/**
 ** - Please refer to the following URL for LICENSE
 ** - {@link https://gitlab.com/naks.studycare/problem-solving-with-javascript-and-node.js/-/blob/master/template.js}
 **/
const print = (val) => {
    console.log(val);
};

/**
 ** - ********** Code Start **********
 ** - Please refer to the following URL for LICENSE
 ** - {@link https://gitlab.com/naks.studycare/problem-solving-with-javascript-and-node.js/-/blob/master/template.js}
 **/
const main = () => {
    /** @type {number} - The last elements is the real password. Thus skip it !*/
    const [listPasswordLength, maxFailed] = readline().split(" ").map(Number);
    /** Storing Display Frequency by Password Length !*/
    const mapper = {};

    /** Looping through the whole array dynamically to store display frequency of each password !*/
    for (let i = 0; i < listPasswordLength; i++) {
        const currElement = readline();
        /** Index on array based on elements length !*/
        const currIndex = currElement.length - 1;
        /** @type {Object} - Object store counter of each password !*/
        const countStorage = mapper[currIndex];
        if (countStorage !== undefined && countStorage instanceof Object) {
            if (countStorage[currElement] !== undefined && typeof countStorage[currElement] === "number") {
                countStorage[currElement]++;
                mapper[currIndex]['size']++;
                continue;
            }
            mapper[currIndex][currElement] = 1;
            mapper[currIndex]['size']++;
            continue;
        }
        mapper[currIndex] = {size: 1, [currElement]: 1};
    }
    const correctPassword = readline();
    const correctPasswordIndex = correctPassword.length - 1;
    const numCorrectPassword = mapper[correctPasswordIndex][correctPassword];

    /** Now after having all the Frequency Mapper and Number Correct Password Appears, then
     ** counting for the min & max step according to the Length Mapper !*/
    let defaultStep = 0;
    for (let i = 0; i < correctPassword.length - 1; i++) {
        const size = mapper[i] && mapper[i]['size'];
        if (size) {
            defaultStep += size;
        }
    }
    /** @type {number} - All password that has the same length compared to correct password !*/
    const batchSize = mapper[correctPasswordIndex] && mapper[correctPasswordIndex]['size'];
    /** @type {Array<number>} !*/
    const [minStep, maxStep] = [defaultStep + 1, defaultStep + batchSize - numCorrectPassword + 1];

    const justOnMinTime = minStep % maxFailed === 0 ? 5 : 0;
    const justOnMaxTime = maxStep % maxFailed === 0 ? 5 : 0;
    return print((Math.floor(minStep / maxFailed) * 5 + minStep - justOnMinTime) + " " + (Math.floor(maxStep / maxFailed) * 5 + maxStep - justOnMaxTime));

};
