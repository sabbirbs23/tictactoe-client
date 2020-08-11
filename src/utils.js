export const getGridNumberFromRowColumn = (row, column) => {
    return row*3 + column;
};

export const getGameStatus = (boardStatus) => {
    const winner = findWinner(boardStatus);
    return {isGameRunning: !winner && boardStatus.filter(item => item === '').length !== 0, winner: winner};
};

export const findWinner = (boardStatus) => {
    let winner = null;
    let diagOneSum = 0;
    let diagTwoSum = 0;

    for(let i = 0; i < 3; i++) {
        let rowSum = 0;
        let columnSum = 0;

        for(let j = 0; j < 3; j++) {
            let cellNumber = getGridNumberFromRowColumn(i, j);
            rowSum += getWeightFromCellValue(boardStatus[cellNumber]);
            cellNumber = getGridNumberFromRowColumn(j, i);
            columnSum += getWeightFromCellValue(boardStatus[cellNumber]);

            // diagonal cells
            if(i === j) {
                cellNumber = getGridNumberFromRowColumn(i,j);
                diagOneSum += getWeightFromCellValue(boardStatus[cellNumber]);
            }

            // second diagonal sum
            if (i === 3 - j - 1) {
                cellNumber = getGridNumberFromRowColumn(i,j);
                diagTwoSum += getWeightFromCellValue(boardStatus[cellNumber]);
            }

        }

        winner = getWinner(rowSum) || getWinner(columnSum);
        if(winner){
            return winner;
        }
    }
    winner = getWinner(diagOneSum) || getWinner(diagTwoSum);
    return winner;
};

const getWeightFromCellValue = (value) => {
    if(value) {
        return value === 'X' ? 1 : -1;
    }
    return 0;
};

const getWinner = (value) => {
    if(Math.abs(value) === 3) {
        return value === 3 ? 'X' : 'O';
    }
    return null;
};

export const getPlayerName = (value) => value === 'X' ? 'Player One' : 'Player Two';

export const setGameIdInSession = (gameId) => {
    return sessionStorage.setItem('gameId', gameId);
};

export const getGameIdFromSession = () => {
    return sessionStorage.getItem('gameId');
};

export const removeGameIdFromSession = () => {
    return sessionStorage.removeItem('gameId');
};

export const createGame = () => {
    removeGameIdFromSession();
    fetch("http://localhost:8000/api/create-game", {method: 'post'})
        .then(res => res.json())
        .then(
            (result) => {
                setGameIdInSession(result.data.gameId);
                window.location.href = result.data.gameId;
            },
            (error) => {
                console.log(error);
            }
        )
};

export const getHistoryData = async (gameId) => {
    try {
        const response = await fetch(`http://localhost:8000/api/game-history/${gameId}`);
        const data =  await response.json();
        return data.data.map(({value, gridNumber}) => {
            return {value, gridNumber};
        });
    }catch(err) {
        console.log(err);
    }
};
