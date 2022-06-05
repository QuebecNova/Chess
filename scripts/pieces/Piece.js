class Piece {

    constructor(choosenPiece) {
        const parentNode = choosenPiece.closest('.pieceField');
        const position = parentNode.getAttribute('id');
        const fullType = choosenPiece.getAttribute('class').replace(' placedPiece', '');
        const type = choosenPiece.getAttribute('class').replace(' placedPiece', '').slice(5, 15);
        const color = choosenPiece.getAttribute('class').slice(0, 5);
        const selfNode = choosenPiece;

        this.fullType = fullType;
        this.position = position;
        this.color = color;
        this.parentNode = parentNode;
        this.selfNode = selfNode;
        this.type = type;
    }

    getFullType() {
        return this.fullType;
    }
    getType() {
        return this.type;
    }
    getPosition() {
        return this.position;
    }
    getParentNode() {
        return this.parentNode;
    }
    getSelfNode() {
        return this.selfNode;
    }
    getColor() {
        return this.color;
    }
}

export default Piece;