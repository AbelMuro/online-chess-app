import { northSquares, southSquares, 
    westSquares, eastSquares, 
    northWestSquares,northEastSquares, 
    southEastSquares, southWestSquares, 
    knightSquares, pawnSquares} from '../../Functions/TraversalFunctions';

export function legalMovesExist(state, piece, color, square) {
     const row = square.row;
     const column = square.column;
     const opposing_color = color === 'white' ? 'black' : 'white';
     let legalMoves = false;
     
    if(piece.includes('pawn')){
        const twoSquareMoveAvailable = color === 'white' ? row === 1 : row === 6;
        const [legalSquares] = pawnSquares(state, row, column, color, twoSquareMoveAvailable);
        return legalSquares.length !== 0;
    }

    if(piece.includes('knight'))
        knightSquares((squares) => {
            if(state.board[squares.row]?.[squares.column] === ''){
                legalMoves = true;
                return false
            }
            else if(state.board[square.row]?.[square.column].includes(`${opposing_color}`)){
                legalMoves = true;
                return false;
            }
            else
                return true;
            }, row, column)
    
    if(legalMoves)
        return true;
        

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
    
        if(piece.includes('bishop') || piece.includes('queen'))
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
      else 
        return false;
}