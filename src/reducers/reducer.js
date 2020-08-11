import {CHECK_IS_GAME_RUNNING, CLICK_BOARD, RESET_STATE, SAVE_HISTORY_ARRAY, START_GAME} from "../consts";
import {getGameStatus} from "../utils";

export const getInitialState = () => {
    return {
        boardStatus: [
            '', '', '',
            '', '', '',
            '', '', ''
        ],
        currentMove: 'X',
        history: [],
        isGameRunning: false,
        winner: null,
    };
};

export default (state = getInitialState(), action) => {
    switch (action.type) {
        case RESET_STATE: {
            return {...getInitialState()};
        }
        case START_GAME: {
            return {...getInitialState(), isGameRunning: true}
        }
        case CLICK_BOARD: {
            let {boardStatus, currentMove, history} = state;
            boardStatus[action.gridNumber] = action.value;
            currentMove = currentMove === 'X' ? 'O' : 'X';
            const historyArray = {
                gridNumber: action.gridNumber,
                value: action.value,
            };
            history = [...history, historyArray];
            return {...state, boardStatus, currentMove, history};
        }
        case CHECK_IS_GAME_RUNNING: {
            const {isGameRunning, winner} = getGameStatus(state.boardStatus);
            return {...state, isGameRunning, winner};
        }
        case SAVE_HISTORY_ARRAY: {
            const {boardStatus} = state;
            action.historyArray.forEach((historyItem => {
                boardStatus[historyItem.gridNumber] = historyItem.value;
            }));
            const currentMove = action.historyArray[action.historyArray.length - 1].value === 'X' ? 'O' : 'X';
            return {...state, boardStatus, history: [...action.historyArray], currentMove: currentMove};
        }
        default:
            return {...state};
    }
}
