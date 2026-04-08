let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset_Btn");
let newBtn = document.querySelector("#new_Btn");
let msg = document.querySelector("#msg");
let turnText = document.querySelector("#turn");
let scoreBoard = document.querySelector(".score_b");
let score1 = document.querySelector("#score1");
let score2 = document.querySelector("#score2");

const oneBtn = document.getElementById("one_p");
const multiBtn = document.getElementById("multi_p");

let turnO = true;
let count = 0;
let onePlayerMode = false;
let gameStarted = false;

let player1Score = 0;
let player2Score = 0;


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

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
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
    if (winner === "O") {
        player1Score++;
        score1.textContent = player1Score;
    } else if (winner === "X") {
        player2Score++;
        score2.textContent = player2Score;
    }

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

    if (onePlayerMode) {
        scoreBoard.style.display = "none";
    } else {
        scoreBoard.style.display = "flex";
        score1.textContent = player1Score;
        score2.textContent = player2Score;
    }
}

const newGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msg.style.display = "none";
    turnText.textContent = "Turn : O";

    player1Score = 0;
    player2Score = 0;

    if (onePlayerMode) {
        scoreBoard.style.display = "none";
    } else {
        scoreBoard.style.display = "flex";
        score1.textContent = player1Score;
        score2.textContent = player2Score;
    }
}

oneBtn.addEventListener("click", () => {
    onePlayerMode = true;
    gameStarted = true;

    resetGame();
    scoreBoard.style.display = "none";
    document.querySelector("#modeStatus").textContent = "Current Mode: One-Player";

});

multiBtn.addEventListener("click", () => {
    onePlayerMode = false;
    gameStarted = true;

    resetGame();
    document.querySelector("#modeStatus").textContent = "Current Mode: Multi-Player";

});

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", newGame);




// Oneplayer logic
const checkWin = (symbol) => {
    if (boxes[0].innerText === symbol && boxes[1].innerText === symbol && boxes[2].innerText === symbol)
        return true;
    if (boxes[0].innerText === symbol && boxes[3].innerText === symbol && boxes[6].innerText === symbol)
        return true;
    if (boxes[0].innerText === symbol && boxes[4].innerText === symbol && boxes[8].innerText === symbol)
        return true;
    if (boxes[1].innerText === symbol && boxes[4].innerText === symbol && boxes[7].innerText === symbol)
        return true;
    if (boxes[2].innerText === symbol && boxes[5].innerText === symbol && boxes[8].innerText === symbol)
        return true;
    if (boxes[2].innerText === symbol && boxes[4].innerText === symbol && boxes[6].innerText === symbol)
        return true;
    if (boxes[3].innerText === symbol && boxes[4].innerText === symbol && boxes[5].innerText === symbol)
        return true;
    if (boxes[6].innerText === symbol && boxes[7].innerText === symbol && boxes[8].innerText === symbol)
        return true;
    return false;
};


