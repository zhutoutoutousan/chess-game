/**
 * Class setting up the basic board and maneuver properties of all the pieces
 * @external ./libraries/p5.js
 */
class Piece {
    /**
     * Create a piece with an intial position, side, category and appearance
     * @param {number} x The matrix position x |---->
     *                                         | 
     *                                         | 
     *                                        \|/  
     * @param {number} y The matrix position y
     * @param {boolean} isWhite  Describe whether a piece belongs to black or white
     * @param {string} letter Describe the representing symbol of a piece
     * @param {string} pic The file path of the image
     */
    constructor(x, y, isWhite, letter, pic) {
        this.matrixPosition = createVector(x, y);
        this.pixelPosition = createVector(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);
        this.taken = false;
        this.white = isWhite;
        this.letter = letter;
        this.pic = pic;
        this.movingThisPiece = false;
        this.value = 0;

        this.playerInvoked = false;
        this.AIgenerated = false;
    }

    /**
     * If the piece is not taken, initalize the imageMode.
     * If the user is moving the piece, the piece follows the mouse.
     * If the user is not moving the piece, show the piece according to its store position.
     * @see https://p5js.org/reference/#/p5/imageMode
     * @see https://p5js.org/reference/#/p5/image
     */
    show() {
        if(!this.taken) {
            imageMode(CENTER);
            if (this.movingThisPiece) {
                text(this.letter, mouseX, mouseY);
                image(this.pic, mouseX, mouseY, tileSize * 1.5. tileSize * 1.5);
            }
            else {
                text(this.letter, this.pixelPosition.x, this.pixelPosition.y);
                image(this.pic, this.pixelPosition.x, this.pixelPosition.y, tileSize, tileSize);
            }
        }
    }

    /**
     * 
     * @param {Object} currentBoard 
     * @return {Object}
     */
    generateNewBoards(currentBoard) {
        let boards = []; // all boards created from moving this piece
        let moves = this.generateMoves(currentBoard); 
// console.log(`GENERATE BOARD`)
        for(let i = 0; i < moves.length; i++) {
            boards[i] = currentBoard.clone();
            boards[i].move(this.matrixPosition, moves[i]);
        }
// console.log(boards)
        return boards;
    }
    /**
     * 
     * @param {*} x 
     * @param {*} y 
     */
    withinBounds(x, y) {
        if (x >= 0 && y >= 0 && x < 8 && y < 8){
            return true;
        }
        return false;
    }
    /**
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} board 
     */
    attackingAllies(x, y, board){
        let attacking = board.getPieceAt(x, y);
        if(attacking != null) {
            if(attacking.white == this.white){
                return true;
            }
        }
        return false;
    }
    /**
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} board 
     */
    canMove(x, y, board) {
        if(!this,withinBounds(x, y)){
            return false;
        }
        return true;
    }
    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Object} board 
     * @return {Boolean} 
     */
    moveThroughPieces(x, y, board) {
        let stepDirectionX = x - this.matrixPosition.x;
        stepDirectionX = stepDirectionX > 0 ? 1
                         : stepDirectionX < 0 ? -1
                         : 0;
        let stepDirectionY = y - this.matrixPosition.y;
        stepDirectionY = stepDirectionY > 0 ? 1
                         : stepDirectionY < 0 ? -1
                         : 0;
        let tempPos = createVector(this.matrixPosition.x, this.matrixPosition.y);
        tempPos.x += stepDirectionX;
        tempPos.y += stepDirectionY;
        while (tempPos.x != x || tempPos.y != y){
// console.log(tempPos);
            if(board.getPieceAt(tempPos.x, tempPos.y) != null) {
                return true;
            }
            tempPos.x += stepDirectionX;
            tempPos.y += stepDirectionY;
        }
        return false;
    }

    move(x, y, board) {
        let attacking = board.getPieceAt(x, y);
        if(attacking) attacking.taken = true;

        this.matrixPosition = createVector(x, y);
        this.pixelPosition = createVector(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);
// console.log("QUERY-GENERIC_MOVE: Check test board state");
// console.log(test);
    }

    /**
     * Return all possible moves for a piece that can move diagonally
     * @param {number} order  0: leftTop-rightBottom  1: leftBottom-rightTop
     * @param {Object} board  The board Object called upon
     */
    diagSweep(order, board) {
        let moves = [];
        for(let i = 0; i < 8; i++){
            let x = order == 0 ? i : this.matrixPosition.x + this.matrixPosition.y - i;
            let y = order == 0 ? this.matrixPosition.y : i;
            let refPoint = order === 0 ? this.matrixPosition.x : this.matrixPosition.y;
            if(
                i != refPoint &&
                !this.attackingAllies(x, y, board) &&
                !this.moveThroughPieces(x, y, board) &&
                this.withinBounds(x, y) &&
                (x !== 0 || y !== 0)
            ) moves.push(createVector(x, y));
        }
        return moves;
    }

    /**
     * 
     * @param {*} order 
     * @param {*} board 
     */
    lineSweep(order, board) {
        let moves = [];
        for(let i = 0; i < 8; i++){
            let x = order == 0 ? i : this.matrixPosition.x;
            let y = order == 0 ? this.matrixPosition.y : i;
            let refPoint = order == 0 ? this.matrixPosition.x : this.matrixPosition.y;
            if(
                i != refPoint &&
                !this.attackingAllies(x, y, board) &&
                !this.moveThroughPieces(x, y, board) &&
                this.withinBounds(x, y) &&
                (x !== 0 || y !== 0)
            ) moves.push(createVector(x, y));
        }

        return moves;
    }
}

