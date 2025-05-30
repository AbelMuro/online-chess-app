export const checkEnPassantForAI = (state, pieceToBeMoved, from, to) => {
    if(!pieceToBeMoved.includes('pawn')) return;

    if(from.row + 2 === to.row || from.row - 2 === to.row) 
        state.en_passant = {row: to.row, column: to.column};
    else
        state.en_passant = null;     
}


export const takeWithEnPassant = (state, piece, oldRow, oldColumn, newRow, newColumn) => {
    const opposing_color = piece.includes('white') ? 'black' : 'white';
    const pieceToBeTaken = state.en_passant;
    const row = pieceToBeTaken.row;
    const column = pieceToBeTaken.column;
      
    if(state.board[row][column].includes(`${opposing_color} pawn`) && 
        ((newColumn === column && newRow + 1 === row) && ((oldColumn + 1 === column || oldColumn - 1 === column) && oldRow === row)) ||                                 //black pawn
        ((newColumn === column && newRow - 1 === row) && ((oldColumn - 1 === column || oldColumn + 1 === column) && oldRow === row)) ){                                 //white pawn
            let pieceToBeTaken = state.board[row][column];
            state.board[row][column] = '';
            state.en_passant = null;
            const pieceColor = pieceToBeTaken.includes('white') ? 'white' : 'black';
            state.moves[`${pieceColor}_pieces_taken`]?.unshift(pieceToBeTaken);
            return {row, column, pieceToBeTaken};
    }   
}