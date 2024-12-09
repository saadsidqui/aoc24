import { shout, success } from "#utils/console.js";
import { puzzle_input, read_lines } from "#utils/filesystem.js";
import { cantor } from "#utils/number.js";

/**
 * @typedef {[number, number]} Point
 * @typedef {1|2|3|4} Direction
 * @typedef {{pos: Point, dir: Direction}} OrientedPoint
 * @typedef {Map.<string, Point>} UniqueVisitedPoints
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
 * @param {OrientedPoint} a
 * @param {OrientedPoint} b
 * @returns {boolean}
 */

/**
 * @param {Point} p
 * @returns {string}
 */
const pointKey = (p) => cantor(p[0], p[1]);

/**
 * @param {OrientedPoint} p
 * @returns {string}
 */
const orientedPointKey = (p) => cantor(cantor(p.pos[0], p.pos[1]), p.dir);

/**
 * @param {OrientedPoint} guard
 * @param {Obstacles} obstacles
 * @returns {UniqueVisitedPoints|false}
 */
const getGuardPath = (guard, obstacles) => {
    const max = 2 * (BOUNDS[0] * BOUNDS[1]);

    /** @type {UniqueVisitedPoints} */
    const path = new Map();

    while (true) {
        const key = pointKey(guard.pos);
        if (!path.has(key))
            path.set(key, structuredClone(guard.pos));

        if (path.size > max)
            return false;

        const next = nextPosition(guard.pos, guard.dir);
        if (outOfBounds(next))
            break;

        if (Object.hasOwn(obstacles, next[0]) && (obstacles[next[0]].includes(next[1]))) {
            guard.dir = nextDirection(guard.dir);
        }

        guard.pos = nextPosition(guard.pos, guard.dir);
    }

    return path;
};

/**
 * @param {OrientedPoint} guard
 * @param {Obstacles} obstacles
 * @param {Set.<string>} visited
 * @returns {boolean|null}
 */
const tryLoop = (guard, obstacles, visited) => {
    visited.add(orientedPointKey(guard));

    const next = nextPosition(guard.pos, guard.dir);
    if (outOfBounds(next))
        return null;

    if (Object.hasOwn(obstacles, next[0]) && (obstacles[next[0]].includes(next[1]))) {
        guard.dir = nextDirection(guard.dir);
    } else {
        guard.pos = nextPosition(guard.pos, guard.dir);
        if (visited.has(orientedPointKey(guard)))
            return true;
    }

    return false;
};


/**
 * @param {Obstacles} obstacles
 * @param {UniqueVisitedPoints} path
 * @param {OrientedPoint} guard
 * @param {Point} start
 * @returns {number}
 */
const findValidPotentialNewObstaclePlacements = (obstacles, path, guard, start) => {
    let count = 0;
    for (const [_, pos] of path) {
        if (isSamePoint(pos, start))
            continue;

        const newObstacles = structuredClone(obstacles);
        if (Object.hasOwn(newObstacles, pos[0])) {
            if (!newObstacles[pos[0]].includes(pos[1])) {
                newObstacles[pos[0]].push(pos[1]);
            }
        } else {
            newObstacles[pos[0]] = [pos[1]];
        }

        const visited = new Set(), newGuard = structuredClone(guard);
        while (true) {
            const isLoop = tryLoop(newGuard, newObstacles, visited);
            if (isLoop === false)
                continue;

            if (isLoop)
                count++;

            break;
        }
    }

    return count;
}

const walkTheWalk = () => {
    const lines = read_lines(puzzle_input('06'), true);
    if (lines.length < 1)
        throw new RangeError('No input data provided');

    BOUNDS[0] = lines[0].length - 1;
    BOUNDS[1] = lines.length - 1;

    /** @type {OrientedPoint} */
    const guard = { pos: [0, 0], dir: UP };

    /** @type {Point} */
    const guardStart = [0, 0];

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
                guardStart[0] = [x]
                guardStart[1] = [y];
                line[x] = VACANT;
            }
        }
    }

    const path = getGuardPath(structuredClone(guard), obstacles);
    if (path === false)
        throw new RangeError('Invalid input data: could not claculate the guard\'s normal path');

    return findValidPotentialNewObstaclePlacements(
        obstacles, path, guard, guardStart
    );
};

console.time('Run');
success('The number of distinct positions the guard will visit before leaving the mapped area is ') +
    shout(walkTheWalk());
console.timeEnd('Run');
