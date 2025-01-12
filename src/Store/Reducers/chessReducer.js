import { createAction, createReducer } from '@reduxjs/toolkit'

const movePiece = createAction('MOVE_PIECE');
const highlightSquares = createAction('HIGHLIGHT_SQUARES');
const pieceToBeMoved = createAction('PIECE_TO_BE_MOVED');
const initialState = { 
    board: [
      ['white rook', 'white knight', 'white bishop', 'white queen', 'white king', 'white bishop', 'white knight', 'white rook'],
      ['white pawn', 'white pawn', 'white pawn', 'white pawn', 'white pawn', 'white pawn', 'white pawn', 'white pawn'],
      ['', '', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '', '',],
      ['black pawn', 'black pawn', 'black pawn', 'black pawn', 'black pawn', 'black pawn', 'black pawn', 'black pawn'],
      ['black rook', 'black knight', 'black bishop', 'black queen', 'black king', 'black bishop', 'black knight', 'black rook'],
    ],
    highlighted_squares: [],
    pieceToBeMoved: {square: {row: null, column: null}},
  }


const chessReducer = createReducer(initialState, (builder) => {      
  builder
    .addCase(movePiece , (state, action) => {    
      const oldRow = state.pieceToBeMoved.square.row;
      const oldColumn = state.pieceToBeMoved.square.column; 
      const newRow = action.payload.square.row;
      const newColumn = action.payload.square.column;        
      const pieceToBeMoved = state.board[oldRow][oldColumn];
      state.board[oldRow][oldColumn] = '';
      state.board[newRow][newColumn] = pieceToBeMoved
    })
    .addCase(highlightSquares, (state, action) => {
      state.highlighted_squares = action.payload.squares;
    })
    .addCase(pieceToBeMoved, (state, action) => {
      state.pieceToBeMoved = action.payload;
    })
});

export default chessReducer;
