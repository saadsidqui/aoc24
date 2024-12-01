import { shout, success } from "#utils/console.js";
import { puzzle_input, read_lines } from "#utils/filesystem.js";

const lines = read_lines(puzzle_input('01'), true);

const left = []; const right = [];

for (const line of lines) {
    const [l, r] = line.split('   ');

    left.push(l);
    right.push(r);
}

const sortCallback = (a, b) => a - b;
left.sort(sortCallback);
right.sort(sortCallback);

let totalDistance = 0;
for (let i = 0; i < lines.length; i++) {
    totalDistance += Math.abs(left[i] - right[i]);
}

success("The total distance is ") + shout(totalDistance);
