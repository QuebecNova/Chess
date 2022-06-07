import piecesImages from "./piecesImages.js";
import initialPosition from "./initialPositionChess.js";
import rook from "../pieces/rook.js";
import bishop from "../pieces/bishop.js";
import knight from "../pieces/knight.js";
import king from "../pieces/king.js";
import queen from "../pieces/queen.js";
import pawn from "../pieces/pawn.js";
import Piece from "../pieces/Piece.js";
import chessConfig from "../configs/chessConfig.js";
import fieldsOnAttack from "../pieces/checkAndMateHandler.js";


const renderPiece = {

    pieces: {},

    turn: 'white',

    onCheck: false,

    render() {
        renderPiece.placePiece();
        renderPiece.addClickEvents();
        renderPiece.placeBoxNumbers();
    },

    placePiece() {
        for (const piecePosition in initialPosition) {
            const pieceType = initialPosition[piecePosition];
            const pieceImg = piecesImages[pieceType];
            const htmlPiece = document.createElement('piece');
            htmlPiece.style.backgroundImage = `url(${pieceImg})`;
            htmlPiece.classList.add(pieceType, 'placedPiece');
            document.querySelector(`#${piecePosition}`).appendChild(htmlPiece);
            this.updatePiecesPropeties();
        }
        console.log(this.pieces);
    },

    updatePiecesPropeties() {
        this.pieces = {};
        const pieces = [...document.querySelectorAll('.placedPiece')];
        for (const piece of pieces) {
            const piecePosition = piece.parentNode.getAttribute('id');
            const newPiece = new Piece(piece);
            this.pieces[piecePosition] = newPiece;
        }
    },

    addClickEvents() {
        const pieces = [...document.querySelectorAll('.placedPiece')];
        for (const piece of pieces) {
            piece.addEventListener('click', renderPiece.possibleMoves);
        }
    },

    removeClickEvents() {
        const pieces = [...document.querySelectorAll('.placedPiece')];
        for (const piece of pieces) {
            piece.removeEventListener('click', renderPiece.possibleMoves);
        }
    },

    possibleMoves(e) {
        const choosenPiece = e.target;
        if (king.isKingOnCheck() === true) {
            renderPiece.mustMoveKing(choosenPiece);
            return;
        }
        if (choosenPiece.getAttribute('class') === 'whiteRook placedPiece' && renderPiece.turn === 'white' || choosenPiece.getAttribute('class') === 'blackRook placedPiece' && renderPiece.turn === 'black') {
            renderPiece.removeClickEvents();
            king.callingFieldsOnAttack(renderPiece.turn);
            rook.availableRookMoves(choosenPiece);
            document.querySelector('.chessboard').addEventListener('click', rook.canMove);
            rook.addingPossibleMovesOnBoard();
            choosenPiece.addEventListener('click', rook.clearEventListeners);
        }
        if (choosenPiece.getAttribute('class') === 'whiteBishop placedPiece' && renderPiece.turn === 'white' || choosenPiece.getAttribute('class') === 'blackBishop placedPiece' && renderPiece.turn === 'black') {
            renderPiece.removeClickEvents();
            king.callingFieldsOnAttack(renderPiece.turn);
            bishop.availableBishopMoves(choosenPiece);
            document.querySelector('.chessboard').addEventListener('click', bishop.canMove);
            bishop.addingPossibleMovesOnBoard();
            choosenPiece.addEventListener('click', bishop.clearEventListeners);
        }

        if (choosenPiece.getAttribute('class') === 'whiteKnight placedPiece' && renderPiece.turn === 'white' || choosenPiece.getAttribute('class') === 'blackKnight placedPiece' && renderPiece.turn === 'black') {
            renderPiece.removeClickEvents();
            king.callingFieldsOnAttack(renderPiece.turn);
            knight.availableKnightMoves(choosenPiece);
            document.querySelector('.chessboard').addEventListener('click', knight.canMove);
            knight.addingPossibleMovesOnBoard();
            choosenPiece.addEventListener('click', knight.clearEventListeners);
        }

        if (choosenPiece.getAttribute('class') === 'whitePawn placedPiece' && renderPiece.turn === 'white' || choosenPiece.getAttribute('class') === 'blackPawn placedPiece' && renderPiece.turn === 'black') {
            renderPiece.removeClickEvents();
            king.callingFieldsOnAttack(renderPiece.turn);
            pawn.availablePawnMoves(choosenPiece);
            document.querySelector('.chessboard').addEventListener('click', pawn.canMove);
            pawn.addingPossibleMovesOnBoard();
            choosenPiece.addEventListener('click', pawn.clearEventListeners);
        }

        if (choosenPiece.getAttribute('class') === 'whiteQueen placedPiece' && renderPiece.turn === 'white' || choosenPiece.getAttribute('class') === 'blackQueen placedPiece' && renderPiece.turn === 'black') {
            renderPiece.removeClickEvents();
            king.callingFieldsOnAttack(renderPiece.turn);
            queen.availableQueenMoves(choosenPiece);
            document.querySelector('.chessboard').addEventListener('click', queen.canMove);
            queen.addingPossibleMovesOnBoard();
            choosenPiece.addEventListener('click', queen.clearEventListeners);
        }

        if (choosenPiece.getAttribute('class') === 'whiteKing placedPiece' && renderPiece.turn === 'white' || choosenPiece.getAttribute('class') === 'blackKing placedPiece' && renderPiece.turn === 'black') {
            renderPiece.removeClickEvents();
            king.callingFieldsOnAttack(renderPiece.turn);
            king.availableKingMoves(choosenPiece);
            document.querySelector('.chessboard').addEventListener('click', king.canMove);
            king.addingPossibleMovesOnBoard();
            choosenPiece.addEventListener('click', king.clearEventListeners);
        }
    },

    mustMoveKing(choosenPiece) {
        if (choosenPiece.getAttribute('class') === 'whiteKing placedPiece' && renderPiece.turn === 'white' || choosenPiece.getAttribute('class') === 'blackKing placedPiece' && renderPiece.turn === 'black') {
            renderPiece.removeClickEvents();
            king.callingFieldsOnAttack(renderPiece.turn);
            king.availableKingMoves(choosenPiece);
            document.querySelector('.chessboard').addEventListener('click', king.canMove);
            king.addingPossibleMovesOnBoard();
            choosenPiece.addEventListener('click', king.clearEventListeners);
        } else {
            console.log('move your king!!!');
        }
    },

    switchTurn() {
        renderPiece.turn === 'white' ? renderPiece.turn = 'black' : renderPiece.turn = 'white';
    },

    placeBoxNumbers() {
        
        if (chessConfig.displayFieldNumberOnBoard && chessConfig.displayNotationOnBoard) {
            console.error('in chessConfig.js you can choose only one type of notation on board');
            return;
        } else if (!chessConfig.displayFieldNumberOnBoard && !chessConfig.displayNotationOnBoard) {
            return;
        }

        const pieceFields = [...document.querySelectorAll('.pieceField')];
        pieceFields.map((pieceFieldSelector, pieceFieldNumber) => {
            
            const span = document.createElement('span');

            if (chessConfig.displayNotationOnBoard) {
                span.innerHTML = pieceFieldSelector.getAttribute('id');
            }
            if (chessConfig.displayFieldNumberOnBoard) {
                span.innerHTML = pieceFieldNumber;
            }

            span.classList.add('positionText');

            pieceFieldSelector.append(span);
        });
    },

}

export default renderPiece;