const board = document.getElementById('board');
let boardSideLength = 16;

function fillBoard(board, boardSideLength) {
  for (let i = 0; i < (boardSideLength**2); i++) {
    const currentSquare = document.createElement('div');
    currentSquare.classList.add('board-square');
    currentSquare.style.flexBasis = `${40 / boardSideLength}vw`; //Sets the size of each square as a proportion of the viewport width, 40 being the width of the board
    board.appendChild(currentSquare);
  }
  return board;
}