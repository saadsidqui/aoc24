/**
 * Parses an integer.
 * If `radix` is not provided, assumes a radix of 10.
 *
 * @param {Number} val Value to be parsed
 * @param {Number} [radix=10] Radix
 * @returns {?Number} Parsed integer or null on failure
 */
export const to_int = (val, radix) => {
    const result = parseInt(val, radix ?? 10);
    return (isNaN(result) ? null : result);
}

/**
 * Parses a float.
 *
 * @param {Number} val Value to be parsed
 * @returns {?Number} Parsed float or null on failure
 */
export const to_float = (val) => {
    const result = parseFloat(val);

    if (isNaN(result) || !isFinite(result))
        return null;

    return result;
}

/**
 * Clamps a number between to the specified range.
 *
 * @param {Number} value Value to be clamped
 * @param {Number} min Lower bound
 * @param {Number} max Upper bound
 * @returns {Number} Clamped number
 */
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * Calculates the greatest common divisor of two numbers
 *
 * @param {number} a First number
 * @param {number} b Second number
 * @returns {number} Greatest common divisor of `a` and `b`
 */
export const gcd = (a, b) => {
    if (a < b) {
        let swap = a;
        a = b;
        b = swap;
    }

    let r;
    while ((r = a % b) > 0) {
        a = b;
        b = r;
    }
    return b;
};

/**
 * Calculates the least common multiple of two numbers
 *
 * @param {number} a First number
 * @param {number} b Second number
 * @returns {number} Least common multiple of `a` and `b`
 */
export const lcm = (a, b) => ((a | b) === 0) ? 0 : Math.abs(a) * (Math.abs(b) / gcd(a, b));

/**
 * Calculates the Cantor pairing function of two numbers
 *
 * @param {number} x First number
 * @param {number} y Second number
 * @returns {number} Cantor pairing function of `x` and `y`
 */
export const cantor = (x, y) => (((x + y) * (x + y + 1)) / 2) + y;
