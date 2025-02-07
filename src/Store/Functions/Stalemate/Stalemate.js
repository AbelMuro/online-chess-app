import { northSquares, southSquares, 
    westSquares, eastSquares, 
    northWestSquares,northEastSquares, 
    southEastSquares, southWestSquares, 
    knightSquares} from '../../Functions/TraversalFunctions';


//this is where i left off, i will need to check if any pawns are available to move, as well as the king
export function legalMovesExist(state, piece, color, square) {
     const row = square.row;
     const column = square.column;
     const opposing_color = color === 'white' ? 'black' : 'white';
     let legalMoves = false;

     if(piece.includes('rook') || piece.includes('queen'))
        northSquares((i) => {
            if(state.board[i][column] === ''){
                legalMoves = true;
                return false
            }
            else if(state.board[i][column].includes(`${opposing_color}`)){
                legalMoves = true;
                return false;
            }
            else
                return false;

        }, row)

    if(legalMoves)
        return true;
    
    if(piece.includes('rook') || piece.includes('queen'))
        southSquares((i) => {
            if(state.board[i][column] === ''){
                legalMoves = true;
                return false
            }
            else if(state.board[i][column].includes(`${opposing_color}`)){
                legalMoves = true;
                return false;
            }
            else
                return false;
        }, row)
    
    if(legalMoves)
        return true;
    
    if(piece.includes('rook') || piece.includes('queen'))
        westSquares((i) => {
            if(state.board[row][i] === ''){
                legalMoves = true;
                return false
            }
            else if(state.board[row][i].includes(`${opposing_color}`)){
                legalMoves = true;
                return false;
            }
            else
                return false;
        }, column)
    
    if(legalMoves)
        return true;


    if(piece.includes('rook') || piece.includes('queen'))
      eastSquares((i) => {
        if(state.board[row][i] === ''){
            legalMoves = true;
            return false
        }
        else if(state.board[row][i].includes(`${opposing_color}`)){
            legalMoves = true;
            return false;
        }
        else
            return false;
      }, column)
    
      if(legalMoves)
        return true;

    if(piece.includes('bishop') || piece.includes('queen'))
      northWestSquares((i, j) => {
        if(state.board[i][j] === ''){
            legalMoves = true;
            return false
        }
        else if(state.board[i][j].includes(`${opposing_color}`)){
            legalMoves = true;
            return false;
        }
        else
            return false;
      }, row, column)
    
      if(legalMoves)
        return true;

    if(piece.includes('bishop') || piece.includes('queen'))
        northEastSquares((i, j) => {
            if(state.board[i][j] === ''){
                legalMoves = true;
                return false
            }
            else if(state.board[i][j].includes(`${opposing_color}`)){
                legalMoves = true;
                return false;
            }
            else
                return false;
        }, row, column)
    
        if(legalMoves)
            return true;

        
    if(piece.includes('bishop') || piece.includes('queen'))
        southWestSquares((i, j) => {
            if(state.board[i][j] === ''){
                legalMoves = true;
                return false
            }
            else if(state.board[i][j].includes(`${opposing_color}`)){
                legalMoves = true;
                return false;
            }
            else
                return false;
        }, row, column)
    
        if(legalMoves)
            return true;
    
      southEastSquares((i, j) => {
        if(state.board[i][j] === ''){
            legalMoves = true;
            return false
        }
        else if(state.board[i][j].includes(`${opposing_color}`)){
            legalMoves = true;
            return false;
        }
        else
            return false;
      }, row, column)

      if(legalMoves)
        return true;
    
      knightSquares((squares) => {
        if(squares[squares.row]?.[squares.column] === ''){
            legalMoves = true;
            return false
        }
        else if(squares[square.row]?.[square.column].includes(`${opposing_color}`)){
            legalMoves = true;
            return false;
        }
        else
            return false;
        }, row, column)
    
        if(legalMoves)
            return true;
        else
            return false;

}