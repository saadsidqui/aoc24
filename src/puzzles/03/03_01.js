import { shout, success } from "#utils/console.js";
import { puzzle_input, read_file } from "#utils/filesystem.js";

const memory = read_file(puzzle_input('03'));

const re = /(?<opcode>mul)\((?<operand1>\d{1,3}),(?<operand2>\d{1,3})\)/g;

const matches = memory.matchAll(re);

let totalSum = 0;
for (const {groups} of matches) {
    totalSum += parseInt(groups['operand1']) * parseInt(groups['operand2']);
}

success("The total sum of all valid multiplications is ") + shout(totalSum);
