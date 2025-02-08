import { resetGame } from './_resetGame';
import { createTimer } from './_timer';
import { saveGame, loadGame, hasSavedGame } from './_saveGame';
import { selectRandomTemplate } from './_templateSelector';
import { showSolution } from './_solution';
import saveIcon from '../assets/icons/save.png';
import loadIcon from '../assets/icons/load.png';
import randomIcon from '../assets/icons/random.png';
import resetIcon from '../assets/icons/reset.png';
import showIcon from '../assets/icons/show.png';

let saveButton;
let solutionButton;
let loadButton;

export function disableGameControls(buttons) {
  buttons.forEach((button) => {
    button.classList.add('game__button--disabled');
  });
}

export function enableGameControls(buttons) {
  buttons.forEach((button) => {
    button.classList.remove('game__button--disabled');
  });
}

export function getSaveButton() {
  return saveButton;
}

export function getSolutionButton() {
  return solutionButton;
}

export function createControls() {
  const controlsContainer = document.createElement('div');
  controlsContainer.className = 'game__controls';

  const resetButton = document.createElement('div');
  resetButton.className = 'game__button game__button--reset';

  const resetImg = document.createElement('img');
  resetImg.className = 'game__button-icon';
  resetImg.src = resetIcon;
  resetImg.alt = 'Reset game';

  const resetText = document.createElement('span');
  resetText.className = 'game__button-text';
  resetText.textContent = 'Reset Game';

  resetButton.appendChild(resetImg);
  resetButton.appendChild(resetText);

  saveButton = document.createElement('div');
  saveButton.className = 'game__button game__button--save';

  const saveImg = document.createElement('img');
  saveImg.className = 'game__button-icon';
  saveImg.src = saveIcon;
  saveImg.alt = 'Save game';

  const saveText = document.createElement('span');
  saveText.className = 'game__button-text';
  saveText.textContent = 'Save Game';

  saveButton.appendChild(saveImg);
  saveButton.appendChild(saveText);
  disableGameControls([saveButton]);

  loadButton = document.createElement('div');
  loadButton.className = 'game__button game__button--load';

  const loadImg = document.createElement('img');
  loadImg.className = 'game__button-icon';
  loadImg.src = loadIcon;
  loadImg.alt = 'Load game';

  const loadText = document.createElement('span');
  loadText.className = 'game__button-text';
  loadText.textContent = 'Continue Last Game';

  loadButton.appendChild(loadImg);
  loadButton.appendChild(loadText);
  if (!hasSavedGame()) {
    disableGameControls([loadButton]);
  }

  const randomizeButton = document.createElement('div');
  randomizeButton.className = 'game__button game__button--randomize';

  const randomImg = document.createElement('img');
  randomImg.className = 'game__button-icon';
  randomImg.src = randomIcon;
  randomImg.alt = 'Random game';

  const randomText = document.createElement('span');
  randomText.className = 'game__button-text';
  randomText.textContent = 'Random Game';

  randomizeButton.appendChild(randomImg);
  randomizeButton.appendChild(randomText);

  solutionButton = document.createElement('div');
  solutionButton.className = 'game__button game__button--solutions';

  const solutionImg = document.createElement('img');
  solutionImg.className = 'game__button-icon';
  solutionImg.src = showIcon;
  solutionImg.alt = 'Show solution';

  const solutionText = document.createElement('span');
  solutionText.className = 'game__button-text';
  solutionText.textContent = 'Show Solution';

  solutionButton.appendChild(solutionImg);
  solutionButton.appendChild(solutionText);

  resetButton.addEventListener('click', () => {
    resetGame();
  });

  saveButton.addEventListener('click', () => {
    saveGame();
    enableGameControls([loadButton]);
    disableGameControls([saveButton]);
  });

  loadButton.addEventListener('click', () => {
    if (!hasSavedGame()) return;
    loadGame();
  });

  randomizeButton.addEventListener('click', selectRandomTemplate);

  solutionButton.addEventListener('click', () => {
    showSolution();
    disableGameControls([saveButton, solutionButton]);
  });

  const timer = createTimer();

  controlsContainer.appendChild(timer);
  controlsContainer.appendChild(resetButton);
  controlsContainer.appendChild(randomizeButton);
  controlsContainer.appendChild(solutionButton);
  controlsContainer.appendChild(saveButton);
  controlsContainer.appendChild(loadButton);

  const gameContainer = document.querySelector('.game');
  gameContainer.appendChild(controlsContainer);
}
