import crypto from "node:crypto";

let _uid = 0;

/**
 * Provide an application-wide unique id
 *
 * @returns {number} A unique id
 */
export const unique_id = () => {
    return _uid++;
};

/**
 * Performs a SHA1 hash on the given payload
 *
 * @param {crypto.BinaryLike} payload Payload to be hashed
 * @returns {string} Hexadecimal representation of the SHA1 hash for the given payload
 */
export const sha1 = (payload) => crypto.createHash('sha1').update(payload).digest('hex');

/**
 * Performs a SHA256 hash on the given payload
 *
 * @param {crypto.BinaryLike} payload Payload to be hashed
 * @returns {string} Hexadecimal representation of the SHA256 hash for the given payload
 */
export const sha256 = (payload) => crypto.createHash('sha256').update(payload).digest('hex');

/**
 * Async sleep();
 *
 * @param {number} ms Milliseconds to sleep. Approximate.
 * @returns {void}
 */
export const wait = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
