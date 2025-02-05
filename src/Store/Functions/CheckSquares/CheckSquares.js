import { northSquares, southSquares, 
    westSquares, eastSquares, 
    northWestSquares,northEastSquares, 
    southEastSquares, southWestSquares, 
    knightSquares} from '../../Functions/TraversalFunctions';

export const checkSquaresForCheck = (state, row, column, piece_color) => {
    const opposing_color = piece_color === 'white' ? 'black' : 'white';
    let squaresBetweenKingAndAttacker = [];
  
    northSquares((i) => {
      squaresBetweenKingAndAttacker.push({row: i, column});
      if(state.board[i][column].includes(`${opposing_color} queen`) || state.board[i][column].includes(`${opposing_color} rook`)){
        state[`${piece_color}_king_in_check`] = true;
        return false;
      }
      else if(state.board[i][column].includes(opposing_color) || state.board[i][column].includes(piece_color))
        return false;
      else
        return true;
    }, row)
  
    if(state[`${piece_color}_king_in_check`]) {
      state.squares_between_king_and_attacker = squaresBetweenKingAndAttacker;
      return;
    }
    else squaresBetweenKingAndAttacker = [];
  
    southSquares((i) => {
      squaresBetweenKingAndAttacker.push({row: i, column});
      if(state.board[i][column].includes(`${opposing_color} queen`) || state.board[i][column].includes(`${opposing_color} rook`)){
        state[`${piece_color}_king_in_check`] = true;
        return false;
      }
      else if(state.board[i][column].includes(opposing_color) || state.board[i][column].includes(piece_color))
        return false;
      else
        return true;
    }, row)
  
    if(state[`${piece_color}_king_in_check`]) {
      state.squares_between_king_and_attacker = squaresBetweenKingAndAttacker;
      return;
    }
    else squaresBetweenKingAndAttacker = [];
  
    westSquares((i) => {
      squaresBetweenKingAndAttacker.push({row, column: i});
      if(state.board[row][i].includes(`${opposing_color} queen`) || state.board[row][i].includes(`${opposing_color} rook`)){
        state[`${piece_color}_king_in_check`] = true;
        return false;
      }
      else if(state.board[row][i].includes(opposing_color) || state.board[row][i].includes(piece_color))
        return false;
      else
        return true;
    }, column)
  
    if(state[`${piece_color}_king_in_check`]) {
      state.squares_between_king_and_attacker = squaresBetweenKingAndAttacker;
      return;
    }
    else squaresBetweenKingAndAttacker = [];
  
    eastSquares((i) => {
      squaresBetweenKingAndAttacker.push({row, column: i});
      if(state.board[row][i].includes(`${opposing_color} queen`) || state.board[row][i].includes(`${opposing_color} rook`)){
        state[`${piece_color}_king_in_check`] = true;
        return false;
      }
      else if(state.board[row][i].includes(opposing_color) || state.board[row][i].includes(piece_color))
        return false;
      else
        return true;
    }, column)
  
    if(state[`${piece_color}_king_in_check`]) {
      state.squares_between_king_and_attacker = squaresBetweenKingAndAttacker;
      return;
    }
    else squaresBetweenKingAndAttacker = [];
  
    northWestSquares((i, j) => {
      squaresBetweenKingAndAttacker.push({row: i, column: j});
      if(state.board[i][j].includes(`${opposing_color} queen`) || state.board[i][j].includes(`${opposing_color} bishop`)){
        state[`${piece_color}_king_in_check`] = true;
        return false;
      }
  
      else if(state.board[i][j].includes(`${opposing_color} pawn`) && (i === row + 1 && j === column - 1)){
        state[`${piece_color}_king_in_check`] = true;
        return false;
      }
      else if(state.board[i][j].includes(opposing_color) || state.board[i][j].includes(piece_color))
        return false;
      else
        return true;
    }, row, column)
  
    if(state[`${piece_color}_king_in_check`]) {
      state.squares_between_king_and_attacker = squaresBetweenKingAndAttacker;
      return;
    }
    else squaresBetweenKingAndAttacker = [];
  
    northEastSquares((i, j) => {
      squaresBetweenKingAndAttacker.push({row: i, column: j});
      if(state.board[i][j].includes(`${opposing_color} queen`) || state.board[i][j].includes(`${opposing_color} bishop`)){
        state[`${piece_color}_king_in_check`] = true;
        return false;
      }
      else if(state.board[i][j].includes(`${opposing_color} pawn`) && (i === row + 1 && j === column + 1)){
        state[`${piece_color}_king_in_check`] = true;
        return false;
      }
      else if(state.board[i][j].includes(opposing_color) || state.board[i][j].includes(piece_color))
        return false;
      else
        return true;
    }, row, column)
  
    if(state[`${piece_color}_king_in_check`]) {
      state.squares_between_king_and_attacker = squaresBetweenKingAndAttacker;
      return;
    }
    else squaresBetweenKingAndAttacker = [];
  
    southWestSquares((i, j) => {
      squaresBetweenKingAndAttacker.push({row: i, column: j});
      if(state.board[i][j].includes(`${opposing_color} queen`) || state.board[i][j].includes(`${opposing_color} bishop`)){
        state[`${piece_color}_king_in_check`] = true;
        return false;
      }
      else if(state.board[i][j].includes(`${opposing_color} pawn`) && (i === row - 1 && j === column - 1)){
        state[`${piece_color}_king_in_check`] = true;
        return false;
      }
      else if(state.board[i][j].includes(opposing_color) || state.board[i][j].includes(piece_color))
        return false;
      else
        return true;
    }, row, column)
  
    if(state[`${piece_color}_king_in_check`]) {
      state.squares_between_king_and_attacker = squaresBetweenKingAndAttacker;
      return;
    }
    else squaresBetweenKingAndAttacker = [];
  
    southEastSquares((i, j) => {
      squaresBetweenKingAndAttacker.push({row: i, column: j});
      if(state.board[i][j].includes(`${opposing_color} queen`) || state.board[i][j].includes(`${opposing_color} bishop`)){
        state[`${piece_color}_king_in_check`] = true;
        return false;
      }
      else if(state.board[i][j].includes(`${opposing_color} pawn`) && (i === row - 1 && j === column + 1)){
        state[`${piece_color}_king_in_check`] = true;
        return false;
      }
      else if(state.board[i][j].includes(opposing_color) || state.board[i][j].includes(piece_color))
        return false;
      else
        return true;
    }, row, column)
    if(state[`${piece_color}_king_in_check`]) {
      state.squares_between_king_and_attacker = squaresBetweenKingAndAttacker;
      return;
    }
    else
      squaresBetweenKingAndAttacker = [];
  
    knightSquares((squares) => {
      if(state.board[squares.row]?.[squares.column]?.includes(`${opposing_color} knight`)){
        state[`${piece_color}_king_in_check`] = true;
        squaresBetweenKingAndAttacker.push({row: squares.row, column: squares.column})
        return false;
      }
      else
        return true;
      }, row, column)
  
    if(state[`${piece_color}_king_in_check`]) {
      state.squares_between_king_and_attacker = squaresBetweenKingAndAttacker;
      return;
    }
  }
  
  export const checkSquaresForBlocks = (state,square, piece_color) => {
     const row = square.row;
     const column = square.column;
     let isBlockableOrTakable = false;
  
      northSquares((i) => {
        if(state.board[i][column].includes(`${piece_color} queen`) || state.board[i][column].includes(`${piece_color} rook`)){
          isBlockableOrTakable = true;
          return false
        }
        else if(state.board[i][column].includes(`black pawn`) && state[`black_king_in_check`] && (i === row + 1 || (i === row + 2 && row === 6))){
          isBlockableOrTakable = true;
          return false
        }
        else if(state.board[i][column] === '')
          return true;
        else
          return false;
  
      }, row)
  
      if(isBlockableOrTakable)
          return true;
  
      southSquares((i) => {
        if(state.board[i][column].includes(`${piece_color} queen`) || state.board[i][column].includes(`${piece_color} rook`)){
          isBlockableOrTakable = true;
          return false
        }
        else if(state.board[i][column].includes(`white pawn`) && state[`white_king_in_check`] && (i === row + 1 || (i === row + 2 && row === 1))){
          isBlockableOrTakable = true;
          return false
        }
        else if(state.board[i][column] === '')
          return true;
        else
          return false;
  
      }, row)
  
      if(isBlockableOrTakable)
        return true;
  
  
      westSquares((i) => {
        if(state.board[row][i].includes(`${piece_color} queen`) || state.board[row][i].includes(`${piece_color} rook`)){
          isBlockableOrTakable = true;
          return false
        }
        else if(state.board[row][i] === '')
          return true;
        else
          return false;
  
      }, column)
  
      if(isBlockableOrTakable)
        return true;
  
  
      eastSquares((i) => {
        if(state.board[row][i].includes(`${piece_color} queen`) || state.board[row][i].includes(`${piece_color} rook`)){
          isBlockableOrTakable = true;
          return false
        }
        else if(state.board[row][i] === '')
          return true;
        else
          return false;
  
      }, column)
  
      if(isBlockableOrTakable)
        return true;
  
      northWestSquares((i, j) => {
        if(state.board[i][j].includes(`${piece_color} queen`) || state.board[i][j].includes(`${piece_color} bishop`)){
          isBlockableOrTakable = true;
          return false
        }
        else if(state.board[i][j] === '')
          return true;
        else
          return false;
  
      }, row, column)
  
      if(isBlockableOrTakable)
        return true;
  
      northEastSquares((i, j) => {
        if(state.board[i][j].includes(`${piece_color} queen`) || state.board[i][j].includes(`${piece_color} bishop`)){
          isBlockableOrTakable = true;
          return false
        }
        else if(state.board[i][j] === '')
          return true;
        else
          return false;
  
      }, row, column)
  
      if(isBlockableOrTakable)
        return true;
  
      southWestSquares((i, j) => {
        if(state.board[i][j].includes(`${piece_color} queen`) || state.board[i][j].includes(`${piece_color} bishop`)){
          isBlockableOrTakable = true;
          return false
        }
        else if(state.board[i][j] === '')
          return true;
        else
          return false;
  
      }, row, column)
  
      if(isBlockableOrTakable)
        return true;
  
      southEastSquares((i, j) => {
        if(state.board[i][j].includes(`${piece_color} queen`) || state.board[i][j].includes(`${piece_color} bishop`)){
          isBlockableOrTakable = true;
          return false
        }
        else if(state.board[i][j] === '')
          return true;
        else
          return false;
  
      }, row, column)
  
      if(isBlockableOrTakable)
        return true;
  
      knightSquares((square) => {
        if(state.board[square.row]?.[square.column]?.includes(`${piece_color} knight`)){
          isBlockableOrTakable = true;
          return false
        }
        else 
          return true;
      }, row, column)
  
      if(isBlockableOrTakable)
        return true;
  
      return false;
  
  }
  
  export const checkSquaresForThreats = (state, attacker, color) => {
      const row = attacker.row;
      const column = attacker.column;
      let attackerIsUnderThreat = false;
      const opposing_color = color;
  
      northSquares((i) => {
        if(state.board[i][column].includes(`${opposing_color} queen`) || state.board[i][column].includes(`${opposing_color} rook`)){
            attackerIsUnderThreat = true;
          return false
        }
        else if(state.board[i][column] === '')
          return true;
        else
          return false;
  
      }, row)
  
      if(attackerIsUnderThreat)
          return true;
  
      southSquares((i) => {
        if(state.board[i][column].includes(`${opposing_color} queen`) || state.board[i][column].includes(`${opposing_color} rook`)){
            attackerIsUnderThreat = true;
          return false
        }
        else if(state.board[i][column] === '')
          return true;
        else
          return false;
  
      }, row)
  
      if(attackerIsUnderThreat)
        return true;
  
  
      westSquares((i) => {
        if(state.board[row][i].includes(`${opposing_color} queen`) || state.board[row][i].includes(`${opposing_color} rook`)){
            attackerIsUnderThreat = true;
          return false
        }
        else if(state.board[row][i] === '')
          return true;
        else
          return false;
  
      }, column)
  
      if(attackerIsUnderThreat)
        return true;
  
  
      eastSquares((i) => {
        if(state.board[row][i].includes(`${opposing_color} queen`) || state.board[row][i].includes(`${opposing_color} rook`)){
            attackerIsUnderThreat = true;
          return false
        }
        else if(state.board[row][i] === '')
          return true;
        else
          return false;
  
      }, column)
  
      if(attackerIsUnderThreat)
        return true;
  
      northWestSquares((i, j) => {
        if(state.board[i][j].includes(`${opposing_color} queen`) || state.board[i][j].includes(`${opposing_color} bishop`)){
            attackerIsUnderThreat = true;
            return false
        }
        else if(state.board[i][j] === '')
          return true;
        else if(state.board[i][j].includes(`${opposing_color} pawn`) && (i === row + 1 && j === column - 1)){
            attackerIsUnderThreat = true;
            return false
        }
        else
          return false;
      }, row, column)
  
      if(attackerIsUnderThreat)
        return true;
  
      northEastSquares((i, j) => {
        
        if(state.board[i][j].includes(`${opposing_color} queen`) || state.board[i][j].includes(`${opposing_color} bishop`)){
            attackerIsUnderThreat = true;
            return false
        }
        else if(state.board[i][j] === '')
          return true;
        else if(state.board[i][j].includes(`${opposing_color} pawn`) && (i === row + 1 && j === column + 1)){
            attackerIsUnderThreat = true;
            return false
        }
        else
          return false;
      }, row, column)
  
      if(attackerIsUnderThreat)
        return true;
  
      southWestSquares((i, j) => {
        if(state.board[i][j].includes(`${opposing_color} queen`) || state.board[i][j].includes(`${opposing_color} bishop`)){
            attackerIsUnderThreat = true;
            return false
        }
        else if(state.board[i][j] === '')
          return true;
        else if(state.board[i][j].includes(`${opposing_color} pawn`) && (i === row - 1 && j === column - 1)){
            attackerIsUnderThreat = true;
            return false
        }
        else
          return false;
  
      }, row, column)
  
      if(attackerIsUnderThreat)
        return true;
  
      southEastSquares((i, j) => {
        if(state.board[i][j].includes(`${opposing_color} queen`) || state.board[i][j].includes(`${opposing_color} bishop`)){
            attackerIsUnderThreat = true;
            return false
        }
        else if(state.board[i][j] === '')
          return true;
        else if(state.board[i][j].includes(`${opposing_color} pawn`) && (i === row - 1 && j === column + 1)){
            attackerIsUnderThreat = true;
            return false
        }
        else
          return false;
  
      }, row, column)
  
      if(attackerIsUnderThreat)
        return true;
  
      knightSquares((square) => {
        if(state.board[square.row]?.[square.column]?.includes(`${opposing_color} knight`)){
          attackerIsUnderThreat = true;;
          return false
        }
        else 
          return true;
      }, row, column)

      if(attackerIsUnderThreat)
        return true;
    else
        return false;

  }