let playerWins = 0;
let cpuWins = 0;

const choices = ['rock', 'paper', 'scissors'];

function playerChoice(playerChoice) {
    const cpuChoice = choices[Math.floor(Math.random() * choices.length)];
    let result = determineWinner(playerChoice, cpuChoice);

    updateResults(result, playerChoice, cpuChoice);
}

function determineWinner(player, cpu) {
    if (player === cpu) return "It's a draw!";
    if (
        (player === 'rock' && cpu === 'scissors') || 
        (player === 'paper' && cpu === 'rock') || 
        (player === 'scissors' && cpu === 'paper')
    ) {
        playerWins++;
        return 'You win!';
    } else {
        cpuWins++;
        return 'CPU wins!';
    }
}

function updateResults(result, playerChoice, cpuChoice) {
    document.getElementById('result-message').innerText = `CPU chose ${cpuChoice}. ${result}`;
    document.getElementById('player-wins').innerText = playerWins;
    document.getElementById('cpu-wins').innerText = cpuWins;
    document.getElementById('player-choice').src = `assets/images/${playerChoice}.png`;
    document.getElementById('cpu-choice').src = `assets/images/${cpuChoice}.png`;
}
