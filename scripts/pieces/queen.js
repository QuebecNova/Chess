import {alphPosOut} from "./alphabetPositions.js";
import {alphPosIn} from "./alphabetPositions.js";
import renderPiece from "../services/renderPieces.js";

const queen = {

    currentQueen: {},
    
    possibleMoves: [],

    availableQueenMoves(choosenPiece) {
        queen.getQueenPropeties(choosenPiece);

        queen.possibleMoves = [];

        const kingCantMoveHereArr = [];

        //for diagonal bottom-right to left
        const BRTLArr = [];

        let lastDiagonalBRTL = '';
        
        let diagonalBRTLHighest = '';

        let diagonalBRTLHighestSecond = '';

        for (let i = 0; i < 8; i++) {

            let diagonalBRTLField = '';

            let diagonalBRTL = '';
            
            if ((alphPosIn[queen.currentQueen.position[0]] - i) >= 0 && (parseInt(queen.currentQueen.position[1]) + i) <= 8) {
                diagonalBRTL = (alphPosOut[alphPosIn[queen.currentQueen.position[0]] - i]) + (parseInt(queen.currentQueen.position[1]) + i);
                lastDiagonalBRTL = diagonalBRTL;
            } else if ((alphPosIn[lastDiagonalBRTL[0]] + i) <= 7 && (parseInt(lastDiagonalBRTL[1]) - i) >= 1) {
                diagonalBRTL = (alphPosOut[alphPosIn[lastDiagonalBRTL[0]] + i]) + (parseInt(lastDiagonalBRTL[1]) - i);
            }

            if (queen.currentQueen.position === diagonalBRTL) {
                diagonalBRTL = '';
            }

            if (diagonalBRTL) {
                diagonalBRTLField = document.querySelector(`#${diagonalBRTL}`);
            }

            if (diagonalBRTL && diagonalBRTLField.hasChildNodes()) {
                const isAnotherColorOnTheWay = (diagonalBRTLField.children[0].getAttribute('class').slice(0, 5) !== queen.currentQueen.color);
                const isSameColorOnTheWay = (diagonalBRTLField.children[0].getAttribute('class').slice(0, 5) === queen.currentQueen.color);

                //checks for case when queen is under another piece
                if (queen.currentQueen.position[1] > diagonalBRTL[1] && isSameColorOnTheWay) {
                    i = 8;
                    kingCantMoveHereArr.push(diagonalBRTL);
                    diagonalBRTL = '';
                } else if (queen.currentQueen.position[1] > diagonalBRTL[1] && isAnotherColorOnTheWay) {
                    i = 8;
                }
                //checks for case when queen is below another piece
                if (queen.currentQueen.position[1] < diagonalBRTL[1] && isSameColorOnTheWay && !diagonalBRTLHighest) {
                    diagonalBRTLHighest = parseInt(diagonalBRTLField.getAttribute('id')[1]) - 1;
                    kingCantMoveHereArr.push(diagonalBRTL);
                } else if (queen.currentQueen.position[1] < diagonalBRTL[1] && isAnotherColorOnTheWay && !diagonalBRTLHighestSecond) {
                    diagonalBRTLHighestSecond = parseInt(diagonalBRTLField.getAttribute('id')[1]);
                }
            }

            BRTLArr.push(diagonalBRTL);
        }

        if (!diagonalBRTLHighest && diagonalBRTLHighest !== 0 && diagonalBRTLHighestSecond) {
            diagonalBRTLHighest = diagonalBRTLHighestSecond;
        } else if (diagonalBRTLHighest > diagonalBRTLHighestSecond && diagonalBRTLHighestSecond) {
            diagonalBRTLHighest = diagonalBRTLHighestSecond;
        }   

        const filteredBRTLArr = BRTLArr.filter(cell => {
            if (cell[1] <= diagonalBRTLHighest) {
                return cell;
            } else if (!diagonalBRTLHighest) {
                return cell;
            }
        });

        //for diagonal bottom-left to right
        const BLTRArr = [];

        let lastDiagonalBLTR = '';

        let diagonalBLTRHighest = '';

        let diagonalBLTRHighestSecond = '';

        for (let i = 0; i < 8; i++) {

            let diagonalBLTRField = '';

            let diagonalBLTR = '';

            if ((alphPosIn[queen.currentQueen.position[0]] + i) <= 7 && (parseInt(queen.currentQueen.position[1]) + i) <= 8) {
                diagonalBLTR = (alphPosOut[alphPosIn[queen.currentQueen.position[0]] + i]) + (parseInt(queen.currentQueen.position[1]) + i);
                lastDiagonalBLTR = diagonalBLTR;
            } else if ((alphPosIn[lastDiagonalBLTR[0]] - i) >= 0 && (parseInt(lastDiagonalBLTR[1]) - i) >= 1) {
                diagonalBLTR = (alphPosOut[alphPosIn[lastDiagonalBLTR[0]] - i]) + (parseInt(lastDiagonalBLTR[1]) - i);
            }

            if (queen.currentQueen.position === diagonalBLTR) {
                diagonalBLTR = '';
            }

            if (diagonalBLTR) {
                diagonalBLTRField = document.querySelector(`#${diagonalBLTR}`);
            }

            if (diagonalBLTR && diagonalBLTRField.hasChildNodes()) {
                const isAnotherColorOnTheWay = (diagonalBLTRField.children[0].getAttribute('class').slice(0, 5) !== queen.currentQueen.color);
                const isSameColorOnTheWay = (diagonalBLTRField.children[0].getAttribute('class').slice(0, 5) === queen.currentQueen.color);

                //checks for case when queen is under another piece
                if (queen.currentQueen.position[1] > diagonalBLTR[1] && isSameColorOnTheWay) {
                    i = 8;
                    kingCantMoveHereArr.push(diagonalBLTR);
                    diagonalBLTR = '';
                } else if (queen.currentQueen.position[1] > diagonalBLTR[1] && isAnotherColorOnTheWay) {  
                    i = 8;
                }
                //checks for case when queen is below another piece
                if (queen.currentQueen.position[1] < diagonalBLTR[1] && isSameColorOnTheWay && !diagonalBLTRHighest) {
                    diagonalBLTRHighest = parseInt(diagonalBLTRField.getAttribute('id')[1]) - 1;
                    kingCantMoveHereArr.push(diagonalBLTR);
                } else if (queen.currentQueen.position[1] < diagonalBLTR[1] && isAnotherColorOnTheWay && !diagonalBLTRHighestSecond) {
                    diagonalBLTRHighestSecond = parseInt(diagonalBLTRField.getAttribute('id')[1]);
                }
            }


            BLTRArr.push(diagonalBLTR);
        }

        if (!diagonalBLTRHighest && diagonalBLTRHighest !== 0 && diagonalBLTRHighestSecond) {
            diagonalBLTRHighest = diagonalBLTRHighestSecond;
        } else if (diagonalBLTRHighest > diagonalBLTRHighestSecond && diagonalBLTRHighestSecond) {
            diagonalBLTRHighest = diagonalBLTRHighestSecond;
        }

        const filteredBLTRArr = BLTRArr.filter(cell => {
            if (cell[1] <= diagonalBLTRHighest) {
                return cell;
            } else if (!diagonalBLTRHighest) {
                return cell;
            }
        });

        //idea behind this calculations (both for rows and columns):
        //if same color piece on the way stop calculations and/or delete previous calculations
        //if another color piece on the way include it and stop calculation and/or delete previous calculations

        //For cols
        const colArr = [];
        let colHighest = '';
        let colHighestSecond = '';
        for (let i = 0; i < 8; i++) {

            let col = queen.currentQueen.position[0] + (i+1);

            let colField = '';

            if (queen.currentQueen.position === col) {
                col = ''
            }

            if (col) {
                colField = document.querySelector(`#${col}`);
            }

            if (col && colField.hasChildNodes()) {
                const isAnotherColorOnTheWay = (colField.children[0].getAttribute('class').slice(0, 5) !== queen.currentQueen.color);
                const isSameColorOnTheWay = (colField.children[0].getAttribute('class').slice(0, 5) === queen.currentQueen.color);
                //checks for case when queen is below another piece
                if (queen.currentQueen.position[1] < col[1] && isSameColorOnTheWay) {
                    i = 8;
                    kingCantMoveHereArr.push(col);
                    col = '';
                } else if (queen.currentQueen.position[1] < col[1] && isAnotherColorOnTheWay) {
                    i = 8;
                }
                //checks for case when queen is under another piece
                if (queen.currentQueen.position[1] > col[1] && isSameColorOnTheWay) {
                    colHighest = i;
                } else if (queen.currentQueen.position[1] > col[1] && isAnotherColorOnTheWay) {
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
            let row = alphPosOut[i] + queen.currentQueen.position[1];

            let rowField = '';
            
            if (queen.currentQueen.position === row) {
                row = '';
            }

            if (row) {
                rowField = document.querySelector(`#${row}`);
            }

            if (row && rowField.hasChildNodes()) {
                const isAnotherColorOnTheWay = (rowField.children[0].getAttribute('class').slice(0, 5) !== queen.currentQueen.color);
                const isSameColorOnTheWay = (rowField.children[0].getAttribute('class').slice(0, 5) === queen.currentQueen.color);
                //checks for case when queen is left another piece
                if (alphPosIn[queen.currentQueen.position[0]] < alphPosIn[row[0]] && isSameColorOnTheWay) {
                    i = 8;
                    kingCantMoveHereArr.push(row);
                    row = '';
                } else if (alphPosIn[queen.currentQueen.position[0]] < alphPosIn[row[0]] && isAnotherColorOnTheWay) {
                    i = 8;
                }
                //checks for case when queen is right another piece
                if (alphPosIn[queen.currentQueen.position[0]] > alphPosIn[row[0]] && isSameColorOnTheWay) {
                    rowHighest = i;
                } else if (alphPosIn[queen.currentQueen.position[0]] > alphPosIn[row[0]] && isAnotherColorOnTheWay) {
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
        filteredBLTRArr.forEach(cell => filteredCanMoveArr.push(cell));
        filteredBRTLArr.forEach(cell => filteredCanMoveArr.push(cell));
        filteredRowArr.forEach(cell => filteredCanMoveArr.push(cell));

        for (const cell in filteredCanMoveArr) {
            const cellField = document.querySelector(`#${filteredCanMoveArr[cell]}`);
            queen.possibleMoves.push(cellField);
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

        return filteredCanMoveArr;
    },

    getQueenPropeties(choosenPiece) {
        queen.currentQueen = renderPiece.pieces[choosenPiece.parentNode.getAttribute('id')];
    },

    addingPossibleMovesOnBoard() {
        for (const cell in this.possibleMoves) {
            this.possibleMoves[cell].style.backgroundColor = 'rgba(30,150,30,0.4)';
        }
    },

    canMove(e) {

        let canMove = false;
        const pickedQueenColorSameAsTarget = (queen.currentQueen.color === e.target.getAttribute('class').slice(0, 5));
        const queenSelfNode = queen.currentQueen.selfNode;

        for (const possibleMove in queen.possibleMoves) {
            const id = (queen.possibleMoves[possibleMove].getAttribute('id'));
            //setting canMove = true if pieceField on the way on queen's possible moves
            if (id === e.target.getAttribute('id')) {
                canMove = true;
            } else if (id === e.target.parentNode.getAttribute('id')) {
                canMove = true;
            }
        }

        if (pickedQueenColorSameAsTarget && e.target !== queenSelfNode) {
            //if e.target is piece with same color (delete all eventListeners)
            console.log('same color as queen!');
            queen.clearEventListeners();
        } else if (!(pickedQueenColorSameAsTarget) && canMove && e.target.getAttribute('class').includes('placedPiece')) {
            //if e.target is piece with another color (eat piece function)
            console.log('Eat!');
            e.target.parentNode.appendChild(queenSelfNode);  
            e.target.remove();
            renderPiece.switchTurn();
            queen.clearEventListeners();
        } else if (canMove) {
            //if piece can move and pieceField have no pieces
            console.log('Moves!');
            e.target.appendChild(queenSelfNode);
            renderPiece.switchTurn();
            queen.clearEventListeners();
        } else if (!(e.target.hasChildNodes()) && e.target !== queenSelfNode) {
            queen.clearEventListeners();
        }

        renderPiece.updatePiecesPropeties();
    },

    clearEventListeners() {
        document.querySelector('.chessboard').removeEventListener('click', queen.canMove);
        const pieceFields = [...document.querySelectorAll('.pieceField')];
        for (const pieceField in pieceFields) {
            pieceFields[pieceField].style = '';
        }
        const pieces = [...document.querySelectorAll('.placedPiece')];
        for (const piece of pieces) {
            piece.removeEventListener('click', queen.clearEventListeners)
        }
        queen.possibleMoves = [];
        renderPiece.addClickEvents();
    }
}

export default queen;