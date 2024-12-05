import { shout, success } from "#utils/console.js";
import { puzzle_input, read_lines } from "#utils/filesystem.js";

const rows = read_lines(puzzle_input('04'), true).map(l => l.split(''));

const makeMasks = (word) => {
    const result = [], zeroLen = word.length - 1;
    let horiz;
    let vert;
    let diag1 = [];
    let diag2 = [];

    for (let y = 0; y < word.length; y++) {
        horiz = [], vert = [];
        for (let x = 0; x < word.length; x++) {
            horiz.push([x, y]);
            vert.push([y, x]);

            if (x == y) {
                diag1.push([x, y]);
                diag2.push([(word.length - 1) - x, y]);
            }
        }

        result.push(horiz);
        result.push(vert);
    }
    result.push(diag1);
    result.push(diag2);

    return result;
};

const makeKey = (x1, y1, x2, y2) => `[${x1},${y1}]..[${x2},${y2}]`;

const target = 'XMAS', targetLen = target.length - 1;
const masks = makeMasks(target);
const visited = new Set();

let appearances = 0;
for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
        if (
            (y > (rows.length - target.length)) &&
            (x > (- target.length))
        ) {
            break;
        }

        for (const baseMask of masks) {
            const mirroredMasks = [baseMask, baseMask.toReversed()];

            for (const mask of mirroredMasks) {
                const key = makeKey(
                    x + mask[0][0], y + mask[0][1], x + mask[targetLen][0], y + mask[targetLen][1]
                );
                if (visited.has(key))
                    continue;

                let pos = 0;
                for (const [i, j] of mask) {
                    if (rows[y + j][x + i] != target[pos]) {
                        break;
                    }
                    pos++;
                }

                if (pos === target.length) {
                    appearances++;
                    visited.add(key);
                }
            }
        }
    }
}

success('The words "XMAS" appears a total of ') + shout(`${appearances} times`);
