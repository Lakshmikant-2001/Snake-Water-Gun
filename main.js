

const userOptions = document.querySelectorAll(".user-option");
const userScoreTag = document.querySelector("#user-score");
const computerScoreTag = document.querySelector("#computer-score");
const userSelectionTag = document.querySelector("#user-selection");
const computerSelectionTag = document.querySelector("#computer-selection")
const userSelectionImg = document.querySelector("#user-selection-img");
const computerSelectionImg = document.querySelector("#computer-selection-img");
const roundWinnerTag = document.querySelector("#round-winner");
const finalResultWrapper = document.querySelector("#final-result-wrapper");
const finalWinnerTag = document.querySelector("#final-winner");
const generalWrapperChild = document.querySelectorAll("#general-wrapper > *");
const restartBtn = document.querySelector("#restart-btn");

userOptions.forEach(option => {
    option.addEventListener("click", (e) => {
        playRound(e)
    })
})

restartBtn.addEventListener("click", restartGame)

function userSelect(e) {
    const targetElement = e.target;
    const dataKey = targetElement.dataset.key;
    return dataKey;
}

function computerSelect() {
    const options = ["snake", "water", "gun"]
    const randomOption = options[Math.floor(Math.random() * options.length)];
    return randomOption;
}

function playRound(e) {
    const userSelection = userSelect(e);
    const computerSelection = computerSelect();
    updateSelection(userSelection,computerSelection);

    console.log(userSelection, computerSelection)
    let  roundWinner;
    if ((userSelection == "snake" && computerSelection == "water") || (userSelection == "water" && computerSelection == "snake")) {
        (userSelection == "snake") ? roundWinner = "user" : roundWinner = "computer";
    }

    if ((userSelection == "water" && computerSelection == "gun") || (userSelection == "gun" && computerSelection == "water")) {
        (userSelection == "water") ? roundWinner = "user" : roundWinner = "computer";
    }

    if ((userSelection == "snake" && computerSelection == "gun") || (userSelection == "gun" && computerSelection == "snake")) {
        (userSelection == "gun") ? roundWinner = "user" : roundWinner = "computer";
    }
    if (userSelection == computerSelection) {
        roundWinner = "no-one";
    }
    addScore(roundWinner)
}

function updateSelection(userSelection,computerSelection){
    userSelectionTag.textContent = userSelection;
    computerSelectionTag.textContent = computerSelection;
    userSelectionImg.setAttribute('src',`./assets/${userSelection}.png`);
    computerSelectionImg.setAttribute('src',`./assets/${computerSelection}.png`)
}


let userScore = 0, computerScore = 0;

function addScore(roundWinner) {
    if (roundWinner == "user") {
        userScore++;
        roundWinnerTag.textContent = roundWinner;
    }
    else if (roundWinner == "computer") {
        computerScore++;
        roundWinnerTag.textContent = roundWinner;
    }
    else{
        roundWinnerTag.textContent = roundWinner;
    }

    updateScore(userScore,computerScore);
    checkGameProgress(userScore,computerScore)
}

function updateScore(userScore,computerScore){
    userScoreTag.textContent=userScore;
    computerScoreTag.textContent=computerScore;
}

function checkGameProgress(userScore,computerScore){
    let finalWinner= null;
    if(userScore == 5){
        finalWinner = "user";
    }
    else if(computerScore == 5){
        console.log("d");
        finalWinner = "computer";
    }
    if(finalWinner!=null){
        gameOver(finalWinner)
    }
}

function gameOver(finalWinner){
    generalWrapperChild.forEach(child => {
        child.style.display="none";
    });
    finalResultWrapper.style.display="flex";
    finalWinnerTag.textContent=finalWinner;
}

function restartGame(){
    location.reload()
}