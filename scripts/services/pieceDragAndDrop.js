import knight from "../pieces/knight.js";

const piecesDragAndDrop = {

    draggedPiece: '',

    dragAndDrop() {
        piecesDragAndDrop.addEventListenersOnPieces();
        piecesDragAndDrop.movingPieces();
    },

    addEventListenersOnPieces() {
        const pieces = [...document.querySelectorAll('.placedPiece')];
        for (const piece in pieces) {
            pieces[piece].addEventListener('dragstart', piecesDragAndDrop.dragPiece);
            pieces[piece].setAttribute('draggable', 'true');
        }
    },

    dragPiece(e) {
        piecesDragAndDrop.draggedPiece = e.path[0];
        setTimeout(() => {
            e.target.classList.add('hide');
        }, 0);
    },
    
    movingPieces() {
        const pieceFields = [...document.querySelectorAll('.pieceField')];

        for (const pieceField in pieceFields) {
            pieceFields[pieceField].addEventListener('dragenter', dragEnter);
            pieceFields[pieceField].addEventListener('dragover', dragOver);
            pieceFields[pieceField].addEventListener('dragleave', dragLeave);
            pieceFields[pieceField].addEventListener('drop', drop);
        }

        function dragEnter(e) {
            e.preventDefault();
            e.target.classList.add('dragOver');
        }
        
        function dragOver(e) {
            e.preventDefault();
            e.target.classList.add('dragOver');
        }

        function dragLeave(e) {
            e.target.classList.remove('dragOver');
        }

        function drop(e) {
            e.target.classList.remove('dragOver');

            const draggable = piecesDragAndDrop.draggedPiece;
            e.target.appendChild(draggable);
            draggable.classList.remove('hide');

            knight.canMove();
        }
    }
}

export default piecesDragAndDrop;