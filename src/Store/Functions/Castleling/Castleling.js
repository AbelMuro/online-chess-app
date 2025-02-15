export const implementCastleling = (state, oldRow, oldColumn, newRow, newColumn, piece_color) => {

    if(state.board[newRow]?.[newColumn + 1]?.includes(`${piece_color} rook`)){
        const rook = state.board[newRow][newColumn + 1];
        state.board[newRow][newColumn + 1] = '';
        state.board[oldRow][oldColumn + 1] = rook;
        return {from: {row: newRow, column: newColumn + 1}, to: {row: oldRow, column: oldColumn + 1}, piece: rook};
      }
      else{
        const rook = state.board[newRow]?.[newColumn - 2];
        state.board[newRow][newColumn - 2] = '';
        state.board[oldRow][oldColumn - 1] = rook;
        return {from: {row: newRow, column: newColumn - 2}, to: {row: oldRow, column: oldColumn - 1}, piece: rook};
      }
}

export default implementCastleling;