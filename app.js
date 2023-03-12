const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const startCells = [
    "", "", "", "", "", "", "", "", ""
]
let turn = "circle";
infoDisplay.textContent = "Circle goes first";

function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("square");
        cellElement.id = index;
        cellElement.addEventListener("click", addTurn);
        gameBoard.append(cellElement);
    })
}
createBoard()

function addTurn(element) {
    // console.log(element.target);
    const turnDisplay = document.createElement("div");
    turnDisplay.classList.add(turn);
    element.target.append(turnDisplay);
    turn = turn === "circle" ? "cross" : "circle";
    infoDisplay.textContent = "It is now " + turn + "'s turn.";
    element.target.removeEventListener("click", addTurn);
    checkScore()
}

function checkScore() {
    const allSquares = document.querySelectorAll(".square");
    // console.log(allSquares);

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6], 
    ]
    // console.log(allSquares[5]);

    winningCombinations.forEach(array => {
        const circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains("circle"));

        if(circleWins) {
            infoDisplay.textContent = "Circle Wins!";
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            return;
        }
    })

    winningCombinations.forEach(array => {
        const crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains("cross"));

        if(crossWins) {
            infoDisplay.textContent = "Cross Wins!";
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            return;
        }
    })
}