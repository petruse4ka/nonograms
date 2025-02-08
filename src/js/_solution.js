import { templates } from './_gameData';
import { resetGame } from './_resetGame';

let isSolutionState = false;

export function getSolutionState() {
  return isSolutionState;
}

export function setSolutionState(value) {
  isSolutionState = value;
}

export function showSolution() {
  const activeTemplate = document.querySelector(
    '.game__template-select--active'
  );

  const currentTemplate = templates.find(
    (template) => template.id === activeTemplate.dataset.templateId
  );

  resetGame();
  setSolutionState(true);

  const gameCells = document.querySelectorAll('.game__grid-cell');
  const size = currentTemplate.solution.length;

  gameCells.forEach((cell, index) => {
    const row = Math.floor(index / size);
    const col = index % size;

    if (currentTemplate.solution[row][col] === 1) {
      cell.classList.add('game__grid-cell--checked');
    }
  });

  const gameGrid = document.querySelector('.game__grid');
  gameGrid.classList.add('game__grid--disabled');
}
