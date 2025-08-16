
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


/**
 * Adds horizontal and vertical lines on the game board
 * 
 * @type {Function} 
 * @returns {void} 
 */
const addLines = () => {
    drawHorizontalLines();
    drawVerticalLines();
}







//Comment the line bellow to undisplay the horizontal and vertical lines
addLines()


try {
    let f = new Food(ctx, (20 * boxSize), (20 * boxSize), boxSize, "red");
    let s = new Snake(ctx, 10 * boxSize, 10 * boxSize, boxSize, 0, boxSize, "green", true);

    document.addEventListener("keydown", function (e) {
        const code = e.code;
        switch (code) {
            case "ArrowUp":
                s.goUp();
                break;
            case "ArrowRight":
                s.goRight()
                break;
            case "ArrowDown":
                s.goDown();
                break;
            case "ArrowLeft":
                s.goLeft();
                break;
        }
    })

    //let's draw food and snake when the page load
    f.draw();
    s.draw();


    //Let's animate our game
    animate(function () {
        //we must clear the boad before redrawing
        ctx.clearRect(0, 0, maxWidth, maxHeight);

        //Comment the line bellow to undisplay the horizontal and vertical lines
        addLines()

        s.move();
        f.draw();
        s.draw();

    }, 1000) //you can decrease this delay argument to make the snake moves faster
}
catch (e) {
    console.log({ e });
}

