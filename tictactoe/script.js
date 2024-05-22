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
    // Randomly decide who goes first
    currentPlayer = Math.random() < 0.5 ? 'player' : 'cpu';
    document.getElementById('result-message').innerText = currentPlayer === 'player' ? 'Make your move!' : 'CPU is thinking...';
    if (currentPlayer === 'cpu') {
        setTimeout(cpuMove, 1000); // Slight delay for realism
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
            document.getElementById('result-message').innerText = 'CPU is thinking...';
            setTimeout(cpuMove, 1000); // Adding a slight delay for realism
        }
    }
}

function cpuMove() {
    const move = minimax(board, cpuSymbol).index;
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
        document.getElementById('result-message').innerText = 'Make your move!';
    }
}

function minimax(newBoard, player) {
    const availSpots = newBoard.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);

    if (checkWinner(cpuSymbol, newBoard)) {
        return { score: 10 };
    } else if (checkWinner(playerSymbol, newBoard)) {
        return { score: -10 };
    } else if (availSpots.length === 0) {
        return { score: 0 };
    }

    const moves = [];

    for (let i = 0; i < availSpots.length; i++) {
        const move = {};
        move.index = availSpots[i];
        newBoard[availSpots[i]] = player;

        if (player === cpuSymbol) {
            const result = minimax(newBoard, playerSymbol);
            move.score = result.score;
        } else {
            const result = minimax(newBoard, cpuSymbol);
            move.score = result.score;
        }

        newBoard[availSpots[i]] = '';

        moves.push(move);
    }

    let bestMove;
    if (player === cpuSymbol) {
        let bestScore = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}

function checkWinner(player, boardToCheck = board) {
    return winningCombinations.some(combination => 
        combination.every(index => boardToCheck[index] === player)
    );
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'player';
    setTimeout(() => {
        document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
        document.getElementById('result-message').innerText = 'Make your move!';
        if (cpuSymbol === 'x') {
            setTimeout(cpuMove, 1000); // CPU starts if player is 'O'
        }
    }, 2000);
}
