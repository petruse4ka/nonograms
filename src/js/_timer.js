let startTime;
let currentTime;
let timerInterval;
let isGameStarted = false;

export function createTimer() {
  const timer = document.createElement('div');
  timer.className = 'game__timer';
  timer.textContent = formatTimeToString(0);
  return timer;
}

export function formatTimeToString(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function formatStringToTime(timer) {
  const [minutes, seconds] = timer.split(':').map(Number);
  return minutes * 60 + seconds;
}

export function setTimer(timer, startTime) {
  currentTime = Math.floor((Date.now() - startTime) / 1000);
  timer.textContent = formatTimeToString(currentTime);
}

export function startTimer() {
  if (!isGameStarted) {
    isGameStarted = true;
    const timer = document.querySelector('.game__timer');
    currentTime = formatStringToTime(timer.textContent);
    startTime = Date.now() - currentTime * 1000;
    timerInterval = setInterval(() => setTimer(timer, startTime), 1000);
  }
}

export function stopTimer() {
  clearInterval(timerInterval);
  isGameStarted = false;
}

export function resetTimer() {
  stopTimer();
  const timer = document.querySelector('.game__timer');
  timer.textContent = formatTimeToString(0);
}

export function getGameDuration() {
  return currentTime;
}
