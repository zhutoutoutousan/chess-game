/**
 * Class setting up a chess board
 */
class Board {
    /**
     * Set up the piece space and board score.
     */
    constructor() {
        this.whitePieces = [];
        this.blackPieces = [];
        this.score = 0;
        this.setupPieces();
    }


    /**
     * Push pieces into the piece space
     */
    setupPieces() {
        this.whitePieces.push(new King(4, 7, true));
        this.whitePieces.push(new Queen(3, 7, true));
        this.whitePieces.push(new Bishop(2, 7, true));
        this.whitePieces.push(new Bishop(5, 7, true));
        this.whitePieces.push(new Knight(1, 7, true));
        this.whitePieces.push(new Knight(6, 7, true));
        this.whitePieces.push(new Rook(0, 7, true));
        this.whitePieces.push(new Rook(7, 7, true));        

        this.blackPieces.push(new King(4, 0, true));
        this.blackPieces.push(new Queen(3, 0, true));
        this.blackPieces.push(new Bishop(2, 0, true));
        this.blackPieces.push(new Bishop(5, 0, true));
        this.blackPieces.push(new Knight(1, 0, true));
        this.blackPieces.push(new Knight(6, 0, true));
        this.blackPieces.push(new Rook(0, 0, true));
        this.blackPieces.push(new Rook(7, 0, true));  


        for(let i = 0; i < 8; i++){
            this.whitePieces.push(new Pawn(i, 6, true));
            this.blackPieces.push(new Pawn(i, 1, true));
        }
    }

    /**
     * 
     */
    show() {
        for(let i = 0; i < this.whitePieces.length; i++) {
            this.whitePieces[i].show();
        }
        for(let i = 0; i < this.blackPieces.length; i++) {
            this.blackPieces[i].show();
        }
    }

    // INITIALIZATION



    // METHODS

    /**
     * If there is any piece in the given matrix position that is not taken,
     * return the piece object, otherwise return null
     * @param {number} x 
     * @param {number} y 
     * @returns {Object|null}
     */
    getPieceAt(x, y) {
        for(let i = 0; i < this.whitePieces.length; i++) {
            if(
                !this.whitePieces[i].taken &&
                this.whitePieces[i].matrixPosition.x == x && 
                this.whitePieces[i].matrixPosition.y == y
                ) 
                {
                return this.whitePieces[i];
            }
        }
        for(let i = 0; i < this.blackPieces.length; i++) {
            if(
                !this.blackPieces[i].taken && 
                this.blackPieces[i].matrixPosition.x == x && 
                this.blackPieces[i].matrixPosition.y == y
            ) {
                return this.blackPieces[i];
            }
        }
        return null;
    }

    /**
     * @requires
     * @external
     * @param {*} from 
     * @param {*} to 
     */
    move(from, to) {
        let pieceToMove = this.getPieceAt(from.x, from.y);
        if(!pieceToMove) return;
        pieceToMove.move(to.x, to.y, this);
    }

    clone() {
        let clone = new Board();
        for (let i = 0; i < this.whitePieces.length; i++) {
            clone.whitePieces
        }
    }

    // METHODS



    // AI

    /**
     *  @return {Array} 
     */
    generateNewBoardsWhitesTurn() {
        let boards = [];
        for(let i = 0; i < this.whitePieces.length; i++) {
            if (!this.whitePieces[i].taken) {
                let tempArr = this.whitePieces[i].generateNewBoards(this);
                for (let j = 0; i < tempArr.length; j++ ) {
                    boards.push(tempArr[j]);
                }
            }
        }
        return boards;
    }

    /**
     * @return {Array}
     */
    generateNewBoardsBlacksTurn() {
        let boards = [];
        for(let i = 0; i < this.blackPieces.length; i++) {
            if (!this.blackPieces[i].taken) {
                let tempArr = this.blackPieces[i].generateNewBoards(this);
                for (let j = 0; i < tempArr.length; j++ ) {
                    boards.push(tempArr[j]);
                }
            }
        }        
        return boards;
    }

    /**
     * 
     */
    setScore() {
        this.score = 0;
        for (let i = 0; i < this.whitePieces.length; i++) {
            if(!this.whitePiece[i].taken) {
                this.score -= this.whitePieces[i].value;
            }
            else {
                print(`${this.whitePiece[i]} is taken`);
            }
        }
        for (let i = 0; i < this.blackPieces.length; i++) {
            this.score += !this.blackPieces[i].taken ? this.blackPieces[i].value : '';
        }
    }
    // AI



    // STATE

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    isPieceAt(x, y) {
        return this.getPieceAt(x,y) ? true : false;
    }

    /**
     * Used in sketch.js mousePressed() to determine if the game is over.
     * @return {boolean} Whether the game is over.
     */
    isDone() {
        return this.whitePieces[0].taken || this.blackPieces[0].taken;
    }

    /**
     * @return {boolean} For every AI, if it is the black/white's move, 
     *                   return whether that side is lost
     */
    isDead() {
        return whiteAI && whitesMove ? this.whitePieces[0].taken :
               blackAI && !whitesMove ? this.blackPieces[0].taken :
               false;
    }

    /**
     * @return {boolean} For every AI, if it is the black/white's move, 
     *                   return whether that side has won
     */
    hasWon() {
        return whiteAI && whitesMove ? this.blackPieces[0].taken :
               blackAI && !whitesMove ? this.whitePieces[0].taken :
               false;
    }

    // STATE

}