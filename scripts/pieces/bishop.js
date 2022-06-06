import {alphPosOut} from "./alphabetPositions.js";
import {alphPosIn} from "./alphabetPositions.js";
import renderPiece from "../services/renderPieces.js";

const bishop = {

    currentBishop: {},
    
    possibleMoves: [],

    availableBishopMoves(choosenPiece) {
        bishop.getBishopPropeties(choosenPiece);

        bishop.possibleMoves = [];

        //for diagonal bottom-right to left
        const BRTLArr = [];

        let lastDiagonalBRTL = '';
        
        let diagonalBRTLHighest = '';

        let diagonalBRTLHighestSecond = '';

        for (let i = 0; i < 8; i++) {

            let diagonalBRTLField = '';

            let diagonalBRTL = '';
            
            if ((alphPosIn[bishop.currentBishop.position[0]] - i) >= 0 && (parseInt(bishop.currentBishop.position[1]) + i) <= 8) {
                diagonalBRTL = (alphPosOut[alphPosIn[bishop.currentBishop.position[0]] - i]) + (parseInt(bishop.currentBishop.position[1]) + i);
                lastDiagonalBRTL = diagonalBRTL;
            } else if ((alphPosIn[lastDiagonalBRTL[0]] + i) <= 7 && (parseInt(lastDiagonalBRTL[1]) - i) >= 1) {
                diagonalBRTL = (alphPosOut[alphPosIn[lastDiagonalBRTL[0]] + i]) + (parseInt(lastDiagonalBRTL[1]) - i);
            }

            if (bishop.currentBishop.position === diagonalBRTL) {
                diagonalBRTL = '';
            }

            if (diagonalBRTL) {
                diagonalBRTLField = document.querySelector(`#${diagonalBRTL}`);
            }

            if (diagonalBRTL && diagonalBRTLField.hasChildNodes()) {
                const isAnotherColorOnTheWay = (diagonalBRTLField.children[0].getAttribute('class').slice(0, 5) !== bishop.currentBishop.color);
                const isSameColorOnTheWay = (diagonalBRTLField.children[0].getAttribute('class').slice(0, 5) === bishop.currentBishop.color);

                //checks for case when bishop is under another piece
                if (bishop.currentBishop.position[1] > diagonalBRTL[1] && isSameColorOnTheWay) {
                    i = 8;
                    diagonalBRTL = '';
                } else if (bishop.currentBishop.position[1] > diagonalBRTL[1] && isAnotherColorOnTheWay) {
                    i = 8;
                }
                //checks for case when bishop is below another piece
                if (bishop.currentBishop.position[1] < diagonalBRTL[1] && isSameColorOnTheWay && !diagonalBRTLHighest) {
                    diagonalBRTLHighest = parseInt(diagonalBRTLField.getAttribute('id')[1]) - 1;
                } else if (bishop.currentBishop.position[1] < diagonalBRTL[1] && isAnotherColorOnTheWay && !diagonalBRTLHighestSecond) {
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

            if ((alphPosIn[bishop.currentBishop.position[0]] + i) <= 7 && (parseInt(bishop.currentBishop.position[1]) + i) <= 8) {
                diagonalBLTR = (alphPosOut[alphPosIn[bishop.currentBishop.position[0]] + i]) + (parseInt(bishop.currentBishop.position[1]) + i);
                lastDiagonalBLTR = diagonalBLTR;
            } else if ((alphPosIn[lastDiagonalBLTR[0]] - i) >= 0 && (parseInt(lastDiagonalBLTR[1]) - i) >= 1) {
                diagonalBLTR = (alphPosOut[alphPosIn[lastDiagonalBLTR[0]] - i]) + (parseInt(lastDiagonalBLTR[1]) - i);
            }

            if (bishop.currentBishop.position === diagonalBLTR) {
                diagonalBLTR = '';
            }

            if (diagonalBLTR) {
                diagonalBLTRField = document.querySelector(`#${diagonalBLTR}`);
            }

            if (diagonalBLTR && diagonalBLTRField.hasChildNodes()) {
                const isAnotherColorOnTheWay = (diagonalBLTRField.children[0].getAttribute('class').slice(0, 5) !== bishop.currentBishop.color);
                const isSameColorOnTheWay = (diagonalBLTRField.children[0].getAttribute('class').slice(0, 5) === bishop.currentBishop.color);

                //checks for case when bishop is under another piece
                if (bishop.currentBishop.position[1] > diagonalBLTR[1] && isSameColorOnTheWay) {
                    i = 8;
                    diagonalBLTR = '';
                } else if (bishop.currentBishop.position[1] > diagonalBLTR[1] && isAnotherColorOnTheWay) {  
                    i = 8;
                }
                //checks for case when bishop is below another piece
                if (bishop.currentBishop.position[1] < diagonalBLTR[1] && isSameColorOnTheWay && !diagonalBLTRHighest) {
                    diagonalBLTRHighest = parseInt(diagonalBLTRField.getAttribute('id')[1]) - 1;
                } else if (bishop.currentBishop.position[1] < diagonalBLTR[1] && isAnotherColorOnTheWay && !diagonalBLTRHighestSecond) {
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

        //adding all possible movements from arrays of each type of moving to filtered can move array
        const filteredCanMoveArr = [];

        filteredBLTRArr.forEach(cell => filteredCanMoveArr.push(cell));
        filteredBRTLArr.forEach(cell => filteredCanMoveArr.push(cell));

        for (const cell in filteredCanMoveArr) {
            const cellField = document.querySelector(`#${filteredCanMoveArr[cell]}`);
            bishop.possibleMoves.push(cellField);
        }

        return filteredCanMoveArr;
    },

    getBishopPropeties(choosenPiece) {
        bishop.currentBishop = renderPiece.pieces[choosenPiece.parentNode.getAttribute('id')];
    },

    addingPossibleMovesOnBoard() {
        for (const cell in this.possibleMoves) {
            this.possibleMoves[cell].style.backgroundColor = 'rgba(30,150,30,0.4)';
        }
    },

    canMove(e) {

        let canMove = false;
        const pickedBishopColorSameAsTarget = (bishop.currentBishop.color === e.target.getAttribute('class').slice(0, 5));
        const bishopSelfNode = bishop.currentBishop.selfNode;

        for (const possibleMove in bishop.possibleMoves) {
            const id = (bishop.possibleMoves[possibleMove].getAttribute('id'));
            //setting canMove = true if pieceField on the way on bishop's possible moves
            if (id === e.target.getAttribute('id')) {
                canMove = true;
            } else if (id === e.target.parentNode.getAttribute('id')) {
                canMove = true;
            }
        }

        if (pickedBishopColorSameAsTarget && e.target !== bishopSelfNode) {
            //if e.target is piece with same color (delete all eventListeners)
            console.log('same color as bishop!');
            bishop.clearEventListeners();
        } else if (!(pickedBishopColorSameAsTarget) && canMove && e.target.getAttribute('class').includes('placedPiece')) {
            //if e.target is piece with another color (eat piece function)
            console.log('Eat!');
            e.target.parentNode.appendChild(bishopSelfNode);  
            e.target.remove();
            renderPiece.switchTurn();
            bishop.clearEventListeners();
        } else if (canMove) {
            //if piece can move and pieceField have no pieces
            console.log('Moves!');
            e.target.appendChild(bishopSelfNode);
            renderPiece.switchTurn();
            bishop.clearEventListeners();
        } else if (!(e.target.hasChildNodes()) && e.target !== bishopSelfNode) {
            bishop.clearEventListeners();
        }

        renderPiece.updatePiecesPropeties();
    },

    clearEventListeners() {
        document.querySelector('.chessboard').removeEventListener('click', bishop.canMove);
        const pieceFields = [...document.querySelectorAll('.pieceField')];
        for (const pieceField in pieceFields) {
            pieceFields[pieceField].style = '';
        }
        const pieces = [...document.querySelectorAll('.placedPiece')];
        for (const piece of pieces) {
            piece.removeEventListener('click', bishop.clearEventListeners)
        }
        bishop.possibleMoves = [];
        renderPiece.addClickEvents();
    }
}

export default bishop;
