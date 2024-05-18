const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startScreen = document.getElementById("start-screen");
const gameOverScreen = document.getElementById("game-over-screen");
const gameOverMessage = document.getElementById("game-over-message");
const finalScore = document.getElementById("final-score");
const scoreDisplay = document.getElementById("score-display");
const paddleColorInput = document.getElementById("paddle-color");
const ballColorInput = document.getElementById("ball-color");

let ballSpeed;
let dx, dy;
let paddleHeight = 10, paddleWidth = 100, paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false, leftPressed = false;
let brickRowCount, brickColumnCount;
let brickWidth, brickHeight = 20, brickPadding = 10, brickOffsetTop = 30, brickOffsetLeft = 30;
let bricks = [];
let colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF"];
let score = 0;
let ballRadius = 10, x, y;
let gameWon = false;
let paddleSpeed = 7;
let paddleColor = "#0095DD";
let ballColor = "#0095DD";

// Sound effects
const brickHitSound = new Audio('brickHit.mp3');
const paddleHitSound = new Audio('paddleHit.mp3');
const wallHitSound = new Audio('wallHit.mp3');
const gameOverSound = new Audio('gameOver.mp3');
const winSound = new Audio('win.mp3');

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
canvas.addEventListener("touchstart", touchStartHandler, false);
canvas.addEventListener("touchmove", touchMoveHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
    else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
    else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
}

function touchStartHandler(e) {
    const touchX = e.touches[0].clientX;
    if (touchX > window.innerWidth / 2) rightPressed = true;
    else leftPressed = true;
}

function touchMoveHandler(e) {
    const touchX = e.touches[0].clientX;
    if (touchX > window.innerWidth / 2) {
        rightPressed = true;
        leftPressed = false;
    } else {
        leftPressed = true;
        rightPressed = false;
    }
}

function startGame(difficulty) {
    if (difficulty === 'easy') {
        ballSpeed = 2;
        brickRowCount = 3;
        brickColumnCount = 5;
    } else if (difficulty === 'medium') {
        ballSpeed = 4;
        brickRowCount = 5;
        brickColumnCount = 7;
    } else if (difficulty === 'hard') {
        ballSpeed = 6;
        brickRowCount = 7;
        brickColumnCount = 9;
    } else if (difficulty === 'insane') {
        ballSpeed = 8;
        brickRowCount = 10;
        brickColumnCount = 12;
        paddleWidth = 70;
        paddleSpeed = 8;  // Slightly increase paddle speed
    }

    dx = ballSpeed;
    dy = -ballSpeed;
    x = canvas.width / 2;
    y = canvas.height - 30;

    // Calculate brick width dynamically
    brickWidth = (canvas.width - brickOffsetLeft * 2 - brickPadding * (brickColumnCount - 1)) / brickColumnCount;

    // Initialize bricks
    bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1, color: colors[r % colors.length] };
        }
    }

    score = 0;
    gameWon = false;

    startScreen.style.display = 'none';
    canvas.style.display = 'block';
    scoreDisplay.style.display = 'block';
    gameOverScreen.style.display = 'none';

    loadCustomizations();
    updateScore();
    draw();
}

function restartGame() {
    startScreen.style.display = 'block';
    canvas.style.display = 'none';
    gameOverScreen.style.display = 'none';
    scoreDisplay.style.display = 'none';
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    brickHitSound.play();
                    if (score === brickRowCount * brickColumnCount) {
                        winSound.play();
                        gameWon = true;
                        gameOverMessage.innerText = "You Win!";
                        finalScore.innerText = "Score: " + score;
                        gameOverScreen.style.display = 'block';
                        canvas.style.display = 'none';
                        scoreDisplay.style.display = 'none';
                    }
                }
            }
        }
    }
}

function updateScore() {
    scoreDisplay.innerText = "Score: " + score;
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = paddleColor;
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = bricks[c][r].color;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        wallHitSound.play();
    }
    if (y + dy < ballRadius) {
        dy = -dy;
        wallHitSound.play();
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            paddleHitSound.play();
        } else {
            gameOverSound.play();
            gameOverMessage.innerText = "Game Over";
            finalScore.innerText = "Score: " + score;
            gameOverScreen.style.display = 'block';
            canvas.style.display = 'none';
            scoreDisplay.style.display = 'none';
            return;
        }
    }

    x += dx;
    y += dy;

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += paddleSpeed;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= paddleSpeed;
    }

    if (!gameWon) {
        requestAnimationFrame(draw);
    }
}

window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
    canvas.width = window.innerWidth > 800 ? 800 : window.innerWidth;
    canvas.height = window.innerHeight > 600 ? 600 : window.innerHeight;
    brickWidth = (canvas.width - brickOffsetLeft * 2 - brickPadding * (brickColumnCount - 1)) / brickColumnCount;
    paddleX = (canvas.width - paddleWidth) / 2;
}

resizeCanvas();

function saveCustomizations() {
    paddleColor = paddleColorInput.value;
    ballColor = ballColorInput.value;
    localStorage.setItem('paddleColor', paddleColor);
    localStorage.setItem('ballColor', ballColor);
}

function loadCustomizations() {
    const savedPaddleColor = localStorage.getItem('paddleColor');
    const savedBallColor = localStorage.getItem('ballColor');
    if (savedPaddleColor) {
        paddleColor = savedPaddleColor;
        paddleColorInput.value = savedPaddleColor;
    }
    if (savedBallColor) {
        ballColor = savedBallColor;
        ballColorInput.value = savedBallColor;
    }
}