class Pawn extends Piece {
    constructor(x, y, isWhite) {
        super(x, y, isWhite);
        this.letter = "p";
        this.firstTurn = true;
        this.canBeEnPassant = false;
        this.value = 1;
        this.pic = isWhite ? images[5] : images[11];
    }

    canMove(x, y, board) {
        // const EnPassantTarget = this.isWhite ? (
        //     this.matrixPosition.x === 3 ? (
        //         (
        //             ((x === this.matrixPosition.x + 1) &&
        //             y === this.matrixPosition.y - 1) ? 
        //                 board.isPieceAt()
        //     ) : false
        // ) : (

        // ) : false


        const basicViolation = this.withinBounds(x, y) &&
                             !this.attackingAllies(x, y, board);

        const canAttack = !board.isPieceAt(x, y) ? false : 
                            (abs(x - this.matrixPosition.x) == abs(y - this.matrixPosition.y) &&
                                (
                                    (this.white && (y - this.matrixPosition.y) == -1) ||
                                    (!this.white && (y - this.matrixPosition.y) == 1)
                                )
                            ) ? true : false; 

        const canMarch = board.isPieceAt(x, y) ? false : 
                         x != this.matrixPosition.x ? false :
                         (
                             (
                                 (this.white && y - this.matrixPosition.y == -1) || 
                                 (!this.white && y- this.matrixPosition.y == 1)
                             )
                         ) ||
                         (
                             (
                                 (this.firstTurn && ((this.white && y - this.matrixPosition.y == -2) ||
                                 (!this.white && y - this.matrixPosition.y == 2)))
                             ) &&
                             !this.moveThroughPieces(x, y, board)
                         ) ? true : false;

        const canEnPassant = false; // TODO

        // const canEnPassant_w =  this.matrixPosition.x === 3 ? (
        //     ((x === this.matrixPosition.x + 1 || x === this.matrixPosition.x - 1) &&
        //     y === this.matrixPosition.y - 1) ? (
        //         (
        //          board.isPieceAt(x - 1, y) && 
        //          board.getPieceAt(x - 1, y).letter === 'p' &&
        //          board.getPieceAt(x - 1, y).isWhite !== this.isWhite
        //          ) ? 
        //             (
        //                 board.getPieceAt(x - 1).moveCount === 1
        //             ) : (
        //                 board.isPieceAt(x + 1, y) && 
        //                 board.getPieceAt(x + 1, y).letter === 'p' &&
        //                 board.getPieceAt(x + 1, y).isWhite !== this.isWhite   
        //                 ) ? (

        //                     )  : false
        //     ) : false
        // ) : false;

        // const canEnPassant_b

        // const canEnPassant = this.white ? (
        //     canEnPassant_w ? true : false   
        //    ) : (
        //     canEnPassant_b ? true : false
        //    );


        this.firstTurn = canAttack || canMarch ? false : this.firstTurn;
// console.log("QUERY-PAWN: This pawn can Attack?");
// console.log(canAttack);
// console.log("QUERY-PAWN: Basic movement violation?");
// console.log(basicViolation);
// console.log("QUERY-PAWN: can March?");
// console.log(canMarch);
// console.log("QUERY-PAWN: verdict - Can move?")
// console.log(!basicViolation && (canAttack || canMarch || canEnPassant));
        return basicViolation && (canAttack || canMarch || canEnPassant);
    }


