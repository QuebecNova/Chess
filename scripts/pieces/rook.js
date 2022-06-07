import {alphPosOut} from "./alphabetPositions.js";
import {alphPosIn} from "./alphabetPositions.js";
import renderPiece from "../services/renderPieces.js";

const rook = {

    currentRook: {},
    
    possibleMoves: [],

    availableRookMoves(choosenPiece) {
        rook.getRookPropeties(choosenPiece);

        rook.possibleMoves = [];

        const kingCantMoveHereArr = [];

        //idea behind this calculations (both for rows and columns):
        //if same color piece on the way stop calculations and/or delete previous calculations
        //if another color piece on the way include it and stop calculation and/or delete previous calculations

        //For cols
        const colArr = [];
        let colHighest = '';
        let colHighestSecond = '';
        for (let i = 0; i < 8; i++) {

            let colField = '';

            let col = rook.currentRook.position[0] + (i + 1);

            if (rook.currentRook.position === col) {
                col = ''
            }

            if (col) {
                colField = document.querySelector(`#${col}`);
            }

            if (col && colField.hasChildNodes()) {
                const isAnotherColorOnTheWay = (colField.children[0].getAttribute('class').slice(0, 5) !== rook.currentRook.color);
                const isSameColorOnTheWay = (colField.children[0].getAttribute('class').slice(0, 5) === rook.currentRook.color);
                //checks for case when rook is below another ]
                if (rook.currentRook.position[1] < col[1] && isSameColorOnTheWay) {
                    i = 8;
                    kingCantMoveHereArr.push(col);
                    col = '';
                } else if (rook.currentRook.position[1] < col[1] && isAnotherColorOnTheWay) {
                    i = 8;
                }
                //checks for case when rook is under another piece
                if (rook.currentRook.position[1] > col[1] && isSameColorOnTheWay) {
                    colHighest = i;
                } else if (rook.currentRook.position[1] > col[1] && isAnotherColorOnTheWay) {
                    colHighestSecond = i - 1;
                }
            }
            colArr.push(col);
        }

        if (!colHighest && colHighest !== 0) {
            colHighest = colHighestSecond;
        } else if (colHighest < colHighestSecond) {
            colHighest = colHighestSecond;
        }

        const filteredColArr = colArr.filter(col => {
            if (colHighest || colHighest === 0) {
                return col[1] > colHighest + 1;
            } else {
                return col[1];
            }
        });

        //For rows
        const rowArr = [];
        let rowHighest = '';
        let rowHighestSecond = '';
        for (let i = 0; i < 8; i++) {
            let row = alphPosOut[i] + rook.currentRook.position[1];
            
            let rowField = '';
            
            if (rook.currentRook.position === row) {
                row = '';
            }

            if (row) {
                rowField = document.querySelector(`#${row}`);
            }

            if (row && rowField.hasChildNodes()) {
                const isAnotherColorOnTheWay = (rowField.children[0].getAttribute('class').slice(0, 5) !== rook.currentRook.color);
                const isSameColorOnTheWay = (rowField.children[0].getAttribute('class').slice(0, 5) === rook.currentRook.color);
                //checks for case when rook is left another rook
                if (alphPosIn[rook.currentRook.position[0]] < alphPosIn[row[0]] && isSameColorOnTheWay) {
                    i = 8;
                    kingCantMoveHereArr.push(row);
                    row = '';
                } else if (alphPosIn[rook.currentRook.position[0]] < alphPosIn[row[0]] && isAnotherColorOnTheWay) {
                    i = 8;
                }
                //checks for case when rook is right another rook
                if (alphPosIn[rook.currentRook.position[0]] > alphPosIn[row[0]] && isSameColorOnTheWay) {
                    rowHighest = i;
                } else if (alphPosIn[rook.currentRook.position[0]] > alphPosIn[row[0]] && isAnotherColorOnTheWay) {
                    rowHighestSecond = i - 1;
                }
            }
            rowArr.push(row);
        }

        if (!rowHighest && rowHighest !== 0) {
            rowHighest = rowHighestSecond;
        } else if (rowHighest < rowHighestSecond) {
            rowHighest = rowHighestSecond;
        }
        
        const filteredRowArr = rowArr.filter(row => {
            if (rowHighest || rowHighest === 0) {
                return alphPosIn[row[0]] > rowHighest;
            } else {
                return row;
            }
        });

        //adding all possible movements from arrays of each type of moving to filtered can move array
        const filteredCanMoveArr = [];

        filteredColArr.forEach(cell => filteredCanMoveArr.push(cell));
        filteredRowArr.forEach(cell => filteredCanMoveArr.push(cell));

        
        for (const cell in filteredCanMoveArr) {
            const cellField = document.querySelector(`#${filteredCanMoveArr[cell]}`);
            rook.possibleMoves.push(cellField);
        }
        
        //section for king, where we define on which field king can't move
        const canMoveArrForKing = filteredCanMoveArr;

        for (const col in colArr) {
            if (colHighest <= parseInt(colArr[col][1] - 1) && colArr[col]) {
                kingCantMoveHereArr.push(colArr[col]);
            }
        }

        for (const row in rowArr) {
            if (rowHighest <= alphPosIn[rowArr[row][0]] && rowArr[row]) {
                kingCantMoveHereArr.push(rowArr[row]);
            }
        }

        for (const row in rowArr) {
            if (rowArr[row]) {
                const rowField = document.querySelector(`#${rowArr[row]}`);
                if (rowField.hasChildNodes() && rowField.children[0].getAttribute('class').includes('King')) {
                    kingCantMoveHereArr.push(alphPosOut[alphPosIn[rowArr[row][0]] + 1] + rowArr[row][1]);
                }    
            }
        }

        for (const col in colArr) {
            if (colArr[col]) {
                const colField = document.querySelector(`#${colArr[col]}`);
                if (colField.hasChildNodes() && colField.children[0].getAttribute('class').includes('King')) {
                    kingCantMoveHereArr.push(colArr[col][0] + (parseInt(colArr[col][1]) - 1));
                }
            }
        }

        for (const cell in kingCantMoveHereArr) {
            canMoveArrForKing.push(kingCantMoveHereArr[cell]);
        }

        console.log(kingCantMoveHereArr);

        return canMoveArrForKing;
    },

    getRookPropeties(choosenPiece) {
        rook.currentRook = renderPiece.pieces[choosenPiece.parentNode.getAttribute('id')];
    },

    addingPossibleMovesOnBoard() {
        for (const cell in this.possibleMoves) {
            this.possibleMoves[cell].style.backgroundColor = 'rgba(30,150,30,0.4)';
        }
    },

    canMove(e) {

        let canMove = false;
        const pickedRookColorSameAsTarget = (rook.currentRook.color === e.target.getAttribute('class').slice(0, 5));
        const rookSelfNode = rook.currentRook.selfNode;

        for (const possibleMove in rook.possibleMoves) {
            const id = (rook.possibleMoves[possibleMove].getAttribute('id'));
            //setting canMove = true if pieceField on the way on rook's possible moves
            if (id === e.target.getAttribute('id')) {
                canMove = true;
            } else if (id === e.target.parentNode.getAttribute('id')) {
                canMove = true;
            }
        }

        if (pickedRookColorSameAsTarget && e.target !== rookSelfNode) {
            //if e.target is piece with same color (delete all eventListeners)
            console.log('same color as rook!');
            rook.clearEventListeners();
        } else if (!(pickedRookColorSameAsTarget) && canMove && e.target.getAttribute('class').includes('placedPiece')) {
            //if e.target is piece with another color (eat piece function)
            console.log('Eat!');
            e.target.parentNode.appendChild(rookSelfNode);  
            e.target.remove();
            renderPiece.switchTurn();
            rook.clearEventListeners();
        } else if (canMove) {
            //if piece can move and pieceField have no pieces
            console.log('Moves!');
            e.target.appendChild(rookSelfNode);
            renderPiece.switchTurn();
            rook.clearEventListeners();
        } else if (!(e.target.hasChildNodes()) && e.target !== rookSelfNode) {
            rook.clearEventListeners();
        }

        renderPiece.updatePiecesPropeties();
    },

    clearEventListeners() {
        document.querySelector('.chessboard').removeEventListener('click', rook.canMove);
        const pieceFields = [...document.querySelectorAll('.pieceField')];
        for (const pieceField in pieceFields) {
            pieceFields[pieceField].style = '';
        }
        const pieces = [...document.querySelectorAll('.placedPiece')];
        for (const piece of pieces) {
            piece.removeEventListener('click', rook.clearEventListeners)
        }
        rook.possibleMoves = [];
        renderPiece.addClickEvents();
    }
}

export default rook;