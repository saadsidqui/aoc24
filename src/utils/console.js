import pc from "picocolors"

export const say = console.log;
export const shout = (...args) => console.log(pc.bold(pc.white(args)));
export const whisper = (...args) => console.log(pc.italic(pc.dim(args)));
export const error = (...args) => console.log(pc.red(args));
export const warning = (...args) => console.log(pc.yellow(args));
export const success = (...args) => console.log(pc.green(args));
export const info = (...args) => console.log(pc.cyan(args));
