let playerWins = 0;
let cpuWins = 0;
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'player';
let playerSymbol = 'x';
let cpuSymbol = 'o';

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function setPlayerSymbol(symbol) {
    playerSymbol = symbol;
    cpuSymbol = symbol === 'x' ? 'o' : 'x';
    document.getElementById('player-choice').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    if (cpuSymbol === 'x') {
        setTimeout(cpuMove, 500); // CPU starts if player is 'O'
    }
}

function playerMove(cell, index) {
    if (board[index] === '' && currentPlayer === 'player') {
        board[index] = playerSymbol;
        cell.innerHTML = `<img src="assets/images/${playerSymbol}.png" alt="${playerSymbol.toUpperCase()}">`;
        if (checkWinner(playerSymbol)) {
            playerWins++;
            document.getElementById('result-message').innerText = 'You win!';
            document.getElementById('player-wins').innerText = playerWins;
            resetBoard();
        } else if (board.every(cell => cell !== '')) {
            document.getElementById('result-message').innerText = 'It\'s a draw!';
            resetBoard();
        } else {
            currentPlayer = 'cpu';
            setTimeout(cpuMove, 500); // Adding a slight delay for realism
        }
    }
}

function cpuMove() {
    // Check for winning move
    let move = findBestMove(cpuSymbol);
    if (move === null) {
        // Block player's winning move
        move = findBestMove(playerSymbol);
    }
    if (move === null) {
        // Choose strategic move if no winning or blocking move found
        move = chooseStrategicMove();
    }

    board[move] = cpuSymbol;
    document.querySelectorAll('.cell')[move].innerHTML = `<img src="assets/images/${cpuSymbol}.png" alt="${cpuSymbol.toUpperCase()}">`;
    if (checkWinner(cpuSymbol)) {
        cpuWins++;
        document.getElementById('result-message').innerText = 'CPU wins!';
        document.getElementById('cpu-wins').innerText = cpuWins;
        resetBoard();
    } else if (board.every(cell => cell !== '')) {
        document.getElementById('result-message').innerText = 'It\'s a draw!';
        resetBoard();
    } else {
        currentPlayer = 'player';
    }
}

function findBestMove(player) {
    for (let [a, b, c] of winningCombinations) {
        if (board[a] === player && board[b] === player && board[c] === '') return c;
        if (board[a] === player && board[b] === '' && board[c] === player) return b;
        if (board[a] === '' && board[b] === player && board[c] === player) return a;
    }
    return null;
}

function chooseStrategicMove() {
    // Prioritize center, then corners, then edges
    const center = 4;
    const corners = [0, 2, 6, 8];
    const edges = [1, 3, 5, 7];

    if (board[center] === '') return center;

    let availableCorners = corners.filter(index => board[index] === '');
    if (availableCorners.length > 0) {
        return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    let availableEdges = edges.filter(index => board[index] === '');
    if (availableEdges.length > 0) {
        return availableEdges[Math.floor(Math.random() * availableEdges.length)];
    }

    return null;
}

function checkWinner(player) {
    return winningCombinations.some(combination => 
        combination.every(index => board[index] === player)
    );
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'player';
    setTimeout(() => {
        document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
        document.getElementById('result-message').innerText = 'Make your move!';
        if (cpuSymbol === 'x') {
            setTimeout(cpuMove, 500); // CPU starts if player is 'O'
        }
    }, 2000);
}