const botMove = () => {
    if (!gameStarted) return;

    // 0, 1, 2
    for (let i = 0; i < 1; i++) {
        if ((boxes[i].innerText === "O" && boxes[i + 1].innerText === "O" && boxes[i + 2].innerText === "") ||
            (boxes[i].innerText === "X" && boxes[i + 1].innerText === "X" && boxes[i + 2].innerText === "")) {
            boxes[i + 2].innerText = "X";
            boxes[i + 2].disabled = true;
            finalBotMove();
            return;
        }
        if ((boxes[i + 1].innerText === "O" && boxes[i + 2].innerText === "O" && boxes[i].innerText === "") ||
            (boxes[i + 1].innerText === "X" && boxes[i + 2].innerText === "X" && boxes[i].innerText === "")) {
            boxes[i].innerText = "X";
            boxes[i].disabled = true;
            finalBotMove();
            return;
        }
        if ((boxes[i].innerText === "O" && boxes[i + 2].innerText === "O" && boxes[i + 1].innerText === "") ||
            (boxes[i].innerText === "X" && boxes[i + 2].innerText === "X" && boxes[i + 1].innerText === "")) {
            boxes[i + 1].innerText = "X";
            boxes[i + 1].disabled = true;
            finalBotMove();
            return;
        }


        // 3, 4, 5

        if ((boxes[i + 3].innerText === "O" && boxes[i + 4].innerText === "O" && boxes[i + 5].innerText === "") ||
            (boxes[i + 3].innerText === "X" && boxes[i + 4].innerText === "X" && boxes[i + 5].innerText === "")) {
            boxes[i + 5].innerText = "X";
            boxes[i + 5].disabled = true;
            finalBotMove();
            return;
        }
        if ((boxes[i + 4].innerText === "O" && boxes[i + 5].innerText === "O" && boxes[i + 3].innerText === "") ||
            (boxes[i + 4].innerText === "X" && boxes[i + 5].innerText === "X" && boxes[i + 3].innerText === "")) {
            boxes[i + 3].innerText = "X";
            boxes[i + 3].disabled = true;
            finalBotMove();
            return;
        }
        if ((boxes[i + 3].innerText === "O" && boxes[i + 5].innerText === "O" && boxes[i + 4].innerText === "") ||
            (boxes[i + 3].innerText === "X" && boxes[i + 5].innerText === "X" && boxes[i + 4].innerText === "")) {
            boxes[i + 4].innerText = "X";
            boxes[i + 4].disabled = true;
            finalBotMove();
            return;
        }


        // 6, 7, 8

        if ((boxes[i + 6].innerText === "O" && boxes[i + 7].innerText === "O" && boxes[i + 8].innerText === "") ||
            (boxes[i + 6].innerText === "X" && boxes[i + 7].innerText === "X" && boxes[i + 8].innerText === "")) {
            boxes[i + 8].innerText = "X";
            boxes[i + 8].disabled = true;
            finalBotMove();
            return;
        }
        if ((boxes[i + 7].innerText === "O" && boxes[i + 8].innerText === "O" && boxes[i + 6].innerText === "") ||
            (boxes[i + 7].innerText === "X" && boxes[i + 8].innerText === "X" && boxes[i + 6].innerText === "")) {
            boxes[i + 6].innerText = "X";
            boxes[i + 6].disabled = true;
            finalBotMove();
            return;
        }
        if ((boxes[i + 6].innerText === "O" && boxes[i + 8].innerText === "O" && boxes[i + 7].innerText === "") ||
            (boxes[i + 6].innerText === "X" && boxes[i + 8].innerText === "X" && boxes[i + 7].innerText === "")) {
            boxes[i + 7].innerText = "X";
            boxes[i + 7].disabled = true;
            finalBotMove();
            return;
        }


        // 0, 3, 6

        if ((boxes[i].innerText === "O" && boxes[i + 3].innerText === "O" && boxes[i + 6].innerText === "") ||
            (boxes[i].innerText === "X" && boxes[i + 3].innerText === "X" && boxes[i + 6].innerText === "")) {
            boxes[i + 6].innerText = "X";
            boxes[i + 6].disabled = true;
            finalBotMove();
            return;
        }
        if ((boxes[i + 3].innerText === "O" && boxes[i + 6].innerText === "O" && boxes[i].innerText === "") ||
            (boxes[i + 3].innerText === "X" && boxes[i + 6].innerText === "X" && boxes[i].innerText === "")) {
            boxes[i].innerText = "X";
            boxes[i].disabled = true;
            finalBotMove();
            return;
        }
        if ((boxes[i].innerText === "O" && boxes[i + 6].innerText === "O" && boxes[i + 3].innerText === "") ||
            (boxes[i].innerText === "X" && boxes[i + 6].innerText === "X" && boxes[i + 3].innerText === "")) {
            boxes[i + 3].innerText = "X";
            boxes[i + 3].disabled = true;
            finalBotMove();
            return;
        }


        // 1, 4, 7

        if ((boxes[i + 1].innerText === "O" && boxes[i + 4].innerText === "O" && boxes[i + 7].innerText === "") ||
            (boxes[i + 1].innerText === "X" && boxes[i + 4].innerText === "X" && boxes[i + 7].innerText === "")) {
            boxes[i + 7].innerText = "X";
            boxes[i + 7].disabled = true;
            finalBotMove();
            return;
        }
        if ((boxes[i + 4].innerText === "O" && boxes[i + 7].innerText === "O" && boxes[i + 1].innerText === "") ||
            (boxes[i + 4].innerText === "X" && boxes[i + 7].innerText === "X" && boxes[i + 1].innerText === "")) {
            boxes[i + 1].innerText = "X";
            boxes[i + 1].disabled = true;
            finalBotMove();
            return;
        }
        if ((boxes[i + 1].innerText === "O" && boxes[i + 7].innerText === "O" && boxes[i + 4].innerText === "") ||
            (boxes[i + 1].innerText === "X" && boxes[i + 7].innerText === "X" && boxes[i + 4].innerText === "")) {
            boxes[i + 4].innerText = "X";
            boxes[i + 4].disabled = true;
            finalBotMove();
            return;
        }


        // 2, 5, 8

        if ((boxes[i + 2].innerText === "O" && boxes[i + 5].innerText === "O" && boxes[i + 8].innerText === "") ||
            (boxes[i + 2].innerText === "X" && boxes[i + 5].innerText === "X" && boxes[i + 8].innerText === "")) {
            boxes[i + 8].innerText = "X";
            boxes[i + 8].disabled = true;
            finalBotMove();
            return;
        }
        if ((boxes[i + 5].innerText === "O" && boxes[i + 8].innerText === "O" && boxes[i + 2].innerText === "") ||
            (boxes[i + 5].innerText === "X" && boxes[i + 8].innerText === "X" && boxes[i + 2].innerText === "")) {
            boxes[i + 2].innerText = "X";
            boxes[i + 2].disabled = true;
            finalBotMove();
            return;
        }
        if ((boxes[i + 2].innerText === "O" && boxes[i + 8].innerText === "O" && boxes[i + 5].innerText === "") ||
            (boxes[i + 2].innerText === "X" && boxes[i + 8].innerText === "X" && boxes[i + 5].innerText === "")) {
            boxes[i + 5].innerText = "X";
            boxes[i + 5].disabled = true;
            finalBotMove();
            return;
        }


        // 0, 4, 8

        if ((boxes[i].innerText === "O" && boxes[i + 4].innerText === "O" && boxes[i + 8].innerText === "") ||
            (boxes[i].innerText === "X" && boxes[i + 4].innerText === "X" && boxes[i + 8].innerText === "")) {
            boxes[i + 8].innerText = "X";
            boxes[i + 8].disabled = true;
            finalBotMove();
            return;
        }
        if ((boxes[i + 4].innerText === "O" && boxes[i + 8].innerText === "O" && boxes[i].innerText === "") ||
            (boxes[i + 4].innerText === "X" && boxes[i + 8].innerText === "X" && boxes[i].innerText === "")) {
            boxes[i].innerText = "X";
            boxes[i].disabled = true;
            finalBotMove();
            return;
        }
        if ((boxes[i].innerText === "O" && boxes[i + 8].innerText === "O" && boxes[i + 4].innerText === "") ||
            (boxes[i].innerText === "X" && boxes[i + 8].innerText === "X" && boxes[i + 4].innerText === "")) {
            boxes[i + 4].innerText = "X";
            boxes[i + 4].disabled = true;
            finalBotMove();
            return;
        }


        // 2, 4, 6

        if ((boxes[i + 2].innerText === "O" && boxes[i + 4].innerText === "O" && boxes[i + 6].innerText === "") ||
            (boxes[i + 2].innerText === "X" && boxes[i + 4].innerText === "X" && boxes[i + 6].innerText === "")) {
            boxes[i + 6].innerText = "X";
            boxes[i + 6].disabled = true;
            finalBotMove();
            return;
        }
        if ((boxes[i + 4].innerText === "O" && boxes[i + 6].innerText === "O" && boxes[i + 2].innerText === "") ||
            (boxes[i + 4].innerText === "X" && boxes[i + 6].innerText === "X" && boxes[i + 2].innerText === "")) {
            boxes[i + 2].innerText = "X";
            boxes[i + 2].disabled = true;
            finalBotMove();
            return;
        }
        if ((boxes[i + 2].innerText === "O" && boxes[i + 6].innerText === "O" && boxes[i + 4].innerText === "") ||
            (boxes[i + 2].innerText === "X" && boxes[i + 6].innerText === "X" && boxes[i + 4].innerText === "")) {
            boxes[i + 4].innerText = "X";
            boxes[i + 4].disabled = true;
            finalBotMove();
            return;
        }


        for (let i = 0; i < 9; i++) {
            if (boxes[i].innerText === "") {
                boxes[i].innerText = "X";
                boxes[i].disabled = true;
                finalBotMove();
                return;
            }
        }
    };

}

const finalBotMove = () => {
    count++;
    turnO = true;
    turnText.innerText = "Turn : O";
    checkWin();
    if(checkWin("X")){
        msg.textContent = "Computer Wins";
        msg.style.display = "block";
    }
};




