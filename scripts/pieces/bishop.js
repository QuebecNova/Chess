import {alphPosOut} from "../services/alphabetPositions.js";
import {alphPosIn} from "../services/alphabetPositions.js";
import renderPiece from "../services/renderPieces.js";

const bishop = {

    currentBishop: {},
    
    possibleMoves: [],

    availableBishopMoves(choosenPiece) {
        bishop.getBishopPropeties(choosenPiece);
    },

    getBishopPropeties(choosenPiece) {
        bishop.currentBishop = renderPiece.pieces[choosenPiece.parentNode.getAttribute('id')];
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
            console.log('same color of bishop!');
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
