
import { Food } from "./classes/gameComponents/Food.js";
import { Snake } from "./classes/gameComponents/Snake.js";




// Represents the width and the height of each bloc of the game board
const boxSize = 20;
const canvas = document.getElementById("gameBoard");
const maxWidth = canvas.width;
const maxHeight = canvas.height;
const ctx = canvas.getContext("2d");

/**
 * @type {() => void} - Draws horizontal lines on the game board
 */
const drawHorizontalLines = () => {
    for (let i = 1; i < maxHeight / boxSize; i++) {
        ctx.strokeStyle = "#FFF";
        ctx.lineWidth = .2;

        ctx.beginPath();
        ctx.moveTo(0, i * boxSize);
        ctx.lineTo(maxWidth, i * boxSize)
        ctx.stroke();
    }
}

/**
 * @type {() => void} - Draws horizontal lines on the game board
 */
const drawVerticalLines = () => {
    for (let i = 1; i < maxHeight / boxSize; i++) {
        ctx.strokeStyle = "#FFF";
        ctx.lineWidth = .2;

        ctx.beginPath();
        ctx.moveTo(i * boxSize, 0);
        ctx.lineTo(i * boxSize, maxHeight)
        ctx.stroke();
    }
}

/**
 * A recursive function that triggers an animation callback after a delay.
 *
 * @param {Function} callback - The function to execute after the timeout.
 * @param {number} delay
 * @returns {void} The timeout ID, which can be used to cancel the animation with clearTimeout.
 */
const animate = (callback, delay) => {
    const timeout = setTimeout(() => {
        if (typeof callback === 'function') {
            clearTimeout(timeout);
            callback();
            animate(callback, delay);
        }
    }, delay);
};



//Comment those lines if want to undisplay the horizontal and vertical lines
drawHorizontalLines();
drawVerticalLines();



try {
    let f = new Food(ctx, (20 * boxSize), (20 * boxSize), boxSize, "red");
    f.draw();

    let s = new Snake(
        ctx,
        10 * boxSize,
        10 * boxSize,
        boxSize,
        boxSize,
        boxSize,
        "green",
        true
    );

    s.draw();
}
catch (e) {
    console.log({ e });
}

