import {alphPosOut} from "./alphabetPositions.js";
import {alphPosIn} from "./alphabetPositions.js";
import renderPiece from "../services/renderPieces.js";
import initialPosition from "../services/initialPositionChess.js";

const pawn = {
    
    currentPawn: {},
    
    possibleMoves: [],
    
    availablePawnMoves(choosenPiece) {
        pawn.getPawnPropeties(choosenPiece);

        const position = pawn.currentPawn.position;
        
        const pawnInitialPositions = [];

        let left = '';
        let right = '';

        for (const piecePosition in initialPosition) {
            if (initialPosition[piecePosition].slice(5, 10) === 'Pawn') {
                pawnInitialPositions[piecePosition] = initialPosition[piecePosition];
            }
        }

        const canMoveArr = [];
        //adding posible movements in array considering that pawn can move 2 fields forward on starting position
        if (pawn.currentPawn.color === 'white') {
            
            left = alphPosOut[alphPosIn[position[0]] - 1] + (parseInt(position[1]) + 1);
            right = alphPosOut[alphPosIn[position[0]] + 1] + (parseInt(position[1]) + 1);

            if (pawnInitialPositions[position]) {
                if (pawnInitialPositions[position].includes('whitePawn')) {
                    canMoveArr.push(position[0] + (parseInt(position[1]) + 1));
                    canMoveArr.push(position[0] + (parseInt(position[1]) + 2));
                } else if (!(pawnInitialPositions.includes(position))) {
                    canMoveArr.push(position[0] + (parseInt(position[1]) + 1));
                }
            } else if ((parseInt(position[1]) + 1) <= 8) {
                canMoveArr.push(position[0] + (parseInt(position[1]) + 1));
            }
        }

        if (pawn.currentPawn.color === 'black') {

            left = alphPosOut[alphPosIn[position[0]] + 1] + (parseInt(position[1]) - 1);
            right = alphPosOut[alphPosIn[position[0]] - 1] + (parseInt(position[1]) - 1);
            
            if (pawnInitialPositions[position]) {
                if (pawnInitialPositions[position].includes('blackPawn')) {
                    canMoveArr.push(position[0] + (parseInt(position[1]) - 1));
                    canMoveArr.push(position[0] + (parseInt(position[1]) - 2));
                } else if (!(pawnInitialPositions.includes(position))) {
                    canMoveArr.push(position[0] + (parseInt(position[1]) - 1));
                }
            } else if ((parseInt(position[1]) + 1) >= 1) {
                canMoveArr.push(position[0] + (parseInt(position[1]) - 1));
            }
        }

        //adding movements in filtered array when pawn doesn't have another pawns on the way
        const filteredCanMoveArr = [];
        let pawnOnTheWay = '';
        canMoveArr.forEach(cell => {
            const cellField = document.querySelector(`#${cell}`);
            if ((cellField.hasChildNodes())) {
                pawnOnTheWay = cell;
            } 
            if (!(cellField.hasChildNodes()) && !(pawnOnTheWay)) {
                filteredCanMoveArr.push(cellField);
            }
        });

        //adding to possible pawn movements eating pawns that on top-left and top-right side of the pawn
        let pieceFieldLeft = '';
        let pieceFieldRight = '';

        if (left) {
            pieceFieldLeft = document.querySelector(`#${left}`);
        }
        if (right) {
            pieceFieldRight = document.querySelector(`#${right}`);
        }

        if (pieceFieldLeft) {
            if (pieceFieldLeft.hasChildNodes()) {
                const isAnotherColorOnTheWayLeft = (pieceFieldLeft.children[0].getAttribute('class').slice(0, 5) !== pawn.currentPawn.color);
            
                if (isAnotherColorOnTheWayLeft) {
                    const leftCellField = document.querySelector(`#${left}`);
                    filteredCanMoveArr.push(leftCellField);
                }
            }
        }
        
        if (pieceFieldRight) {
            if (pieceFieldRight.hasChildNodes()) {
                const isAnotherColorOnTheWayRight = (pieceFieldRight.children[0].getAttribute('class').slice(0, 5) !== pawn.currentPawn.color);
            
                if (isAnotherColorOnTheWayRight) {
                    const rightCellField = document.querySelector(`#${right}`);
                    filteredCanMoveArr.push(rightCellField);
                }
            }
        }

        for (const cell in filteredCanMoveArr) {
            const cellField = filteredCanMoveArr[cell];
            cellField.style.backgroundColor = 'rgba(30,150,30,0.4)';
            pawn.possibleMoves.push(cellField);
        }

        return filteredCanMoveArr;
    },
    getPawnPropeties(choosenPiece) {
        pawn.currentPawn = renderPiece.pieces[choosenPiece.parentNode.getAttribute('id')];
    },

    canMove(e) {

        let canMove = false;
        const pickedPawnColorSameAsTarget = (pawn.currentPawn.color === e.target.getAttribute('class').slice(0, 5));
        const pawnSelfNode = pawn.currentPawn.selfNode;

        for (const possibleMove in pawn.possibleMoves) {
            const id = (pawn.possibleMoves[possibleMove].getAttribute('id'));
            //setting canMove = true if pieceField on the way on pawn's possible moves
            if (id === e.target.getAttribute('id')) {
                canMove = true;
            } else if (id === e.target.parentNode.getAttribute('id')) {
                canMove = true;
            }
        }

        if (pickedPawnColorSameAsTarget && e.target !== pawnSelfNode) {
            //if e.target is piece with same color (delete all eventListeners)
            console.log('same color as pawn!');
            pawn.clearEventListeners();
        } else if (!(pickedPawnColorSameAsTarget) && canMove && e.target.getAttribute('class').includes('placedPiece')) {
            //if e.target is piece with another color (eat piece function)
            console.log('Eat!');
            e.target.parentNode.appendChild(pawnSelfNode);  
            e.target.remove();
            renderPiece.switchTurn();
            pawn.clearEventListeners();
        } else if (canMove) {
            //if piece can move and pieceField have no pieces
            console.log('Moves!');
            e.target.appendChild(pawnSelfNode);
            renderPiece.switchTurn();
            pawn.clearEventListeners();
        } else if (!(e.target.hasChildNodes()) && e.target !== pawnSelfNode) {
            pawn.clearEventListeners();
        }

        renderPiece.updatePiecesPropeties();
    },

    clearEventListeners() {
        document.querySelector('.chessboard').removeEventListener('click', pawn.canMove);
        const pieceFields = [...document.querySelectorAll('.pieceField')];
        for (const pieceField in pieceFields) {
            pieceFields[pieceField].style = '';
        }
        const pieces = [...document.querySelectorAll('.placedPiece')];
        for (const piece of pieces) {
            piece.removeEventListener('click', pawn.clearEventListeners)
        }
        pawn.possibleMoves = [];
        renderPiece.addClickEvents();
    }
}

export default pawn;