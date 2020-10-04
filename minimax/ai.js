function pcTurn() {
  let bestOutcome = -Infinity;
  let iMove;
  let jMove;

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] === '') {
        board[i][j] = pc;
        let outcome = minimax(board, 0, false);
        board[i][j] = '';
        if (outcome > bestOutcome) {
          console.log(`i = ${i} - j ${j}`);
          bestOutcome = outcome;
          iMove = i;
          jMove = j;
        }
      }
    }
  }
  board[iMove][jMove] = pc;
  currPlayer = person;
}

let outcomes = {
  X: 1,
  O: -1,
  tie: 0
}

function minimax(board, depth, isMaximizing) {
  let result = isGameOver();
  if(result){
    console.log("Winner = ", result);
  }
  return 1

}
