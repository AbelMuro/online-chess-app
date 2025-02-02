import { northSquares, southSquares, 
    westSquares, eastSquares, 
    northWestSquares,northEastSquares, 
    southEastSquares, southWestSquares, 
    knightSquares} from '../../Functions/TraversalFunctions';


export const createLegalSquaresWhileInCheck = (state, blueSquares, redSquares) => {
  const squaresBetweenKingAndAttacker = state.squares_between_king_and_attacker;
  const highlightedSquares = state.highlighted_squares;

  for(let i = 0; i < blueSquares.length; i++){
    for(let j = 0; j < squaresBetweenKingAndAttacker.length; j++){
      const row = squaresBetweenKingAndAttacker[j].row;
      const column = squaresBetweenKingAndAttacker[j].column;

      if(blueSquares[i].row === row && blueSquares[i].column === column)
        highlightedSquares[row][column] = 'blue'
    }
  }  
  
  for(let i = 0; i < redSquares.length; i++){
    for(let j = 0; j < squaresBetweenKingAndAttacker.length; j++){
      const row = squaresBetweenKingAndAttacker[j].row;
      const column = squaresBetweenKingAndAttacker[j].column;

      if(redSquares[i].row === row && redSquares[i].column === column)
        highlightedSquares[row][column] = 'red'
    }
  }
}

