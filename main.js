function getNoOfRounds() {
    return prompt("rounds")
}

function userSelect() {
    return prompt("user option");
}

function computerSelect() {
    const options = ["s","w","g"]
    const randomOption =  options[Math.floor(Math.random()*options.length)];
    return randomOption;
}

function playRound() {
    const userSelection = userSelect();
    const computerSelection = computerSelect();
    console.log(userSelection,computerSelection)
    let result, winner;
    if ((userSelection == "s" && computerSelection == "w") || (userSelection == "w" && computerSelection == "s")) {
        result = "s";
        (userSelection == "s") ? winner = "user" : winner = "computer";
    }

    if ((userSelection == "w" && computerSelection == "g") || (userSelection == "g" && computerSelection == "w")) {
        result = "w";
        (userSelection == "w") ? winner = "user" : winner = "computer";
    }

    if ((userSelection == "s" && computerSelection == "g") || (userSelection == "g" && computerSelection == "s")) {
        result = "g";
        (userSelection == "g") ? winner = "user" : winner = "computer";
    }
    if (userSelection == computerSelection) {
        result = "d";
        winner = null;
    }
    return [result, winner];
}

function game() {
    const rounds = getNoOfRounds();
    let userScore = 0, computerScore = 0, resultArray, finalWinner;
    for (let i = 0; i < rounds; i++) {
        resultArray = playRound()
        if (resultArray[1] == "user") {
            userScore++;
        }
        else if (resultArray[1] == "computer") {
            computerScore++;
        }
        console.log(userScore, computerScore);
    }
    
    if(userScore > computerScore){
        finalWinner = "user";
    }
    else if(userScore < computerScore){
        finalWinner = "computer"
    }
    else{
        finalWinner = "draw"
    }
    console.log(finalWinner)
}

game()