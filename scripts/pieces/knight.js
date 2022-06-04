import piecesDragAndDrop from "../services/pieceDragAndDrop.js";

const knight = {
    
    value: 3,

    knights: {},

    getKnights() {
        const blackKnights = [...document.querySelectorAll('.blackKnight')];
        const whiteKnights = [...document.querySelectorAll('.whiteKnight')];
        const knights = [blackKnights, whiteKnights];
        knight.knights = knights;
    },

    canMove() {

        knight.getKnights();
        knight.getFieldNumber();
        console.log(knight.knights[0]);
    },

    getFieldNumber() {
        const pieceFields = [...document.querySelectorAll('.pieceField')];
        let iBlack = 0;
        let iWhite = 0;
        pieceFields.forEach((pieceFieldSelector, FieldNumber) => {
            const piece = pieceFieldSelector.childNodes[0];
            if (piece) {
                if (piece.getAttribute('class') === 'blackKnight placedPiece') {
                    knight.knights[0][iBlack].setAttribute('id', FieldNumber);
                    iBlack++;
                }
                if (piece.getAttribute('class') === 'whiteKnight placedPiece') {
                    knight.knights[1][iWhite].setAttribute('id', FieldNumber);
                    iWhite++;
                }
            }
        });
    }

}

export default knight;