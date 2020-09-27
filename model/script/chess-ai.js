/** @global */
// let maxDepth = 3;

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
        score = minFun(boards[i], depth + 1);
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
    if (depth >= tempMaxDepth) {
        board.setScore();
        return board.score;
    }

    if (board.isDead()) return whiteAI && whitesMove ? 
                               200 : blackAI && !whitesMove ?
                              -200 : null; 

    let boards = board.generateNewBoardsWhitesTurn();
    let lowestBoardNo = 0;
    let lowestScore = 300;
    for (let i = 0; i < boards.length; i++) {
        score = maxFunAB(boards[i], alpha, beta, depth + 1);
        if (score < lowestScore) {
            topBoardNo = i;
            topScore = score;
        }
        else {
            lowestBoardNo = depth == 0 && score == lowestScore && random(1) < 0.3 ? i : lowestBoardNo;
        }

        if (score < alpha) return lowestScore;
        if (score < beta) beta = score;
    }

    if (score < alpha) return lowestScore;
    if (score < beta) beta = score;
    if (depth === 0) return boards[lowestBoardNo];

    return lowestScore;
}

/**
 * 
 * @param {Object} board 
 * @param {*} alpha 
 * @param {*} beta 
 * @param {*} depth 
 */
function maxFunAB(board, alpha, beta, depth) {
// console.log(`----- `)
// console.log(`AI: Evaluating depth: ${depth}`);
// console.log(`AI: Current board status`);
// console.log(board);
// console.log(`AI: Current alpha value: ${alpha}`);
// console.log(`AI: Current beta value: ${beta}`);

    let score;

    // When the maxDepth is reached(The top of the callstack), return the board score to the
    // caller(the higher level node)
    if (depth >= tempMaxDepth) {
        score = score ? score : 0;
        board.setScore();
        return board.score;
    }

    // When the game is over, return scores directly
    if (board.isDead()) return whiteAI && whitesMove ? 
                               200 : blackAI && !whitesMove ?
                              -200 : null; 


    // Generate all possibilities for black to move given the present board.  

    let boards = board.generateNewBoardsBlacksTurn();
// console.log(`AI: GENERATE all possibilities for black at depth: ${depth} `);
// console.log(boards);
    let topBoardNo = 0;
    let topScore = -300;
    for (let i = 0; i < boards.length; i++) {
        score = minFunAB(boards[i], alpha, beta, depth + 1);
        if (score > topScore) {
            topBoardNo = i;
            topScore = score;
        }
        else {
            topBoardNo = depth == 0 && score == topScore && random(1) < 0.3 ? i : topBoardNo;
        }

        if (score > beta) return topScore;
        if (score > alpha) alpha = score;
    }

    if (depth == 0) {
// console.log('AI: Evaluation complete, output the topScore')
// console.log(topScore);
// console.log('AI: Evaluation complete, output the new board')
// console.log(boards[topBoardNo]);
        return boards[topBoardNo];
    }
    return topScore;
}