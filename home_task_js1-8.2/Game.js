'use strict';

class Game {
    constructor() {
        this.status = 'playing';
        this.boardValues = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
        this.phase = 'X';
    }

    init(board) {
        this.board = board;  
        this.initEventHandlers();      
    }

    initEventHandlers() {
        this.board.gameTableElement.addEventListener('click', event => this.cellClickHandler(event));
    }
    
    cellClickHandler(event) {
        if (!this.isCorrectClick(event)) {
            return;
        }

        this.fillCell(event);

        if (this.hasWon()) {
            this.setStatusStopped();
            this.sayWonPhrase();
        }

        this.togglePhase();
    }

    
    isCorrectClick(event) {
        return this.isStatusPlaying() && this.isClickByCell(event) && this.isCellEmpty(event);
    }

    isStatusPlaying() {
        return this.status === 'playing';
    }

    isClickByCell(event) {
        return event.target.tagName === 'TD';
    }

    isCellEmpty(event) {
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;

        return this.boardValues[row][col] === '';
    }

    fillCell(event) {
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;

        this.boardValues[row][col] = this.phase;
        event.target.textContent = this.phase;
    }

    hasWon() {

        return this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }) ||
            this.isLineWon({ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }) ||
            this.isLineWon({ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }) ||

            this.isLineWon({ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }) ||
            this.isLineWon({ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }) ||
            this.isLineWon({ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }) ||

            this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }) ||
            this.isLineWon({ x: 0, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 0 });
    }

    isLineWon(a, b, c) {
        let value = this.boardValues[a.y][a.x] + this.boardValues[b.y][b.x] + this.boardValues[c.y][c.x];
        return value === 'XXX' || value === '000';
    }

        setStatusStopped() {
        this.status = 'stopped';
    }

   
    sayWonPhrase() {
        let figure = this.phase === 'X' ? 'Крестики' : 'Нолики';
        alert(`${figure} выиграли!`);
    }

    
    togglePhase() {
        this.phase = this.phase === 'X' ? '0' : 'X';
    }
};