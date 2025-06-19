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
    this.isGameOver = false;
    this.score = 0;
    this.hasMovedOnce = false;
  }

  moveLeft() {
    if (this.isGameOver) return;
    const prevState = this.getState();

    const tbody = document.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');

    rows.forEach((row) => {
      const columns = row.querySelectorAll('td');

      const values = [];

      columns.forEach((cell) => {
        const value = cell.textContent.trim();

        if (value !== '') {
          values.push(value);
        }
      });

      for (let i = 0; i < values.length; i++) {
        if (values[i] === values[i + 1]) {
          values[i] *= 2;
          this.score += values[i];
          values.splice(i + 1, 1);
        }
      }

      columns.forEach((cell, i) => {
        cell.classList.forEach((className) => {
          if (className.startsWith('field-cell--')) {
            cell.classList.remove(className);
          }
        });

        if (values[i]) {
          cell.classList.add(`field-cell--${values[i]}`);
          cell.textContent = values[i];
        } else {
          cell.textContent = '';
        }
      });
    });

    const newState = this.getState();
    const hasChanged = this.areStatesEqual(prevState, newState);

    if (!hasChanged) {
      this.generateCube();
      this.getStatus();
      this.markFirstMove();
    }

    return this.score;
  }

  moveRight() {
    if (this.isGameOver) return;

    const prevState = this.getState();

    const tbody = document.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');

    rows.forEach((row) => {
      const columns = row.querySelectorAll('td');

      const values = [];

      for (let i = columns.length - 1; i >= 0; i--) {
        const value = columns[i].textContent.trim();

        if (value !== '') {
          values.push(value);
        }
      }

      for (let i = 0; i < values.length; i++) {
        if (values[i] === values[i + 1]) {
          values[i] *= 2;
          this.score += values[i];
          values.splice(i + 1, 1);
        }
      }

      for (let i = columns.length - 1; i >= 0; i--) {
        const cell = columns[i];

        cell.classList.forEach((className) => {
          if (className.startsWith('field-cell--')) {
            cell.classList.remove(className);
          }
        });

        const valueIndex = columns.length - 1 - i;
        const value = values[valueIndex];

        if (value) {
          cell.classList.add(`field-cell--${value}`);
          cell.textContent = value;
        } else {
          cell.textContent = '';
        }
      }
    });

    const newState = this.getState();
    const hasChanged = this.areStatesEqual(prevState, newState);

    if (!hasChanged) {
      this.generateCube();
      this.getStatus();
      this.markFirstMove();
    }

    return this.score;
  }

  moveUp() {
    if (this.isGameOver) return;

    const prevState = this.getState();

    const tbody = document.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    const colsNum = rows[0].querySelectorAll('td').length;

    for (let col = 0; col < colsNum; col++) {
      const values = [];

      for (let row = 0; row < rows.length; row++) {
        const cell = rows[row].querySelectorAll('td')[col];

        const value = cell.textContent.trim();

        if (value !== '') {
          values.push(value);
        }
      }

      for (let i = 0; i < values.length; i++) {
        if (values[i] === values[i + 1]) {
          values[i] *= 2;
          this.score += values[i];
          values.splice(i + 1, 1);
        }
      }

      for (let row = 0; row < rows.length; row++) {
        const cell = rows[row].querySelectorAll('td')[col];

        cell.classList.forEach((cl) => {
          if (cl.startsWith('field-cell--')) {
            cell.classList.remove(cl);
          }
        });

        if (values[row]) {
          cell.classList.add(`field-cell--${values[row]}`);
          cell.textContent = values[row];
        } else {
          cell.textContent = '';
        }
      }
    }

    const newState = this.getState();
    const hasChanged = this.areStatesEqual(prevState, newState);

    if (!hasChanged) {
      this.generateCube();
      this.getStatus();
      this.markFirstMove()
    }

    return this.score;
  }

  moveDown() {
    if (this.isGameOver) return;

    const prevState = this.getState();

    const tbody = document.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    const colsNum = rows[0].querySelectorAll('td').length;

    for (let col = 0; col < colsNum; col++) {
      const values = [];

      for (let row = rows.length - 1; row >= 0; row--) {
        const cell = rows[row].querySelectorAll('td')[col];

        const value = cell.textContent.trim();

        if (value !== '') {
          values.push(value);
        }
      }

      for (let i = 0; i < values.length; i++) {
        if (values[i] === values[i + 1]) {
          values[i] *= 2;
          this.score += values[i];
          values.splice(i + 1, 1);
        }
      }

      for (let row = rows.length - 1; row >= 0; row--) {
        const cell = rows[row].querySelectorAll('td')[col];
        const valueIndex = rows.length - 1 - row;

        cell.classList.forEach((cl) => {
          if (cl.startsWith('field-cell--')) {
            cell.classList.remove(cl);
          }
        });

        if (values[valueIndex]) {
          cell.classList.add(`field-cell--${values[valueIndex]}`);
          cell.textContent = values[valueIndex];
        } else {
          cell.textContent = '';
        }
      }
    }

    const newState = this.getState();
    const hasChanged = this.areStatesEqual(prevState, newState);

    if (!hasChanged) {
      this.generateCube();
      this.getStatus();
      this.markFirstMove()
    }


    return this.score;
  }

  /**
   * @returns {number}
   */
  getScore() {
    const score = document.querySelector('.game-score');
    score.textContent = this.score;
  }

  /**
   * @returns {number[][]}
   */
  getState() {
    const state = [];
    const rows = document.querySelectorAll('tbody tr');

    rows.forEach(row => {
      const rowState = [];
      const cells = row.querySelectorAll('td');

      cells.forEach(cell => {
        const value = parseInt(cell.textContent.trim());
        rowState.push(isNaN(value) ? 0 : value);
      });

      state.push(rowState);
    })

    return state;
  }

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
  getStatus() {
    const state = this.getState();

    const hasEmpty = state.some(row => row.includes(0));

    const isWin = state.some(row => row.includes(2048));

    if (!hasEmpty && !this.canMerge(state)) {
      this.isGameOver = true;
      const lose = document.querySelector('.message-lose');
      lose.classList.remove('hidden');
      return 'lose';
    }

    if (isWin) {
      this.isGameOver = true;
      const win = document.querySelector('.message-win');
      win.classList.remove('hidden');
      return 'win';
    }

    return 'playing';
  }

  /**
   * Starts the game.
   */
  start() {
    this.isGameOver = false;

    const message = document.querySelector('.message-start');

    message.classList.add('hidden');

    this.generateCube();
    this.generateCube();

    this.getScore();
  }

  /**
   * Resets the game.
   */
  restart() {
    this.isGameOver = false;
    this.hasMovedOnce = false;

    const mainButton = document.querySelector('.button');

    mainButton.classList.remove('restart');
    mainButton.classList.add('start');

    const message = document.querySelector('.message-start');
    message.classList.remove('hidden');

    const messageLose = document.querySelector('.message-lose');
    messageLose.classList.add('hidden');

    const messageWin = document.querySelector('.message-win');
    messageWin.classList.add('hidden');

    this.score = 0;

    const rows = document.querySelectorAll('tbody tr');

    rows.forEach(row => {
      row.querySelectorAll('td').forEach(col => {
        col.textContent = '';


        col.classList.forEach(className => {
          if (className.startsWith('field-cell--')) {
            col.classList.remove(className);
          }
        });
      })
    })

    this.getScore();
  }

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

  canMerge(state) {
    for (let row = 0; row < 4; row++){
      for (let col = 0; col < 4; col++){
        const current = state[row][col];

        if (col < 3 && current === state[row][col + 1]) {
          return true;
        }

        if (row < 3 && current === state[row + 1][col]) {
          return true;
        }
      }
    }

    return false;
  }

  areStatesEqual(state1, state2) {
    for (let row = 0; row < state1.length; row++) {
      for (let col = 0; col < state1[row].length; col++) {
        if (state1[row][col] !== state2[row][col]) {
          return false;
        }
      }
    }
    return true;
  }

  markFirstMove() {
  if (!this.hasMovedOnce) {
    const mainButton = document.querySelector('.button');
    mainButton.classList.remove('start');
    mainButton.classList.add('restart');
    this.hasMovedOnce = true;
  }
}

}

module.exports = Game;
