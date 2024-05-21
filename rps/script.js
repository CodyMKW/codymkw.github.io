let playerWins = 0;
let cpuWins = 0;
let currentMode = 'regular';

const choices = ['rock', 'paper', 'scissors'];

function setMode(mode) {
    currentMode = mode;
    document.getElementById('result-message').innerText = `Mode set to ${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode. Make your choice!`;
}

function playerChoice(playerChoice) {
    const cpuChoice = choices[Math.floor(Math.random() * choices.length)];
    let result;
    if (currentMode === 'regular') {
        result = determineWinner(playerChoice, cpuChoice);
    } else if (currentMode === 'reverse') {
        result = determineWinner(cpuChoice, playerChoice);
    } else if (currentMode === 'double') {
        const secondCpuChoice = choices[Math.floor(Math.random() * choices.length)];
        result = determineWinner(playerChoice, cpuChoice) + ' & ' + determineWinner(playerChoice, secondCpuChoice);
    }
    updateResults(result, cpuChoice);
}

function determineWinner(player, cpu) {
    if (player === cpu) return 'It\'s a draw!';
    if ((player === 'rock' && cpu === 'scissors') || 
        (player === 'paper' && cpu === 'rock') || 
        (player === 'scissors' && cpu === 'paper')) {
        playerWins++;
        return 'You win!';
    } else {
        cpuWins++;
        return 'CPU wins!';
    }
}

function updateResults(result, cpuChoice) {
    document.getElementById('result-message').innerText = `CPU chose ${cpuChoice}. ${result}`;
    document.getElementById('player-wins').innerText = playerWins;
    document.getElementById('cpu-wins').innerText = cpuWins;
}
