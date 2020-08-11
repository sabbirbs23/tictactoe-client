import React from 'react';
import {findWinner, getGridNumberFromRowColumn} from "./utils";

test('testing getGridNumberFromRowColumn with (0, 0)', () => {
    const gridNumber = getGridNumberFromRowColumn(0, 0);
    expect(gridNumber).toBe(0);
});

test('testing getGridNumberFromRowColumn with (1, 2)', () => {
    const gridNumber = getGridNumberFromRowColumn(1, 2);
    expect(gridNumber).toBe(5);
});

test('testing findWinner with a game where player two wins', () => {
    const boardStatus = [
        'X','X','O',
        'X','O','',
        'O','',''
    ];
    expect(findWinner(boardStatus)).toBe('O');
});

test('testing findWinner with a game where there is no winner', () => {
    const boardStatus = [
        'X','X','',
        'X','O','',
        'O','',''
    ];
    expect(findWinner(boardStatus)).toBe(null);
});
