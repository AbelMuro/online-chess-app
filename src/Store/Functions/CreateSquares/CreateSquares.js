import { northSquares, southSquares, 
    westSquares, eastSquares, 
    northWestSquares,northEastSquares, 
    southEastSquares, southWestSquares, 
    knightSquares} from '../../Functions/TraversalFunctions';
import { checkSquaresForThreats } from '../CheckSquares';


export const createSquaresForCastleling = (state, row, column, color, legalSquares) => {
    if(state[`has_king_been_moved`] || state[`${color}_king_in_check`]) return;
    const opposing_color = color === 'white' ? 'black' : 'white';

    if((state.board[row]?.[column + 1] === '' && !checkSquaresForThreats(state, {row, column: column + 1}, opposing_color)) && 
      (state.board[row]?.[column + 2] === '' && !checkSquaresForThreats(state, {row, column: column + 2}, opposing_color)) &&
      state.board[row]?.[column + 3].includes(`${color} rook`) && 
      !state[`has_rooks_been_moved`][1]){
          legalSquares.push({row, column: column + 2})
    }
        
    if((state.board[row]?.[column - 1] === '' && !checkSquaresForThreats(state, {row, column: column - 1}, opposing_color)) &&
      (state.board[row]?.[column - 2] === '' && !checkSquaresForThreats(state, {row, column: column - 2}, opposing_color)) && 
      (state.board[row]?.[column - 3] === '' && !checkSquaresForThreats(state, {row, column: column - 3}, opposing_color)) &&
      state.board[row]?.[column - 4].includes(`${color} rook`) &&
      !state[`has_rooks_been_moved`][0]){
          legalSquares.push({row, column: column - 2})
      }
      
}

export const createLegalSquaresWhileInCheck = (state, legalSquares) => {
  const squaresBetweenKingAndAttacker = state.squares_between_king_and_attacker;

  for(let i = 0; i < legalSquares.length; i++){
    for(let j = 0; j < squaresBetweenKingAndAttacker.length; j++){
      const row = squaresBetweenKingAndAttacker[j].row;
      const column = squaresBetweenKingAndAttacker[j].column;

      if(legalSquares[i].row === row && legalSquares[i].column === column)
        state.legal_squares[row][column] = true
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

    southSquares((i) => {
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
      else if(piece_color === 'white' && state.board[i][j].includes(`black pawn`) && (i === square.row - 1 && j === square.column - 1)){
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
      else if(piece_color === 'white' && state.board[i][j].includes(`black pawn`) && (i === square.row - 1 && j === square.column + 1)){
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


    southWestSquares((i, j) => {
      if(state.board[i][j].includes(piece_color) && !state.board[i][j].includes(`${piece_color} king`))
        return false
      else if(piece_color === 'black' && state.board[i][j].includes(`white pawn`) && (i === square.row + 1 && j === square.column - 1)){
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
      else if(piece_color === 'black' && state.board[i][j].includes(`white pawn`) && (i === square.row + 1 && j === square.column + 1)){
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

    knightSquares((squares) => {
      if(state.board[squares.row]?.[squares.column]?.includes(`${opposing_color} knight`)){
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