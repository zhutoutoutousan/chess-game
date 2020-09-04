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
        return board.score;
    }


    let boards = board.generateNewBoardsBlacksTurn();
    let topBoardNo = 0;
    let topScore = -100000;

    if (depth == 0) {
        print(boards);
    }

    for (let i = 0; i< boards.length; i++) {
        let score = minFun(boards[i], depth + 1);
        if (score > topScore) {
            topBoardNo = i;
            topScore = score;
        }
    }
    
    if (depth == 0) {
        print(topScore);
        return boards[topBoardNo];
    }

    return topScore;
}

/**
 * 
 * @param {Object} board 
 * @param {*} alpha 
 * @param {*} beta 
 * @param {*} depth 
 */
function minFunAB(board, alpha, beta, depth) {
    if (depth >= maxDepth) {
        board.setScore();
        return board.score;
    }


    if (board.isDead()) {
        if (whiteAI && whitesMove) {
            return 200;
        }
        if (blackAI && !whitesMove) {
            return -200;
        }
    }

    if (board.hasWon()) {

        if (whiteAI && whitesMove) {
            return -200;
        }
        if (blackAI && !whitesMove) {
            return 200;
        }
    }

    
}

/**
 * 
 * @param {*} board 
 * @param {*} alpha 
 * @param {*} beta 
 * @param {*} depth 
 */
function maxFunAB(board, alpha, beta, depth) {
    if (depth == 0) {
        board.setScore();
        return board.score;
    }

    if (board.isDead()) {
        if (whiteAI && whitesMove) {
            return 200;
        }
        if (blackAI && !whitesMove) {
            return -200;
        }
    }

    // dubious?
    if (board.hasWon()) {
        if (whiteAI && whitesMove) {
          return -200;
        }
        if (blackAI && !whitesMove) {
          return 200;
        }
    }

    let boards = board.generateNewBoardsBlacksTurn();
    if (depth == 0) {
        print(boards);
    }

    let topBoardNo = 0;
    let topScore = -300;
    for (let i = 0; i < boards.length; i++) {
        let score = minFunAB(boards[i], alpha, beta, depth + 1);
        if (score > topScore) {
            topBoardNo = i;
            topScore = score;
        }
        else {
            topBoardNo = depth == 0 && score == topScore && Random(1) < 0.3 ? i : topBoardNo;
        }

        if (score > beta) return topScore;
        if (score > alpha) alpha = score;
    }

    if (depth == 0) {
        print(topScore);
        return boards[topBoardNo];
    }
    return topScore;
}