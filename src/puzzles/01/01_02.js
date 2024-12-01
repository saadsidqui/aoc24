import { shout, success } from "#utils/console.js";
import { puzzle_input, read_lines } from "#utils/filesystem.js";

const lines = read_lines(puzzle_input('01'), true);

const frequency = {}; const right = [];

for (const line of lines) {
    const [l, r] = line.split('   ');

    if (!Object.hasOwn(frequency, l))
        frequency[l] = 0;

    right.push(r);
}

for (const r of right) {
    if (Object.hasOwn(frequency, r))
        frequency[r]++;
}

let totalSimilarityScore = 0;
for (const i in frequency) {
    if (!Object.hasOwn(frequency, i))
        continue;
    totalSimilarityScore += i * frequency[i];
}

success("The similarity score is ") + shout(totalSimilarityScore);
