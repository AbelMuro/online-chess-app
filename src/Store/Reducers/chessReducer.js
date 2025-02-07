import { createAction, createReducer } from '@reduxjs/toolkit'
import { northSquares, southSquares, westSquares, eastSquares, northWestSquares,northEastSquares, southEastSquares, southWestSquares, knightSquares} from '../Functions/TraversalFunctions';
import { createLegalSquaresWhileInCheck, createLegalSquaresForKing} from '../Functions/CreateSquares';
import { checkSquaresForCheck, checkSquaresForBlocks, checkSquaresForThreats} from '../Functions/CheckSquares';
import { UnpinPieces, findPinnedPieces, findLegalMovesForPinnedPiece } from '../Functions/PinnedPieces';
import { checkEnpassant, implementEnPassant } from '../Functions/EnPassant';
import { legalMovesExist} from '../Functions/Stalemate';

//this is where i left off, i will need to populate three properties of the state; past, present and future 
//to implement the take-back and forward features of the app

const movePiece = createAction('MOVE_PIECE');
const changeTurn = createAction('CHANGE_TURN');
const pieceToBeMoved = createAction('PIECE_TO_BE_MOVED');
const undo = createAction('UNDO');
const redo = createAction('REDO');

const highlightNorthSquares = createAction('HIGHLIGHT_NORTH_SQUARES');
const highlightSouthSquares = createAction('HIGHLIGHT_SOUTH_SQUARES');
const highlightWestSquares = createAction('HIGHLIGHT_WEST_SQUARES');
const highlightEastSquares = createAction('HIGHLIGHT_EAST_SQUARES');
const highlightNorthWestSquares = createAction('HIGHLIGHT_NORTHWEST_SQUARES');
const highlightNorthEastSquares = createAction('HIGHLIGHT_NORTHEAST_SQUARES');
const highlightSouthWestSquares = createAction('HIGHLIGHT_SOUTHWEST_SQUARES');
const highlightSouthEastSquares = createAction('HIGHLIGHT_SOUTHEAST_SQUARES');
const highlightKnightSquares = createAction('HIGHLIGHT_KNIGHT_SQUARES');
const highlightPawnSquares = createAction('HIGHLIGHT_PAWN_SQUARES');
const highlightKingSquares = createAction('HIGHLIGHT_KING_SQUARES');
const removeAllHighlightedSquares = createAction('REMOVE_ALL_HIGHLIGHTED_SQUARES');

const isKingInCheck = createAction('IS_KING_IN_CHECK');
const resigns = createAction('RESIGNS');
const countLegalMoves = createAction('COUNT_LEGAL_MOVES');
const resetLegalMoves = createAction('RESET_LEGAL_MOVES');

const setPinnedPieces = createAction('SET_PINNED_PIECES');
const clearPinnedPieces = createAction('CLEAR_PINNED_PIECES');

