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

  moveLeft() {
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

    this.generateCube();
  }

  moveRight() {
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

    this.generateCube();
  }

  moveUp() {
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

    this.generateCube();
  }

  moveDown() {
    const tbody = document.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    const colsNum = rows[0].querySelectorAll('td').length;

    for (let col = 0; col < colsNum; col++) {
      const values = [];

      for (let row = rows.length - 1; row >= 0; row--) {
        const cell = rows[row].querySelectorAll('td')[col];

        const value = cell.textContent.trim();

        if (value !== '') {
          values.unshift(value);
        }
      }

      for (let i = 0; i < values.length; i++) {
        if (values[i] === values[i + 1]) {
          values[i] *= 2;
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

    this.generateCube();
  }

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

    mainButton.classList.remove('start');
    mainButton.classList.add('restart');

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
