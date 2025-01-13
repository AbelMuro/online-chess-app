import { createAction, createReducer } from '@reduxjs/toolkit'

const movePiece = createAction('MOVE_PIECE');
const changeTurn = createAction('CHANGE_TURN');
const pieceToBeMoved = createAction('PIECE_TO_BE_MOVED');

const highlightBlueSquares = createAction('HIGHLIGHT_BLUE_SQUARES');
const highlightRedSquares = createAction('HIGHLIGHT_RED_SQUARES');
const removeHighlightedSquares = createAction('REMOVE_HIGHLIGHTED_SQUARES');

const setEnPassant = createAction('SET_ENPASSANT');
const removeEnPassant = createAction('REMOVE_ENPASSANT');
const removePieceWithEnPassant = createAction('REMOVE_PIECE_WITH_ENPASSANT')

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
    blue_squares: [],
    red_squares: [],
    current_turn: 'white',
    en_passant: null,
    pieceToBeMoved: {square: {row: null, column: null}},
  }


const chessReducer = createReducer(initialState, (builder) => {      
  builder
    .addCase(movePiece, (state, action) => {    
      const oldRow = state.pieceToBeMoved.square.row;
      const oldColumn = state.pieceToBeMoved.square.column; 
      const newRow = action.payload.square.row;
      const newColumn = action.payload.square.column;        
      const pieceToBeMoved = state.board[oldRow][oldColumn];
      state.board[oldRow][oldColumn] = '';
      state.board[newRow][newColumn] = pieceToBeMoved;
    })
    .addCase(highlightBlueSquares, (state, action) => {
      state.blue_squares.push(...action.payload.squares);
    })
    .addCase(highlightRedSquares, (state, action) => {
      state.red_squares.push(...action.payload.squares);
    })
    .addCase(removeHighlightedSquares, (state) => {
      state.red_squares = [];
      state.blue_squares = [];
    })
    .addCase(changeTurn, (state) => {
      state.current_turn = state.current_turn === 'white' ? 'black' : 'white';
    })
    .addCase(setEnPassant, (state, action) => {
      state.en_passant = action.payload.square;
    })
    .addCase(removeEnPassant, (state) => {
      state.en_passant = null;
    })
    .addCase(removePieceWithEnPassant, (state) => {
      if(!state.en_passant) return;

      const color = state.current_turn;
      const moveOneRow = color === 'white' ? state.en_passant.row - 1 : state.en_passant.row + 1;
      const column = state.en_passant.column;
      state.board[moveOneRow][column] = '';
      state.en_passant = '';
    })
    .addCase(pieceToBeMoved, (state, action) => {
      state.pieceToBeMoved = action.payload;
    })
});

export default chessReducer;
