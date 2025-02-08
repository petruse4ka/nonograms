import fillBlackSound from '../assets/sounds/fill-black.mp3';
import crossSound from '../assets/sounds/cross.mp3';
import fillEmptySound from '../assets/sounds/fill-empty.mp3';
import victorySound from '../assets/sounds/victory.mp3';

let isSoundEnabled = true;

export function toggleSound() {
  isSoundEnabled = isSoundEnabled ? false : true;
  return isSoundEnabled;
}

export function getSoundState() {
  return isSoundEnabled;
}

export function playCheckSound() {
  if (!isSoundEnabled) return;
  const checkSound = new Audio(fillBlackSound);
  checkSound.play();
}

export function playCrossSound() {
  if (!isSoundEnabled) return;
  const crossAudio = new Audio(crossSound);
  crossAudio.play();
}

export function playEmptySound() {
  if (!isSoundEnabled) return;
  const emptyAudio = new Audio(fillEmptySound);
  emptyAudio.play();
}

export function playWinSound() {
  if (!isSoundEnabled) return;
  const winAudio = new Audio(victorySound);
  winAudio.play();
}
