/**
 ** - Cộng số lên 1 đơn vị, nếu số lớn hơn 10 chỉ lấy phần đơn vị.
 ** @param {number} _number
 ** @param {number} [_by] - Default by 1
 ** @returns {number}
 **/
const plus = (_number, _by = 1) => {
    const number = _number + _by;
    return number >= 10 ? number % 10 : number;
};

/**
 ** - Giảm số đi 1 đơn vị, nếu số bé hơn 0 quay ngược lại số 9.
 ** @param {number} _number
 ** @param {number} [_by] - Default by 1
 ** @returns {number}
 **/
const minus = (_number, _by = 1) => {
    /** Chỉ lấy phần đơn vị cuối cùng để trừ !*/
    const by = _by % 10;
    /** Case 1: {_number = 3} bé hơn {_by = 9} [|3 + 10 - 9| == 4] !*/
    if (by > _number) {
        return _number + 10 - _by;
    }
    /** Case 2: {_number = 9} lớn hơn {_by = 3} [|9 - 3| == 6] !*/
    return _number - by;
};

/**
 ** @param {number} line - Vị trí dòng hiện tại.
 ** @param {number} center - Chữ số tại trung tâm của dòng này [1, 1.5, 2.0, 2.5, 3.0, ...rest];
 **/
const print_line = (line, center) => {
    /** Handle Base Case !*/
    if (line === 1) {
        return console.log("1");
    }
    if (line === 2) {
        return console.log("2 2");
    }
    /** Chữ số bắt đầu mỗi dòng !*/
    let curr = line % 10;
    /** Dòng thứ bao nhiêu thì in bấy nhiêu chữ số !*/
    for (let i = 0; i < line; i++) {
        if (i > center) {
            curr = plus(curr);
        }
        process.stdout.write(`${curr} `);
        if (i < center) {
            curr = minus(curr);
        }
    }
    /** Jump to new line !*/
    return console.log();
};

/**
 ** @param {number} lines - Số dòng cần in.
 **/
const exec = (lines) => {
    for (let i = 1; i <= lines; i++) {
        /** Print padding spaces before !*/
        for (let s = 0; s < lines - i; s++) {
            process.stdout.write(" ");
        }
        print_line(i, (i - 1) / 2);
    }
};

exec(40);
