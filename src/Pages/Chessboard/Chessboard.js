import React, {useMemo, useRef, useEffect, useCallback} from 'react';
import ShowMovesMobile from './SideBar/ShowMoves';
import PlayerToPlayerCommunication from './PlayerToPlayerCommunication';
import AI_Player from './AI_Player';
import PiecesTakenMobile from './SideBar/PiecesTaken';
import Squares from './Squares';
import SideBar from './SideBar';
import DeclareWinner from './DeclareWinner';
import MobileDisplayTurn from './MobileDisplayTurn';
import useMediaQuery from '~/Hooks/useMediaQuery';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom';
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import {syncStateWithDatabase} from '!/ChessReducer';
import * as styles from './styles.module.css';


//The chessboard is represented by the board global state, a 2-dimensional array that has a total of 64 elements

/* 
    [
        ['white rook a', 'white knight b', 'white bishop c', 'white queen d', 'white king e', 'white bishop f', 'white knight g', 'white rook h'],
        ['white pawn a', 'white pawn b', 'white pawn c', 'white pawn d', 'white pawn e', 'white pawn f', 'white pawn g', 'white pawn h'],
        ['', '', '', '', '', '', '', '',],
        ['', '', '', '', '', '', '', '',],
        ['', '', '', '', '', '', '', '',],
        ['', '', '', '', '', '', '', '',],
        ['black pawn a', 'black pawn b', 'black pawn c', 'black pawn d', 'black pawn e', 'black pawn f', 'black pawn g', 'black pawn h'],
        ['black rook a', 'black knight b', 'black bishop c', 'black queen d', 'black king e', 'black bishop f', 'black knight g', 'black rook h'],
    ],
*/

//Each element is represented by a <Squares/> component that will either have a chess piece (queen, knight, pawn, etc...) or none at all
//Each chess piece is a component that is either a <Queen/>, <Knight/>, <Pawn/> component that dispatches an action to the reducer when it is clicked on
// the action will enable certain squares on the board to be used by a piece


//When you click on one of these squares, then it will cause a change in the board state and move a piece from one square to another

//Everytime there is a change to the board state, it will trigger a useEffect within the <King/> component, this useEffect will check if the king is in check
//If the king is in check, then the useEffect will dispatch an action that will create an array of squares that is inbetween the king and the attacker
//At this point, only pieces that can move into these squares will be allowed to move.
//Or you can simply move the king

//Everytime there is a change to the board state, it will trigger a useEffect within all <Queen/>, <Knight/>, <Pawn/>, etc... components, 
// this useEffect will dispatch an action that will count the number of available moves for that specific piece
//if there are no available moves for that piece, then the piece will be removed from the 'state.availableMovesForBlack' array
//if the 'state.availableMovesForBlack' array is empty and the king has no legal squares and it is NOT in check, then it will be a stalemate.game_over

//Everytime there is a change to the board state, it will trigger a useEffect within the <Queen/>, <Rook/>, <Bishop/> components that 
// will dispatch an action to see if a piece has been pinned
// if a black pawn is between the white queen and the black king, that black pawn cannot be moved, so it will be stored within the pinned_pieces array



/* 
    this is where i left off, i fixed the bug with both players having the same user_color and opponent_color
    i created a route on the back-end to delete the match document if either player disconnects from the 
    webRTC connection, the match is won by one of the players, or if either player leaves the session unexpectedly

    i need to test everything out now
*/


function Chessboard() {
    const {matchId} = useParams();
    const [mobile] = useMediaQuery('(max-width: 620px)');
    const navigate = useNavigate();
    const columns = useRef(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
    const dispatch = useDispatch();
    const userColor = useSelector(state => state.settings.user_color)
    const connectionError = useSelector(state => state.webRTC.error);
    const checkmate = useSelector(state => state.chess.checkmate.game_over);


    /* 
    const endMatch = useCallback(async () => {
        try{
            const response = await fetch(`https://world-class-chess-server.com/delete_match/${matchId}`, {
                method: 'DELETE'
            });

            if(response.status === 200){
                const message = await response.text();
                console.log(message);
                navigate('/menu');
            }
            else{
                const message = await response.text();
                console.error('Internal server error occurred in this endpoint /delete_match ', message);
            }
        }
        catch(error){
            const message = error.message;
            console.error('Server went offline in this endpoint /delete_match ', message);
            dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Server is offline, please try again later'}})
        }   
    }, [matchId])
    
    */

    const squares = useMemo(() => {
        const squares = [];
        if(userColor === 'white')
            for (let row = 0; row <= 7; row++) { 
                const alternate = row % 2 === 0
                for (let column = 0; column <= 7; column++) { 
                    let square;
                    const currentColumn = columns.current[column];
                    const id = `${currentColumn}${row + 1}`

                    if(alternate)
                        square = column % 2 === 0 ? 'lightSquare' : 'darkSquare';
                    else
                        square = column % 2 !== 0 ? 'lightSquare' : 'darkSquare';
                        
                    squares.push( 
                        <Squares colorOfSquare={square} row={row} column={column} id={id} key={id}/>
                    ); 
                }        
            }
        else
            for (let row = 7; row >= 0; row--) { 
                const alternate = row % 2 === 0
                for (let column = 0; column <= 7; column++) { 
                    let square;
                    const currentColumn = columns.current[column];
                    const id = `${currentColumn}${row + 1}`

                    if(alternate)
                        square = column % 2 === 0 ? 'lightSquare' : 'darkSquare';
                    else
                        square = column % 2 !== 0 ? 'lightSquare' : 'darkSquare';
                        
                    squares.push( 
                        <Squares colorOfSquare={square} row={row} column={column} id={id} key={id}/>
                    ); 
                }        
            }
        return squares;
    }, [userColor])


    useEffect(() => {
        return () => {
            setTimeout(() => {
                dispatch({type: 'RESET_STATE'});
            }, 500)
        }
    }, [])


    useEffect(() => {
        if(matchId === 'ai') return;
        dispatch(syncStateWithDatabase(matchId))
    }, [matchId])

    useEffect(() => {
        if(!connectionError || checkmate) return;

        dispatch({type: 'CANCEL_CONNECTION'});
        dispatch({type: 'DISPLAY_POPUP_MESSAGE', payload: {message: 'Opponent was disconnected'}});

    }, [connectionError, checkmate])

    /*
    useEffect(() => {
        const handleConnection = () => {
            dispatch({type: 'CANCEL_CONNECTION'});
            fetch(`https://world-class-chess-server.com/delete_match/${matchId}`, {
                method: 'DELETE',
                keepalive: true
            });
        }

        window.addEventListener('beforeunload', handleConnection)

        return () => {
            handleConnection && handleConnection();
            window.removeEventListener('beforeunload', handleConnection)
        }
    }, [])    
    */


    return(
        <DndProvider backend={HTML5Backend}> 
            <section className={styles.chess}> 
                <MobileDisplayTurn/>
                <div className={styles.chess_board}>
                    {squares}
                </div>
                {mobile && <ShowMovesMobile/>}
                {mobile && <PiecesTakenMobile mobile={mobile}/>}
                <SideBar/>
                <DeclareWinner/>
                {matchId === 'ai' && <AI_Player/>}
                {matchId !== 'ai' && <PlayerToPlayerCommunication matchId={matchId}/>}                         
            </section>
        </DndProvider>
    )
}

export default Chessboard;