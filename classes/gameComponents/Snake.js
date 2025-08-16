
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
     * The previous position en the X axis
     * 
     * @type {number} 
     */
    #previousX;

    /**
     * The previous position en the Y axis
     * 
     * @type {number} 
     */
    #previousY;

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

            /*
            * those properties will help us to know if the snake can go up, down, right, or left.
            * e.g : Te snake can not go directely from left to right
            */
            this.#previousX = posX;
            this.#previousY = posY;

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

        this.#previousX = this.posX;
        this.#previousY = this.posY;

        for (let i = this.#snakeParts.length - 1; i >= 0; i--) {

            if (i !== 0) {
                this.#snakeParts[i].posX = this.#snakeParts[i - 1].posX;
                this.#snakeParts[i].posY = this.#snakeParts[i - 1].posY;
            }
            else {
                this.#snakeParts[i].posX += this.#velX;
                this.#snakeParts[i].posY += this.#velY;
                this.posX = this.#snakeParts[i].posX;
                this.posY = this.#snakeParts[i].posY;
            }
        }
    }

    /**
     * @returns {void}
     */
    goUp() {
        if (this.#canGoUp()) {
            this.#velY = -this.width;
            this.#velX = 0;
        }
    }

    /**
     * @returns {void}
     */
    goRight() {
        if (this.#canGoRight()) {
            this.#velX = this.width;
            this.#velY = 0;
        }
    }

    /**
     * @returns {void}
     */
    goDown() {
        if (this.#canGoDown()) {
            this.#velY = this.width;
            this.#velX = 0;
        }
    }

    /**
     * Checks if there is a collision bewteen the snake and the game screen borders
     * 
     * @param {{minX:number, maxX:number}} xCoordinates - The min and max x coordinates of the wall
     * @param {{minY:number, maxY:number}} yCoordinates - The min and max y coordinates of the wall
     */
    isWallCollision(xCoordinates, yCoordinates) {
        const { minX, maxX } = { ...xCoordinates };
        const { minY, maxY } = { ...yCoordinates };
        let snakeHead = this.#snakeParts[0];

        if (snakeHead.posX < minX || snakeHead.posX > maxX || snakeHead.posY < minY || snakeHead.posY > maxY) {
            return true;
        }

        return false;
    }

    /**
     * @returns {void}
     */
    goLeft() {
        if (this.#canGoLeft()) {
            this.#velX = -this.width;
            this.#velY = 0;
        }
    }

    /**
     * Checks if the snake can go up
     * 
     * @returns {boolean} 
     */
    #canGoUp() {
        //The snake can go up if Y axis doesn't change between its moves
        return this.#previousY == this.posY;
    }

    /**
     * Checks if the snake can go right
     * 
     * @returns {boolean} 
     */
    #canGoRight() {
        //The snake can go right if X axis doesn't change between its moves
        return this.#previousX == this.posX;
    }

    /**
     * Checks if the snake can go down
     * 
     * @returns {boolean} 
     */
    #canGoDown() {
        //The snake can go down if Y axis doesn't change between its moves
        return this.#previousY == this.posY;
    }

    /**
     * Checks if the snake can go left
     * 
     * @returns {boolean} 
     */
    #canGoLeft() {
        //The snake can go left if X axis doesn't change between its moves
        return this.#previousX == this.posX;
    }


}