import React from 'react';
import {getPlayerName} from "../../utils";
import './style.scss';

const GameHistory = (props) => {
    const getHistoryItem = () => {
        const {history} = props;
        return history.map((historyItem, index) =>
            <span key={index} className='historyItem'>{`${getPlayerName(historyItem.value)} put ${historyItem.value} at cell ${historyItem.gridNumber}`}</span>
        );
    };

    return (
        <div className='historyWrapper'>
            <h3>Game History</h3>
            {props.history.length > 0 ? getHistoryItem() : ''}
        </div>
    );
};

export default GameHistory;
