import { resetTimer } from './_timer';
import { removeWinMessage } from './_gameLogic';
import { setSolutionState } from './_solution';
import { setGameWon } from './_gameGrid';
import {
  disableGameControls,
  enableGameControls,
  getSolutionButton,
  getSaveButton,
} from './_controls';

export function resetGame() {
  const gameCells = document.querySelectorAll('.game__grid-cell');
  gameCells.forEach((cell) => {
    cell.classList.remove(
      'game__grid-cell--checked',
      'game__grid-cell--crossed'
    );
  });

  const gameGrid = document.querySelector('.game__grid');
  if (gameGrid) {
    gameGrid.classList.remove('game__grid--disabled');
  }

  removeWinMessage();
  resetTimer();
  setSolutionState(false);
  setGameWon(false);
  enableGameControls([getSolutionButton()]);
  disableGameControls([getSaveButton()]);
}
