import { shout, success } from "#utils/console.js";
import { puzzle_input, read_lines } from "#utils/filesystem.js";

const rules = {}, updates = [];
const lines = read_lines(puzzle_input('05'), true);
for (const line of lines) {
    if (line.includes('|')) {
        const rule = line.split('|').map(n => parseInt(n));
        if (!Object.hasOwn(rules, rule[0])) {
            rules[rule[0]] = {
                before: [],
                after: [],
            };
        }

        if (!Object.hasOwn(rules, rule[1])) {
            rules[rule[1]] = {
                before: [],
                after: [],
            };
        }

        if (!rules[rule[0]].before.includes(rule[1]))
            rules[rule[0]].before.push(rule[1]);

        if (!rules[rule[1]].after.includes(rule[0]))
            rules[rule[1]].after.push(rule[0]);
    } else {
        const update = line.split(',').map(n => parseInt(n));
        if ((update.length % 2) == 0)
            throw new RangeError('Expected update list to contain an odd number of entries.');
        updates.push(update);
    }
}

let sum = 0;

for (const update of updates) {
    let wasValid = true;
    const scores = {}, zeroLen = update.length - 1;
    for (let i = 0; i < update.length; i++) {
        const page = update[i];

        scores[page] = 0;
        if (!Object.hasOwn(rules, page))
            continue;

        const left = rules[page].after.filter(n => (n !== page) && update.includes(n)).length;
        const right = rules[page].before.filter(n => (n !== page) && update.includes(n)).length;

        scores[page] = left - right;

        wasValid &&= (left === i) && (right === zeroLen - i);
    }

    if (wasValid)
        continue;

    const middleIndex = (update.length > 1) ? Math.floor(update.length / 2) : 1;
    sum += update.sort((a, b) => scores[a] - scores[b])[middleIndex];
}

success('The sum of the middle numbers from all the incorrectly-ordered updates after reordering is ') +
    shout(sum);
