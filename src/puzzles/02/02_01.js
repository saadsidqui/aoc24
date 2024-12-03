import { shout, success } from "#utils/console.js";
import { puzzle_input, read_lines } from "#utils/filesystem.js";

const reports = read_lines(puzzle_input('02'), true)
    .map(l => l.split(' ').map(x => parseInt(x)));

/**
 * @param {number[]} levels
 * @returns {boolean}
 */
const isSafeReport = (levels) => {
    const signs = {[1]: 0, [-1]: 0};
    for (let i = 1; i < levels.length; i++) {
        const diff = levels[i] - levels[i - 1];
        const distance = Math.abs(diff);
        if ((distance < 1)||(distance > 3))
            return false;
        signs[Math.sign(diff)]++;
    }
    return (signs[1] < 1) || (signs[-1] < 1);
};

let totalSafeReports = 0;
for (const levels of reports) {
    if (isSafeReport(levels))
        totalSafeReports++;
}

success("The total number of safe reports is ") + shout(totalSafeReports);
