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
        state.checkmate.king_in_check = true;
        return false;
      }
      else if(state.board[i][column].includes(opposing_color) || state.board[i][column].includes(piece_color))
        return false;
      else
        return true;
    }, row)
  
    if(state.checkmate.king_in_check) {
      state.checkmate.squares_between_king_and_attacker = squaresBetweenKingAndAttacker;
      return;
    }
    else squaresBetweenKingAndAttacker = [];
  
    southSquares((i) => {
      squaresBetweenKingAndAttacker.push({row: i, column});
      if(state.board[i][column].includes(`${opposing_color} queen`) || state.board[i][column].includes(`${opposing_color} rook`)){
        state.checkmate.king_in_check = true;
        return false;
      }
      else if(state.board[i][column].includes(opposing_color) || state.board[i][column].includes(piece_color))
        return false;
      else
        return true;
    }, row)
  
    if(state.checkmate.king_in_check) {
      state.checkmate.squares_between_king_and_attacker = squaresBetweenKingAndAttacker;
      return;
    }
    else squaresBetweenKingAndAttacker = [];
  
    westSquares((i) => {
      squaresBetweenKingAndAttacker.push({row, column: i});
      if(state.board[row][i].includes(`${opposing_color} queen`) || state.board[row][i].includes(`${opposing_color} rook`)){
        state.checkmate.king_in_check = true;
        return false;
      }
      else if(state.board[row][i].includes(opposing_color) || state.board[row][i].includes(piece_color))
        return false;
      else
        return true;
    }, column)
  
    if(state.checkmate.king_in_check) {
      state.checkmate.squares_between_king_and_attacker = squaresBetweenKingAndAttacker;
      return;
    }
    else squaresBetweenKingAndAttacker = [];
  
    eastSquares((i) => {
      squaresBetweenKingAndAttacker.push({row, column: i});
      if(state.board[row][i].includes(`${opposing_color} queen`) || state.board[row][i].includes(`${opposing_color} rook`)){
        state.checkmate.king_in_check = true;
        return false;
      }
      else if(state.board[row][i].includes(opposing_color) || state.board[row][i].includes(piece_color))
        return false;
      else
        return true;
    }, column)
  
    if(state.checkmate.king_in_check) {
      state.checkmate.squares_between_king_and_attacker = squaresBetweenKingAndAttacker;
      return;
    }
    else squaresBetweenKingAndAttacker = [];
  
    northWestSquares((i, j) => {
      squaresBetweenKingAndAttacker.push({row: i, column: j});
      if(state.board[i][j].includes(`${opposing_color} queen`) || state.board[i][j].includes(`${opposing_color} bishop`)){
        state.checkmate.king_in_check = true;
        return false;
      }
  
      else if(state.board[i][j].includes(`${opposing_color} pawn`) && (i === row - 1 && j === column - 1)){
        state.checkmate.king_in_check = true;
        return false;
      }
      else if(state.board[i][j].includes(opposing_color) || state.board[i][j].includes(piece_color))
        return false;
      else
        return true;
    }, row, column)
  
    if(state.checkmate.king_in_check) {
      state.checkmate.squares_between_king_and_attacker = squaresBetweenKingAndAttacker;
      return;
    }
    else squaresBetweenKingAndAttacker = [];
  
    northEastSquares((i, j) => {
      squaresBetweenKingAndAttacker.push({row: i, column: j});
      if(state.board[i][j].includes(`${opposing_color} queen`) || state.board[i][j].includes(`${opposing_color} bishop`)){
        state.checkmate.king_in_check = true;
        return false;
      }
      else if(state.board[i][j].includes(`${opposing_color} pawn`) && (i === row - 1 && j === column + 1)){
        state.checkmate.king_in_check = true;
        return false;
      }
      else if(state.board[i][j].includes(opposing_color) || state.board[i][j].includes(piece_color))
        return false;
      else
        return true;
    }, row, column)
  
    if(state.checkmate.king_in_check) {
      state.checkmate.squares_between_king_and_attacker = squaresBetweenKingAndAttacker;
      return;
    }
    else squaresBetweenKingAndAttacker = [];
  
    southWestSquares((i, j) => {
      squaresBetweenKingAndAttacker.push({row: i, column: j});
      if(state.board[i][j].includes(`${opposing_color} queen`) || state.board[i][j].includes(`${opposing_color} bishop`)){
        state.checkmate.king_in_check = true;
        return false;
      }
      else if(state.board[i][j].includes(`${opposing_color} pawn`) && (i === row + 1 && j === column - 1)){
        state.checkmate.king_in_check = true;
        return false;
      }
      else if(state.board[i][j].includes(opposing_color) || state.board[i][j].includes(piece_color))
        return false;
      else
        return true;
    }, row, column)
  
    if(state.checkmate.king_in_check) {
      state.checkmate.squares_between_king_and_attacker = squaresBetweenKingAndAttacker;
      return;
    }
    else squaresBetweenKingAndAttacker = [];
  
    southEastSquares((i, j) => {
      squaresBetweenKingAndAttacker.push({row: i, column: j});
      if(state.board[i][j].includes(`${opposing_color} queen`) || state.board[i][j].includes(`${opposing_color} bishop`)){
        state.checkmate.king_in_check = true;
        return false;
      }
      else if(state.board[i][j].includes(`${opposing_color} pawn`) && (i === row + 1 && j === column + 1)){
        state.checkmate.king_in_check = true;
        return false;
      }
      else if(state.board[i][j].includes(opposing_color) || state.board[i][j].includes(piece_color))
        return false;
      else
        return true;
    }, row, column)
    if(state.checkmate.king_in_check) {
      state.checkmate.squares_between_king_and_attacker = squaresBetweenKingAndAttacker;
      return;
    }
    else
      squaresBetweenKingAndAttacker = [];
  
    knightSquares((squares) => {
      if(state.board[squares.row]?.[squares.column]?.includes(`${opposing_color} knight`)){
        state.checkmate.king_in_check = true;
        squaresBetweenKingAndAttacker.push({row: squares.row, column: squares.column})
        return false;
      }
      else
        return true;
      }, row, column)
  
    if(state.checkmate.king_in_check) {
      state.checkmate.squares_between_king_and_attacker = squaresBetweenKingAndAttacker;
      return;
    }
  }
  
  export const checkSquaresForBlocks = (state, square, piece_color) => {
     const row = square.row;        //the row of the square between the attacker and the king
     const column = square.column;  //the column of the square between the attacker and the king
     let isBlockableOrTakable = false;
     const pinnedPieces = state.pinned_pieces;
  
      northSquares((i) => {
        if(pinnedPieces.some(piece => piece.square.row === i && piece.square.column === column))
            return false;

        if(state.board[i][column].includes(`${piece_color} queen`) || state.board[i][column].includes(`${piece_color} rook`)){
          isBlockableOrTakable = true;
          return false
        }
        else if(piece_color === 'black' && state.board[i][column].includes(`black pawn`) && (i === row - 1 || (i === row - 2 && i === 1))){
          isBlockableOrTakable = true;
          return false;
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
        else if(piece_color === 'white' && state.board[i][column].includes(`white pawn`) && (i === row + 1 || (i === row + 2 && i === 6))){
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
  
  export const checkSquaresForThreats = (state, attacker, opposing_color) => {
      const row = attacker.row;
      const column = attacker.column;
      const pieceAttacker = state.board[row][column];
      let squareIsUnderThreat = false;
  
      northSquares((i) => {
        if(state.board[i][column].includes(`${opposing_color} queen`) || state.board[i][column].includes(`${opposing_color} rook`)){
            squareIsUnderThreat = true;
          return false
        }
        else if(state.board[i][column] === '')
          return true;
        else
          return false;
  
      }, row)
  
      if(squareIsUnderThreat)
          return true;
  
      southSquares((i) => {
        if(state.board[i][column].includes(`${opposing_color} queen`) || state.board[i][column].includes(`${opposing_color} rook`)){
            squareIsUnderThreat = true;
          return false
        }
        else if(state.board[i][column] === '')
          return true;
        else
          return false;
  
      }, row)
  
      if(squareIsUnderThreat)
        return true;
  
  
      westSquares((i) => {
        if(state.board[row][i].includes(`${opposing_color} queen`) || state.board[row][i].includes(`${opposing_color} rook`)){
            squareIsUnderThreat = true;
          return false
        }
        else if(state.board[row][i] === '')
          return true;
        else
          return false;
  
      }, column)
  
      if(squareIsUnderThreat)
        return true;
  
  
      eastSquares((i) => {
        if(state.board[row][i].includes(`${opposing_color} queen`) || state.board[row][i].includes(`${opposing_color} rook`)){
            squareIsUnderThreat = true;
          return false
        }
        else if(state.board[row][i] === '')
          return true;
        else
          return false;
  
      }, column)
  
      if(squareIsUnderThreat)
        return true;
  
      northWestSquares((i, j) => {
        if(state.board[i][j].includes(`${opposing_color} queen`) || state.board[i][j].includes(`${opposing_color} bishop`)){
            squareIsUnderThreat = true;
            return false
        }
        else if(state.board[i][j] === '')
          return true;
        else if(pieceAttacker.includes('white') && state.board[i][j].includes(`${opposing_color} pawn`) && (i === row - 1 && j === column - 1)){
            squareIsUnderThreat = true;
            return false
        }
        else
          return false;
      }, row, column)
  
      if(squareIsUnderThreat)
        return true;
  
      northEastSquares((i, j) => {
        if(state.board[i][j].includes(`${opposing_color} queen`) || state.board[i][j].includes(`${opposing_color} bishop`)){
            squareIsUnderThreat = true;
            return false
        }
        else if(state.board[i][j] === '')
          return true;
        else if(pieceAttacker.includes('white') && state.board[i][j].includes(`${opposing_color} pawn`) && (i === row - 1 && j === column + 1)){
            squareIsUnderThreat = true;
            return false
        }
        else
          return false;
      }, row, column)
  
      if(squareIsUnderThreat)
        return true;
  
      southWestSquares((i, j) => {
        if(state.board[i][j].includes(`${opposing_color} queen`) || state.board[i][j].includes(`${opposing_color} bishop`)){
            squareIsUnderThreat = true;
            return false
        }
        else if(state.board[i][j] === '')
          return true;
        else if(pieceAttacker.includes('black') && state.board[i][j].includes(`${opposing_color} pawn`) && (i === row + 1 && j === column - 1)){
            squareIsUnderThreat = true;
            return false
        }
        else
          return false;
  
      }, row, column)
  
      if(squareIsUnderThreat)
        return true;
  
      southEastSquares((i, j) => {
        if(state.board[i][j].includes(`${opposing_color} queen`) || state.board[i][j].includes(`${opposing_color} bishop`)){
            squareIsUnderThreat = true;
            return false
        }
        else if(state.board[i][j] === '')
          return true;
        else if(pieceAttacker.includes('black') && state.board[i][j].includes(`${opposing_color} pawn`) && (i === row + 1 && j === column + 1)){
            squareIsUnderThreat = true;
            return false
        }
        else
          return false;
  
      }, row, column)
  
      if(squareIsUnderThreat)
        return true;
  
      knightSquares((square) => {
        if(state.board[square.row]?.[square.column]?.includes(`${opposing_color} knight`)){
          squareIsUnderThreat = true;;
          return false
        }
        else 
          return true;
      }, row, column)

      if(squareIsUnderThreat)
        return true;
    else
        return false;

  }