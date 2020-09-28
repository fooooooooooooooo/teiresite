const GAME_SPEED = 100; // Lower is faster
const CANVAS_BORDER_COLOUR = 'transparent';
const CANVAS_BACKGROUND_COLOUR = "transparent";
let SNAKE_COLOUR = 'white';
let FOOD_COLOUR = 'white';

let contrastingColor = '#fff';

const gridSize = 40;
const snakeSize = Math.floor(gridSize * 0.8);
const foodSize = Math.floor(gridSize * 0.6);

// The user's score
let score = 0;
// When set to true the snake is changing direction
let changingDirection = false;
// Food x-coordinate
let foodX;
// Food y-coordinate
let foodY;
// Horizontal velocity
let dx = gridSize;
// Vertical velocity
let dy = 0;

// Get the canvas element
const gameCanvas = document.getElementById("gameCanvas");

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

gameCanvas.width = vw;
gameCanvas.height = vh;

var why = (Math.floor(gameCanvas.height / gridSize) / 2) * gridSize;
var ecks = (Math.floor(gameCanvas.width / gridSize) / 2) * gridSize;

while (why % gridSize != 0) {
    why--;
}
while (ecks % gridSize != 0) {
    ecks--;
}

let snake = [
    { x: ecks, y: why },
    { x: ecks - (gridSize * 1), y: why },
    { x: ecks - (gridSize * 2), y: why },
    { x: ecks - (gridSize * 3), y: why },
    { x: ecks - (gridSize * 4), y: why }
]

// Return a two dimensional drawing context
const ctx = gameCanvas.getContext("2d");
let retryButton;

let gameOverBool = false;
// Start game
// main();
// Create the first food location
// createFood();
// Call changeDirection whenever a key is pressed
document.addEventListener("keydown", changeDirection);

function init() {
    contrastingColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--primary-text-color');

    SNAKE_COLOUR = contrastingColor === '' ? 'white' : contrastingColor;
    FOOD_COLOUR = contrastingColor === '' ? 'white' : contrastingColor;
    retryButton = document.getElementById("game-over-retry");

    retryButton.addEventListener('click', resetGame);

    main();
    createFood()
}

function gameOver() {
    gameOverBool = true;
    let scoreText = toggleGameOverVisibility();
    updateHighScore(score);
    scoreText.st.innerText = `Score: ${score}`;
    scoreText.hst.innerText = `High Score: ${getHighScore()}`;
}

function toggleGameOverVisibility() {
    document.getElementById('game-over-container').classList.toggle('hidden');
    let scoreText = document.getElementById('game-over-score');
    let highScoreText = document.getElementById('game-over-highscore');
    return { st: scoreText, hst: highScoreText };
}

function getHighScore() {
    let hs = getCookie("highScore");
    if (hs == null || hs == undefined) {
        return 0;
    }
    return parseInt(hs);
}

function updateHighScore(s) {
    if (getHighScore() < s)
        setCookie('highScore', score);
}

function resetGame() {
    if (!gameOverBool) {
        return;
    }
    gameOverBool = false;
    toggleGameOverVisibility();
    snake = [
        { x: ecks, y: why },
        { x: ecks - (gridSize * 1), y: why },
        { x: ecks - (gridSize * 2), y: why },
        { x: ecks - (gridSize * 3), y: why },
        { x: ecks - (gridSize * 4), y: why }
    ]
    dx = gridSize;
    dy = 0;
    score = 0;
    main();
}

/**
 * Main function of the game
 * called repeatedly to advance the game
 */
function main() {
    // If the game ended return early to stop game
    if (didGameEnd()) {
        gameOver();
        return;
    }

    setTimeout(function onTick() {
        changingDirection = false;
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();

        // Call game again
        main();
    }, GAME_SPEED)
}

/**
 * Change the background colour of the canvas to CANVAS_BACKGROUND_COLOUR and
 * draw a border around it
 */
function clearCanvas() {
    //  Select the colour to fill the drawing
    ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;

    // Draw a "filled" rectangle to cover the entire canvas
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
}

/**
 * Draw the food on the canvas
 */
function drawFood() {
    ctx.fillStyle = FOOD_COLOUR;
    while (foodX % gridSize !== 0) {
        foodX++
    }
    while (foodY % gridSize !== 0) {
        foodY++
    }
    // ctx.fillRect(foodX, foodY, gridSize, gridSize);

    const foodOffset = ((gridSize % foodSize) / 2);

    roundRect(ctx, foodX + foodOffset, foodY + foodOffset, foodSize, foodSize, 5, true, false);
}

