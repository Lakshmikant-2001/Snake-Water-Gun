

const userOptions = document.querySelectorAll(".user-option");
const userScoreTag = document.querySelector("#user-score");
const computerScoreTag = document.querySelector("#computer-score");
const userSelectionTag = document.querySelector("#user-selection");
const computerSelectionTag = document.querySelector("#computer-selection")
const userSelectionImg = document.querySelector("#user-selection-img");
const computerSelectionImg = document.querySelector("#computer-selection-img");
const roundWrapper = document.querySelector("#round-wrapper")
const roundWinnerTag = document.querySelector("#round-winner");
const finalResultWrapper = document.querySelector("#final-result-wrapper");
const finalWinnerTag = document.querySelector("#final-winner");
const generalWrapperChild = document.querySelectorAll("#general-wrapper > *");
const restartBtn = document.querySelector("#restart-btn");
const userOptionsWrapper = document.querySelector("#user-options-wrapper");
const waitMsgTag = document.querySelector("#wait-msg");
const iBtn = document.querySelector("#i-btn");
const mnkyImg = document.querySelector("#monkey-img");

const options = ["snake", "water", "gun"];
let i = 0;


userOptions.forEach(option => {
    option.addEventListener("click", (e) => {
        changeToWaitState(e);
    });

    option.addEventListener("keydown", (e) => {
        if (e.keyCode == 13) {
            changeToWaitState(e);
        }
    });
});

restartBtn.addEventListener("click", restartGame)
restartBtn.addEventListener("keydown", (e) => {
    console.log(e)
    if (e.keyCode == 13) {
        restartGame()
    }
});

function changeToWaitState(e) {
    blockEvents()
    const myInterval = setInterval(selectionAnimation, 200);
    roundWrapper.style.visibility = "hidden";
    waitMsgTag.style.visibility = "unset";
    userSelectionImg.classList.add("sel-img");
    computerSelectionImg.classList.add("sel-img");
    mnkyImg.style.display="none";
    mnkyImg.removeAttribute("class")
    setTimeout(() => {
        removeWaitState(e, myInterval)
    }, 1000);
}

function removeWaitState(e, myInterval) {
    allowEvents()
    clearInterval(myInterval)
    playRound(e)
    userSelectionImg.classList.remove("sel-img");
    computerSelectionImg.classList.remove("sel-img");
    waitMsgTag.style.visibility = "hidden";
    roundWrapper.style.visibility = "unset";
}

function allowEvents() {
    userOptionsWrapper.style.cursor = "pointer";
    userOptions.forEach(option => {
        option.style.pointerEvents = "unset";
    });
}

function blockEvents() {
    userOptionsWrapper.style.cursor = "not-allowed";
    userOptions.forEach(option => {
        option.style.pointerEvents = "none";
    });
}

function selectionAnimation() {
    if (i <= 2) {
        userSelectionImg.setAttribute("src", `./assets/${options[i]}.png`);
        computerSelectionImg.setAttribute("src", `./assets/${options[i]}.png`);
        i++;
    }
    else {
        i = 0;
    }
}


function userSelect(e) {
    const targetElement = e.target;
    const dataKey = targetElement.dataset.key;
    return dataKey;
}

function computerSelect() {
    const randomOption = options[Math.floor(Math.random() * options.length)];
    return randomOption;
}

function playRound(e) {
    const userSelection = userSelect(e);
    const computerSelection = computerSelect();
    updateSelection(userSelection, computerSelection);

    console.log(userSelection, computerSelection)
    let roundWinner;
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

function updateSelection(userSelection, computerSelection) {
    userSelectionTag.textContent = userSelection;
    computerSelectionTag.textContent = computerSelection;
    userSelectionImg.setAttribute('src', `./assets/${userSelection}.png`);
    computerSelectionImg.setAttribute('src', `./assets/${computerSelection}.png`)
}


let userScore = 0, computerScore = 0;

function addScore(roundWinner) {
    if (roundWinner == "user") {
        userScore++;
        roundWinnerTag.textContent = roundWinner;
        mnkyImg.style.display = "unset";
        mnkyImg.classList.add("mnky-left");
    }
    else if (roundWinner == "computer") {
        computerScore++;
        roundWinnerTag.textContent = roundWinner;
        mnkyImg.style.display = "unset";
        mnkyImg.classList.add("mnky-right");
    }
    else {
        roundWinnerTag.textContent = roundWinner;
    }

    updateScore(userScore, computerScore);
    checkGameProgress(userScore, computerScore)
}

function updateScore(userScore, computerScore) {
    userScoreTag.textContent = userScore;
    computerScoreTag.textContent = computerScore;
}

function checkGameProgress(userScore, computerScore) {
    let finalWinner = null;
    if (userScore == 5) {
        finalWinner = "user";
    }
    else if (computerScore == 5) {
        console.log("d");
        finalWinner = "computer";
    }
    if (finalWinner != null) {
        gameOver(finalWinner)
    }
}

function gameOver(finalWinner) {
    generalWrapperChild.forEach(child => {
        child.style.display = "none";
    });
    finalResultWrapper.style.display = "flex";
    finalWinnerTag.textContent = finalWinner;
}

function restartGame() {
    location.reload()
}