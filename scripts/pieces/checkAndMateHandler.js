import rook from "./rook.js";
import bishop from "./bishop.js";
import knight from "./knight.js";
import king from "./king.js";
import queen from "./queen.js";
import pawn from "./pawn.js";

const fieldsOnAttack = {

    fieldsOnAttackArr: [],
    
    isFieldsOnAttack(turn) {

        this.fieldsOnAttackArr = [];

        const pawnsAttackFields = [];
        const bishopsAttackFields = [];
        const knightsAttackFields = [];
        const kingsAttackFields = [];
        const rooksAttackFields = [];
        const queensAttackFields = [];

        if (turn === 'black') {
            const allWhiteKnights = [...document.querySelectorAll('.whiteKnight')];
            for (const knightPiece in allWhiteKnights) {
                const knightAttackFieldsArr = knight.availableKnightMoves(allWhiteKnights[knightPiece]);
                for (const field in knightAttackFieldsArr) {
                    knightsAttackFields.push(knightAttackFieldsArr[field]);
                }
            }
            const allWhiteBishops = [...document.querySelectorAll('.whiteBishop')];
            for (const bishopPiece in allWhiteBishops) {
                const bishopsAttackFieldsArr = bishop.availableBishopMoves(allWhiteBishops[bishopPiece]);
                for (const field in bishopsAttackFieldsArr) {
                    bishopsAttackFields.push(bishopsAttackFieldsArr[field]);
                }
            }
            const allWhiteQueens = [...document.querySelectorAll('.whiteQueen')];
            for (const queenPiece in allWhiteQueens) {
                const queenAttackFieldsArr = queen.availableQueenMoves(allWhiteQueens[queenPiece]);
                for (const field in queenAttackFieldsArr) {
                    queensAttackFields.push(queenAttackFieldsArr[field]);
                }
            }
            const allWhiteRooks = [...document.querySelectorAll('.whiteRook')];
            for (const rookPiece in allWhiteRooks) {
                const rookAttackFieldsArr = rook.availableRookMoves(allWhiteRooks[rookPiece]);
                for (const field in rookAttackFieldsArr) {
                    rooksAttackFields.push(rookAttackFieldsArr[field]);
                }
            }
            const allWhitePawns = [...document.querySelectorAll('.whitePawn')];
            for (const pawnPiece in allWhitePawns) {
                const pawnAttackFieldsArr = pawn.availablePawnMoves(allWhitePawns[pawnPiece]);
                for (const field in pawnAttackFieldsArr) {
                    pawnsAttackFields.push(pawnAttackFieldsArr[field]);
                }
            }
            const whiteKing = document.querySelector('.whiteKing');
            const kingAttackFieldsArr = king.availableKingMoves(whiteKing);
            for (const field in kingAttackFieldsArr) {
                kingsAttackFields.push(kingAttackFieldsArr[field]);
            }
            
            rooksAttackFields.forEach(cell => this.fieldsOnAttackArr.push(cell));
            bishopsAttackFields.forEach(cell => this.fieldsOnAttackArr.push(cell));
            knightsAttackFields.forEach(cell => this.fieldsOnAttackArr.push(cell));
            kingsAttackFields.forEach(cell => this.fieldsOnAttackArr.push(cell));
            queensAttackFields.forEach(cell => this.fieldsOnAttackArr.push(cell));
            pawnsAttackFields.forEach(cell => this.fieldsOnAttackArr.push(cell));
        }

        if (turn === 'white') {
            const allBlackKnights = [...document.querySelectorAll('.blackKnight')];
            for (const knightPiece in allBlackKnights) {
                const knightAttackFieldsArr = knight.availableKnightMoves(allBlackKnights[knightPiece]);
                for (const field in knightAttackFieldsArr) {
                    knightsAttackFields.push(knightAttackFieldsArr[field]);
                }
            }
            const allBlackBishops = [...document.querySelectorAll('.blackBishop')];
            for (const bishopPiece in allBlackBishops) {
                const bishopsAttackFieldsArr = bishop.availableBishopMoves(allBlackBishops[bishopPiece]);
                for (const field in bishopsAttackFieldsArr) {
                    bishopsAttackFields.push(bishopsAttackFieldsArr[field]);
                }
            }
            const allBlackQueens = [...document.querySelectorAll('.blackQueen')];
            for (const queenPiece in allBlackQueens) {
                const queenAttackFieldsArr = queen.availableQueenMoves(allBlackQueens[queenPiece]);
                for (const field in queenAttackFieldsArr) {
                    queensAttackFields.push(queenAttackFieldsArr[field]);
                }
            }
            const allBlackRooks = [...document.querySelectorAll('.blackRook')];
            for (const rookPiece in allBlackRooks) {
                const rookAttackFieldsArr = rook.availableRookMoves(allBlackRooks[rookPiece]);
                for (const field in rookAttackFieldsArr) {
                    rooksAttackFields.push(rookAttackFieldsArr[field]);
                }
            }
            const allBlackPawns = [...document.querySelectorAll('.blackPawn')];
            for (const pawnPiece in allBlackPawns) {
                const pawnAttackFieldsArr = pawn.availablePawnMoves(allBlackPawns[pawnPiece]);
                for (const field in pawnAttackFieldsArr) {
                    pawnsAttackFields.push(pawnAttackFieldsArr[field]);
                }
            }
            const blackKing = document.querySelector('.blackKing');
            const kingAttackFieldsArr = king.availableKingMoves(blackKing);
            for (const field in kingAttackFieldsArr) {
                kingsAttackFields.push(kingAttackFieldsArr[field]);
            }
            
            rooksAttackFields.forEach(cell => this.fieldsOnAttackArr.push(cell));
            bishopsAttackFields.forEach(cell => this.fieldsOnAttackArr.push(cell));
            knightsAttackFields.forEach(cell => this.fieldsOnAttackArr.push(cell));
            kingsAttackFields.forEach(cell => this.fieldsOnAttackArr.push(cell));
            queensAttackFields.forEach(cell => this.fieldsOnAttackArr.push(cell));
            pawnsAttackFields.forEach(cell => this.fieldsOnAttackArr.push(cell));
        }

        for (const field in this.fieldsOnAttackArr) {
            if (document.querySelector(`#${this.fieldsOnAttackArr[field]}`)) {
                const fieldP = document.querySelector(`#${this.fieldsOnAttackArr[field]}`);
                fieldP.style.backgroundColor = 'red';
            }
        }
    },
}

export default fieldsOnAttack;