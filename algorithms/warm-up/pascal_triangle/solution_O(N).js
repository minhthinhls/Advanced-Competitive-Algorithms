/**
 ** @param {number} lines - Số dòng cần in.
 **/
const exec = (lines) => {
    let left = "";
    let right = "";
    let toggle = false;
    let spaces = " ".repeat(lines - 1);
    process.stdout.write(spaces + "1" + "\n");
    for (let i = 2; i <= lines; i++) {
        const first_last = i % 10;
        left = `${first_last} ` + left;
        right = right + `${first_last} `;
        if (i > 2) {
            if (toggle) {
                /** Remove the last number of left hand-side and its space !*/
                left = left.slice(0, -2);
            } else {
                /** Remove the first number of right hand-side and its space !*/
                right = right.slice(2);
            }
        }
        toggle = !toggle;
        /** Print padding spaces before !*/
        process.stdout.write(`${spaces = spaces.slice(0, -1)}${left}${right}`);
        /** Jump to new line !*/
        console.log();
    }
};

exec(40);
