import { northSquares, southSquares, 
    westSquares, eastSquares, 
    northWestSquares,northEastSquares, 
    southEastSquares, southWestSquares} from '../../Functions/TraversalFunctions';



export const findLegalMovesForPinnedPiece = (state, legalMoves, blueSquares, redSquares) => {
  const highlightedSquares = state.highlighted_squares;

  for(let i = 0; i < blueSquares.length; i++){
    for(let j = 0; j < legalMoves.length; j++){
      const row = legalMoves[j].row;
      const column = legalMoves[j].column;

      if(blueSquares[i].row === row && blueSquares[i].column === column)
        highlightedSquares[row][column] = 'blue'
    }
  }  
  for(let i = 0; i < redSquares.length; i++){
    for(let j = 0; j < legalMoves.length; j++){
      const row = legalMoves[j].row;
      const column = legalMoves[j].column;

      if(redSquares[i].row === row && redSquares[i].column === column)
        highlightedSquares[row][column] = 'red'
    }
  }
}


export const findPinnedPieces = (state, attacker, color) => {
    const row = attacker.row;
    const column = attacker.column;
    const piece = state.board[row][column];
    let kingExists = false;
    let squaresBetweenKingAndAttacker = [];
    let legalPinnedMoves = [];
    const opposing_color = color === 'white' ? 'black' : 'white';

    if(piece.includes('queen') || piece.includes('rook'))
      northSquares((i) => {
        if(state.board[i][column].includes(color))
          return false;
        else if(state.board[i][column] === ''){
          legalPinnedMoves.push({row: i, column});  
          return true;
        }
        else if(state.board[i][column] === `${opposing_color} king`){
            kingExists = true;
            return false;
        }
        else if(state.board[i][column].includes(opposing_color)){
            squaresBetweenKingAndAttacker.push({row: i, column})
            return true;
        }
        else
          return false;
      }, row)

    if(kingExists && squaresBetweenKingAndAttacker.length === 1){
      legalPinnedMoves.unshift({row, column})
      state.pinned_pieces.push({piece, square: squaresBetweenKingAndAttacker[0], legalPinnedMoves});
      return;
    }  
    else{
        squaresBetweenKingAndAttacker = [];
        legalPinnedMoves = [];      
    }

    if(piece.includes('queen') || piece.includes('rook'))
      southSquares((i) => {
        if(state.board[i][column].includes(color))
          return false;
        else if(state.board[i][column] === ''){
          legalPinnedMoves.push({row: i, column});  
          return true;
        }
        else if(state.board[i][column] === `${opposing_color} king`){
            kingExists = true;
            return false;
        }
        else if(state.board[i][column].includes(opposing_color)){
            squaresBetweenKingAndAttacker.push({row: i, column})
            return true;
        }
        else
          return false;
      }, row)

    if(kingExists && squaresBetweenKingAndAttacker.length === 1){
      legalPinnedMoves.unshift({row, column})
      state.pinned_pieces.push({piece, square: squaresBetweenKingAndAttacker[0], legalPinnedMoves});
      return;
    }  
    else{
        squaresBetweenKingAndAttacker = [];
        legalPinnedMoves = [];      
    }

    if(piece.includes('queen') || piece.includes('rook'))
      westSquares((i) => {
        if(state.board[row][i].includes(color))
          return false;
        else if(state.board[row][i] === ''){
          legalPinnedMoves.push({row: i, column});  
          return true;
        }
        else if(state.board[row][i] === `${opposing_color} king`){
            kingExists = true;
            return false;
        }
        else if(state.board[row][i].includes(opposing_color)){
            squaresBetweenKingAndAttacker.push({row: i, column})
            return true;
        }
        else
          return false;
      }, column)

    if(kingExists && squaresBetweenKingAndAttacker.length === 1){
      legalPinnedMoves.unshift({row, column})
      state.pinned_pieces.push({piece, square: squaresBetweenKingAndAttacker[0], legalPinnedMoves});
      return;
    }  
    else{
        squaresBetweenKingAndAttacker = [];
        legalPinnedMoves = [];      
    }

    if(piece.includes('queen') || piece.includes('rook'))
      eastSquares((i) => {
        if(state.board[row][i].includes(color))
          return false;
        else if(state.board[row][i] === ''){
          legalPinnedMoves.push({row: i, column});  
          return true;
        }
        else if(state.board[row][i]?.includes(`${opposing_color} king`)){
            kingExists = true;
            return false;
        }
        else if(state.board[row][i].includes(opposing_color)){
            squaresBetweenKingAndAttacker.push({row: i, column})
            return true;
        }
        else
          return false;
      }, column)

    if(kingExists && squaresBetweenKingAndAttacker.length === 1){
      legalPinnedMoves.unshift({row, column})
      state.pinned_pieces.push({piece, square: squaresBetweenKingAndAttacker[0], legalPinnedMoves});
      return;
    }  
    else{
        squaresBetweenKingAndAttacker = [];
        legalPinnedMoves = [];      
    }

    if(piece.includes('queen') || piece.includes('bishop'))
      northWestSquares((i, j) => {
        if(state.board[i][j].includes(color))
          return false;
        else if(state.board[i][j] === ''){
          legalPinnedMoves.push({row: i, column: j});   
          return true;
        }
        else if(state.board[i][j]?.includes(`${opposing_color} king`)){
            kingExists = true;
            return false;
        }
        else if(state.board[i][j].includes(opposing_color)){
            squaresBetweenKingAndAttacker.push({row: i, column: j})
            return true
        }
        else
          return false; 
      }, row, column)

    if(kingExists && squaresBetweenKingAndAttacker.length === 1){
      legalPinnedMoves.unshift({row, column})
      state.pinned_pieces.push({piece, square: squaresBetweenKingAndAttacker[0], legalPinnedMoves});
      return;
    }  
    else{
        squaresBetweenKingAndAttacker = [];
        legalPinnedMoves = [];      
    }

    if(piece.includes('queen') || piece.includes('bishop'))
      northEastSquares((i, j) => {
        if(state.board[i][j].includes(color))
          return false;
        else if(state.board[i][j] === ''){
          legalPinnedMoves.push({row: i, column: j});   
          return true;
        }
        else if(state.board[i][j]?.includes(`${opposing_color} king`)){
            kingExists = true;
            return false;
        }
        else if(state.board[i][j].includes(opposing_color)){
            squaresBetweenKingAndAttacker.push({row: i, column: j})
            return true
        }
        else
          return false; 
      }, row, column)

    if(kingExists && squaresBetweenKingAndAttacker.length === 1){
      legalPinnedMoves.unshift({row, column})
      state.pinned_pieces.push({piece, square: squaresBetweenKingAndAttacker[0], legalPinnedMoves});
      return;
    }  
    else{
        squaresBetweenKingAndAttacker = [];
        legalPinnedMoves = [];      
    }

    if(piece.includes('queen') || piece.includes('bishop'))
      southWestSquares((i, j) => {
        if(state.board[i][j].includes(color))
          return false;
        else if(state.board[i][j] === ''){
          legalPinnedMoves.push({row: i, column: j});   
          return true;
        }
        else if(state.board[i][j]?.includes(`${opposing_color} king`)){
            kingExists = true;
            return false;
        }
        else if(state.board[i][j].includes(opposing_color)){
            squaresBetweenKingAndAttacker.push({row: i, column: j})
            return true
        }
        else
          return false; 
      }, row, column)

    if(kingExists && squaresBetweenKingAndAttacker.length === 1){
      legalPinnedMoves.unshift({row, column})
      state.pinned_pieces.push({piece, square: squaresBetweenKingAndAttacker[0], legalPinnedMoves});
      return;
    }  
    else{
        squaresBetweenKingAndAttacker = [];
        legalPinnedMoves = [];      
    }

    if(piece.includes('queen') || piece.includes('bishop'))
      southEastSquares((i, j) => {
        if(state.board[i][j].includes(color))
          return false;
        else if(state.board[i][j] === ''){
          legalPinnedMoves.push({row: i, column: j});   
          return true;
        }
        else if(state.board[i][j]?.includes(`${opposing_color} king`)){
            kingExists = true;
            return false;
        }
        else if(state.board[i][j].includes(opposing_color)){
            squaresBetweenKingAndAttacker.push({row: i, column: j})
            return true
        }
        else
          return false; 
      }, row, column)

    if(kingExists && squaresBetweenKingAndAttacker.length === 1){
      legalPinnedMoves.unshift({row, column})
      state.pinned_pieces.push({piece, square: squaresBetweenKingAndAttacker[0], legalPinnedMoves});
      return;
    }  
    else{
        squaresBetweenKingAndAttacker = [];
        legalPinnedMoves = [];      
    }
    
  }



export const UnpinPieces = (state, newRow, newColumn) => {
    if(state.pinned_pieces.length){
        state.pinned_pieces = state.pinned_pieces.filter((piece) => {
            return piece.legalPinnedMoves.some((square) => {
                const row = square.row;
                const column = square.column;

                return row === newRow && column === newColumn;
            })
        })
      }
}

//this is where i left off, i will need to create a specific function that will pin two pieces at the same time
export const CheckForDoublePin = (state, king, color) => {
    const row = king.row;
    const column = king.column;
    const opposing_color = color === 'white' ? 'black' : 'white';
    const squaresBetweenKings = [];

    northSquares((i) => {
        if(state.board[i][column].includes(`${opposing_color} king`)){
          squaresBetweenKings.push({row: i, column});
          return false;
        } 
        else {
          squaresBetweenKings.push({row: i, column});
          return true;
        }
          
    }, row)

    squaresBetweenKings.forEach((square) => {
      const row = square.row;
      const column = square.column;

        
    });
}