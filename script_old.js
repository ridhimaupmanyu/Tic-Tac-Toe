let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset_Btn");
let msg = document.querySelector("#msg");
let turnText = document.querySelector("#turn");

const oneBtn = document.getElementById("one_p");
const multiBtn = document.getElementById("multi_p");

let turnO = true;
let count = 0;
let onePlayerMode = false;
let gameStarted = false;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];


// Multiplayer logic
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!gameStarted) return;
        if (box.innerText !== "") return;
        console.log("Box was clicked");

        if (turnO) {
            box.textContent = "O";
            turnO = false;
            turnText.textContent = "Turn : X";
        } else {
            box.textContent = "X";
            turnO = true;
            turnText.textContent = "Turn : O";
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
        if (onePlayerMode && !turnO && !isWinner && count < 9) {
            setTimeout(botMove, 600);
        }

    });
});

// One player logic
function botMove() {
    let emptyBoxes = Array.from(boxes).filter(box => box.innerText === "");


    for (let pattern of winPatterns) {
        if (tryCompleteLine(pattern, "X")) return;
    }

    for (let pattern of winPatterns) {
        if (tryCompleteLine(pattern, "O")) return;
    }


    let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    if (randomBox) {
        randomBox.innerText = "X";
        randomBox.disabled = true;
        count++;
        checkWinner();
        turnText.textContent = "Turn : O";
        turnO = true;
    }
}

function tryCompleteLine(pattern, symbol) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    let values = [pos1Val, pos2Val, pos3Val];
    let filled = values.filter(v => v === symbol).length;
    let emptyIndex = values.indexOf("");

    if (filled === 2 && emptyIndex !== -1) {
        let moveIndex = pattern[emptyIndex];
        boxes[moveIndex].innerText = "X";
        boxes[moveIndex].disabled = true;
        count++;
        checkWinner();
        turnText.textContent = "Turn : O";
        turnO = true;
        return true;
    }

    return false;
}


// Game logic
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                // console.log("Winner", pos1Val);
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
};

const showWinner = (winner) => {
    msg.textContent = `Congratulations! Winner is ${winner}`;
    msg.style.display = "block";
    disableBoxes();
}

const gameDraw = () => {
    msg.textContent = "Game was a Draw";
    msg.style.display = "block";
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msg.style.display = "none";
    turnText.textContent = "Turn : O";
}

oneBtn.addEventListener("click", () => {
    onePlayerMode = true;
    gameStarted = true;

    resetGame();
    document.querySelector("#modeStatus").textContent = "Current Mode: One-Player";

});

multiBtn.addEventListener("click", () => {
    onePlayerMode = false;
    gameStarted = true;

    resetGame();
    document.querySelector("#modeStatus").textContent = "Current Mode: Multi-Player";

});



resetBtn.addEventListener("click", resetGame);

