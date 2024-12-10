import { shout, success } from "#utils/console.js";
import { puzzle_input, read_lines } from "#utils/filesystem.js";
import { Point } from "#utils/Point.js";

/**
 * @typedef {{[freq: string]: Point[]}} FrequencyAntennas
 */

const ORIGIN = new Point(0, 0), BOUNDS = new Point(0, 0);
const VACANT = '.';

const solve = () => {
    const lines = read_lines(puzzle_input('08'), true);
    if (lines.length < 1)
        throw new RangeError('No input data provided');

    BOUNDS.set(lines[0].length - 1, lines.length - 1);

    /** @type {FrequencyAntennas} */
    const frequencies = {};
    for (let y = 0; y < lines.length; y++) {
        const line = lines[y] = lines[y].split('');
        if (line.length !== lines[0].length)
            throw new RangeError('Invalid input data: map width mismatch');

        for (let x = 0; x < line.length; x++) {
            const frequency = line[x];
            if (frequency == VACANT)
                continue;

            if (!Object.hasOwn(frequencies, frequency))
                frequencies[frequency] = [];

            frequencies[frequency].push(new Point(x, y));
        }
    }

    const locations = new Set();
    for (const frequency in frequencies) {
        if (!Object.hasOwn(frequencies, frequency))
            continue;

        const antennas = frequencies[frequency];
        for (let i = 0; i < antennas.length; i++) {
            for (let j = i + 1; j < antennas.length; j++) {
                const diff = antennas[j].substract(antennas[i]);
                const base = [antennas[i], antennas[j]];

                for (let k = 0; k < 2; k++) {
                    locations.add(base[k].toString());

                    let inBounds = true, antinode;
                    while (inBounds) {
                        antinode = base[k][k == 0 ? 'substract' : 'add'](diff);
                        if (inBounds = antinode.intersects(ORIGIN, BOUNDS)) {
                            locations.add(antinode.toString());
                            base[k] = antinode;
                        }
                    }
                }
            }
        }
    }

    return locations.size;
}

console.time('Run');
success('The number of unique locations within the bounds of the map containing an antinode is ') +
    shout(solve());
console.timeEnd('Run');
