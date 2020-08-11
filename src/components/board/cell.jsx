import React from 'react';
import './style.scss';
import {useSelector} from "react-redux";

export const Cell = (props) => {
    const {isGameRunning} = useSelector(state => {
        return state;
    });
    return <button disabled={props.value !== '' || !isGameRunning} onClick={props.onClickCallback} className='cell'>{props.value}</button>
};
