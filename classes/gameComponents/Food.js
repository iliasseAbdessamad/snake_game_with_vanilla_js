
import { Square } from "../Square.js";
import { ShapeError } from "../ShapeError.js";




/**
 * Represents a food object
 */
export class Food extends Square {

    /**
     * Creates a Food object 
     * 
     * @param {CanvasRenderingContext2D} - A bidimensional redering context of a canvas HTML5 element (used to draw the square)
     * @param {number} posX - The X axis position of the food on the canvas HTML5 element
     * @param {number} posY - The Y axis position of the food on the canvas HTML5 element
     * @param {number} width - The width of the food (on pixels)
     * @param {string} color - The color of the food
     * @throws {Error} - Will be raised if the given width is less than or equals to 0
     */
    constructor(ctx, posX, posY, width, color) {
        try {
            super(ctx, posX, posY, width, color);
        }
        catch (e) {
            throw new ShapeError("The size of the food must be greater than 0", { cause: e });
        }
    }
}