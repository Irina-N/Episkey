'use strict';

window.addEventListener('load', () => {
    const board = new Board();
    const game = new Game();
    
    board.init();
    game.init(board);
});