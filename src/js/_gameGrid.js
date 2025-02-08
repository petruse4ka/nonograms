import { checkWin, showWinMessage } from './_gameLogic';
import { startTimer, stopTimer, getGameDuration } from './_timer';
import {
  playCheckSound,
  playCrossSound,
  playEmptySound,
  playWinSound,
} from './_sounds';
import { getSolutionState } from './_solution';
import {
  disableGameControls,
  enableGameControls,
  getSaveButton,
  getSolutionButton,
} from './_controls';

let isGameWon = false;

export function setGameWon(value) {
  isGameWon = value;
}

export function createGameContainer() {
  const gameContainer = document.createElement('div');
  gameContainer.className = 'game';
  document.body.insertBefore(gameContainer, document.querySelector('.footer'));
  return gameContainer;
}

export function createGameGrid(size, puzzleData) {
  const gameContainer = document.querySelector('.game');
  const gameGrid = document.createElement('div');
  gameGrid.className = 'game__grid';

  if (getSolutionState() || isGameWon) {
    gameGrid.classList.add('game__grid--disabled');
  }

  const mainSection = document.createElement('div');
  mainSection.className = 'game__grid-section game__grid-section--main';

  const topRow = document.createElement('div');
  topRow.className = 'game__grid-row';

  const cornerContainer = document.createElement('div');
  cornerContainer.className =
    'game__clues-container game__clues-container--top game__clues-container--corner';
  topRow.appendChild(cornerContainer);

  // Top clues
  for (let i = 0; i < size; i += 1) {
    const topCluesContainer = document.createElement('div');
    topCluesContainer.className =
      'game__clues-container game__clues-container--top';
    if ((i + 1) % 5 === 0)
      topCluesContainer.classList.add('game__grid-cell--divider-vertical');

    puzzleData.columnClues[i].forEach((clue) => {
      const clueCell = document.createElement('div');
      clueCell.className = 'game__clues-cell';
      clueCell.textContent = clue;
      topCluesContainer.appendChild(clueCell);
    });

    topRow.appendChild(topCluesContainer);
  }

  mainSection.appendChild(topRow);

  const checkedCells = [];

  // Left clues and game cells
  for (let i = 0; i < size; i += 1) {
    const gridRow = document.createElement('div');
    gridRow.className = 'game__grid-row';
    checkedCells[i] = [];

    const leftCluesContainer = document.createElement('div');
    leftCluesContainer.className =
      'game__clues-container game__clues-container--left';
    if ((i + 1) % 5 === 0)
      leftCluesContainer.classList.add('game__clues-container--divider');

    puzzleData.rowClues[i].forEach((clue) => {
      const clueCell = document.createElement('div');
      clueCell.className = 'game__clues-cell';
      clueCell.textContent = clue;
      leftCluesContainer.appendChild(clueCell);
    });

    gridRow.appendChild(leftCluesContainer);

    for (let j = 0; j < size; j += 1) {
      const gameCell = document.createElement('div');
      gameCell.className = 'game__grid-cell';
      if ((i + 1) % 5 === 0)
        gameCell.classList.add('game__grid-cell--divider-horizontal');
      if ((j + 1) % 5 === 0)
        gameCell.classList.add('game__grid-cell--divider-vertical');

      gameCell.addEventListener('click', () => {
        if (isGameWon || getSolutionState()) return;

        enableGameControls([getSaveButton()]);
        startTimer();
        if (gameCell.classList.contains('game__grid-cell--checked')) {
          gameCell.classList.remove('game__grid-cell--checked');
          playEmptySound();
        } else {
          gameCell.classList.add('game__grid-cell--checked');
          playCheckSound();
        }
        if (gameCell.classList.contains('game__grid-cell--crossed')) {
          gameCell.classList.remove('game__grid-cell--crossed');
        }
        if (checkWin(checkedCells, puzzleData.solution)) {
          setGameWon(true);
          const duration = getGameDuration();
          showWinMessage(duration, puzzleData);
          stopTimer();
          playWinSound();
          disableGameControls([getSaveButton(), getSolutionButton()]);
        }
      });

      gameCell.addEventListener('contextmenu', (e) => {
        e.preventDefault();

        if (isGameWon || getSolutionState()) return;

        enableGameControls([getSaveButton()]);

        startTimer();
        if (gameCell.classList.contains('game__grid-cell--checked')) {
          gameCell.classList.remove('game__grid-cell--checked');
        }
        if (gameCell.classList.contains('game__grid-cell--crossed')) {
          gameCell.classList.remove('game__grid-cell--crossed');
          playEmptySound();
        } else {
          gameCell.classList.add('game__grid-cell--crossed');
          playCrossSound();
        }
        if (checkWin(checkedCells, puzzleData.solution)) {
          const duration = getGameDuration();
          showWinMessage(duration, puzzleData);
          stopTimer();
          playWinSound();
        }
      });

      checkedCells[i][j] = gameCell;
      gridRow.appendChild(gameCell);
    }

    mainSection.appendChild(gridRow);
  }

  gameGrid.appendChild(mainSection);
  gameContainer.insertBefore(gameGrid, gameContainer.firstChild);
  return gameContainer;
}
