import { shout, success } from "#utils/console.js";
import { puzzle_input, read_file } from "#utils/filesystem.js";

const memory = read_file(puzzle_input('03'));

const re = /(?<opcode>mul|do|don't)\((?:(?<operand1>\d{1,3}),(?<operand2>\d{1,3}))?\)/g;

const matches = memory.matchAll(re);

let totalSum = 0, execFlag = true;
for (const {groups} of matches) {
    switch (groups['opcode']) {
        case 'mul':
            if (execFlag)
                totalSum += parseInt(groups['operand1']) * parseInt(groups['operand2']);
            break;

        case 'do':
            execFlag = true;
            break;

        default:    // "don't"
            execFlag = false;
            break;
    }
}

success("The total sum of all valid multiplications is ") + shout(totalSum);
