export const ResetProperties = (state, initialState) => {
    state.pieceToBeMoved = initialState.pieceToBeMoved;
    state.highlighted_squares = initialState.highlighted_squares;
    state.squares_between_king_and_attacker = initialState.squares_between_king_and_attacker;
    state.black_king_in_check = initialState.black_king_in_check;
    state.white_king_in_check = initialState.white_king_in_check;
  }

  export const ResetState = (state, initialState) => {
    console.log('im here');
    state.board = initialState.board;
    state.highlighted_squares = initialState.highlighted_squares;
    state.moves = initialState.moves;                  
    state.movesAvailableForWhite = ['white pawn a', 'white pawn b', 'white pawn c', 'white pawn d', 'white pawn e', 'white pawn f', 'white pawn g', 'white pawn h', 'white knight b', 'white knight g'];
    state.movesAvailableForBlack = ['black pawn a', 'black pawn b', 'black pawn c', 'black pawn d', 'black pawn e', 'black pawn f', 'black pawn g', 'black pawn h', 'black knight b', 'black knight g'];
    state.stalemate = initialState.stalemate;
    state.past = initialState.past;
    state.future =  initialState.future;
    state.black_king_in_check = initialState.black_king_in_check;
    state.white_king_in_check = initialState.white_king_in_check;

    state.has_king_been_moved =  initialState.has_king_been_moved;
    state.has_rooks_been_moved = initialState.has_rooks_been_moved;
    
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
  