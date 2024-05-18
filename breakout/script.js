const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startScreen = document.getElementById("start-screen");
const gameOverScreen = document.getElementById("game-over-screen");
const gameOverMessage = document.getElementById("game-over-message");
const finalScore = document.getElementById("final-score");

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

// Sound effects
const brickHitSound = new Audio('brickHit.mp3');
const paddleHitSound = new Audio('paddleHit.mp3');
const wallHitSound = new Audio('wallHit.mp3');
const gameOverSound = new Audio('gameOver.mp3');
const winSound = new Audio('win.mp3');

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
    else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
    else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
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

    startScreen.style.display = 'none';
    canvas.style.display = 'block';
    gameOverScreen.style.display = 'none';
    score = 0;
    gameWon = false;
    draw();
}

function restartGame() {
    document.location.reload();
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
                        gameWon = true;
                        winSound.play();
                        gameOverMessage.innerText = "You Win!";
                        finalScore.innerText = "Score: " + score;
                        gameOverScreen.style.display = 'block';
                        canvas.style.display = 'none';
                        return;
                    }
                }
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
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

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x - ballRadius + dx < 0) {
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
            return;
        }
    }

    x += dx;
    y += dy;

    if (rightPressed && paddleX < canvas.width - paddleWidth) paddleX += 7;
    else if (leftPressed && paddleX > 0) paddleX -= 7;

    if (!gameWon) requestAnimationFrame(draw);
}
