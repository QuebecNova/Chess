import {alphPosOut} from "./alphabetPositions.js";
import {alphPosIn} from "./alphabetPositions.js";
import renderPiece from "../services/renderPieces.js";

const knight = {  

    currentKnight: {},
    
    possibleMoves: [],
    
    availableKnightMoves(choosenPiece) {
        knight.getKnightPropeties(choosenPiece);

        knight.possibleMoves = [];

        const position = knight.currentKnight.position;

        const canMoveArr = [];
        canMoveArr.push(alphPosOut[alphPosIn[position[0]] + 1] + (parseInt(position[1]) + 2));
        canMoveArr.push(alphPosOut[alphPosIn[position[0]] + 2] + (parseInt(position[1]) + 1));
        canMoveArr.push(alphPosOut[alphPosIn[position[0]] + 2] + (parseInt(position[1]) - 1));
        canMoveArr.push(alphPosOut[alphPosIn[position[0]] + 1] + (parseInt(position[1]) - 2));
        canMoveArr.push(alphPosOut[alphPosIn[position[0]] - 1] + (parseInt(position[1]) - 2));
        canMoveArr.push(alphPosOut[alphPosIn[position[0]] - 2] + (parseInt(position[1]) - 1));
        canMoveArr.push(alphPosOut[alphPosIn[position[0]] - 2] + (parseInt(position[1]) + 1));
        canMoveArr.push(alphPosOut[alphPosIn[position[0]] - 1] + (parseInt(position[1]) + 2));

        const filteredCanMoveArr = [];
        for (const cell in canMoveArr) {
            if (document.querySelector(`#${canMoveArr[cell]}`)) {
                const cellField = document.querySelector(`#${canMoveArr[cell]}`);

                if (cellField.hasChildNodes()) {
                    const isAnotherColorOnTheWay = (cellField.children[0].getAttribute('class').slice(0, 5) !== knight.currentKnight.color);
                    const isSameColorOnTheWay = (cellField.children[0]. getAttribute('class').slice(0, 5) === knight.currentKnight.color);
                    if (isSameColorOnTheWay) {
                        continue;
                    }
                    if (isAnotherColorOnTheWay) {
                        filteredCanMoveArr.push(canMoveArr[cell])
                        continue;
                    }
                } else {
                    filteredCanMoveArr.push(canMoveArr[cell]);
                }
            }
        }

        for (const cell in filteredCanMoveArr) {
            const cellField = document.querySelector(`#${filteredCanMoveArr[cell]}`);
            knight.possibleMoves.push(cellField);
        }
        
        return canMoveArr;
    },

    getKnightPropeties(choosenPiece) {
        knight.currentKnight = renderPiece.pieces[choosenPiece.parentNode.getAttribute('id')];
    },

    addingPossibleMovesOnBoard() {
        for (const cell in this.possibleMoves) {
            this.possibleMoves[cell].style.backgroundColor = 'rgba(30,150,30,0.4)';
        }
    },

    canMove(e) {

        let canMove = false;
        const pickedKnightColorSameAsTarget = (knight.currentKnight.color === e.target.getAttribute('class').slice(0, 5));
        const knightSelfNode = knight.currentKnight.selfNode;

        for (const possibleMove in knight.possibleMoves) {
            const id = (knight.possibleMoves[possibleMove].getAttribute('id'));
            //setting canMove = true if pieceField on the way on knight's possible moves
            if (id === e.target.getAttribute('id')) {
                canMove = true;
            } else if (id === e.target.parentNode.getAttribute('id')) {
                canMove = true;
            }
        }

        if (pickedKnightColorSameAsTarget && e.target !== knightSelfNode) {
            //if e.target is piece with same color (delete all eventListeners)
            console.log('same color as knight!');
            knight.clearEventListeners();
        } else if (!(pickedKnightColorSameAsTarget) && canMove && e.target.getAttribute('class').includes('placedPiece')) {
            //if e.target is piece with another color (eat piece function)
            console.log('Eat!');
            e.target.parentNode.appendChild(knightSelfNode);  
            e.target.remove();
            renderPiece.switchTurn();
            knight.clearEventListeners();
        } else if (canMove) {
            //if piece can move and pieceField have no pieces
            console.log('Moves!');
            e.target.appendChild(knightSelfNode);
            renderPiece.switchTurn();
            knight.clearEventListeners();
        } else if (!(e.target.hasChildNodes()) && e.target !== knightSelfNode) {
            knight.clearEventListeners();
        }

        renderPiece.updatePiecesPropeties();
    },

    clearEventListeners() {
        document.querySelector('.chessboard').removeEventListener('click', knight.canMove);
        const pieceFields = [...document.querySelectorAll('.pieceField')];
        for (const pieceField in pieceFields) {
            pieceFields[pieceField].style = '';
        }
        const pieces = [...document.querySelectorAll('.placedPiece')];
        for (const piece of pieces) {
            piece.removeEventListener('click', knight.clearEventListeners)
        }
        knight.possibleMoves = [];
        renderPiece.addClickEvents();
    }
}

export default knight;