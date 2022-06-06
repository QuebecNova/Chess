import {alphPosOut} from "./alphabetPositions.js";
import {alphPosIn} from "./alphabetPositions.js";
import renderPiece from "../services/renderPieces.js";
import fieldsOnAttack from "./checkAndMateHandler.js";

const king = {
    
    currentKing: {},
    
    possibleMoves: [],
    
    availableKingMoves(choosenPiece) {
        king.getKingPropeties(choosenPiece);
        fieldsOnAttack.isFieldsOnAttack(king.currentKing.color);
    },

    getKingPropeties(choosenPiece) {
        king.currentKing = renderPiece.pieces[choosenPiece.parentNode.getAttribute('id')];
    },

    canMove(e) {

        let canMove = false;
        const pickedKingColorSameAsTarget = (king.currentKing.color === e.target.getAttribute('class').slice(0, 5));
        const kingSelfNode = king.currentKing.selfNode;

        for (const possibleMove in king.possibleMoves) {
            const id = (king.possibleMoves[possibleMove].getAttribute('id'));
            //setting canMove = true if pieceField on the way on king's possible moves
            if (id === e.target.getAttribute('id')) {
                canMove = true;
            } else if (id === e.target.parentNode.getAttribute('id')) {
                canMove = true;
            }
        }

        if (pickedKingColorSameAsTarget && e.target !== kingSelfNode) {
            //if e.target is piece with same color (delete all eventListeners)
            console.log('same color as king!');
            king.clearEventListeners();
        } else if (!(pickedKingColorSameAsTarget) && canMove && e.target.getAttribute('class').includes('placedPiece')) {
            //if e.target is piece with another color (eat piece function)
            console.log('Eat!');
            e.target.parentNode.appendChild(kingSelfNode);  
            e.target.remove();
            renderPiece.switchTurn();
            king.clearEventListeners();
        } else if (canMove) {
            //if piece can move and pieceField have no pieces
            console.log('Moves!');
            e.target.appendChild(kingSelfNode);
            renderPiece.switchTurn();
            king.clearEventListeners();
        } else if (!(e.target.hasChildNodes()) && e.target !== kingSelfNode) {
            king.clearEventListeners();
        }

        renderPiece.updatePiecesPropeties();
    },

    clearEventListeners() {
        document.querySelector('.chessboard').removeEventListener('click', king.canMove);
        const pieceFields = [...document.querySelectorAll('.pieceField')];
        for (const pieceField in pieceFields) {
            pieceFields[pieceField].style = '';
        }
        const pieces = [...document.querySelectorAll('.placedPiece')];
        for (const piece of pieces) {
            piece.removeEventListener('click', king.clearEventListeners)
        }
        king.possibleMoves = [];
        renderPiece.addClickEvents();
    }
}

export default king;