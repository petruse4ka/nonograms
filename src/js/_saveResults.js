import { formatTimeToString } from './_timer';

export function saveResult(template, duration) {
  let results = JSON.parse(localStorage.getItem('highScores')) || [];

  const newResult = {
    templateName: template.name,
    level: template.level,
    time: duration,
    stringTime: formatTimeToString(duration),
  };

  results.push(newResult);

  if (results.length > 5) {
    results = results.slice(1, 6);
  }

  localStorage.setItem('highScores', JSON.stringify(results));
}

export function createHighScoresList() {
  const results = JSON.parse(localStorage.getItem('highScores')) || [];
  const scoresContainer = document.createElement('div');
  scoresContainer.className = 'game__high-scores';

  const scoresTitle = document.createElement('h2');
  scoresTitle.className = 'game__high-scores-title';
  scoresTitle.textContent = 'High Scores';

  scoresContainer.appendChild(scoresTitle);

  const noScoresMessage = document.createElement('p');
  noScoresMessage.className = 'game__no-scores-message';
  noScoresMessage.textContent = 'You have not won any games yet!';

  const sortedResults = results.sort((a, b) => a.time - b.time);
  const scoresList = document.createElement('div');
  scoresList.className = 'game__scores-list';

  const scoresHeader = document.createElement('div');
  scoresHeader.className = 'game__scores-header';

  const headerTitles = ['Puzzle', 'Difficulty', 'Time'];

  headerTitles.forEach((title) => {
    const headerItem = document.createElement('div');
    headerItem.className = 'game__scores-header-item';
    headerItem.textContent = title;
    scoresHeader.appendChild(headerItem);
  });

  sortedResults.forEach((result) => {
    const scoreItem = document.createElement('div');
    scoreItem.className = 'game__scores-item';

    const puzzleName = document.createElement('div');
    puzzleName.className = 'game__scores-data';
    puzzleName.textContent = result.templateName;

    const difficulty = document.createElement('div');
    difficulty.className = 'game__scores-data';
    difficulty.textContent = result.level;

    const time = document.createElement('div');
    time.className = 'game__scores-data';
    time.textContent = result.stringTime;

    scoreItem.appendChild(puzzleName);
    scoreItem.appendChild(difficulty);
    scoreItem.appendChild(time);
    scoresList.appendChild(scoreItem);
  });

  scoresContainer.appendChild(scoresHeader);

  if (results.length === 0) {
    scoresContainer.appendChild(noScoresMessage);
  } else {
    scoresContainer.appendChild(scoresList);
  }

  const winMessage = document.querySelector('.game__message--win');
  if (winMessage) {
    winMessage.insertAdjacentElement('afterend', scoresContainer);
  } else {
    const gameGrid = document.querySelector('.game');
    gameGrid.insertAdjacentElement('afterend', scoresContainer);
  }

  return scoresContainer;
}
