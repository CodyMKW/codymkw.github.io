const words = [
  "apple", "grape", "mango", "peach", "berry", 
  "mario", "zelda", "kirby", "samus", "luigi", 
  "peach", "daisy", "yoshi", "ganon", "tommy", 
  "timmy", "shoto", "bulma", "gohan", "linky", 
  "epona", "mipha", "minda", "shulk", "falco", 
  "ridly", "saria", "midna", "joker", "terry", 
  "luffy", "natsu", "anime", "apart", "antic",
  "apron", "award", "badge", "badly", "bacon",
  "basic", "beach", "bible", "blade", "black",
  "bobby", "brawl", "smash", "chess", "click",
  "cloud", "coach", "cream", "oddly", "owner",
  "paper", "parry", "photo", "phone", "space",
  "spoil", "sport", "spout", "spray", "yield",
  "yacht", "write", "wreck", "witch", "woody"
];
let secretWord = words[Math.floor(Math.random() * words.length)];
let currentRow = 0;
let currentGuess = "";
const maxGuesses = 6;

function createBoard() {
    const gameBoard = document.getElementById("game-board");
    for (let i = 0; i < maxGuesses; i++) {
        for (let j = 0; j < 5; j++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.id = `tile-${i}-${j}`;
            gameBoard.appendChild(tile);
        }
    }
}

function createKeyboard() {
    const keys = "abcdefghijklmnopqrstuvwxyz".split("");
    const keyboard = document.getElementById("keyboard");
    keys.forEach(key => {
        const keyElement = document.createElement("div");
        keyElement.classList.add("key");
        keyElement.innerText = key;
        keyElement.onclick = () => handleKeyClick(key);
        keyboard.appendChild(keyElement);
    });
    const enterKey = document.createElement("div");
    enterKey.classList.add("key");
    enterKey.innerText = "Enter";
    enterKey.onclick = handleEnter;
    keyboard.appendChild(enterKey);

    const backspaceKey = document.createElement("div");
    backspaceKey.classList.add("key");
    backspaceKey.innerText = "←";
    backspaceKey.onclick = handleBackspace;
    keyboard.appendChild(backspaceKey);
}

function handleKeyClick(key) {
    if (currentGuess.length < 5) {
        currentGuess += key;
        updateBoard();
    }
}

function handleEnter() {
    if (currentGuess.length === 5) {
        if (currentGuess === secretWord) {
            showMessage("You win!");
            revealWord();
            document.getElementById("restart-button").style.display = "block";
        } else {
            giveFeedback();
            currentRow++;
            currentGuess = "";
            if (currentRow === maxGuesses) {
                showMessage("You lose!");
                revealWord();
                document.getElementById("restart-button").style.display = "block";
            }
        }
    }
}

function handleBackspace() {
    currentGuess = currentGuess.slice(0, -1);
    updateBoard();
}

function updateBoard() {
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`tile-${currentRow}-${i}`);
        tile.innerText = currentGuess[i] || "";
    }
}

function giveFeedback() {
    const guessArray = currentGuess.split("");
    const secretArray = secretWord.split("");
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`tile-${currentRow}-${i}`);
        if (guessArray[i] === secretArray[i]) {
            tile.classList.add("correct");
        } else if (secretArray.includes(guessArray[i])) {
            tile.classList.add("present");
        } else {
            tile.classList.add("absent");
        }
    }
}

function showMessage(message) {
    const resultMessage = document.getElementById("result-message");
    resultMessage.innerText = message;
}

function revealWord() {
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`tile-${currentRow}-${i}`);
        tile.innerText = secretWord[i];
        tile.classList.add("correct");
    }
}

function restartGame() {
    secretWord = words[Math.floor(Math.random() * words.length)];
    currentRow = 0;
    currentGuess = "";
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";
    createBoard();
    const resultMessage = document.getElementById("result-message");
    resultMessage.innerText = "";
    document.getElementById("restart-button").style.display = "none";
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach(tile => {
        tile.classList.remove("correct", "present", "absent");
    });
}

function showInstructions() {
    const instructions = document.getElementById("instructions");
    instructions.style.display = "block";
}

function closeInstructions() {
    const instructions = document.getElementById("instructions");
    instructions.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
    createBoard();
    createKeyboard();
});
