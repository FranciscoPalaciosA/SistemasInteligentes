let board = [];

let w;
let h;

var pc = 'O';
var person = 'X';
var currPlayer = person;

let boardSize = 3;

/*
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
    // console.log(`${board[(boardSize-1) - i][i]} - ${board[boardSize - i][i - 1]}`);
    if ((board[(boardSize-1) - i][i] !== board[boardSize - i][i - 1])
      || board[boardSize - i][i - 1] == '') {
      return false;
    }
  }
  return true;
}

function availablePlaces() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] == '') {
        return true;
      }
    }
  }
  return false;
}

function isGameOver() {
  let winner = null;

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
    winner = board[boardSize-1][0];
  }

  if(winner == null && !availablePlaces()){
    return 'tie';
  }

  return winner;
}*/

function setup() {
  createCanvas(500, 500);
  background(255);
  strokeWeight(5);

  w = width / boardSize;
  h = height / boardSize;

  drawBoard();
  //pcTurn();

}

function drawBoard() {
  let divisions = boardSize - 1;
  line(w, 0, w, height);
  line(0, h, width, h);

  for (let i = 0; i < divisions; i++) {
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

function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

function checkWinner() {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
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

function draw() {
  // Draw figures
  console.log('Curr Player = ', currPlayer);
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

  let result = checkWinner();
  if (result != null) {
    noLoop();
    let resultP = createP('');
    resultP.style('font-size', '32pt');
    if (result == 'tie') {
      resultP.html('Tie!');
    } else {
      resultP.html(`${result} wins!`);
    }
  }
}