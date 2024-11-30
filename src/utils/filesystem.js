import path from "node:path";
import url from "node:url";
import fs from 'node:fs';
import isBlank from "voca/is_blank.js";


/**
 * Get the path to a given day's puzzle directory
 *
 * @param {string} day Day for which to retrieve the path
 * @returns {string} Path to a given day's puzzle directory
 */
export const puzzle_path = (day) => path.join(
    path.dirname(url.fileURLToPath(import.meta.url)), '..', 'puzzles', day ?? ''
);

/**
 * Get the path to a given day's puzzle input file
 *
 * @param {string|number} day Day for which to retrieve the path
 * @param {string} [filename='input.txt'] File name, defaults to `input.txt`
 * @returns {string} Path to a given day's puzzle input file
 */
export const puzzle_input = (day, filename = 'input.txt') => path.join(puzzle_path(day), filename);

const read_file_default_options = {
    encoding: 'utf-8',
    flag: 'r'
};

/**
 * Read file content as a string
 *
 * @param {string} filepath Path to file to be read
 * @returns {string} File content
 */
export const read_file = (filepath) =>
    fs.readFileSync(filepath, read_file_default_options);

/**
 * Read file content as an array of lines
 *
 * @param {string} filepath Path to file to be read
 * @param {boolean} [filterBlanks=false] If true, filters out blank lines
 * @returns {string} File content
 */
export const read_lines = (filepath, filterBlanks = false) => {
    let result = read_file(filepath).split("\n");
    return filterBlanks ? result.filter(line => !isBlank(line)) : result;
};
