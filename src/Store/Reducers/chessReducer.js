import { createAction, createReducer } from '@reduxjs/toolkit'
import { northSquares, southSquares, westSquares, eastSquares, northWestSquares,northEastSquares, southEastSquares, southWestSquares} from '../TraversalFunctions';

//now i need to populate the squaresBetweenKingAndAttacker array when the king is in check

const movePiece = createAction('MOVE_PIECE');
const changeTurn = createAction('CHANGE_TURN');
const pieceToBeMoved = createAction('PIECE_TO_BE_MOVED');
const checkmate = createAction('CHECKMATE');

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
const setBlackKingInCheck = createAction('SET_BLACK_KING_IN_CHECK');
const setWhiteKingInCheck = createAction('SET_WHITE_KING_IN_CHECK');

const setPinnedPieces = createAction('SET_PINNED_PIECES');
const clearPinnedPieces = createAction('CLEAR_PINNED_PIECES');

const setEnPassant = createAction('SET_ENPASSANT');
const movePieceWithEnPassant = createAction('MOVE_PIECE_WITH_ENPASSANT');

const createLegalSquaresWhileInCheck = (state, blueSquares, redSquares) => {
  const squaresBetweenKingAndAttacker = state.squares_between_king_and_attacker;
  const highlightedSquares = state.highlighted_squares;

  for(let i = 0; i < blueSquares.length; i++){
    for(let j = 0; j < squaresBetweenKingAndAttacker.length; j++){
      const row = squaresBetweenKingAndAttacker[j].row;
      const column = squaresBetweenKingAndAttacker[j].column;

      if(blueSquares[i].row === row && blueSquares[i].column === column)
        highlightedSquares[row][column] = 'blue'
    }
  }  
  
  for(let i = 0; i < redSquares.length; i++){
    for(let j = 0; j < squaresBetweenKingAndAttacker.length; j++){
      const row = squaresBetweenKingAndAttacker[j].row;
      const column = squaresBetweenKingAndAttacker[j].column;

      if(redSquares[i].row === row && redSquares[i].column === column)
        highlightedSquares[row][column] = 'red'
    }
  }
}

