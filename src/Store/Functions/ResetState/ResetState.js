export const ResetProperties = (state, initialState) => {
    state.pieceToBeMoved = initialState.pieceToBeMoved;
    state.legal_squares = initialState.legal_squares;
    state.squares_between_king_and_attacker = initialState.squares_between_king_and_attacker;
    state.black_king_in_check = initialState.black_king_in_check;
    state.white_king_in_check = initialState.white_king_in_check;
  }

  export const ResetState = (state, initialState) => {
    state.board = initialState.board;
    state.legal_squares = initialState.legal_squares;
    state.moves = initialState.moves;                  
    state.movesAvailableForWhite = initialState.movesAvailableForWhite;
    state.movesAvailableForBlack = initialState.movesAvailableForBlack;
    state.stalemate = initialState.stalemate;
    state.past = initialState.past;
    state.future =  initialState.future;
    state.black_king_in_check = initialState.black_king_in_check;
    state.white_king_in_check = initialState.white_king_in_check;

    state.has_king_been_moved =  initialState.has_king_been_moved;
    state.has_rooks_been_moved = initialState.has_rooks_been_moved;
    state.black_pieces_taken = initialState.black_pieces_taken,
    state.white_pieces_taken = initialState.white_pieces_taken,
    state.time_traveling = initialState.time_traveling;
    
    state.squares_between_king_and_attacker = initialState.squares_between_king_and_attacker;
    state.pinned_pieces = initialState.pinned_pieces;
    state.resigns = initialState.resigns;
    state.checkmate = initialState.checkmate;
    state.user_color = initialState.user_color;
    state.opponent_color = initialState.opponent_color;
    state.current_turn =  initialState.current_turn;
    state.en_passant = initialState.en_passant;
    state.pieceToBeMoved =  initialState.pieceToBeMoved;
  }
  