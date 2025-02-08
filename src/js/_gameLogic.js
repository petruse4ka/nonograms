import { saveResult, createHighScoresList } from './_saveResults';
import { getSolutionState } from './_solution';

export function checkWin(gameGrid, solution) {
  if (getSolutionState() === true) {
    return false;
  }

  for (let i = 0; i < solution.length; i += 1) {
    for (let j = 0; j < solution[i].length; j += 1) {
      const correctCellCondition =
        solution[i][j] === 1 ? 'checked' : 'notChecked';
      const testCellCondition = gameGrid[i][j].classList.contains(
        'game__grid-cell--checked'
      )
        ? 'checked'
        : 'notChecked';

      if (correctCellCondition !== testCellCondition) {
        return false;
      }
    }
  }
  return true;
}

export function showWinMessage(duration, template) {
  const gameGrid = document.querySelector('.game__grid');
  gameGrid.classList.add('game__grid--disabled');
  const message = document.createElement('div');
  message.className = 'game__message game__message--win';
  message.textContent = `Great! You have solved the nonogram in ${duration} seconds!`;

  const gameContainer = document.querySelector('.game');
  gameContainer.insertAdjacentElement('afterend', message);

  saveResult(template, duration);

  const oldTable = document.querySelector('.game__high-scores');
  if (oldTable) {
    oldTable.remove();
  }
  createHighScoresList();
}

export function removeWinMessage() {
  const winMessage = document.querySelector('.game__message--win');
  if (winMessage) {
    winMessage.remove();
  }
}
