import { cantor } from "./number.js";

export class Point {
    constructor(x, y) {
        this.set(x, y);
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
    clone() { return new Point(this.x, this.y) };
    collides(topLeft, bottomRight) {
        return (this.x >= topLeft.x) && (this.y >= topLeft.y) &&
            (this.y <= bottomRight.x) && (this.y <= bottomRight.y);
    }
    distance(that) {
        return new Point(Math.abs(this.x - that.x), Math.abs(this.y - that.y));
    }
    equals(that) { return (this.x == that.x) && (this.y == that.y) }
    flip() { return new Point(this.y, this.x); }
    magnitude() { return Math.sqrt((this.x * this.x) + (this.y * this.y)) }
    substract(that) {
        return new Point(this.x - that.x, this.y - that.y);
    }
    substractFrom(that) {
        return that.substract(this);
    }
    hash() { return cantor(this.x, this.y) }
    toString() { return `(${this.x}, ${this.y})`; }
}
