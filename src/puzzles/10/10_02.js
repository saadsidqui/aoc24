import { shout, success } from "#utils/console.js";
import { puzzle_input, read_lines } from "#utils/filesystem.js";
import { cantor } from "#utils/number.js";
import { Point } from "#utils/Point.js";

/** @type {Point} */
const ORIGIN = new Point(0, 0), BOUNDS = new Point(0, 0);

/**
 * @param {number[][]} map
 * @param {Point} pos
 * @param {number} depth
 * @param {Point} bounds
 * @param {Map.<number, number>} cache
 * @returns {Number}
 */
const explore = (pos, depth, map, cache) => {
    const pos_code = pos.hash();
    const key = cantor(pos_code, depth);
    const cached = cache.get(key);
    if (cached !== undefined)
        return cached;

    const height = map[pos.y][pos.x];
    let result = 0;

    if (depth !== height) {
        result = 0;
    } else if ((depth == 9) && (height == 9)) {
        result = 1;
    } else {
        for (const [x, y] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            const pt = new Point(pos.x + x, pos.y + y);
            if (pt.intersects(ORIGIN, BOUNDS))
                result += explore(pt, depth + 1, map, cache);
        }
    }
    cache.set(key, result);
    return result;
};

const solve = () => {
    const map = read_lines(puzzle_input('10'), true);
    if (map.length < 1)
        throw new RangeError('No input data provided');

    BOUNDS.set(map[0].length - 1, map.length - 1);

    for (let y = 0; y < map.length; y++) {
        const row = map[y] = map[y].split('').map(n => parseInt(n));
        if (row.length !== map[0].length)
            throw new RangeError('Invalid input data: map width mismatch');
    }

    const cache = new Map();
    let scores = 0;
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] !== 0)
                continue;
            scores += explore(new Point(x, y), 0, map, cache, []);
        }
    }

    return scores
};

console.time('Run');
success('The sum of the ratings of all trailheads is ') +
    shout(solve());
console.timeEnd('Run');
