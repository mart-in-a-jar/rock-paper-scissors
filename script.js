// List of options
const choices = ["rock", "paper", "scissors"];

// Function to generate random number between num1 and num2
function random(num1, num2) {
    return Math.floor(Math.random() * (num2 - (num1 - 1))) + num1;
}

// Function to generate a random number 100 times and check against the range specified (num1-num2)
function testRandom(num1, num2) {
    let possibleNumbers = [];
    let checkOk = true;
    for  (let i = num1; i <= num2; i++) {
        possibleNumbers.push(i);
    }
    let j;
    for (let i = 0; i < 100; i++) {
        j = random(num1, num2);
        if (! possibleNumbers.includes(j)) {
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
    // return choice
}
// function to play a round
function playRound(playerChoice) {

    // playerChoice.toLowerCase
    // return: 
    // You lose! x beats y
    // You win! x beats y
}