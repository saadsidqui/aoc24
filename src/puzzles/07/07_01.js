import { shout, success } from "#utils/console.js";
import { puzzle_input, read_lines } from "#utils/filesystem.js";

/**
 * @typedef {number[]} Operands
 * @typedef {{result: number, operands: Operands}} Calibration
 */

/**
 * @param {Operands} operands
 * @param {Map.<string, number[]>} cache
 * @returns {number[]}
 */
const recurse = (operands, cache) => {
    const key = operands.join('.');
    const cached = cache.get(key);
    if (cached)
        return cached;

    if (operands.length < 2)
        throw RangeError('A minimum of 2 elements is expected.');

    let result = [];
    if (operands.length == 2) {
        result = [(operands[0] + operands[1]), (operands[0] * operands[1])];
    } else {
        const left = operands[0];
        const rights = recurse(operands.slice(1), cache);

        for (const right of rights) {
            for (const n of recurse([left, right], cache)) {
                result.push(n);
            }
        }
    }
    cache.set(key, result);
    return result;
};

const solve = () => {
    const lines = read_lines(puzzle_input('07'), true);
    if (lines.length < 1)
        throw new RangeError('No input data provided');

    let sum = 0;
    for (const line of lines) {
        const parts = line.split(':');
        /** @type {Calibration} */
        const calibration = {
            result: parseInt(parts[0].trim()),
            operands: parts[1].trim().split(' ').map(s => parseInt(s.trim())).reverse(),
        };

        const possibleResults = recurse(calibration.operands, new Map());
        if (possibleResults.includes(calibration.result))
            sum += calibration.result;
    }
    return sum;
}

success('The total calibration result is ') +
    shout(solve());
