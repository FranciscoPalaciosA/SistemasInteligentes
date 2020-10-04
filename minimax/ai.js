function pcTurn() {
  // AI to make its turn
  let bestScore = -Infinity;
  let iMove;
  let jMove;
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      // Is the spot available?
      if (board[i][j] == '') {
        board[i][j] = pc;
        let score = minimax(board, false);
        board[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          iMove = i;
          jMove = j;
        }
      }
    }
  }
  board[iMove][jMove] = pc;
  currentPlayer = person;
}

let outcomes = {
  X: 1,
  O: -1,
  tie: 0
};

function minimax(board, isMax) {
  let winner = isGameOver();
  if (winner !== null) {
    return outcomes[winner];
  }

  if (isMax) {
    let bestOutcome = -Infinity;
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (board[i][j] == '') {
          board[i][j] = pc;
          let outcome = minimax(board, false);
          board[i][j] = '';
          bestOutcome = max(outcome, bestOutcome);
        }
      }
    }
    return bestOutcome;
  } else {
    let bestOutcome = Infinity;
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (board[i][j] == '') {
          board[i][j] = person;
          let outcome = minimax(board, true);
          board[i][j] = '';
          bestOutcome = min(outcome, bestOutcome);
        }
      }
    }
    return bestOutcome;
  }
}
