// List of options
const choices = ["rock", "paper", "scissors"];
// Outcomes
const outcomes = { "tie": "Tie", "playerWins": "Player wins", "computerWins": "Computer wins!" };

// Function to generate random number between num1 and num2
function random(num1, num2) {
    return Math.floor(Math.random() * (num2 - (num1 - 1))) + num1;
}

// function to generate computers choice
function computerPlay() {
    return choices[random(0, choices.length - 1)]
}

// function to play a round
function playRound(playerChoice, computerChoice) {
    let outcome;
    compChoiceInfo.textContent = `Computer chose ${computerChoice}`;
    compButton = document.querySelector(`#${computerChoice}`);
    playerButton = document.querySelector(`#${playerChoice}`);
    colorButtons(compButton, playerButton);
    switch (computerChoice) {
        case "rock":
            switch (playerChoice) {
                case "rock":
                    outcome = outcomes["tie"];
                    break;
                case "paper":
                    outcome = outcomes["playerWins"];
                    break;
                case "scissors":
                    outcome = outcomes["computerWins"];
            }
            break;
        case "paper":
            switch (playerChoice) {
                case "rock":
                    outcome = outcomes["computerWins"];
                    break;
                case "paper":
                    outcome = outcomes["tie"];
                    break;
                case "scissors":
                    outcome = outcomes["playerWins"];
            }
            break;
        case "scissors":
            switch (playerChoice) {
                case "rock":
                    outcome = outcomes["playerWins"];
                    break;
                case "paper":
                    outcome = outcomes["computerWins"];
                    break;
                case "scissors":
                    outcome = outcomes["tie"];
            }
    }
    if (outcome === outcomes["computerWins"]) {
        outcomeInfo.textContent = `You lose! ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1,)} beats ${playerChoice}.`;
        scaleItem(compButton);
    } else if (outcome === outcomes["playerWins"]) {
        outcomeInfo.textContent = `You win! ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1,)} beats ${computerChoice}.`;
        scaleItem(playerButton);
    } else {
        outcomeInfo.textContent = `It's a tie. Both chose ${playerChoice}`;
    }
    return outcome;
}

// Play if no one have won 5 times
function game() {
    let outcome;
    if (playerWins < 5 && computerWins < 5) {
        outcome = playRound(this.id, computerPlay());
        roundNumberInfo.textContent = `Round ${round}:`;
        switch (outcome) {
            case outcomes["computerWins"]:
                computerWins += 1;
                break;
            case outcomes["playerWins"]:
                playerWins += 1;
                break;
            default:
                draws += 1;
        }
        updateInfo();
        round++;
    }
    // Add restart button and deactivate game buttons if someone won
    if (playerWins >= 5 || computerWins >= 5) {
        choiceButtons.forEach(button => {
            button.removeEventListener("click", game);
        });
        container.appendChild(restartButton);
    }


}

function updateInfo() {
    playerWinsInfo.textContent = playerWins;
    computerWinsInfo.textContent = computerWins;
    drawsInfo.textContent = draws;
    if (playerWins >= 5 || computerWins >= 5) {
        if (playerWins > computerWins) {
            gameOutcomeInfo.textContent = `You win the best of 5: (${playerWins}/${round} rounds won.)`;
            scaleItem(playerScore);
            playerScore.style["font-weight"] = "bold";
        } else if (playerWins < computerWins) {
            gameOutcomeInfo.textContent = `Computer wins the best of 5: (${computerWins}/${round} rounds won.)`;
            scaleItem(compScore);
            compScore.style["font-weight"] = "bold";
        }
    }
}

let playerWins, computerWins, draws, round;

function resetScore() {
    playerWins = 0;
    computerWins = 0;
    draws = 0;
    round = 1;
}

function activateButtons() {
    choiceButtons.forEach(button => {
        button.addEventListener("click", game)
    });
}

function startGame() {
    resetScore();
    activateButtons();
    allInfo.forEach(info => {
        info.textContent = "";
    });
    clearColors();
    if (document.querySelector(".restart")) {
        container.removeChild(restartButton);
    }
    playerScore.style["font-weight"] = "";
    compScore.style["font-weight"] = "";
}

// Clear colors and animation class
function clearColors() {
    choiceButtons.forEach(button => {
        button.classList.remove("computer", "player", "playerAndComputer");
        button.classList.remove("winner");
    });
}

// Add color on buttons for both player's choice
function colorButtons(compButton, playerButton) {
    // Start by clearing existing background colors
    clearColors();
    // Add current colors
    if (compButton === playerButton) {
        compButton.classList.add("playerAndComputer");
    } else {
        compButton.classList.add("computer");
        playerButton.classList.add("player");
    }
}

function scaleItem(item) {
    item.classList.add("winner");
    window.setTimeout(() => {
        item.classList.remove("winner");
    }, 800);
}

const choiceButtons = document.querySelectorAll(".choices button");
const outcomeInfo = document.querySelector(".roundInfo .outcome");
const compChoiceInfo = document.querySelector(".roundInfo .compChoice")
const roundNumberInfo = document.querySelector(".roundInfo .roundNumber");
const playerWinsInfo = document.querySelector("#playerWins");
const computerWinsInfo = document.querySelector("#compWins");
const drawsInfo = document.querySelector("#draws");
const gameOutcomeInfo = document.querySelector(".gameOutcome");
const container = document.querySelector(".content");
const restartButton = document.createElement("button");
const allInfo = [outcomeInfo, compChoiceInfo, roundNumberInfo, playerWinsInfo, computerWinsInfo, drawsInfo, gameOutcomeInfo];
const compScore = document.querySelector(".score > table > tbody > tr:nth-child(1)")
const playerScore = document.querySelector(".score > table > tbody > tr:nth-child(2)")
const drawScore = document.querySelector(".score > table > tbody > tr:nth-child(3)")

restartButton.textContent = "Play again";
restartButton.classList.add("restart");

// Could maybe just make this one refresh the page
restartButton.addEventListener("click", startGame);

startGame();