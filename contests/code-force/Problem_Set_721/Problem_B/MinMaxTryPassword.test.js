const passwords = ['aa', 'bb', 'cc', 'cba', 'abc', 'bb1', 'abC', 'ABC', 'abc'];

/**
 ** @param {Array<string>} arr
 ** @param {number} maxFailed
 ** @param {number} blockTime
 ** @param {Object} mapper
 **/
const calculateMinMaxTry = (arr, maxFailed = 2, blockTime = 5, mapper = new Array(100)) => {
    /** @type {number} - The last elements is the real password. Thus skip it !*/
    const listPasswordLength = arr.length - 1;
    /** Looping through the whole array dynamically to store display frequency of each password !*/
    for (let i = 0; i < listPasswordLength; i++) {
        const currElement = arr[i];
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
    const correctPassword = arr[listPasswordLength];
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
    console.log("Mapper:", mapper);
    console.log("Min Step:", minStep);
    console.log("Max Step:", maxStep);

    /** Be careful, you must handle the following case. Suppose [maxFailed = 2 && blockTime = 5] then
     ** minStep = 2 then only 2 seconds, maxStep = 6 then only ((6-2)/2 + 6) = 10 seconds !*/
    const justOnMinTime = minStep % maxFailed === 0 ? blockTime : 0;
    const justOnMaxTime = maxStep % maxFailed === 0 ? blockTime : 0;
    return [
        Math.floor(minStep / maxFailed) * blockTime + minStep - justOnMinTime,
        Math.floor(maxStep / maxFailed) * blockTime + maxStep - justOnMaxTime,
    ];
};

console.log('> Result:', calculateMinMaxTry(passwords));
