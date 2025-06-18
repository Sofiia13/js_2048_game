'use strict';

// Uncomment the next lines to use your game instance in the browser
const Game = require('../modules/Game.class');
const game = new Game();

// Write your code here
const mainButton = document.querySelector('.button');

mainButton.addEventListener('click', () => {
  if (mainButton.classList.contains('start')) {
    game.start();
  } else if (mainButton.classList.contains('restart')) {
    game.restart();
  }
});
