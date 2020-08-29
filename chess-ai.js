let maxDepth = 3;

function minFun(board, depth) {
    if (depth >= maxDepth) {
        board.setScore();
        return board.score;
    }

    let boards = board.generateNewBoardsWhitesTurn();
    let lowestBoardNo = 0;
    let lowestScore = 100000;
    let score = 0;
    let gameOver = boards[i].isDead() ? true : false;
    for (let i = 0; i < board.length; i++) {
        score = !boards[i].isDead() ? 
    }
}