    generateMoves(board) {
// console.log(`Generate moves for PAWN at ${this.matrixPosition.x}, ${this.matrixPosition.y} `)
        let moves = [];

        // Attacking
        for(let i = -1; i < 2; i += 2){
            let x = this.matrixPosition.x + i;
            let y = this.white ? this.matrixPosition.y - 1 : this.matrixPosition.y + 1;
            let attacking = board.getPieceAt(x, y);
            if (attacking && (!this.attackingAllies(x, y, board))) {
                moves.push(createVector(x, y));
            }
        }

        // Regular move
        let x = this.matrixPosition.x;
        let y = this.white ? this.matrixPosition.y - 1 : this.matrixPosition.y + 1;
        if(!board.isPieceAt(x, y) && this.withinBounds(x, y)) {
            moves.push(createVector(x, y));
        }
        
        // First move
        y = this.white ? y - 1 : y + 1;
        if (this.firstTurn && 
            this.withinBounds(x, y) &&
            !this.moveThroughPieces(x, y, board)
            ) {
                moves.push(createVector(x,y));
        }
// console.log('Available PAWN moves')
// console.log(moves);        
        return moves;
    }

    clone() {
        let clone = new Pawn(this.matrixPosition.x, this.matrixPosition.y, this.white);
        clone.taken = this.taken;
        clone.firstTurn = this.firstTurn;
        return clone;
    }

    move(x, y, board) {

        if( Math.abs(y - this.matrixPosition.y) === 2) {
            this.canBeEnPassant = true;
        } else {
            this.canBeEnPassant = false;
        }

        let attacking = board.getPieceAt(x, y);
// console.log("STATE-PAWN_MOVE: This pawn attacking?");
// console.log(attacking);
        if(attacking) attacking.taken = true;
        this.matrixPosition = createVector(x, y);
        this.pixelPosition = createVector(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);

        this.firstTurn = false;

// console.log("QUERY-PAWN_MOVE: Check test board state");
// console.log(test);
    }

    // promote(x, y, board) {

    // }

    // IsEnPassant(x, y, board){
    // 
    // }
}

class King extends Piece {
    constructor(x, y, isWhite) {
        super(x, y, isWhite);
        this.letter = 'K';
        this.pic = isWhite ? images[0] : images[6];
        this.value = 99;
    }

    canMove(x, y, board) {
        if(this.attackingAllies(x, y, board) || !this.withinBounds(x, y)) {
            return false;
        }
        if (abs(x - this.matrixPosition.x) <= 1 && abs(y - this.matrixPosition.y) <= 1){
            return true;
        }
        return false;
    }

    generateMoves(board) {
// console.log('Generate moves for KING')
        let c_x = this.matrixPosition.x;
        let c_y = this.matrixPosition.y;
        let moves = [];
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if ( (i != 0 || j != 0) &&
                     this.withinBounds(c_x+i, c_y+j) &&
                     !this.attackingAllies(c_x+i, c_y+j, board)
                ){
                    moves.push(createVector(c_x+i, c_y+j))
                }
            }
        }
// console.log('Available King moves')
// console.log(moves);
        return moves;


    }

    castleQueenSide() {

    }

    castleKingSide() {
        
    }

    clone() {
        let clone = new King(this.matrixPosition.x, this.matrixPosition.y, this.white);
        clone.taken = this.taken;
        return clone;
    }
}

class Bishop extends Piece {
    constructor(x, y, isWhite){
        super(x, y, isWhite);
        this.letter = 'B';
        this.pic = isWhite ? images[2] : images[8];
        this.value = 3;
    }

    canMove(x, y, board) {
        return !this.withinBounds ? false :
               this.attackingAllies(x, y, board) ? false :
               !(abs(x - this.matrixPosition.x) == abs(y - this.matrixPosition.y)) ? false :
               this.moveThroughPieces(x, y, board) ? false : true;
    }

