import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import './style.scss';
import Board from "../board";
import {useDispatch, useSelector} from "react-redux";
import GameHistory from "../game-history";
import {checkIfGameRunning, resetState, saveHistoryArray} from "../../actions/action";
import {createGame, getGameIdFromSession, getHistoryData} from "../../utils";

const Game = () => {
    const dispatch = useDispatch();
    let { gameId } = useParams();
    let gameIdInSession = getGameIdFromSession();
    const {currentMove, isGameRunning, history, winner} = useSelector(state => {
        return state;
    });

    useEffect(() => {
        dispatch(checkIfGameRunning());
        if(!history.length) {
            if(gameId === gameIdInSession) {
                getHistoryData(gameId).then(historyData => {
                    if(historyData && historyData.length) {
                        dispatch(saveHistoryArray(historyData));
                        dispatch(checkIfGameRunning());
                    }
                });
            } else {
                window.location.href = '/';
            }
        }
    }, [currentMove, gameId,]);

    const onClickStartGame = () => {
        createGame();
    };

    return (
        <div className='game'>
            <div className='gameInfo'>
                <span className='gameId'>Game: {gameId}</span>
                {isGameRunning && !winner && <span className='currentTurn'>Current Turn: {currentMove === 'X' ? 'Player One' : 'Player Two'}</span>}
            </div>
            <div className='boardWrapper'>
                <Board />
                <GameHistory history={history} />
            </div>
            {!isGameRunning &&  (
                <div className='scoreBoardWrapper'>
                    <h1>Game Over!</h1>
                    <h3>{!winner ? 'Draw!' : winner === 'X' ? 'Player One won!': 'Player Two won!'}</h3>
                    <Link to='/' onClick={dispatch.bind(this, resetState())}>Back to Home Page</Link>
                    <button onClick={onClickStartGame}>Start a new Game</button>
                </div>
            ) }
        </div>
    );

};

export default Game;
