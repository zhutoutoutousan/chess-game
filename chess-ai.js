/** @global */
let maxDepth = 3;

/**
 * 
 * @param {Object} board 
 * @param {number} depth 
 */
function minFun(board, depth) {
    if (depth >= maxDepth) {
        board.setScore();
        return board.score;
    }

    let boards = board.generateNewBoardsWhitesTurn();
    let lowestBoardNo = 0;
    let lowestScore = 100000;
    let score = 0;

    for (let i = 0; i < board.length; i++) {
        if (!boards[i].isDead()) {
            let score = maxFun(boards[i], depth + 1);
            if (score < lowestScore) {
                lowestBoardNo = i;
                lowestScore = score;
            }
        }
    }
    return lowestScore;
}


/**
 * 
 * @param {Object} board 
 * @param {number} depth 
 */
function maxFun(board, depth) {
    if (depth >= maxDepth ) {
        board.setScore();
    }
    return board.score;
}

