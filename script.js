let board = document.getElementById('board');
const controls = document.getElementById('controls');
const frame = document.getElementById('frame');

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
    const currentColor = window.getComputedStyle(this).backgroundColor;
    const rgbValues = [...currentColor.matchAll(/\d+/g)];
    const hslValues = rgbToHsl(...rgbValues);
    return this.style.backgroundColor = `hsl(${hslValues[0]}, ${hslValues[1]}%, ` +
        `${hslValues[2] - 10}%)`;
  }
}

fillBoard(board, 16);

//Function to convert color spaces
function rgbToHsl(r, g, b){
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if(max == min){
      h = s = 0; // achromatic
  }else{
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
      h = Math.min(Math.round(h*361),360);
      s = Math.round(s * 100);
      l = Math.round(l * 100);
  }

  return [h, s, l];
}

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
