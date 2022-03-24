let board = document.getElementById('board');
const controls = document.getElementById('controls');
const frame = document.getElementById('frame');
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
//End of the mouse button code.

const buttonNewBoard = document.getElementById('clear-button');
buttonNewBoard.addEventListener('click', createNewBoard);

function createNewBoard() {
  let userInput = prompt('How big would you like your new board to be?\n' +
  'Please enter the desired side length below (no longer than 100) or ' +
  'type "cancel" or hit Escape key if you wish to cancel.');
  if (userInput === null || userInput === 'cancel') {
    alert('Canceled creating a new board.');
    return;
  }
  userInput = Number(userInput);
  while (isNaN(userInput) || userInput > 100 || userInput < 1 || !(Number.isInteger(userInput))) {
    userInput = prompt('Please enter a correct number from 1 to 100.\n' +
    'Type "cancel" or hit Escape key to cancel.');
    if (userInput === null || userInput === 'cancel') {
      alert('Canceled creating a new board.');
      return;
    }
    userInput = Number(userInput);
  }
  clearBoard();
  return fillBoard(board, userInput);
}

function clearBoard() {
  board.remove();
  board = document.createElement('div');
  board.id = 'board';
  frame.insertBefore(board, controls); 
}
