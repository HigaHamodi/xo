const gameBoard = document.querySelector('#gameboard');
const infoDisplay = document.querySelector('#info');
const startCells = ["", "", "", "", "", "", "", "", ""];
let game = "circle";
let gameOver = false;
let circleWinsCount = 0;
let crossWinsCount = 0;
let drawsCount = 0;

const circleWinsCounter = document.querySelector('#circleWinsCount');
const crossWinsCounter = document.querySelector('#crossWinsCount');
const drawsCounter = document.querySelector('#drawsCount');
const newGameButton = document.querySelector('#newGameButton');

infoDisplay.textContent = "circle goes first"

function createBoard() {
    startCells.forEach((cell, index) => {
        const cellElement = document.createElement('div')
        cellElement.classList.add('square')
        cellElement.id = index
        cellElement.addEventListener('click',addGo)
        gameBoard.append(cellElement)
    })
}
createBoard()

function addGo(e) {
    if (!e.target.firstChild) {
    const goDisplay = document.createElement('div')
    goDisplay.classList.add('game')
    goDisplay.classList.add(game);
    e.target.append(goDisplay)
    game = game === "circle"? "cross" : "circle"
    infoDisplay.textContent = game + " goes first"
    e.target.removeEventListener('click',addGo)
    checkscore()
}
}
function isBoardFull() {
    const allSquares = document.querySelectorAll('.square');
    return Array.from(allSquares).every(square => square.firstChild !== null);
}

function checkscore() {
    const allSquares = document.querySelectorAll('.square');
    const winnerCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let isDraw = true; // Assume it's a draw by default

    winnerCombos.forEach(array => {
        const circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('circle'));
        const crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('cross'));

        if (circleWins || crossWins) {
            if (circleWins) {
                circleWinsCount++;
                circleWinsCounter.textContent = circleWinsCount;
            } else {
                crossWinsCount++;
                crossWinsCounter.textContent = crossWinsCount;
            }

            infoDisplay.textContent = circleWins ? "Circle Wins" : "Cross Wins";

            allSquares.forEach(square => {
                square.removeEventListener('click', addGo);
            });

            gameOver = true;
            isDraw = false; 
            return;
        }
    });

    if (isDraw && isBoardFull()) {
        drawsCount++;
        drawsCounter.textContent = drawsCount;
        infoDisplay.textContent = "It's a Draw!";
        gameOver = true;
    }
}



newGameButton.addEventListener('click', startNewGame);

function startNewGame() {
    gameBoard.innerHTML = '';
    createBoard();
    infoDisplay.textContent = "Circle goes first";
    gameOver = false;
}