/**
 * Advances the snake by changing the x-coordinates of its parts
 * according to the horizontal velocity and the y-coordinates of its parts
 * according to the vertical veolocity
 */
function advanceSnake() {
    // Create the new Snake's head
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    // Add the new head to the beginning of snake body
    snake.unshift(head);

    const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
    if (didEatFood) {
        // Increase score
        score += 1;
        // Display score on screen
        document.getElementById('score').innerHTML = score;

        // Generate new food location
        createFood();
    } else {
        // Remove the last part of snake body
        snake.pop();
    }
}

/**
 * Returns true if the head of the snake touched another part of the game
 * or any of the walls
 */
function didGameEnd() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > gameCanvas.width - gridSize;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > gameCanvas.height - gridSize;

    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

/**
 * Generates a random number that is a multiple of 10 given a minumum
 * and a maximum number
 * @param { number } min - The minimum number the random number can be
 * @param { number } max - The maximum number the random number can be
 */
function randomTen(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

/**
 * Creates random set of coordinates for the snake food.
 */
function createFood() {
    // Generate a random number the food x-coordinate
    foodX = randomTen(0, gameCanvas.width - (gridSize * 2));
    // Generate a random number for the food y-coordinate
    foodY = randomTen(0, gameCanvas.height - (gridSize * 2));

    // if the new food location is where the snake currently is, generate a new food location
    snake.forEach(function isFoodOnSnake(part) {
        const foodIsOnSnake = part.x == foodX && part.y == foodY;
        if (foodIsOnSnake) createFood();
    });
}

/**
 * Draws the snake on the canvas
 */
function drawSnake() {
    // loop through the snake parts drawing each part on the canvas
    snake.forEach(drawSnakePart)
}

/**
 * Draws a part of the snake on the canvas
 * @param { object } snakePart - The coordinates where the part should be drawn
 */
function drawSnakePart(snakePart) {
    // Set the colour of the snake part
    ctx.fillStyle = SNAKE_COLOUR;

    // Offset snake because snake parts are smaller than grid, this centers it visually
    const snakeOffset = ((gridSize % snakeSize) / 2);

    // Draw a "filled" rectangle to represent the snake part at the coordinates
    // the part is located
    // ctx.fillRect(snakePart.x + offset, snakePart.y + offset, snakeSize, snakeSize);
    roundRect(ctx, snakePart.x + snakeOffset, snakePart.y + snakeOffset, snakeSize, snakeSize, 5, true, false);
}

/**
 * Changes the vertical and horizontal velocity of the snake according to the
 * key that was pressed.
 * The direction cannot be switched to the opposite direction, to prevent the snake
 * from reversing
 * For example if the the direction is 'right' it cannot become 'left'
 * @param { object } event - The keydown event
 */
function changeDirection(event) {
    const LEFT_KEY = "ArrowLeft";
    const RIGHT_KEY = "ArrowRight";
    const UP_KEY = "ArrowUp";
    const DOWN_KEY = "ArrowDown";

    /**
     * Prevent the snake from reversing
     * Example scenario:
     * Snake is moving to the right. User presses down and immediately left
     * and the snake immediately changes direction without taking a step down first
     */
    if (changingDirection) return;
    changingDirection = true;

    const keyPressed = event.code;

    const goingUp = dy === -gridSize;
    const goingDown = dy === gridSize;
    const goingRight = dx === gridSize;
    const goingLeft = dx === -gridSize;

    if ((keyPressed === LEFT_KEY || keyPressed === "KeyA") && !goingRight) {
        dx = -gridSize;
        dy = 0;
    }
    if ((keyPressed === UP_KEY || keyPressed === "KeyW") && !goingDown) {
        dx = 0;
        dy = -gridSize;
    }
    if ((keyPressed === RIGHT_KEY || keyPressed === "KeyD") && !goingLeft) {
        dx = gridSize;
        dy = 0;
    }
    if ((keyPressed === DOWN_KEY || keyPressed === "KeyS") && !goingUp) {
        dx = 0;
        dy = gridSize;
    }
}

/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object 
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === 'undefined') {
        stroke = true;
    }
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    if (typeof radius === 'number') {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
        var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
        for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }

}
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {

    options = {
        path: '/',
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}