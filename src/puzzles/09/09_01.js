import { shout, success } from "#utils/console.js";
import { puzzle_input, read_file, read_lines } from "#utils/filesystem.js";

const isEven = (index) => (index % 2) == 0;

const stackBlocks = (map, count, id) => {
    for (let i = 0; i < count; i++) map.push(id)
};

const solve = () => {
    const layout = read_file(puzzle_input('09'))
        .trim().split('')
        .map(n => parseInt(n));
    if (layout.length < 1)
        throw new RangeError('No input data provided');


    const fileMap = [];
    let j = layout.length - 1;
    for (let i = 0; i < layout.length; i++) {
        if (isEven(i)) {
            stackBlocks(fileMap, layout[i], i / 2);
            continue;
        }

        while (layout[i] > 0) {
            if (i >= j)
                break;

            if (!isEven(j) || (layout[j] < 1)) {
                j--;
                continue;
            }

            const count = Math.min(layout[i], layout[j]);
            stackBlocks(fileMap, count, j / 2);
            layout[i] -= count;
            layout[j] -= count;
        }
    }

    const checksum = fileMap.reduce((acc, n, i) => acc += i * n, 0);
    return checksum;
}

console.time('Run');
success('The resulting filesystem checksum is ') +
    shout(solve());
console.timeEnd('Run');
