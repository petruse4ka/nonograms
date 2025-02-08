import { startTimer, formatTimeToString, formatStringToTime } from './_timer';
import { templates } from './_gameData';
import { createGameGrid } from './_gameGrid';
import { resetGame } from './_resetGame';

export function saveGame() {
  const gameState = {
    savedCells: [],
    savedTime: 0,
    templateId: '',
  };

  const gameCells = document.querySelectorAll('.game__grid-cell');
  gameCells.forEach((cell) => {
    gameState.savedCells.push({
      isChecked: cell.classList.contains('game__grid-cell--checked'),
      isCrossed: cell.classList.contains('game__grid-cell--crossed'),
    });
  });

  const currentGameTime = document.querySelector('.game__timer').textContent;
  gameState.savedTime = formatStringToTime(currentGameTime);

  const currentTemplate = document.querySelector(
    '.game__template-select--active'
  );
  gameState.templateId = currentTemplate.dataset.templateId;

  localStorage.setItem('gameState', JSON.stringify(gameState));
}

export function loadGame() {
  resetGame();

  const savedState = localStorage.getItem('gameState');
  const gameState = JSON.parse(savedState);
  const template = templates.find(
    (template) => template.id === gameState.templateId
  );

  const difficulty = template.level.split(' ')[0];
  const difficultyButtons = document.querySelectorAll(
    '.game__difficulty-select'
  );
  difficultyButtons.forEach((button) => {
    if (button.textContent === difficulty) {
      button.click();
    }
  });

  const templateSelectors = document.querySelectorAll('.game__template-select');
  templateSelectors.forEach((selector) =>
    selector.classList.remove('game__template-select--active')
  );

  const savedTemplateSelector = document.querySelector(
    `[data-template-id="${gameState.templateId}"]`
  );
  savedTemplateSelector.classList.add('game__template-select--active');

  const currentGameGrid = document.querySelector('.game__grid');
  if (currentGameGrid) {
    currentGameGrid.remove();
  }

  createGameGrid(template.size, template);

  const gameCells = document.querySelectorAll('.game__grid-cell');
  gameCells.forEach((cell, index) => {
    if (gameState.savedCells[index].isChecked) {
      cell.classList.add('game__grid-cell--checked');
    }
    if (gameState.savedCells[index].isCrossed) {
      cell.classList.add('game__grid-cell--crossed');
    }
  });

  const timer = document.querySelector('.game__timer');
  timer.textContent = formatTimeToString(gameState.savedTime);
  startTimer();
}

export function hasSavedGame() {
  if (localStorage.getItem('gameState')) {
    return true;
  }
}