export const createLegalSquaresForKing = (state, row, column, color) => {
  const piece_color = color;
  const opposing_color = piece_color === 'white' ? 'black' : 'white';

  const legalSquares = [ 
    {row: row + 1, column}, 
    {row: row - 1, column}, 
    {row, column: column - 1}, 
    {row, column: column + 1},
    {row: row + 1, column: column - 1},
    {row: row + 1, column: column + 1},
    {row: row - 1, column: column - 1},
    {row: row - 1, column: column + 1}
  ];

  return legalSquares.filter((square) => {
    if(!state.board[square.row]) return false;
    if(state.board[square.row][square.column] === undefined) return false;
    if(state.board[square.row][square.column].includes(piece_color)) return false;

    let isIllegal = false;

    northSquares((i) => {
      if(state.board[i][square.column].includes(piece_color) && !state.board[i][square.column].includes(`${piece_color} king`))
        return false
      else if(state.board[i][square.column].includes(`${opposing_color} rook`) || state.board[i][square.column].includes(`${opposing_color} queen`)){
        isIllegal = true;
        return false;
      }
      else if(state.board[i][square.column].includes(`${opposing_color} king`) && (i === square.row + 1)){
        isIllegal = true;
        return false;
      }
      else if(state.board[i][square.column].includes(opposing_color)){
        return false;
      }
      else
        return true;    
    }, square.row)

    if(isIllegal)
        return false;

    southSquares((i) => {
      if(state.board[i][square.column].includes(piece_color) && !state.board[i][square.column].includes(`${piece_color} king`))
        return false
      else if(state.board[i][square.column].includes(`${opposing_color} rook`) || state.board[i][square.column].includes(`${opposing_color} queen`)){
        isIllegal = true;
        return false;
      }
      else if(state.board[i][square.column].includes(`${opposing_color} king`) && (i === square.row - 1)){
        isIllegal = true;
        return false;
      }
      else if(state.board[i][square.column].includes(opposing_color)){
        return false;
      }
      else
        return true;    
    }, square.row)

    if(isIllegal)
        return false;


    westSquares((i) => {
      if(state.board[square.row][i].includes(piece_color) && !state.board[square.row][i].includes(`${piece_color} king`))
        return false
      else if(state.board[square.row][i].includes(`${opposing_color} rook`) || state.board[square.row][i].includes(`${opposing_color} queen`)){
        isIllegal = true;
        return false;
      }
      else if(state.board[square.row][i].includes(`${opposing_color} king`) && (i === square.column - 1)){
        isIllegal = true;
        return false;
      }
      else if(state.board[square.row][i].includes(opposing_color)){
        return false;
      }
      else
        return true;    
    }, square.column)

    if(isIllegal)
        return false;


    eastSquares((i) => {
      if(state.board[square.row][i].includes(piece_color) && !state.board[square.row][i].includes(`${piece_color} king`))
        return false
      else if(state.board[square.row][i].includes(`${opposing_color} rook`) || state.board[square.row][i].includes(`${opposing_color} queen`)){
        isIllegal = true;
        return false;
      }
      else if(state.board[square.row][i].includes(`${opposing_color} king`) && (i === square.column + 1)){
        isIllegal = true;
        return false;
      }
      else if(state.board[square.row][i].includes(opposing_color)){
        return false;
      }
      else
        return true;    
    }, square.column)

    if(isIllegal)
        return false;

    northWestSquares((i, j) => {
      if(state.board[i][j].includes(piece_color) && !state.board[i][j].includes(`${piece_color} king`))
        return false
      else if(state.board[i][j].includes(`${opposing_color} pawn`) && (i === square.row + 1 && j === square.column - 1)){
        isIllegal = true;
        return false;
      }
      else if(state.board[i][j].includes(`${opposing_color} king`) && (i === square.row + 1 && j === square.column - 1)){
        isIllegal = true;
        return false;
      }
      else if(state.board[i][j].includes(`${opposing_color} bishop`) || state.board[i][j].includes(`${opposing_color} queen`)){
        isIllegal = true;
        return false;
      }
      else if(state.board[i][j].includes(opposing_color))
        return false;
      else
        return true;    
    }, square.row, square.column)

    if(isIllegal)
        return false;

    northEastSquares((i, j) => {
      if(state.board[i][j].includes(piece_color) && !state.board[i][j].includes(`${piece_color} king`))
        return false
      else if(state.board[i][j].includes(`${opposing_color} pawn`) && (i === square.row + 1 && j === square.column + 1)){
        isIllegal = true;
        return false;
      }
      else if(state.board[i][j].includes(`${opposing_color} king`) && (i === square.row + 1 && j === square.column + 1)){
        isIllegal = true;
        return false;
      }
      else if(state.board[i][j].includes(`${opposing_color} bishop`) || state.board[i][j].includes(`${opposing_color} queen`)){
        isIllegal = true;
        return false;
      }
      else if(state.board[i][j].includes(opposing_color)){
        return false;
      }
      else
        return true;    
    }, square.row, square.column)

    if(isIllegal)
        return false;


    southWestSquares((i, j) => {
      if(state.board[i][j].includes(piece_color) && !state.board[i][j].includes(`${piece_color} king`))
        return false
      else if(state.board[i][j].includes(`${opposing_color} pawn`) && (i === square.row - 1 && j === square.column - 1)){
        isIllegal = true;
        return false;
      }
      else if(state.board[i][j].includes(`${opposing_color} king`) && (i === square.row - 1 && j === square.column - 1)){
        isIllegal = true;
        return false;
      }
      else if(state.board[i][j].includes(`${opposing_color} bishop`) || state.board[i][j].includes(`${opposing_color} queen`)){
        isIllegal = true;
        return false;
      }
      else if(state.board[i][j].includes(opposing_color)){
        return false;
      }
      else
        return true;    
    }, square.row, square.column)

    if(isIllegal)
        return false;

    southEastSquares((i, j) => {
      if(state.board[i][j].includes(piece_color) && !state.board[i][j].includes(`${piece_color} king`))
        return false
      else if(state.board[i][j].includes(`${opposing_color} pawn`) && (i === square.row - 1 && j === square.column + 1)){
        isIllegal = true;
        return false;
      }
      else if(state.board[i][j].includes(`${opposing_color} king`) && (i === square.row - 1 && j === square.column + 1)){
        isIllegal = true;
        return false;
      }
      else if(state.board[i][j].includes(`${opposing_color} bishop`) || state.board[i][j].includes(`${opposing_color} queen`)){
        isIllegal = true;
        return false;
      }
      else if(state.board[i][j].includes(opposing_color)){
        return false;
      }
      else
        return true;    
    }, square.row, square.column)

    if(isIllegal)
        return false;

    knightSquares((squares) => {
      if(state.board[squares.row]?.[squares.column] === `${opposing_color} knight`){
        isIllegal = true;
        return false;
      }
      else
        return true;
      }, square.row, square.column)

      if(isIllegal)
        return false;
      else
       return true;
  })
}