const createLegalSquaresForPinnedPiece = (state, legalMoves, blueSquares, redSquares) => {
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
    illegal_moves_for_white_king: [],
    illegal_moves_for_black_king: [],
    black_king_in_check: false,
    white_king_in_check: false,
    squares_between_king_and_attacker: [],
    pinned_pieces: [],
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
      state.pieceToBeMoved = initialState.pieceToBeMoved;
      state.highlighted_squares = initialState.highlighted_squares;
      state.squares_between_king_and_attacker = [];
      state.black_king_in_check = false;
      state.white_king_in_check = false;
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

        const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0];
        
        if(pinnedPiece)
            createLegalSquaresForPinnedPiece(state, pinnedPiece.legalPinnedMoves, blueSquares, redSquares);
        
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

      const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0];
      
      if(pinnedPiece)
          createLegalSquaresForPinnedPiece(state, pinnedPiece.legalPinnedMoves, blueSquares, redSquares);

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

      const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0];
      
      if(pinnedPiece)
          createLegalSquaresForPinnedPiece(state, pinnedPiece.legalPinnedMoves, blueSquares, redSquares);

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

      const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0];
      
      if(pinnedPiece)
          createLegalSquaresForPinnedPiece(state, pinnedPiece.legalPinnedMoves, blueSquares, redSquares);

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


      const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0];
      
      if(pinnedPiece)
          createLegalSquaresForPinnedPiece(state, pinnedPiece.legalPinnedMoves, blueSquares, redSquares);

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


      const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0];
      
      if(pinnedPiece)
          createLegalSquaresForPinnedPiece(state, pinnedPiece.legalPinnedMoves, blueSquares, redSquares);

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

      const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0];
      if(pinnedPiece)
          createLegalSquaresForPinnedPiece(state, pinnedPiece.legalPinnedMoves, blueSquares, redSquares);

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

      const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0];
      if(pinnedPiece)
          createLegalSquaresForPinnedPiece(state, pinnedPiece.legalPinnedMoves, blueSquares, redSquares);

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
      const opposing_color = piece_color === 'white' ? 'black' : 'white';
      const row = action.payload.square.row;
      const column = action.payload.square.column;
      const blueSquares = [];
      const redSquares = [];

      const legalSquares = [ 
        {row: row + 1, column}, 
        {row: row - 1, column}, 
        {row, column: column - 1}, 
        {row, column: column + 1},
        {row: row + 1, column: column - 1},
        {row: row + 1, column: column + 1},
        {row: row - 1, column: column - 1},
        {row: row - 1, column: column + 1}
      ];

      let legalMoves = legalSquares.filter((square) => {
        if(!state.board[square.row]) return false;
        if(state.board[square.row][square.column] === undefined) return false;

        let isIllegal = false;

        northSquares((i) => {
          if(state.board[i][square.column].includes(piece_color))
            return false
          else if(state.board[i][square.column].includes('rook') || state.board[i][square.column].includes('queen')){
            isIllegal = true;
            return false;
          }
          else if(state.board[i][square.column].includes('king') && (i === square.row + 1)){
            isIllegal = true;
            return false;
          }
          else if(state.board[i][square.column].includes(opposing_color)){
            return false;
          }
          else
            return true;    
        }, square.row)

        if(isIllegal)
            return false;

        southSquares((i) => {
          if(state.board[i][square.column].includes(piece_color))
            return false
          else if(state.board[i][square.column].includes('rook') || state.board[i][square.column].includes('queen')){
            isIllegal = true;
            return false;
          }
          else if(state.board[i][square.column].includes('king') && (i === square.row - 1)){
            isIllegal = true;
            return false;
          }
          else if(state.board[i][square.column].includes(opposing_color)){
            return false;
          }
          else
            return true;    
        }, square.row)

        if(isIllegal)
            return false;


        westSquares((i) => {
          if(state.board[square.row][i].includes(piece_color))
            return false
          else if(state.board[square.row][i].includes('rook') || state.board[square.row][i].includes('queen')){
            isIllegal = true;
            return false;
          }
          else if(state.board[square.row][i].includes('king') && (i === square.column - 1)){
            isIllegal = true;
            return false;
          }
          else if(state.board[square.row][i].includes(opposing_color)){
            return false;
          }
          else
            return true;    
        }, square.column)

        if(isIllegal)
            return false;


        eastSquares((i) => {
          if(state.board[square.row][i].includes(piece_color))
            return false
          else if(state.board[square.row][i].includes('rook') || state.board[square.row][i].includes('queen')){
            isIllegal = true;
            return false;
          }
          else if(state.board[square.row][i].includes('king') && (i === square.column + 1)){
            isIllegal = true;
            return false;
          }
          else if(state.board[square.row][i].includes(opposing_color)){
            return false;
          }
          else
            return true;    
        }, square.column)

        if(isIllegal)
            return false;

        northWestSquares((i, j) => {
          if(state.board[i][j].includes(piece_color))
            return false
          else if(state.board[i][j].includes(`${opposing_color} pawn`) && (i === square.row + 1 && j === square.column - 1)){
            isIllegal = true;
            return false;
          }
          else if(state.board[i][j].includes('king') && (i === square.row + 1 && j === square.column - 1)){
            isIllegal = true;
            return false;
          }
          else if(state.board[i][j].includes('bishop') || state.board[i][j].includes('queen')){
            isIllegal = true;
            return false;
          }
          else if(state.board[i][j].includes(opposing_color))
            return false;
          else
            return true;    
        }, square.row, square.column)

        if(isIllegal)
            return false;

        northEastSquares((i, j) => {
          if(state.board[i][j].includes(piece_color))
            return false
          else if(state.board[i][j].includes(`${opposing_color} pawn`) && (i === square.row + 1 && j === square.column + 1)){
            isIllegal = true;
            return false;
          }
          else if(state.board[i][j].includes('king') && (i === square.row + 1 && j === square.column + 1)){
            isIllegal = true;
            return false;
          }
          else if(state.board[i][j].includes('bishop') || state.board[i][j].includes('queen')){
            isIllegal = true;
            return false;
          }
          else if(state.board[i][j].includes(opposing_color)){
            return false;
          }
          else
            return true;    
        }, square.row, square.column)

        if(isIllegal)
            return false;


        southWestSquares((i, j) => {
          if(state.board[i][j].includes(piece_color))
            return false
          else if(state.board[i][j].includes(`${opposing_color} pawn`) && (i === square.row - 1 && j === square.column - 1)){
            isIllegal = true;
            return false;
          }
          else if(state.board[i][j].includes('king') && (i === square.row - 1 && j === square.column - 1)){
            isIllegal = true;
            return false;
          }
          else if(state.board[i][j].includes('bishop') || state.board[i][j].includes('queen')){
            isIllegal = true;
            return false;
          }
          else if(state.board[i][j].includes(opposing_color)){
            return false;
          }
          else
            return true;    
        }, square.row, square.column)

        if(isIllegal)
            return false;

        southEastSquares((i, j) => {
          if(state.board[i][j].includes(piece_color))
            return false
          else if(state.board[i][j].includes(`${opposing_color} pawn`) && (i === square.row - 1 && j === square.column + 1)){
            isIllegal = true;
            return false;
          }
          else if(state.board[i][j].includes('king') && (i === square.row - 1 && j === square.column + 1)){
            isIllegal = true;
            return false;
          }
          else if(state.board[i][j].includes('bishop') || state.board[i][j].includes('queen')){
            isIllegal = true;
            return false;
          }
          else if(state.board[i][j].includes(opposing_color)){
            return false;
          }
          else
            return true;    
        }, square.row, square.column)

        if(isIllegal)
            return false;
        else 
          return true;

      })
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
      const legalSquares = [
        {row: row + 2, column: column - 1}, 
        {row: row + 2, column : column + 1},
        {row: row - 1, column: column + 2}, 
        {row: row + 1, column: column + 2},
        {row: row - 2, column: column + 1},
        {row: row - 2, column: column - 1},
        {row: row + 1, column: column - 2},
        {row: row - 1, column: column - 2}
      ];

      legalSquares.forEach((square) => {
        if(state.board[square.row]?.[square.column] === '')
            blueSquares.push(square);
        else if(state.board[square.row]?.[square.column] && 
            !state.board[square.row]?.[square.column].includes(piece_color))
              redSquares.push(square); 
      })

      const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0];
      
      if(pinnedPiece)
          createLegalSquaresForPinnedPiece(state, pinnedPiece.legalPinnedMoves, blueSquares, redSquares);

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
      const pawnHasntMovedYet = row === 1 || row === 6;
      const blueSquares = [];
      const redSquares = [];

      const oneSquareMove = piece_color === 'white' ? {row: row + 1, column} : {row: row - 1, column};
      const twoSquareMove = piece_color === 'white' ? {row: row + 2, column} : {row: row - 2, column};
      const leftCornerTake = piece_color === 'white' ? {row: row + 1, column: column - 1} : {row: row - 1, column: column - 1};
      const rightCornerTake = piece_color === 'white' ? {row: row + 1, column: column + 1} : {row: row - 1, column: column + 1};

      if(state.board[oneSquareMove.row]?.[oneSquareMove.column] === '')
          blueSquares.push(oneSquareMove);
      if(pawnHasntMovedYet && state.board[twoSquareMove.row]?.[twoSquareMove.column] === '')
          blueSquares.push(twoSquareMove)

      if(state.board[leftCornerTake.row]?.[leftCornerTake.column] && 
        state.board[leftCornerTake.row]?.[leftCornerTake.column] !== '' &&
        !state.board[leftCornerTake.row]?.[leftCornerTake.column].includes(piece_color))
          redSquares.push(leftCornerTake);
      if(state.board[leftCornerTake.row]?.[leftCornerTake.column] &&
              state.board[leftCornerTake.row]?.[leftCornerTake.column].includes(piece_color))
                state[`illegal_moves_for_${piece_color === 'white' ? 'black' : 'white'}_king`].push({row: leftCornerTake.row, column: leftCornerTake.column})

      if(state.board[rightCornerTake.row]?.[rightCornerTake.column] &&
        state.board[rightCornerTake.row]?.[rightCornerTake.column] !== '' &&
        !state.board[rightCornerTake.row]?.[rightCornerTake.column].includes(piece_color))
          redSquares.push(rightCornerTake);
      if(state.board[rightCornerTake.row]?.[rightCornerTake.column] &&
            state.board[rightCornerTake.row]?.[rightCornerTake.column].includes(piece_color))
              state[`illegal_moves_for_${piece_color === 'white' ? 'black' : 'white'}_king`].push({row: rightCornerTake.row, column: rightCornerTake.column})

      const pinnedPiece = state.pinned_pieces.filter(piece => piece.square.row === row && piece.square.column === column)[0];
      
      if(pinnedPiece)
          createLegalSquaresForPinnedPiece(state, pinnedPiece.legalPinnedMoves, blueSquares, redSquares);
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
    .addCase(setBlackKingInCheck, (state, action) => {
      state.black_king_in_check = action.payload.check;
    })
    .addCase(setWhiteKingInCheck, (state, action) => {
      state.white_king_in_check = action.payload.check;
    })
    .addCase(isKingInCheck, (state, action) => {
      const row = action.payload.square.row;
      const column = action.payload.square.column;
      const piece_color = action.payload.square.color;
      const opposing_color = piece_color === 'white' ? 'black' : 'white';

      northSquares((i) => {
        if(state.board[i][column].includes(`${opposing_color} queen`) || state.board[i][column].includes(`${opposing_color} rook`)){
          state[`${piece_color}_king_in_check`] = true;
          return false;
        }
        else if(state.board[i][column].includes(opposing_color) || state.board[i][column].includes(piece_color))
          return false;
        else
          return true;
      }, row)

      if(state[`${piece_color}_king_in_check`]) return;

      southSquares((i) => {
        if(state.board[i][column].includes(`${opposing_color} queen`) || state.board[i][column].includes(`${opposing_color} rook`)){
          state[`${piece_color}_king_in_check`] = true;
          return false;
        }
        else if(state.board[i][column].includes(opposing_color) || state.board[i][column].includes(piece_color))
          return false;
        else
          return true;
      }, row)

      if(state[`${piece_color}_king_in_check`]) return;

      westSquares((i) => {
        if(state.board[row][i].includes(`${opposing_color} queen`) || state.board[row][i].includes(`${opposing_color} rook`)){
          state[`${piece_color}_king_in_check`] = true;
          return false;
        }
        else if(state.board[row][i].includes(opposing_color) || state.board[row][i].includes(piece_color))
          return false;
        else
          return true;
      }, column)

      if(state[`${piece_color}_king_in_check`]) return;

      eastSquares((i) => {
        if(state.board[row][i].includes(`${opposing_color} queen`) || state.board[row][i].includes(`${opposing_color} rook`)){
          state[`${piece_color}_king_in_check`] = true;
          return false;
        }
        else if(state.board[row][i].includes(opposing_color) || state.board[row][i].includes(piece_color))
          return false;
        else
          return true;
      }, column)

      if(state[`${piece_color}_king_in_check`]) return;


      northWestSquares((i, j) => {
        if(state.board[i][j].includes(`${opposing_color} queen`) || state.board[i][j].includes(`${opposing_color} bishop`)){
          state[`${piece_color}_king_in_check`] = true;
          return false;
        }

        else if(state.board[i][j].includes(`${opposing_color} pawn`) && (i === row + 1 && j === column - 1)){
          state[`${piece_color}_king_in_check`] = true;
          return false;
        }
        else if(state.board[i][j].includes(opposing_color) || state.board[i][j].includes(piece_color))
          return false;
        else
          return true;
      }, row, column)

      if(state[`${piece_color}_king_in_check`]) return;

      northEastSquares((i, j) => {
        if(state.board[i][j].includes(`${opposing_color} queen`) || state.board[i][j].includes(`${opposing_color} bishop`)){
          state[`${piece_color}_king_in_check`] = true;
          return false;
        }
        else if(state.board[i][j].includes(`${opposing_color} pawn`) && (i === row + 1 && j === column + 1)){
          state[`${piece_color}_king_in_check`] = true;
          return false;
        }
        else if(state.board[i][j].includes(opposing_color) || state.board[i][j].includes(piece_color))
          return false;
        else
          return true;
      }, row, column)

      if(state[`${piece_color}_king_in_check`]) return;

      southWestSquares((i, j) => {
        if(state.board[i][j].includes(`${opposing_color} queen`) || state.board[i][j].includes(`${opposing_color} bishop`)){
          state[`${piece_color}_king_in_check`] = true;
          return false;
        }
        else if(state.board[i][j].includes(`${opposing_color} pawn`) && (i === row - 1 && j === column - 1)){
          state[`${piece_color}_king_in_check`] = true;
          return false;
        }
        else if(state.board[i][j].includes(opposing_color) || state.board[i][j].includes(piece_color))
          return false;
        else
          return true;
      }, row, column)

      if(state[`${piece_color}_king_in_check`]) return;

      southEastSquares((i, j) => {
        if(state.board[i][j].includes(`${opposing_color} queen`) || state.board[i][j].includes(`${opposing_color} bishop`)){
          state[`${piece_color}_king_in_check`] = true;
          return false;
        }
        else if(state.board[i][j].includes(`${opposing_color} pawn`) && (i === row - 1 && j === column + 1)){
          state[`${piece_color}_king_in_check`] = true;
          return false;
        }
        else if(state.board[i][j].includes(opposing_color) || state.board[i][j].includes(piece_color))
          return false;
        else
          return true;
      }, row, column)

    })
    .addCase(checkmate, (state, action) => {
        const piece_color = action.payload.square.color;
        const row = action.payload.square.row;
        const column = action.payload.square.column;
        const illegalMoves = state[`illegal_moves_for_${piece_color}_king`];
        const legalSquares = [ 
          {row: row + 1, column}, 
          {row: row - 1, column}, 
          {row, column: column - 1}, 
          {row, column: column + 1},
          {row: row + 1, column: column - 1},
          {row: row + 1, column: column + 1},
          {row: row - 1, column: column - 1},
          {row: row - 1, column: column + 1}
        ];
        let availableMoves = 0;

        for(let i = 0; i < legalSquares.length; i++){
          let isLegal = true;

          if(!state.board[legalSquares[i].row])
              isLegal = false;
          else if(state.board[legalSquares[i].row][legalSquares[i].column] !== '' && 
            state.board[legalSquares[i].row][legalSquares[i].column]?.includes(piece_color))
              isLegal = false;

          for(let j = 0; j < illegalMoves.length; j++){
            
            if(legalSquares[i].row === illegalMoves[j].row && legalSquares[i].column === illegalMoves[j].column){
                isLegal = false;
                break;
            }
          }
          if(isLegal)
            availableMoves++;
        }

        if(!availableMoves)
          state.checkmate = piece_color === 'white' ? 'black' : 'white'; 

    })
    .addCase(changeTurn, (state) => {
      state.current_turn = state.current_turn === 'white' ? 'black' : 'white';
    })
    .addCase(setEnPassant, (state, action) => {
      state.en_passant = action.payload;
    })
    .addCase(movePieceWithEnPassant, (state) => {
      if(!state.en_passant) return;

      const squareToMoveInto = state.en_passant.squareToMoveInto;
      const pieceToBeTaken = state.en_passant.pieceToBeTaken;
      let pieceToBeMoved = state.pieceToBeMoved.square;
      let piece = state.board[pieceToBeMoved.row][pieceToBeMoved.column];

      state.board[squareToMoveInto.row][squareToMoveInto.column] = piece;
      state.board[pieceToBeTaken.row][pieceToBeTaken.column] = '';
      state.board[pieceToBeMoved.row][pieceToBeMoved.column] = '';
      state.en_passant = null;
      state.pieceToBeMoved = initialState.pieceToBeMoved;
      state.blue_squares = [];
      state.red_squares = [];
    })
    .addCase(pieceToBeMoved, (state, action) => {
      state.pieceToBeMoved = action.payload;
      state.blue_squares = [];
      state.red_squares = [];
    })
    .addCase(setPinnedPieces, (state, action) => {
      const square = action.payload.square;
      const legalPinnedMoves = action.payload.legalPinnedMoves;
      const piece = action.payload.piece;
      
      state.pinned_pieces.push({piece, square, legalPinnedMoves});
    })
    .addCase(clearPinnedPieces, (state, action) => {
      const pieceToRemove = action.payload.piece;
      state.pinned_pieces = state.pinned_pieces.filter(piece =>  piece.piece !== pieceToRemove);
    })
});

export default chessReducer;
