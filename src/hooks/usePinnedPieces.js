import {useMemo, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';


//this is where i left off, the hook seems to be working, but i may need to optimized the code before going further

function usePinnedPieces({piece, row, column, color}) {
    const board = useSelector(state => state.chess.board);
    const [pinnedSquares, setPinnedSquares] = useState();
    const [legalMoves, setLegalMoves] = useState([]);
    const dispatch = useDispatch();

    useMemo(() => {
        if(!board[row][column].includes('queen') && !board[row][column].includes('rook')) return;

        const squaresBetweenKingAndAttacker = [];
        const legalPinnedMoves = [];
        const opposing_color = color === 'white' ? 'black' : 'white';
        let kingExists = false;

        for(let i = row + 1; i <= 7; i++){                        //north
            if(board[i][column].includes(color))
                return
            else if(board[i][column] === '')
                legalPinnedMoves.push({row: i, column});      
            
            else if(board[i][column] === `${opposing_color} king`){
                kingExists = true;
                break;
            }
            else if(!board[i][column].includes(color)){
                squaresBetweenKingAndAttacker.push({row: i, column})
                legalPinnedMoves.push({row: i, column});
            }
            else
              break; 
          }



        if(kingExists && squaresBetweenKingAndAttacker.length === 1){
            setPinnedSquares(squaresBetweenKingAndAttacker[0])            
            setLegalMoves(legalPinnedMoves)
        }
        else if(kingExists && squaresBetweenKingAndAttacker.length > 1 && pinnedSquares){
            setPinnedSquares(null)            
            setLegalMoves([])
        }

    }, [board])


    useMemo(() => {
        if(!board[row][column].includes('queen') && !board[row][column].includes('rook')) return;

        const squaresBetweenKingAndAttacker = [];
        const legalPinnedMoves = [];
        const opposing_color = color === 'white' ? 'black' : 'white';
        let kingExists = false;

        for(let i = row - 1; i >= 0; i--){                        //south
            if(board[i][column].includes(color))
                return
            else if(board[i][column] === '')
                legalPinnedMoves.push({row: i, column});      
            
            else if(board[i][column] === `${opposing_color} king`){
                kingExists = true;
                break;
            }
            else if(!board[i][column].includes(color)){
                squaresBetweenKingAndAttacker.push({row: i, column})
                legalPinnedMoves.push({row: i, column});
            }
            else
              break; 
          }



          if(kingExists && squaresBetweenKingAndAttacker.length === 1){
            setPinnedSquares(squaresBetweenKingAndAttacker[0])            
            setLegalMoves(legalPinnedMoves)
        }
        else if(kingExists && squaresBetweenKingAndAttacker.length > 1 && pinnedSquares){
            setPinnedSquares(null)            
            setLegalMoves([])
        }
    }, [board])


    useMemo(() => {
        if(!board[row][column].includes('queen') && !board[row][column].includes('rook')) return;

        const squaresBetweenKingAndAttacker = [];
        const legalPinnedMoves = [];
        const opposing_color = color === 'white' ? 'black' : 'white';
        let kingExists = false;

        for(let i = column - 1; i >= 0; i--){                        //west
            if(board[row][i].includes(color))
                return
            else if(board[row][i] === '')
                legalPinnedMoves.push({row, column: i});      
            
            else if(board[row][i] === `${opposing_color} king`){
                kingExists = true;
                break;
            }
            else if(!board[row][i].includes(color)){
                squaresBetweenKingAndAttacker.push({row, column: i})
                legalPinnedMoves.push({row, column: i});
            }
            else
              break; 
          }


        if(kingExists && squaresBetweenKingAndAttacker.length === 1){
            setPinnedSquares(squaresBetweenKingAndAttacker[0])            
            setLegalMoves(legalPinnedMoves)
        }
        else if(kingExists && squaresBetweenKingAndAttacker.length > 1 && pinnedSquares){
            setPinnedSquares(null)            
            setLegalMoves([])
        }
    }, [board])

    useMemo(() => {
        if(!board[row][column].includes('queen') && !board[row][column].includes('rook')) return;

        const squaresBetweenKingAndAttacker = [];
        const legalPinnedMoves = [];
        const opposing_color = color === 'white' ? 'black' : 'white';
        let kingExists = false;

        for(let i = column + 1; i <= 7; i++){                        //east
            if(board[row][i].includes(color))
                return
            else if(board[row][i] === '')
                legalPinnedMoves.push({row, column: i});      
            
            else if(board[row][i] === `${opposing_color} king`){
                kingExists = true;
                break;
            }
            else if(!board[row][i].includes(color)){
                squaresBetweenKingAndAttacker.push({row, column: i})
                legalPinnedMoves.push({row, column: i});
            }
            else
              break; 
          }



          if(kingExists && squaresBetweenKingAndAttacker.length === 1){
            setPinnedSquares(squaresBetweenKingAndAttacker[0])            
            setLegalMoves(legalPinnedMoves)
        }
        else if(kingExists && squaresBetweenKingAndAttacker.length > 1 && pinnedSquares){
            setPinnedSquares(null)            
            setLegalMoves([])
        }
    }, [board])


    useMemo(() => {
        if(!board[row][column].includes('queen') && !board[row][column].includes('bishop')) return;

        const squaresBetweenKingAndAttacker = [];
        const legalPinnedMoves = [];
        const opposing_color = color === 'white' ? 'black' : 'white';
        let kingExists = false;

        for(let i = row + 1, j = column - 1; i <= 7 && j >= 0; i++, j--){                        //north west
            if(board[i][j].includes(color))
                return
            else if(board[i][j] === '')
                legalPinnedMoves.push({row: i, column: j});      
            else if(board[i][j] === `${opposing_color} king`){
                kingExists = true;
                break;
            }
            else if(!board[i][j].includes(color)){
                squaresBetweenKingAndAttacker.push({row: i, column: j})
                legalPinnedMoves.push({row: i, column: j});
            }
            else
              break; 
          }

          if(kingExists && squaresBetweenKingAndAttacker.length === 1){
            setPinnedSquares(squaresBetweenKingAndAttacker[0])            
            setLegalMoves(legalPinnedMoves)
        }
        else if(kingExists && squaresBetweenKingAndAttacker.length > 1 && pinnedSquares){
            console.log('im here')
            setPinnedSquares(null)            
            setLegalMoves([])
        }


    }, [board])

    useMemo(() => {
        if(!board[row][column].includes('queen') && !board[row][column].includes('bishop')) return;

        const squaresBetweenKingAndAttacker = [];
        const legalPinnedMoves = [];
        const opposing_color = color === 'white' ? 'black' : 'white';
        let kingExists = false;

        for(let i = row + 1, j = column + 1; i <= 7 && j <= 7; i++, j++){                        //north east
            if(board[i][j].includes(color))
                return
            else if(board[i][j] === '')
                legalPinnedMoves.push({row: i, column: j});      
            
            else if(board[i][j] === `${opposing_color} king`){
                kingExists = true;
                break;
            }
            else if(!board[i][j].includes(color)){
                squaresBetweenKingAndAttacker.push({row: i, column: j})
                legalPinnedMoves.push({row: i, column: j});
            }
            else
              break; 
          }



        if(kingExists && squaresBetweenKingAndAttacker.length === 1){
            setPinnedSquares(squaresBetweenKingAndAttacker[0])            
            setLegalMoves(legalPinnedMoves)
        }
        else if(kingExists && squaresBetweenKingAndAttacker.length > 1 && pinnedSquares){
            setPinnedSquares(null)            
            setLegalMoves([])
        }
    }, [board])


    useMemo(() => {
        if(!board[row][column].includes('queen') && !board[row][column].includes('bishop')) return;

        const squaresBetweenKingAndAttacker = [];
        const legalPinnedMoves = [];
        const opposing_color = color === 'white' ? 'black' : 'white';
        let kingExists = false;

        for(let i = row - 1, j = column - 1; i >= 0 && j >= 0; i--, j--){                        //south west
            if(board[i][j].includes(color))
                return
            else if(board[i][j] === '')
                legalPinnedMoves.push({row: i, column: j});      
            
            else if(board[i][j] === `${opposing_color} king`){
                kingExists = true;
                break;
            }
            else if(!board[i][j].includes(color)){
                squaresBetweenKingAndAttacker.push({row: i, column: j})
                legalPinnedMoves.push({row: i, column: j});
            }
            else
              break; 
          }




        if(kingExists && squaresBetweenKingAndAttacker.length === 1){
            setPinnedSquares(squaresBetweenKingAndAttacker[0])            
            setLegalMoves(legalPinnedMoves)
        }
        else if(kingExists && squaresBetweenKingAndAttacker.length > 1 && pinnedSquares){
            setPinnedSquares(null)            
            setLegalMoves([])
        }
    }, [board])

    useMemo(() => {
        if(!board[row][column].includes('queen') && !board[row][column].includes('bishop')) return;

        const squaresBetweenKingAndAttacker = [];
        const legalPinnedMoves = [];
        const opposing_color = color === 'white' ? 'black' : 'white';
        let kingExists = false;

        for(let i = row - 1, j = column + 1; i >= 0 && j <= 7; i--, j++){                        //south east
            if(board[i][j].includes(color))
                return
            else if(board[i][j] === '')
                legalPinnedMoves.push({row: i, column: j});      
            
            else if(board[i][j] === `${opposing_color} king`){
                kingExists = true;
                break;
            }
            else if(!board[i][j].includes(color)){
                squaresBetweenKingAndAttacker.push({row: i, column: j})
                legalPinnedMoves.push({row: i, column: j});
            }
            else
              break; 
        }

        if(kingExists && squaresBetweenKingAndAttacker.length === 1){
            setPinnedSquares(squaresBetweenKingAndAttacker[0])            
            setLegalMoves(legalPinnedMoves)
        }
        else if(kingExists && squaresBetweenKingAndAttacker.length > 1 && pinnedSquares){
            setPinnedSquares(null)            
            setLegalMoves([])
        }
    }, [board])

    useEffect(() => {
        if(!pinnedSquares && !legalMoves.length)
            dispatch({type: 'CLEAR_PINNED_PIECES', payload: {piece: `${color} ${piece}`}});
        else
            dispatch({type: 'SET_PINNED_PIECES', payload: {piece: `${color} ${piece}`, square: pinnedSquares, legalPinnedMoves: legalMoves}})

    }, [pinnedSquares, legalMoves])


}

export default usePinnedPieces;