/** @global */

 // Game status
let test;  // Board object
let moving = false; 
let whitesMove = true;
let moveCounter = 10;

// Sketch
let tileSize = 100;
let images = [];

// AI
let calDepth = 3;
let maxDepth = 9;
let whiteAI = false;
let blackAI = true;
let tempMaxDepth = 3;
let depthPara;
let depthPlus;
let depthMinus;

/**
 * p5.js setup bench, load HTML, image, canvas, and intialize the board instance
 */
function setup() {
console.log("Setting up")
    let boardCanvas = createCanvas(800,800);
    boardCanvas.id('chessboard');
    initializeHtmlElements();

    // load all chess pieces images
    for(let i = 1; i< 10; i++){
        images.push(loadImage(`./../public/img/2000px-Chess_Pieces_Sprite_0${i}.png`));
    }
    for(let i = 10; i< 13; i++){
        images.push(loadImage(`./../public/img/2000px-Chess_Pieces_Sprite_${i}.png`));
    }

    /** @global */
    test = new Board();

}

/**
 * Pain the grid, use Board {test} instance to pain all the pieces
 * @todo Find out if showGrid() can be moved to setup to improve the performance
 */
function draw() {
    let currentBoard;
    background(100);
    showGrid();
    currentBoard = test ? test : currentBoard ? currentBoard : 1; 
    currentBoard.show();
    runAIs();
}


/**
 * 
 */
function mousePressed() {
// console.log("EVENT: Mouse is pressed")
    let x = floor(mouseX / tileSize);
    let y = floor(mouseY / tileSize);
// console.log("QUERY: Board is done?");
// console.log(test.isDone());
// console.log("STATE: Test board after mouse press");
// console.log(test);
// console.log("QUERY: moving flag");
// console.log(moving)
    if(test.isDone()) return;
    if (!moving) {
// console.log("DO: moving")
        movingPiece = test.getPieceAt(x, y);
// console.log("STATE: Show the piece moving")
// console.log(movingPiece);
        if (movingPiece != null && movingPiece.white == whitesMove) {
            movingPiece.movingThisPiece = true;
        }
        else {
            return;
        }
    }
    else {
// console.log("QUERY: Check if this piece can move");
// console.log(movingPiece.canMove(x, y, test));
        if (movingPiece.canMove(x, y, test)) {
// console.log("EVENT: Moving the piece");
            movingPiece.move(x, y, test);

            whitesMove = !whitesMove;
        }
        else {
            movingPiece.movingThisPiece = false;
        }
    }
    moving = !moving;
console.log("STATE: Test board after move");
console.log(test);
}

function runAIs() {
    // const getChessPositionDifference = (board) => {
    //     const enPassantPieces = [];
    //     const moves 
    // }

    if (
        !test.isDead() &&
        blackAI && !whitesMove &&
        moveCounter < 0
    ){
        // BLUNDER: test returns 0, when it should be a board object
        test = maxFunAB(test, -400, 400, 0);
// console.log(test);
        whitesMove = true;
        moveCounter = 10;
    }
    else {
        moveCounter--;
    }
    if (
        whiteAI && whitesMove &&
        moveCounter < 0
    ){
        test = minFunAB(test, -400, 400, 0);
        whitesMove = false;
        moveCounter = 10;
    }
    else {
        moveCounter--;
    }
}

/**
 * @description
 */
function showGrid() {
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            if ((i + j) % 2 == 1) {
                fill(0);
            }
            else {
                fill(240);
            }
        noStroke();
        rect(i * tileSize, j * tileSize, tileSize, tileSize);
        }
    }
}

/**
 * DOM manipulation is expensive, consider move this to the html
 */
function initializeHtmlElements() {
    const titlePara = document.createElement('h3');
    const buttonPlus = document.createElement('button');
    const buttonMinus = document.createElement('button');
    const displayPara = document.createElement('p')
    const addDepth = _ => {
         displayPara.innerText = calDepth > maxDepth ? 
                                `Thinking ${calDepth} moves ahead` :
                                `Thinking ${++calDepth} moves ahead`;
    };
    
    const minusDepth = _ => {
        displayPara.innerText = calDepth < 2 ? 
                                `Thinking ${calDepth} moves ahead` :
                                `Thinking ${--calDepth} moves ahead`;
    };
    
    buttonPlus.class = 'button plus';
    buttonPlus.innerText = "+";
    buttonMinus.class = 'button minus';
    buttonMinus.innerText = "-";

    titlePara.innerText = 'Control Panel';
    displayPara.innerText = `Thinking ${calDepth} moves ahead`;
    document.body.appendChild(titlePara);
    document.body.appendChild(displayPara);
    document.body.appendChild(buttonPlus);
    document.body.appendChild(buttonMinus);
    
    buttonPlus.addEventListener('click', addDepth);
    buttonMinus.addEventListener('click', minusDepth);
}