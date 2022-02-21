// List of options
const choices = ["rock", "paper", "scissors"];
// Outcomes
const outcomes = {"tie": "Tie", "playerWins": "Player wins", "computerWins": "Computer wins!"};

// Function to generate random number between num1 and num2
function random(num1, num2) {
    return Math.floor(Math.random() * (num2 - (num1 - 1))) + num1;
}

// Function to generate a random number 100 times and check against the range specified (num1-num2)
function testRandom(num1, num2) {
    let possibleNumbers = [];
    let checkOk = true;
    for (let i = num1; i <= num2; i++) {
        possibleNumbers.push(i);
    }
    let j;
    for (let i = 0; i < 100; i++) {
        j = random(num1, num2);
        if (!possibleNumbers.includes(j)) {
            console.log(`Random number was ${j}. This is not in the range specified!`)
            checkOk = false;
        }
    }
    if (checkOk === true) {
        console.log("Everything works as intended.")
    }
}

// function to generate computers choice
function computerPlay() {
    return choices[random(0, choices.length - 1)]
}

// get player's choice
function playerPlay() {
    let playerChoice = prompt("Choose your weapon");
    if (playerChoice === null) {
        return;
    }
    while (!choices.includes(playerChoice.toLowerCase())) {
        alert("Not a valid choice!");
        playerChoice = prompt("Choose your weapon");
    }
    return playerChoice.toLowerCase();
}


// function to play a round
function playRound(playerChoice, computerChoice) {
    let outcome;
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
        console.log(`You lose! ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1,)} beats ${playerChoice}.`);
    } else if (outcome === outcomes["playerWins"]) {
        console.log(`You win! ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1,)} beats ${computerChoice}.`);
    } else {
        console.log(`It's a tie. Both chose ${playerChoice}`);
    }

    return outcome;
}

// play five rounds
let playerWins = 0,
    computerWins = 0,
    draws = 0;

function game() {
    let playerChoice, computerChoice, outcome;
    for (let i = 1; i <= 5; i++) {
        console.log(`Round ${i}:`)
        playerChoice = playerPlay();
        console.log(`Player chose ${playerChoice}`);
        computerChoice = computerPlay();
        console.log(`Computer chose ${computerChoice}`);
        if (!playerChoice) {
            console.log("\nAborted by player");
            alert("You give up");
            return;
        }
        outcome = playRound(playerChoice, computerChoice);
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
        console.log(`Player wins: ${playerWins}\nComputer wins: ${computerWins}\nDraws: ${draws}\n\n`)
    }
    if (playerWins > computerWins) {
        console.log(`Player wins the best of 5: (${playerWins}/5 rounds won.)`);
        alert(`Player wins the best of 5: (${playerWins}/5 rounds won.)`);
    } else if (playerWins < computerWins) {
        console.log(`Computer wins the best of 5: (${computerWins}/5 rounds won.)`);
        alert(`Computer wins the best of 5: (${computerWins}/5 rounds won.)`);
    } else {
        console.log(`It's a draw. You won ${playerWins} round(s) each.`);
        alert(`It's a draw. You won ${playerWins} round(s) each.`);
    }
}

const playButton = document.querySelector("#play");
playButton.addEventListener("click", game);