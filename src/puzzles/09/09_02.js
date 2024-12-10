import { shout, success } from "#utils/console.js";
import { puzzle_input, read_file, read_lines } from "#utils/filesystem.js";

const isEven = (index) => (index % 2) == 0;

const stackBlocks = (map, base, count, id) => {
    for (let i = base; i < base + count; i++)
        map[i] = id;
};

const solve = () => {
    const blockCount = [0], free = [];
    const layout = read_file(puzzle_input('09'))
        .trim().split('')
        .map((n, i) => {
            n = parseInt(n);
            blockCount.push(blockCount[i] + n);
            free.push(isEven(i) ? 0 : n);
            return n;
        });

    if (layout.length < 1)
        throw new RangeError('No input data provided');

    const fileMap = Array(blockCount[blockCount.length - 1]).fill(0);

    for (let i = 0; i < layout.length; i++) {
        if (isEven(i))
            stackBlocks(fileMap, blockCount[i], layout[i], i / 2);
    }

    for (let i = layout.length - 1; i > -1; i--) {
        if (!isEven(i))
            continue;

        let j = null;
        for (j = 0; j < free.length; j++) {
            if (free[j] >= layout[i])
                break;
        }
        if (j >= i)
            continue;

        const id = i / 2;

        free[j] -= layout[i];
        free[i - 1] += layout[i];

        for (let k = 0; k < layout[i]; k++) {
            fileMap[blockCount[j] + k] = id;
            fileMap[blockCount[i] + k] = 0;
        }
        blockCount[j] += layout[i];
    }

    const checksum = fileMap.reduce((acc, n, i) => acc += i * n, 0);
    return checksum;
}

console.time('Run');
success('The resulting filesystem checksum is ') +
    shout(solve());
console.timeEnd('Run');