    generateMoves(board) {
        return [...this.diagSweep(0, board), ...this.diagSweep(1, board)];
    }
    clone() {
        let clone = new Bishop(this.matrixPosition.x, this.matrixPosition.y, this.white);
        clone.taken = this.taken;
        return clone;
      }
}


class Rook extends Piece {
    constructor(x, y, isWhite) {
        super(x, y, isWhite);
        this.letter = "R";
        if (isWhite) {
            this.pic = images[4];
        }
        else{
            this.pic = images[10];
        }
        this.value = 5;
    }
    canMove(x, y, board) {
        return (
            this.withinBounds(x, y) &&
            !this.attackingAllies(x, y, board) &&
            (
                (
                x == this.matrixPosition.x ||
                y == this.matrixPosition.y
                ) &&
                !this.moveThroughPieces(x, y, board)
            )
        ) ? true : false;
    }


    /**
     * 
     * @param {Object} board 
     */
    generateMoves(board) {
        return [...this.lineSweep(0, board),...this.lineSweep(1, board)];
    }

    clone() {
        let clone = new Rook(this.matrixPosition.x, this.matrixPosition.y, this.white);
        clone.taken = this.taken;
        return clone;
    }
}

/**
 * @extends Piece
 */
class Knight extends Piece {
    constructor(x, y, isWhite) {
        super(x, y, isWhite);
        this.letter = 'Kn';
        this.pic = isWhite ? images[3] : images[9];
        this.value = 3;
    }

    canMove(x, y, board) {
        return !this.withinBounds(x, y) ? false :
               this.attackingAllies(x, y, board) ? false :
               (
                   abs(x - this.matrixPosition.x) == 2 && abs(y - this.matrixPosition.y) == 1 ||
                   abs(x - this.matrixPosition.x) == 1 && abs(y - this.matrixPosition.y) == 2
               ) ? true : false;
    }

    /**
     * 
     * @param {Object} board 
     * @return {Object}
     */
    generateMoves(board) {
        let moves = [];
        let candidateMoves = [];
        const moveSet = [[-1,2], [-2,1], [-1,-2], [-2,-1]];
        const mirrorValue = (arr) => {
            let mirrorSet = [];
            arr.forEach((curerntValue) => {
                mirrorSet.push([-curerntValue[0], curerntValue[1]]);
            }); 
            return [...arr,...mirrorSet];
        }
       candidateMoves = mirrorValue(moveSet);
       candidateMoves.forEach((currentValue) => {
           let x = currentValue[0] + this.matrixPosition.x;
           let y = currentValue[1] + this.matrixPosition.y;
           if(!this.attackingAllies(x, y, board) &&
             this.withinBounds(x, y)){
                moves.push(createVector(x, y));
            }   
        })
        return moves;
    }

    clone() {
        let clone = new Knight(this.matrixPosition.x, this.matrixPosition.y, this.white);
        clone.taken = this.taken;
        return clone;
    }
}

class Queen extends Piece {
    constructor(x, y, isWhite) {
        super(x, y, isWhite);
        this.letter = 'Q';
        this.pic = isWhite ? images[1] : images[7];
        this.value = 9;
    }

    canMove(x, y, board) {
        const basicCondition = !this.withinBounds(x, y) ? false :
                               this.attackingAllies(x, y, board) ? false : true;
        const vhMovement = !(x == this.matrixPosition.x || y == this.matrixPosition.y) ? false :
                           this.moveThroughPieces(x, y, board) ? false : true;
        const diagMovement = !(abs(x - this.matrixPosition.x) == abs(y - this.matrixPosition.y)) ? false :
                             this.moveThroughPieces(x, y, board) ? false : true;
        return basicCondition && (vhMovement || diagMovement);
    }
    generateMoves(board) {
// console.log(`Generate Black Queen moves`);
// console.log([...this.lineSweep(0, board), 
    // ...this.lineSweep(1, board),
    // ...this.diagSweep(0, board), 
    // ...this.diagSweep(1, board)]);
        return [...this.lineSweep(0, board), 
                ...this.lineSweep(1, board),
                ...this.diagSweep(0, board), 
                ...this.diagSweep(1, board)];
    }
    clone() {
        let clone = new Queen(this.matrixPosition.x, this.matrixPosition.y, this.white);
        clone.taken = this.taken;
        return clone;
    }
}