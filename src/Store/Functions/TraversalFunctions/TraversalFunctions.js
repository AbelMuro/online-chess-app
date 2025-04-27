export const northSquares = (callback, row) => {
    for(let i = row - 1; i >= 0; i--){
        const continueIteration = callback(i);

        if(!continueIteration) break;
    }
}

export const southSquares = (callback, row) => {
    for(let i = row + 1; i <= 7; i++){
        const continueIteration = callback(i);

        if(!continueIteration){
            break;
        };
    }
}

export const westSquares = (callback, column) => {
    for(let i = column - 1; i >= 0; i--){
        const continueIteration = callback(i);

        if(!continueIteration) break;
    }
}

export const eastSquares = (callback, column) => {
    for(let i = column + 1; i <= 7; i++){
        const continueIteration = callback(i);

        if(!continueIteration) break;
    }
}

export const northWestSquares = (callback, row, column) => {
    for(let i = row - 1, j = column - 1; i >= 0 && j >= 0; i--, j--){
        const continueIteration = callback(i, j);

        if(!continueIteration) break;
    }
}

export const northEastSquares = (callback, row, column) => {
    for(let i = row - 1, j = column + 1; i >= 0 && j <= 7; i--, j++){
        const continueIteration = callback(i, j);

        if(!continueIteration) break;
    }
}



export const southWestSquares = (callback, row, column) => {
    for(let i = row + 1, j = column - 1; i <= 7 && j >= 0; i++, j--){
        const continueIteration = callback(i, j);

        if(!continueIteration) break;
    }
}



export const southEastSquares = (callback, row, column) => {
    for(let i = row + 1, j = column + 1; i <= 7 && j <= 7; i++, j++){
        const continueIteration = callback(i, j);

        if(!continueIteration) break;
    }
}



export const knightSquares = (callback, row, column) => {
    const legalSquares = [
        {row: row + 2, column: column - 1}, 
        {row: row + 2, column: column + 1},
        {row: row - 1, column: column + 2}, 
        {row: row + 1, column: column + 2},
        {row: row - 2, column: column + 1},
        {row: row - 2, column: column - 1},
        {row: row + 1, column: column - 2},
        {row: row - 1, column: column - 2}
      ];
    
    for(let i = 0; i < legalSquares.length; i++){
        const continueIteration = callback(legalSquares[i]);

        if(!continueIteration) break;
    }
}

export const pawnSquares = (state, row, column, piece_color, twoSquareMoveAvailable) => {
    const oneSquareMove = piece_color === 'white' ? {row: row - 1, column} : {row: row + 1, column};
    const twoSquareMove = piece_color === 'white' ? {row: row - 2, column, enPassant: 'enable enpassant'} : {row: row + 2, column, enPassant: 'enable enpassant'};
    const leftCornerTake = piece_color === 'white' ? {row: row - 1, column: column - 1} : {row: row + 1, column: column - 1};
    const rightCornerTake = piece_color === 'white' ? {row: row - 1, column: column + 1} : {row: row + 1, column: column + 1};
    const opposing_color = piece_color === 'white' ? 'black' : 'white';
    const legalSquares = [];

    if(state.board[oneSquareMove.row]?.[oneSquareMove.column] === '')
        legalSquares.push(oneSquareMove);
    if(twoSquareMoveAvailable && 
        state.board[oneSquareMove.row]?.[oneSquareMove.column] === '' && 
        state.board[twoSquareMove.row]?.[twoSquareMove.column] === '')
        legalSquares.push(twoSquareMove)

    if(state.board[leftCornerTake.row]?.[leftCornerTake.column] && 
      state.board[leftCornerTake.row]?.[leftCornerTake.column] !== '' &&
      !state.board[leftCornerTake.row]?.[leftCornerTake.column].includes(piece_color))
        legalSquares.push(leftCornerTake);
    else if(state.board[leftCornerTake.row]?.[leftCornerTake.column] === '' && 
      (state.en_passant?.row === row && state.en_passant?.column === column - 1) && 
      state.board[row][column - 1]?.includes(`${opposing_color} pawn`))  
        legalSquares.push({...leftCornerTake, enPassant: 'take enpassant'})

    if(state.board[rightCornerTake.row]?.[rightCornerTake.column] &&
      state.board[rightCornerTake.row]?.[rightCornerTake.column] !== '' &&
      !state.board[rightCornerTake.row]?.[rightCornerTake.column].includes(piece_color))
        legalSquares.push(rightCornerTake);
    else if(state.board[rightCornerTake.row]?.[rightCornerTake.column] === '' && 
      (state.en_passant?.row === row && state.en_passant?.column === column + 1) && 
      state.board[row][column + 1]?.includes(`${opposing_color} pawn`))  
        legalSquares.push({...rightCornerTake, enPassant: 'take enpassant'});

    return [legalSquares];
}