const initialState = { 
    board: [
      ['white rook a', 'white knight b', 'white bishop c', 'white queen d', 'white king e', 'white bishop f', 'white knight g', 'white rook h'],
      ['white pawn a', 'white pawn b', 'white pawn c', 'white pawn d', 'white pawn e', 'white pawn f', 'white pawn g', 'white pawn h'],
      ['', '', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '', '',],
      ['black pawn a', 'black pawn b', 'black pawn c', 'black pawn d', 'black pawn e', 'black pawn f', 'black pawn g', 'black pawn h'],
      ['black rook a', 'black knight b', 'black bishop c', 'black queen d', 'black king e', 'black bishop f', 'black knight g', 'black rook h'],
    ],
    highlighted_squares: [
      ['', '', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '', '',],      
      ['', '', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '', '',],
      ['', '', '', '', '', '', '', '',],
    ],
    moves: [],
    past: [],
    future: [],
    black_king_in_check: false,
    white_king_in_check: false,
    squares_between_king_and_attacker: [],
    pinned_pieces: [],
    resigns: false,
    checkmate: false,
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
      const pieceToBeTaken = state.board[newRow][newColumn];
      UnpinPieces(state, newRow, newColumn);
      let pieceTakenByEnPassant = null;

      if(state.en_passant)
        pieceTakenByEnPassant = implementEnPassant(state, pieceToBeMoved, oldRow, oldColumn , newRow, newColumn);
      else if(pieceToBeMoved.includes('pawn'))
        checkEnpassant(state, oldRow, newRow, newColumn, pieceToBeMoved);

      state.board[oldRow][oldColumn] = '';
      state.board[newRow][newColumn] = pieceToBeMoved;
      const moveToBeSaved = {from: {row: oldRow, column: oldColumn}, to: {row: newRow, column: newColumn}, pieceToBeTaken: pieceTakenByEnPassant || pieceToBeTaken, pieceToBeMoved}     
      state.moves.unshift(moveToBeSaved);
      state.past.push(moveToBeSaved)
      state.future = [];   
      state.pieceToBeMoved = initialState.pieceToBeMoved;
      state.highlighted_squares = initialState.highlighted_squares;
      state.squares_between_king_and_attacker = initialState.squares_between_king_and_attacker;
      state.black_king_in_check = initialState.black_king_in_check;
      state.white_king_in_check = initialState.white_king_in_check;
    })
    .addCase(undo, (state) => {
      const move = state.past.pop();    
      state.moves.shift();
      if(!move){
        state.board = initialState.board;
        state.current_turn = 'white';
      }
      else{
        const from = move.from;
        const to = move.to;

        state.board[from.row][from.column] = move.pieceToBeMoved;
        state.board[to.row][to.column] = move.pieceToBeTaken;
        state.future.push(move);    
        state.current_turn = state.current_turn === 'white' ? 'black' : 'white';    
      }

      state.pieceToBeMoved = initialState.pieceToBeMoved;
      state.highlighted_squares = initialState.highlighted_squares;
      state.squares_between_king_and_attacker = initialState.squares_between_king_and_attacker;
      state.black_king_in_check = initialState.black_king_in_check;
      state.white_king_in_check = initialState.white_king_in_check;
    })
    .addCase(redo, (state) => {
      const move = state.future.pop();
      if(!move) return;
      state.moves.unshift(move);
      const from = move.from;
      const to = move.to;

      state.board[from.row][from.column] = move.pieceToBeTaken;
      state.board[to.row][to.column] = move.pieceToBeMoved;
      state.past.push(move);
      state.current_turn = state.current_turn === 'white' ? 'black' : 'white';
      state.pieceToBeMoved = initialState.pieceToBeMoved;
      state.highlighted_squares = initialState.highlighted_squares;
      state.squares_between_king_and_attacker = initialState.squares_between_king_and_attacker;
      state.black_king_in_check = initialState.black_king_in_check;
      state.white_king_in_check = initialState.white_king_in_check;
    })
    .addCase(highlightNorthSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const blueSquares = [];
      const redSquares = [];

      northSquares((i) => {
          if(state.board[i][column] === ''){
            blueSquares.push({row: i, column});
            return true;
          }
          else if(!state.board[i][column].includes(piece_color)){
            redSquares.push({row: i, column})
            return false;
          }
          else
            return false;
      }, row)

        const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0];  //we check to see if the current piece is a pinned piece
        
        if(pinnedPiece)
            findLegalMovesForPinnedPiece(state, pinnedPiece.legalPinnedMoves, blueSquares, redSquares);
        else if(state.squares_between_king_and_attacker.length)
            createLegalSquaresWhileInCheck(state, blueSquares, redSquares);
        else{
          blueSquares.forEach((square) => {
            state.highlighted_squares[square.row][square.column] = 'blue';
          })
          redSquares.forEach((square) => {
            state.highlighted_squares[square.row][square.column] = 'red'
          })
        }
    })
    .addCase(highlightSouthSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const blueSquares = [];
      const redSquares = [];

      southSquares((i) => {
        if(state.board[i][column] === ''){
          blueSquares.push({row: i, column});
          return true;
        }
          
        else if(!state.board[i][column].includes(piece_color)){
          redSquares.push({row: i, column});
          return false;
        }
        else
          return false
      }, row)

      const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0];   //we check to see if the current piece is a pinned piece//we check to see if the current piece is a pinned piece
      
      if(pinnedPiece)
          findLegalMovesForPinnedPiece(state, pinnedPiece.legalPinnedMoves, blueSquares, redSquares);

      else if(state.squares_between_king_and_attacker.length)
          createLegalSquaresWhileInCheck(state, blueSquares, redSquares);
      else{
        blueSquares.forEach((square) => {
          state.highlighted_squares[square.row][square.column] = 'blue';
        })
        redSquares.forEach((square) => {
          state.highlighted_squares[square.row][square.column] = 'red'
        })
      }
    })
    .addCase(highlightWestSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const blueSquares = [];
      const redSquares = [];

      westSquares((i) => {
        if(state.board[row][i] === ''){
          blueSquares.push({row, column: i});;
          return true;
        }
          
        else if(!state.board[row][i].includes(piece_color)){
          redSquares.push({row, column: i});
          return false;
        }
        else
          return false;
      }, column)

      const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0]; //we check to see if the current piece is a pinned piece
      
      if(pinnedPiece)
          findLegalMovesForPinnedPiece(state, pinnedPiece.legalPinnedMoves, blueSquares, redSquares);

      else if(state.squares_between_king_and_attacker.length)
          createLegalSquaresWhileInCheck(state, blueSquares, redSquares);
      else{
        blueSquares.forEach((square) => {
          state.highlighted_squares[square.row][square.column] = 'blue';
        })
        redSquares.forEach((square) => {
          state.highlighted_squares[square.row][square.column] = 'red'
        })
      }
    })
    .addCase(highlightEastSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const blueSquares = [];
      const redSquares = [];

      eastSquares((i) => {
        if(state.board[row][i] === ''){
          blueSquares.push({row, column: i});
          return true;
        }
        else if(!state.board[row][i].includes(piece_color)){
          redSquares.push({row, column: i});
          return false;
        }
        else
          return false;
      }, column)

      const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0];   //we check to see if the current piece is a pinned piece
      
      if(pinnedPiece)
          findLegalMovesForPinnedPiece(state, pinnedPiece.legalPinnedMoves, blueSquares, redSquares);

      else if(state.squares_between_king_and_attacker.length)
          createLegalSquaresWhileInCheck(state, blueSquares, redSquares);
      else{
        blueSquares.forEach((square) => {
          state.highlighted_squares[square.row][square.column] = 'blue';
        })
        redSquares.forEach((square) => {
          state.highlighted_squares[square.row][square.column] = 'red'
        })
      }
    })
    .addCase(highlightNorthWestSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const blueSquares = [];
      const redSquares = [];

      northWestSquares((i, j) => {
        if(state.board[i][j] === ''){
          blueSquares.push({row: i, column: j});
          return true;
        }
          
        else if(!state.board[i][j].includes(piece_color)){
          redSquares.push({row: i, column: j});
          return false;
        }
        else
          return false;
      }, row, column)


      const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0];  //we check to see if the current piece is a pinned piece
      
      if(pinnedPiece)
          findLegalMovesForPinnedPiece(state, pinnedPiece.legalPinnedMoves, blueSquares, redSquares);

      else if(state.squares_between_king_and_attacker.length)
          createLegalSquaresWhileInCheck(state, blueSquares, redSquares);
      else{
        blueSquares.forEach((square) => {
          state.highlighted_squares[square.row][square.column] = 'blue';
        })
        redSquares.forEach((square) => {
          state.highlighted_squares[square.row][square.column] = 'red'
        })
      }
    })
    .addCase(highlightNorthEastSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const blueSquares = [];
      const redSquares = [];

      northEastSquares((i, j) => {
        if(state.board[i][j] === ''){
          blueSquares.push({row: i, column: j});
          return true;
        }
          
        else if(!state.board[i][j].includes(piece_color)){
          redSquares.push({row: i, column: j});
          return false;
        }
        else
          return false;
      }, row, column)


      const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0];   //we check to see if the current piece is a pinned piece
      
      if(pinnedPiece)
          findLegalMovesForPinnedPiece(state, pinnedPiece.legalPinnedMoves, blueSquares, redSquares);

      else if(state.squares_between_king_and_attacker.length)
        createLegalSquaresWhileInCheck(state, blueSquares, redSquares);
      else{
        blueSquares.forEach((square) => {
          state.highlighted_squares[square.row][square.column] = 'blue';
        })
        redSquares.forEach((square) => {
          state.highlighted_squares[square.row][square.column] = 'red'
        })
      }
    })
    .addCase(highlightSouthWestSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const blueSquares = [];
      const redSquares = [];

      southWestSquares((i, j) => {
        if(state.board[i][j] === ''){
          blueSquares.push({row: i, column: j});
          return true;
        }
          
        else if(!state.board[i][j].includes(piece_color)){
          redSquares.push({row: i, column: j});
          return false;
        }
        else
          return false;
      }, row, column)

      for(let i = row - 1, j = column - 1; i >= 0 && j >= 0; i--, j--){
        if(state.board[i][j] === '')
          blueSquares.push({row: i, column: j})
        else if(!state.board[i][j].includes(piece_color)){
          redSquares.push({row: i, column: j});
          break
        }
        else
          break;
      }

      const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0];    //we check to see if the current piece is a pinned piece
      if(pinnedPiece)
          findLegalMovesForPinnedPiece(state, pinnedPiece.legalPinnedMoves, blueSquares, redSquares);

      else if(state.squares_between_king_and_attacker.length)
          createLegalSquaresWhileInCheck(state, blueSquares, redSquares);
      else{
        blueSquares.forEach((square) => {
          state.highlighted_squares[square.row][square.column] = 'blue';
        })
        redSquares.forEach((square) => {
          state.highlighted_squares[square.row][square.column] = 'red'
        })
      }
    })
    .addCase(highlightSouthEastSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const blueSquares = [];
      const redSquares = [];

      southEastSquares((i, j) => {
        if(state.board[i][j] === ''){
          blueSquares.push({row: i, column: j});
          return true;
        }
        else if(!state.board[i][j].includes(piece_color)){
          redSquares.push({row: i, column: j});
          return false;
        }
        else
          return false;
      }, row, column)

      const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0];     //we check to see if the current piece is a pinned piece
      if(pinnedPiece)
          findLegalMovesForPinnedPiece(state, pinnedPiece.legalPinnedMoves, blueSquares, redSquares);
      else if(state.squares_between_king_and_attacker.length)
          createLegalSquaresWhileInCheck(state, blueSquares, redSquares);
      else{
        blueSquares.forEach((square) => {
          state.highlighted_squares[square.row][square.column] = 'blue';
        })
        redSquares.forEach((square) => {
          state.highlighted_squares[square.row][square.column] = 'red'
        })
      }
    })
    .addCase(highlightKingSquares, (state, action) => {
      const piece_color = action.payload.square.color;
      const row = action.payload.square.row;
      const column = action.payload.square.column;
      const blueSquares = [];
      const redSquares = [];

      let legalMoves = createLegalSquaresForKing(state, row, column, piece_color);

      for(let i = 0; i < legalMoves.length; i++){
          if(state.board[legalMoves[i].row]?.[legalMoves[i].column] === '')
            blueSquares.push(legalMoves[i]);
          else if(state.board[legalMoves[i].row]?.[legalMoves[i].column] && 
            !state.board[legalMoves[i].row]?.[legalMoves[i].column].includes(piece_color))
              redSquares.push(legalMoves[i]);
      }

      blueSquares.forEach((square) => {
        state.highlighted_squares[square.row][square.column] = 'blue';
      })
      redSquares.forEach((square) => {
        state.highlighted_squares[square.row][square.column] = 'red'
      })
    })
    .addCase(highlightKnightSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const blueSquares = [];
      const redSquares = [];

      knightSquares((square) => {
        if(state.board[square.row]?.[square.column] === '')
          blueSquares.push(square);
        else if(state.board[square.row]?.[square.column] && 
            !state.board[square.row]?.[square.column].includes(piece_color))
              redSquares.push(square); 

        return true;
      }, row, column)

      const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0];
      
      if(pinnedPiece)
          findLegalMovesForPinnedPiece(state, pinnedPiece.legalPinnedMoves, blueSquares, redSquares);

      else if(state.squares_between_king_and_attacker.length)
          createLegalSquaresWhileInCheck(state, blueSquares, redSquares);
      else{
        blueSquares.forEach((square) => {
          state.highlighted_squares[square.row][square.column] = 'blue';
        })
        redSquares.forEach((square) => {
          state.highlighted_squares[square.row][square.column] = 'red'
        })
      }
    })
    .addCase(highlightPawnSquares, (state, action) => {
      const currentSquare = action.payload.square;
      const row = currentSquare.row;
      const column = currentSquare.column;
      const piece_color = currentSquare.color;
      const opposing_color = piece_color === 'white' ? 'black' : 'white'
      const twoSquareMoveAvailable = action.payload.square.twoSquareMoveAvailable;
      const blueSquares = [];
      const redSquares = [];

      const oneSquareMove = piece_color === 'white' ? {row: row + 1, column} : {row: row - 1, column};
      const twoSquareMove = piece_color === 'white' ? {row: row + 2, column} : {row: row - 2, column};
      const leftCornerTake = piece_color === 'white' ? {row: row + 1, column: column - 1} : {row: row - 1, column: column - 1};
      const rightCornerTake = piece_color === 'white' ? {row: row + 1, column: column + 1} : {row: row - 1, column: column + 1};

      if(state.board[oneSquareMove.row]?.[oneSquareMove.column] === '')
          blueSquares.push(oneSquareMove);
      if(twoSquareMoveAvailable && state.board[twoSquareMove.row]?.[twoSquareMove.column] === '')
          blueSquares.push(twoSquareMove)

      if(state.board[leftCornerTake.row]?.[leftCornerTake.column] && 
        state.board[leftCornerTake.row]?.[leftCornerTake.column] !== '' &&
        !state.board[leftCornerTake.row]?.[leftCornerTake.column].includes(piece_color))
          redSquares.push(leftCornerTake);
      else if(state.board[leftCornerTake.row]?.[leftCornerTake.column] === '' && 
        (state.en_passant?.row === row && state.en_passant?.column === column - 1) && 
        state.board[row][column - 1]?.includes(`${opposing_color} pawn`))  
          redSquares.push(leftCornerTake)

      if(state.board[rightCornerTake.row]?.[rightCornerTake.column] &&
        state.board[rightCornerTake.row]?.[rightCornerTake.column] !== '' &&
        !state.board[rightCornerTake.row]?.[rightCornerTake.column].includes(piece_color))
          redSquares.push(rightCornerTake);
      else if(state.board[rightCornerTake.row]?.[rightCornerTake.column] === '' && 
        (state.en_passant?.row === row && state.en_passant?.column === column + 1) && 
        state.board[row][column + 1]?.includes(`${opposing_color} pawn`))  
          redSquares.push(rightCornerTake)
      

      const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0];   //we check to see if the current piece is a pinned piece
      
      if(pinnedPiece)
          findLegalMovesForPinnedPiece(state, pinnedPiece.legalPinnedMoves, blueSquares, redSquares);
      else if(state.squares_between_king_and_attacker.length)
          createLegalSquaresWhileInCheck(state, blueSquares, redSquares);
      else{
        blueSquares.forEach((square) => {
          state.highlighted_squares[square.row][square.column] = 'blue';
        })
        redSquares.forEach((square) => {
          state.highlighted_squares[square.row][square.column] = 'red'
        })
      }
    })
    .addCase(removeAllHighlightedSquares, (state) => {
      state.highlighted_squares = initialState.highlighted_squares;
    })
    .addCase(isKingInCheck, (state, action) => {
      const row = action.payload.square.row;
      const column = action.payload.square.column;
      const piece_color = action.payload.square.color;
      
      checkSquaresForCheck(state, row, column, piece_color)     //this function will check if the king is currently in check by traversing through the squares north, west, east, south and diagonally for threats
    
      if(!state[`${piece_color}_king_in_check`]) return;

      let isSquareBlockable = false;
      for(let i = 0; i < state.squares_between_king_and_attacker.length; i++){
        isSquareBlockable = checkSquaresForBlocks(state, state.squares_between_king_and_attacker[i], piece_color);
        if(isSquareBlockable)
          return; 
      }
      const attacker = state.squares_between_king_and_attacker[state.squares_between_king_and_attacker.length - 1];
      const attackerIsUnderThreat = checkSquaresForThreats(state, attacker, piece_color);
      const legalMoves = createLegalSquaresForKing(state, row, column, piece_color);
      
      if(!legalMoves.length && !attackerIsUnderThreat)
        state.checkmate = piece_color;
    })
    .addCase(changeTurn, (state) => {
      state.current_turn = state.current_turn === 'white' ? 'black' : 'white';
    })
    .addCase(pieceToBeMoved, (state, action) => {
      state.pieceToBeMoved = action.payload;
      state.blue_squares = [];
      state.red_squares = [];
    })
    .addCase(setPinnedPieces, (state, action) => {
      const square = action.payload.square;
      const color = square.color;
      const row = square.row;
      const column = square.column;
      const piece = state.board[row][column];
      findPinnedPieces(state, {row, column}, color, piece)
    })
    .addCase(clearPinnedPieces, (state, action) => {
      const row = action.payload.square.row;
      const column = action.payload.square.column;

      const pieceToRemove = state.board[row][column];
      state.pinned_pieces = state.pinned_pieces.filter(piece => piece.piece !== pieceToRemove);
    })
    .addCase(resigns, (state, action) => {
      const playerWhoResigned = action.payload.resigns;
      state.resigns = playerWhoResigned;
    })
    .addCase(countLegalMoves, (state, action) => {
      const color = action.payload.square.color;
      const row = action.payload.square.row;
      const column = action.payload.square.column;
      const piece = state.board[row][column];

      const pieceCanMove = legalMovesExist(state, piece, color, {row, column});

      console.log(pieceCanMove);
    })
});

export default chessReducer;
