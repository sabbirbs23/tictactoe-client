import React, {Fragment} from 'react';
import './style.scss';
import {Link, Redirect} from "react-router-dom";
import {createGame} from "../../utils";

const Home = () => {
    return (
        <Fragment>
            <h1>Tic Tac Toe</h1>
            <div className='linkWrapper'>
                <button onClick={createGame}>Start Game</button>
            </div>
        </Fragment>
    );
}

export default Home;
