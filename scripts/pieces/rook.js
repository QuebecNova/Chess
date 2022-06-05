import {alphPosOut} from "./alphabetPositions.js";
import {alphPosIn} from "./alphabetPositions.js";
import renderPiece from "../services/renderPieces.js";

const rook = {

    currentRook: {},
    
    possibleMoves: [],

    availableRookMoves(choosenPiece) {
        rook.getRookPropeties(choosenPiece);

        //idea behind this calculations (both for rows and columns):
        //if same color piece on the way stop calculations and/or delete previous calculations
        //if another color piece on the way include it and stop calculation and/or delete previous calculations

        //For cols
        const colArr = [];
        let colHighest = '';
        let colHighestSecond = '';
        for (let i = 0; i < 8; i++) {

            let colField = '';

            let col = rook.currentRook.position[0] + (i+1);

            if (rook.currentRook.position === col) {
                col = ''
            }

            if (col) {
                colField = document.querySelector(`#${col}`);
            }

            if (col && colField.hasChildNodes()) {
                const isAnotherColorOnTheWay = (colField.children[0].getAttribute('class').slice(0, 5) !== rook.currentRook.color);
                const isSameColorOnTheWay = (colField.children[0].getAttribute('class').slice(0, 5) === rook.currentRook.color);
                //checks for case when rook is below another rook
                if (rook.currentRook.position[1] < col[1] && isSameColorOnTheWay) {
                    i = 8;
                    col = '';
                } else if (rook.currentRook.position[1] < col[1] && isAnotherColorOnTheWay) {
                    i = 8;
                }
                //checks for case when rook is under another rook
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

        for (const col in filteredColArr) {
            const colField = document.querySelector(`#${filteredColArr[col]}`);
            colField.style.backgroundColor = 'rgba(30,150,30,0.4)';
            rook.possibleMoves.push(colField);
        }
        
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

        for (const row in filteredRowArr) {
            const rowField = document.querySelector(`#${filteredRowArr[row]}`);
            rowField.style.backgroundColor = 'rgba(30,150,30,0.4)';
            rook.possibleMoves.push(rowField);
        }

        document.querySelector('.chessboard').addEventListener('click', rook.canMove);
    },

    getRookPropeties(choosenPiece) {
        rook.currentRook = renderPiece.pieces[choosenPiece.parentNode.getAttribute('id')];
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
            console.log('same color of rook!');
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