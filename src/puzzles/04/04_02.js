import { shout, success } from "#utils/console.js";
import { puzzle_input, read_lines } from "#utils/filesystem.js";

const rows = read_lines(puzzle_input('04'), true).map(l => l.split(''));

const target = 'XMAS', targetLen = target.length - 1;

// Meh, prebake trivial matrix rotations
const masks = [
    [
        ['M', null, 'M'],
        [null, 'A', null],
        ['S', null, 'S'],
    ],
    [
        ['S', null, 'M'],
        [null, 'A', null],
        ['S', null, 'M'],
    ],
    [
        ['S', null, 'S'],
        [null, 'A', null],
        ['M', null, 'M'],
    ],
    [
        ['M', null, 'S'],
        [null, 'A', null],
        ['M', null, 'S'],
    ],
];

let appearances = 0;
for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
        if (
            (y > (rows.length - masks[0].length)) &&
            (x > (- masks[0][0].length))
        ) {
            break;
        }

        for (const mask of masks) {
            let match = true;
            for (let j = 0; j < mask.length; j++) {
                for (let i = 0; i < mask[j].length; i++) {
                    const m = mask[j][i];
                    if (m === null) continue;

                    if (rows[y + j][x + i] != m) {
                        match = false;
                        break;
                    }
                }

                if (match == false)
                    break;
            }

            if (match)
                appearances++;
        }
    }
}

success('The words "XMAS" appears a total of ') + shout(`${appearances} times`);
