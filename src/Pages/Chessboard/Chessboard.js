import React, {useMemo} from 'react';
import Squares from './Squares';
import SideBar from './SideBar';
import DeclareWinner from './DeclareWinner';
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import * as styles from './styles.module.css';

//The chessboard is a container of <Squares/> components
//The chessboard is represented by the board global state, a 2-dimensional array that has a total of 64 elements
//Each element is represented by a <Squares/> component that will either have a chess piece (queen, knight, pawn, etc...) or none at all
//Each chess piece is a component that is either a <Queen/>, <Knight/>, <Pawn/> component that dispatches an action to the reducer when it is clicked on
// the action will highlight certain squares on the board as blue or red, letting the player know that they can move the piece to that square
// blue squares will be a legal move
// red squares will be a legal TAKE move

function Chessboard() {

    const squares = useMemo(() => {
        const squares = [];
        for (let row = 7; row >= 0; row--) { 
            for (let column = 0; column <= 7; column++) { 
                squares.push( 
                    <Squares row={row} column={column} key={`${row + 1} ${column + 1}`}/>
                ); 
            }        
        }
        return squares;
    }, [])


    return(
        <DndProvider backend={HTML5Backend}> 
            <section className={styles.chess}> 
                <div className={styles.chess_board}>
                    {squares}
                </div>
                <SideBar/>
                <DeclareWinner/>
            </section>
        </DndProvider>
    )
}

export default Chessboard;