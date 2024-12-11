import { shout, success } from "#utils/console.js";
import { puzzle_input, read_file } from "#utils/filesystem.js";

/**
 * @param {number} n
 * @param {number} depth
 * @param {number} targetDepth
 * @param {Map.<string, number>} cache
 */
const blink = (n, depth, targetDepth, cache) => {
    const key = `${n}.${depth}`;
    const cached = cache.get(key);
    if (cached !== undefined)
        return cached;

    let result = 0;
    const nextDepth = depth + 1;
    if (depth == targetDepth) {
        result = 1;
    } else if (n == 0) {
        result = blink(1, nextDepth, targetDepth, cache);
    } else {
        const str = n.toString();
        if (str.length % 2 == 0) {
            const half = str.length / 2;
            result =
                blink(parseInt(str.substring(0, half)), nextDepth, targetDepth, cache) +
                blink(parseInt(str.substring(half, str.length)), nextDepth, targetDepth, cache);

        } else {
            result = blink(n * 2024, nextDepth, targetDepth, cache);
        }
    }
    cache.set(key, result);
    return result;
};

const solve = () => {
    const stones = read_file(puzzle_input('11'))
        .trim().split(' ').map(s => parseInt(s.trim()));
    if (stones.length < 1)
        throw new RangeError('No input data provided');

    let count = 0, cache = new Map();
    for (const stone of stones)
        count += blink(stone, 0, 75, cache);
    return count;
};

console.time('Run');
success('The number of stones after blinking 75 times is ') +
    shout(solve());
console.timeEnd('Run');
