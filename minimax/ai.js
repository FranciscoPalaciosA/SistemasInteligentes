function pcTurn() {
  let bestOutcome = -Infinity;
  let iMove;
  let jMove;

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] === '') {
        board[i][j] = pc;
        let outcome = minimax(board, false);
        board[i][j] = '';
        if (outcome > bestOutcome) {
          bestOutcome = outcome;
          iMove = i;
          jMove = j;
        }
      }
    }
  }
  console.log(`iMove = ${iMove} - jMove = ${jMove}`);

  board[iMove][jMove] = pc;
  currPlayer = person;
  console.log('End pcTurn');
}

let outcomes = {
  X: 1,
  O: -1,
  tie: 0
}

function minimax(board, isMax) {
  let winner = checkWinner();
  if (winner !== null) {
    console.log('Winner = ', winner);
    return outcomes[winner];
  }

  if(isMax){
    let bestOutcome = -Infinity;
    for(let i = 0; i < boardSize; i++){
      for(let j = 0; j < boardSize; j++){
        if(board[i][j] == ''){
          board[i][j] = pc;
          let outcome = minimax(board, false);
          board[i][j] == '';
          bestOutcome = max(outcome, bestOutcome);
        }
      }
    }
    return bestOutcome;
  } else {
    let bestOutcome = Infinity;
    for(let i = 0; i < boardSize; i++){
      for(let j = 0; j < boardSize; j++){
        if(board[i][j] == ''){
          board[i][j] = person;
          let outcome = minimax(board, true);
          board[i][j] == '';
          bestOutcome = min(outcome, bestOutcome);
        }
      }
    }
    return bestOutcome;
  }
}
