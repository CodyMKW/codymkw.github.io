let playerWins = 0;
let cpuWins = 0;
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'player';

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

function playerMove(cell, index) {
    if (board[index] === '' && currentPlayer === 'player') {
        board[index] = 'x';
        cell.innerHTML = '<img src="assets/images/x.png" alt="X">';
        if (checkWinner('x')) {
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
    let move = findBestMove('o');
    if (move === null) {
        // Block player's winning move
        move = findBestMove('x');
    }
    if (move === null) {
        // Choose random move if no winning or blocking move found
        let emptyCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
        move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    board[move] = 'o';
    document.querySelectorAll('.cell')[move].innerHTML = '<img src="assets/images/o.png" alt="O">';
    if (checkWinner('o')) {
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
    }, 2000);
}
