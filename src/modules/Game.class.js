'use strict';

/**
 * This class represents the game.
 * Now it has a basic structure, that is needed for testing.
 * Feel free to add more props and methods if needed.
 */
class Game {
  /**
   * Creates a new game instance.
   *
   * @param {number[][]} initialState
   * The initial state of the board.
   * @default
   * [[0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0]]
   *
   * If passed, the board will be initialized with the provided
   * initial state.
   */
  constructor(initialState) {
    // eslint-disable-next-line no-console
    console.log(initialState);
  }

  moveLeft() {}
  moveRight() {}
  moveUp() {}
  moveDown() {}

  /**
   * @returns {number}
   */
  getScore() {}

  /**
   * @returns {number[][]}
   */
  getState() {}

  /**
   * Returns the current game status.
   *
   * @returns {string} One of: 'idle', 'playing', 'win', 'lose'
   *
   * `idle` - the game has not started yet (the initial state);
   * `playing` - the game is in progress;
   * `win` - the game is won;
   * `lose` - the game is lost
   */
  getStatus() {}

  /**
   * Starts the game.
   */
  start() {
    const mainButton = document.querySelector('.button');
    mainButton.classList.remove("start");
    mainButton.classList.add("restart");

    const message = document.querySelector('.message-start');
    message.classList.add('hidden');

    this.generateCube();
    this.generateCube();
  }

  /**
   * Resets the game.
   */
  restart() {}

  generateCube() {
    const tbody = document.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');

    const randomRowIndex = Math.floor(Math.random() * rows.length);
    const randomRow = rows[randomRowIndex];

    const columns = randomRow.querySelectorAll('td');

    const randomColumnIndex = Math.floor(Math.random() * columns.length);
    const randomColumn = columns[randomColumnIndex];

    if (randomColumn.textContent.trim() !== '') {
      this.generateCube();
      return;
    }

    const value = Math.random() < 0.9 ? 2 : 4;

    randomColumn.classList.add(`field-cell--${value}`);
    randomColumn.textContent = value;
  }
}

module.exports = Game;
