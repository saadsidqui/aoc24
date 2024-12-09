import { shout, success } from "#utils/console.js";
import { puzzle_input, read_lines } from "#utils/filesystem.js";
import { cantor } from "#utils/number.js";

/**
 * @typedef {[number, number]} Point
 * @typedef {1|2|3|4} Direction
 * @typedef {{pos: Point, dir: Direction}} OrientedPoint
 * @typedef {OrientedPoint & {start: Point}} Guard
 * @typedef {{[x: number]: number[]}} Obstacles
 */

const OBSTACLE = '#', VACANT = '.';
const UP = 1, RIGHT = 2, DOWN = 3, LEFT = 4;

/** @type {Point} */
const BOUNDS = [0, 0];

/**
 * @param {Direction} dir
 * @returns {Direction}
 */
const nextDirection = (dir) => (dir == LEFT) ? UP : ++dir;

/**
 * @param {Point} pos
 * @param {Direction} dir
 * @returns {Point}
 */
const nextPosition = (pos, dir) => {
    if (dir == UP) return [pos[0], pos[1] - 1];
    else if (dir == RIGHT) return [pos[0] + 1, pos[1]];
    else if (dir == DOWN) return [pos[0], pos[1] + 1];
    else return [pos[0] - 1, pos[1]];
};

/**
 * @param {Point} pos
 * @returns {boolean}
 */
const outOfBounds = (pos) =>
    (pos[0] < 0) || (pos[1] < 0) ||
    (pos[0] > BOUNDS[0]) || (pos[1] > BOUNDS[1]);

/**
 * @param {Point} a
 * @param {Point} b
 * @returns {boolean}
 */
const isSamePoint = (a, b) => (a[0] == b[0]) && (a[1] == b[1]);

/**
 * @param {Guard} guard
 * @param {Obstacles} obstacles
 * @param {Set.<string>} visited
 * @returns {boolean}
 */
const getGuardPath = (guard, obstacles, visited) => {
    visited.add(cantor(guard.pos[0], guard.pos[1]));

    const next = nextPosition(guard.pos, guard.dir);
    if (outOfBounds(next))
        return false;

    if (Object.hasOwn(obstacles, next[0]) && (obstacles[next[0]].includes(next[1]))) {
        guard.dir = nextDirection(guard.dir);
    } else {
        guard.pos = nextPosition(guard.pos, guard.dir);
    }

    return true;
};

const walkTheWalk = () => {
    const lines = read_lines(puzzle_input('06'), true);
    if (lines.length < 1)
        throw new RangeError('No input data provided');

    BOUNDS[0] = lines[0].length - 1;
    BOUNDS[1] = lines.length - 1;

    /** @type {Guard} */
    const guard = { start: [0, 0], pos: [0, 0], dir: UP };
    /** @type {Obstacles} */
    const obstacles = {};

    for (let y = 0; y < lines.length; y++) {
        const line = lines[y] = lines[y].split('');
        if (line.length !== lines[0].length)
            throw new RangeError('Invalid input data: map width mismatch');

        for (let x = 0; x < line.length; x++) {
            if (line[x] == VACANT)
                continue;

            if (line[x] == OBSTACLE) {
                if (!Object.hasOwn(obstacles, x)) obstacles[x] = [y];
                else obstacles[x].push(y);
            } else {
                guard.pos = [x, y];
                guard.start = [x, y];
                line[x] = VACANT;
            }
        }
    }

    const visited = new Set();
    do { } while (getGuardPath(guard, obstacles, visited));

    return visited.size;
};

console.time('Run');
success('The number of distinct positions the guard will visit before leaving the mapped area is ') +
    shout(walkTheWalk());
console.timeEnd('Run');
