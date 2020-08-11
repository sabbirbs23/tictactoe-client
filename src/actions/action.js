import {CHECK_IS_GAME_RUNNING, CLICK_BOARD, RESET_STATE, SAVE_HISTORY_ARRAY, START_GAME} from "../consts";

export const resetState = () => {
    return {
        type: RESET_STATE,
    }
};

export const startGame = () => {
    return {
        type: START_GAME,
    }
};

export const clickOnBoard = (value, gridNumber) => {
    return {
        type: CLICK_BOARD,
        gridNumber,
        value,
    }
};

export const checkIfGameRunning = () => {
    return {
        type: CHECK_IS_GAME_RUNNING,
    }
};

export const saveHistoryArray = (historyArray) => {
    return {
        type: SAVE_HISTORY_ARRAY,
        historyArray,
    }
};
