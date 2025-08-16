
import { Square } from "../Square.js";
import { ShapeError } from "../ShapeError.js";



/**
 * Reprents a snake body part (the snake head is included)
 * 
 * @typedef {object} SnakePart
 * @property {number} posX 
 * @property {number} posY
 */



/**
 * Represents a Snake object  
 */
export class Snake extends Square {

    /**@type {SnakePart[]} */
    #snakeParts = [];

    /**@type {number} */
    #velX;

    /**@type {number} */
    #velY;


    /**
     * Creates a Food object 
     * 
     * @param {CanvasRenderingContext2D} - A bidimensional redering context of a canvas HTML5 element (used to draw the square)
     * @param {number} posX - The X axis position of the snake on the canvas HTML5 element
     * @param {number} posY - The Y axis position of the snake on the canvas HTML5 element
     * @param {number} velX - The velocity of the snake on the X axis
     * @param {number} velY - The velocity of the snake on the Y axis
     * @param {number} width - The width of the snake (on pixels)
     * @param {string} color - The color of the snake
     * @param {boolean} nbrBodyParts - If is true, the snake will have a head + 3 other parts (body)
     * @throws {Error} - Will be raised if the given width is less than or equals to 0
     */
    constructor(ctx, posX, posY, velX, velY, snakePartWidth, color, addInitialBodyParts = false) {
        try {

            super(ctx, posX, posY, snakePartWidth, color);
            this.#velX = velX;
            this.#velY = velY;

            //Pushing the snake head in the snakeParts array
            this.#snakeParts.push({
                posX,
                posY
            })

            //Pushing the body parts 
            if (addInitialBodyParts) {
                for (let i = 1; i < 4; i++) {
                    this.#snakeParts.push({
                        /**
                         * With this implementation, we are now required to define a position 
                         * for the snake that takes into account its size, the wall, and the food.
                         */
                        posX: posX - (i * snakePartWidth),
                        posY
                    })
                }
            }
        }
        catch (e) {
            throw new ShapeError("The size of the snake's part must be greater than 0", { cause: e });
        }
    }

    /**
     * Draws a snake on the canvas HTML5 element
     * 
     * @returns {void}
     */
    draw() {
        this.ctx.fillStyle = this.color;
        for (let part of this.#snakeParts) {
            this.ctx.fillRect(part.posX, part.posY, this.width, this.width);
        }
    }

    /**
     * updates the snake's coordinates (x, y) based on its x and y velocities
     * 
     * @returns {void}
     */
    move() {
        for (let part of this.#snakeParts) {
            part.posX += this.#velX;
            part.posY += this.#velY;
        }
    }
}