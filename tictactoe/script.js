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
            cpuMove();
        }
    }
}

function cpuMove() {
    let emptyCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = 'o';
    document.querySelectorAll('.cell')[randomIndex].innerHTML = '<img src="assets/images/o.png" alt="O">';
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
