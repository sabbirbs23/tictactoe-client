import React from 'react';
import {Cell} from "./cell";
import { useSelector, useDispatch } from 'react-redux';
import {clickOnBoard} from "../../actions/action";
import {getGameIdFromSession} from "../../utils";

const onClickCellCallback = (dispatch, value, gridNumber) => {
    const historyData = {
        gameId: getGameIdFromSession(),
        gridNumber,
        value,
    };

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(historyData)
    };

    fetch("http://localhost:8000/api/save-history", options)
        .then(res => res.json())
        .then(
            (result) => {
                dispatch(clickOnBoard(value, gridNumber))
            },
            (error) => {
                console.log(error);
            }
        )
};

const Board = () => {
    const {boardStatus: cells, currentMove} = useSelector(state => {
        return state;
    });

    const dispatch = useDispatch();

    return <div className='board'>
        {
            cells.map((cellValue, index) => {
                const onClickCell = onClickCellCallback.bind(this, dispatch, currentMove, index);
                return <Cell key={index} value={cellValue} onClickCallback={onClickCell}/>;
            })
        }
    </div>
};

export default Board;
