let board = [
  ['O', 'O', 'X'],
  ['O', 'X', 'O'],
  ['X', 'O', 'X']]

let w;
let h;

var pc = 'O';
var person = 'X';
var currPlayer = person;

let boardSize = 3;

function checkHorizontal(list) {
  for (i = 1; i < list.length; i++) {
    // console.log(`${list[i - 1]} - ${list[i]}`);
    if ((list[i - 1] !== list[i]) || list[i] == '') {
      return false;
    }
  }
  return true;
}

function checkVertical(index) {
  for (i = 1; i < boardSize; i++) {
    // console.log(`${board[i - 1][index]} - ${board[i][index]}`);
    if (
      (board[i - 1][index] !== board[i][index]) ||
      board[i][index] == '') {
      return false;
    }
  }
  return true;
}

function checkDiagonalTD() {
  for (let i = 1; i < boardSize; i++) {
    // console.log(`${board[i - 1][i - 1]} - ${board[i][i]}`);
    if ((board[i - 1][i - 1] !== board[i][i]) || board[i][i] == '') {
      return false;
    }
  }
  return true;
}

function checkDiagonalDT() {
  for (let i = 1; i < boardSize; i++) {
    console.log('F - Row index = ', (boardSize-1) - i);
    console.log('F - Col index = ', i);

    console.log('S - Row index = ', (boardSize) - i);
    console.log('S - Col index = ', i - 1);

    console.log(`${board[(boardSize-1) - i][i]} - ${board[boardSize - i][i - 1]}`);
    if ((board[(boardSize-1) - i][i] !== board[boardSize - i][i - 1])
      || board[boardSize - i][i - 1] == '') {
      return false;
    }
  }
  return true;
}

function isGameOver() {
  let winner = false;

  // Check horizontal same
  for (let i = 0; i < boardSize; i++) {
    if (checkHorizontal(board[i])) {
      winner = board[i][0];
    }
  }

  // Check Vertical
  for (let i = 0; i < boardSize; i++) {
    if (checkVertical(i)) {
      winner = board[0][i];
    }
  }

  // Check Diagonal 
  if (checkDiagonalTD()) {
    winner = board[0][0];
  }
  if (checkDiagonalDT()) {
    winner = board[boardSize][0];
  }

  return winner
}

function drawBoard() {
  let divisions = boardSize - 1;
  line(w, 0, w, height);
  line(0, h, width, h);

  for (let i = 0; i < divisions; i++) {
    //line(w * (i+1) * divisions, 0, w * (i+1) * divisions, height);
    line(w * (i + 1), 0, w * (i + 1), height);
    line(0, h * (i + 1), width, h * (i + 1));
  }

  for (let i = 0; i < boardSize; i++) {
    let row = [];
    for (let j = 0; j < boardSize; j++) {
      row.push('');
    }
    board.push(row);
  }

}

function setup() {
  createCanvas(500, 500);
  background(255);
  strokeWeight(5);

  w = width / boardSize;
  h = height / boardSize;

  drawBoard();
}

function draw() {
  // Draw figures
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      let x = w * j + w / 2;
      let y = h * i + h / 2;

      let spot = board[i][j];

      textSize(28);
      let size = w / 6;
      if (spot == pc) {
        stroke('#a100f4');
        noFill();
        ellipse(x, y, size * 2);
      } else if (spot == person) {
        stroke('#f47c00');
        line(x - size, y - size, x + size, y + size);
        line(x + size, y - size, x - size, y + size);
      }
    }
  }
}

function mousePressed() {
  // console.log(checkDiagonalDT());
  if (currPlayer == person) {
    // Get mouse coordinates
    let j = floor(mouseX / w);
    let i = floor(mouseY / h);

    // Check if empty
    if (board[i][j] === '') {
      board[i][j] = person;
      currentPlayer = pc;
      pcTurn();
    }
  }
}