const board = document.getElementById('board');
let boardSideLength = 16;

function fillBoard(board, boardSideLength) {
  for (let i = 0; i < (boardSideLength**2); i++) {
    const currentSquare = document.createElement('div');
    currentSquare.classList.add('board-square');
    currentSquare.style.flexBasis = `${40 / boardSideLength}vw`; //Sets the size of each square as a proportion of the viewport width, 40 being the width of the board
    currentSquare.addEventListener('mouseover', colorSquare);
    board.appendChild(currentSquare);
  }
  return board;
}

function colorSquare() {
  if (primaryMouseButtonDown) {
    return this.classList.add('colored');
  }
}

fillBoard(board, boardSideLength);

//The following code checks if the primary mouse button is currently being held down.
let primaryMouseButtonDown = false;

function setPrimaryButtonState(e) {
  var flags = e.buttons !== undefined ? e.buttons : e.which;
  primaryMouseButtonDown = (flags & 1) === 1;
}

document.addEventListener("mousedown", setPrimaryButtonState);
document.addEventListener("mousemove", setPrimaryButtonState);
document.addEventListener("mouseup", setPrimaryButtonState);