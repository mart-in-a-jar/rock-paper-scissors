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
let playerChoice = prompt("Choose your weapon");
while (!playerChoice || (!choices.includes(playerChoice.toLowerCase()))) {
    alert("Not a valid choice!");
    playerChoice = prompt("Choose your weapon");
}
playerChoice = playerChoice.toLowerCase();

// get computer's choice
let computerChoice = computerPlay();
console.log(computerChoice);

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
    return outcome;
}

let outcome = playRound(playerChoice, computerChoice);
console.log(outcome);


if (outcome === outcomes["computerWins"]) {
    console.log(`You lose! ${computerChoice} beats ${playerChoice}.`);
} else if (outcome === outcomes["playerWins"]) {
    console.log(`You win! ${playerChoice} beats ${computerChoice}.`);
} else {
    console.log(`It's a tie. Both chose ${playerChoice}`);
}