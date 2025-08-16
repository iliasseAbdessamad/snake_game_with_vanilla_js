import { ShapeError } from "./ShapeError.js";


/**
 * Represents a square
 */
export class Square {

    /**@type {CanvasRenderingContext2D} */
    #ctx;

    /**@type {number} */
    #posX;

    /**@type {number} */
    #posY;

    /**@type {number} */
    #width;

    /**@type {number} */
    #height;

    /**@type {string} */
    #color;

    /**
     * Creates a Square object 
     * 
     * @param {CanvasRenderingContext2D} - A bidimensional redering context of a canvas HTML5 element (used to draw the square)
     * @param {number} posX - The X axis position of the square on the canvas HTML5 element
     * @param {number} posY - The Y axis position of the square on the canvas HTML5 element
     * @param {number} width - The width of the square (on pixels)
     * @param {string} color - The color of the square
     * @throws {Error}  - Will be raised if the given width is less than or equals to 0
     */
    constructor(ctx, posX, posY, width, color) {
        if (width < 0) {
            throw new ShapeError(`A square must have a width greater than 0 (given width is : '${width}')`);
        }

        this.#ctx = ctx;
        this.#posX = posX;
        this.#posY = posY;
        this.#height = this.#width = width;
        this.#color = color;
    }

    draw() {
        this.#ctx.fillStyle = this.#color;
        this.#ctx.fillRect(this.#posX, this.#posY, this.#width, this.#height);
    }

    /**
     * @returns {number} - The position of the square on the X axis
     */
    get posX() {
        return this.#posX;
    }

    /**
     * @returns {number} - The position of the square on the Y axis
     */
    get posY() {
        return this.#posY;
    }

    /**
     * @returns {number} - The width of the square
     */
    get width() {
        return this.#width;
    }

    /**
     * @returns {string} - The color of the square
     */
    get color() {
        return this.#color;
    }

    /**
     * @returns {CanvasRenderingContext2D} - The 2d context
     */
    get ctx() {
        return this.#ctx;
    }
}

