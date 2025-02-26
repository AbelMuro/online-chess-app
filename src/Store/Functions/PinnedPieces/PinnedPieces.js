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
        else if(state.board[i][column].includes(`${opposing_color} king`)){
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
        else if(state.board[i][column].includes(`${opposing_color} king`)){
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
        else if(state.board[row][i].includes(`${opposing_color} king`)){
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

export const CheckForDoublePin = (state, king, color) => {
    const row = king.row;
    const column = king.column;
    const opposing_color = color === 'white' ? 'black' : 'white';
    let squaresBetweenKings = [];
    let bothKingsExist = false;
    let stopSearching = false;

    const findDoublePin = (pieceToBeFoundOne, pieceToBeFoundTwo) => {
      if(bothKingsExist && squaresBetweenKings.length === 2){
        const pieceOne = {row: squaresBetweenKings[0].row, column: squaresBetweenKings[0].column};
        const pieceTwo = {row: squaresBetweenKings[1].row, column: squaresBetweenKings[1].column};

        if((state.board[pieceOne.row][pieceOne.column].includes(`${color} ${pieceToBeFoundOne}`) || state.board[pieceOne.row][pieceOne.column].includes(`${color} ${pieceToBeFoundTwo}`)) &&
           (state.board[pieceTwo.row][pieceTwo.column].includes(`${opposing_color} ${pieceToBeFoundOne}`) || state.board[pieceTwo.row][pieceTwo.column].includes(`${opposing_color} ${pieceToBeFoundTwo}`))){
              const pinnedPieceOne = state.board[pieceOne.row][pieceOne.column];
              const pinnedPieceTwo = state.board[pieceTwo.row][pieceTwo.column];
              state.pinned_pieces.push({piece: pinnedPieceOne, square: {row: pieceOne.row, column: pieceOne.column}, legalPinnedMoves: squaresBetweenKings});
              state.pinned_pieces.push({piece: pinnedPieceTwo, square: {row: pieceTwo.row, column: pieceTwo.column}, legalPinnedMoves: squaresBetweenKings});
           }     
           return true;
        }
        else if(bothKingsExist)
          return true;
        else{
          squaresBetweenKings = [];
          bothKingsExist = false;
          return false;
        }
    }


    //we look for the opposing king
    northSquares((i) => {
        if(state.board[i][column].includes(`${opposing_color} king`)){
          bothKingsExist = true;
          return false;
        } 
        else if(state.board[i][column] === '')
          return true;
        else {
          squaresBetweenKings.push({row: i, column});
          return true;
        }
          
    }, row)

    stopSearching = findDoublePin('queen', 'rook');
    if(stopSearching) return;


    //we look for the opposing king
    southSquares((i) => {
      if(state.board[i][column].includes(`${opposing_color} king`)){
        bothKingsExist = true;
        return false;
      } 
      else if(state.board[i][column] === '')
        return true;
      else {
        squaresBetweenKings.push({row: i, column});
        return true;
      }
          
    }, row)

    stopSearching = findDoublePin('queen', 'rook');
    if(stopSearching) return;


    //we look for the opposing king
    westSquares((i) => {
      if(state.board[i][column].includes(`${opposing_color} king`)){
        bothKingsExist = true;
        return false;
      } 
      else if(state.board[i][column] === '')
        return true;
      else {
        squaresBetweenKings.push({row: i, column});
        return true;
      }
          
    }, row)
  
    stopSearching = findDoublePin('queen', 'rook');
    if(stopSearching) return;


    //we look for the opposing king
    eastSquares((i) => {
      if(state.board[i][column].includes(`${opposing_color} king`)){
        bothKingsExist = true;
        return false;
      } 
      else if(state.board[i][column] === '')
        return true;
      else {
        squaresBetweenKings.push({row: i, column});
        return true;
      }
          
    }, row)
  
    stopSearching = findDoublePin('queen', 'rook');
    if(stopSearching) return;


    //we look for the opposing king
    northWestSquares((i) => {
      if(state.board[i][column].includes(`${opposing_color} king`)){
        bothKingsExist = true;
        return false;
      } 
      else if(state.board[i][column] === '')
        return true;
      else {
        squaresBetweenKings.push({row: i, column});
        return true;
      }
          
    }, row)
  
    stopSearching = findDoublePin('queen', 'bishop');
    if(stopSearching) return;

    //we look for the opposing king
    northEastSquares((i) => {
      if(state.board[i][column].includes(`${opposing_color} king`)){
        bothKingsExist = true;
        return false;
      } 
      else if(state.board[i][column] === '')
        return true;
      else {
        squaresBetweenKings.push({row: i, column});
        return true;
      }
          
    }, row)
  
    stopSearching = findDoublePin('queen', 'bishop');
    if(stopSearching) return;

    //we look for the opposing king
    southWestSquares((i) => {
      if(state.board[i][column].includes(`${opposing_color} king`)){
        bothKingsExist = true;
        return false;
      } 
      else if(state.board[i][column] === '')
        return true;
      else {
        squaresBetweenKings.push({row: i, column});
        return true;
      }
          
    }, row)
  
    stopSearching = findDoublePin('queen', 'bishop');
    if(stopSearching) return;

    //we look for the opposing king
    southEastSquares((i) => {
      if(state.board[i][column].includes(`${opposing_color} king`)){
        bothKingsExist = true;
        return false;
      } 
      else if(state.board[i][column] === '')
        return true;
      else {
        squaresBetweenKings.push({row: i, column});
        return true;
      }
          
    }, row)
  
    stopSearching = findDoublePin('queen', 'bishop');
    if(stopSearching) return;



}