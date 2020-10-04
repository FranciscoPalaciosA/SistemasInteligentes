let board = [];

let w;
let h;

var pc = 'X';
var person = 'O';
var currPlayer;

let boardSize = 3;

function restart() {
  console.log('Clicked');
  setup();
}

let scores = {
  'X': 0,
  'O': 0,
  'tie': 0
}

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
}

function setup() {
  var canvas = createCanvas(400, 400);
  canvas.parent('sketch-div');
  strokeWeight(5);
  w = width / boardSize;
  h = height / boardSize;
  currPlayer = person
  stroke('white');
  drawBoard();
  loop();
  // pcTurn();

}

function drawBoard() {
  board = [];
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

function mousePressed() {
  console.log('board = ', board);
  if (currPlayer === person) {
    // Get mouse coordinates
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);

    // Check if empty
    if ((j >= 0 && j < boardSize) && (i >= 0 && i < boardSize) && board[i][j] === '') {
      board[i][j] = person;
      currPlayer = pc;
      pcTurn();
    }
  }
}

function draw() {
  // Draw figures
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;

      let spot = board[i][j];

      textSize(28);
      let size = w / 4;
      if (spot == person) {
        stroke('#00e8ff');
        noFill();
        ellipse(x, y, size * 2);
      } else if (spot == pc) {
        stroke('#00ff89');
        line(x - size, y - size, x + size, y + size);
        line(x + size, y - size, x - size, y + size);
      }
    }
  }

  let outcome = isGameOver();
  if (outcome != null) {
    scores[outcome]++;
    console.log(scores);
    document.getElementById(outcome).innerText = scores[outcome];
    noLoop();
  }
}