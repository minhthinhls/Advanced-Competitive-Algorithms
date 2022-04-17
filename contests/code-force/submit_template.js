/* eslint valid-jsdoc: "off", complexity: "off", no-unused-vars: "off", no-multi-assign: "off", @typescript-eslint/naming-convention: "off" */

/** @ts-nocheck - Turn this on to ignore this file !*/

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
    // Your code goes here
};
