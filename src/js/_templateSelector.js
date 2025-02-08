import { templates, currentTemplate, setCurrentTemplate } from './_gameData';
import { createGameGrid } from './_gameGrid';
import { resetGame } from './_resetGame';
import { createControls } from './_controls';

function showTemplates(difficulty) {
  const templateSelectors = document.querySelectorAll('.game__template-select');
  templateSelectors.forEach((selector) => {
    if (selector.dataset.difficulty === difficulty) {
      selector.style.display = 'flex';
    } else {
      selector.style.display = 'none';
    }
  });
}

export function createTemplateSelector() {
  const selectorContainer = document.createElement('div');
  selectorContainer.className = 'game__template-selector';

  const selectorTitle = document.createElement('h2');
  selectorTitle.className = 'game__template-title';
  selectorTitle.textContent = 'Select Nonogram';

  const difficultyContainer = document.createElement('div');
  difficultyContainer.className = 'game__difficulty-container';

  const templatesContainer = document.createElement('div');
  templatesContainer.className = 'game__templates-container';

  templates.forEach((template) => {
    const templateSelector = document.createElement('div');
    templateSelector.className = 'game__template-select';
    templateSelector.dataset.templateId = template.id;
    templateSelector.dataset.difficulty = template.level
      .split(' ')[0]
      .toLowerCase();
    templateSelector.style.display = 'flex';

    if (template.id === currentTemplate.id) {
      templateSelector.classList.add('game__template-select--active');
    }

    const templateInfo = document.createElement('div');
    templateInfo.className = 'game__template-info';

    const templateIcon = document.createElement('img');
    templateIcon.className = 'game__template-icon';
    templateIcon.src = template.image;
    templateIcon.alt = template.name;

    const templateName = document.createElement('p');
    templateName.className = 'game__template-name';
    templateName.textContent = template.name;

    templateInfo.appendChild(templateIcon);
    templateInfo.appendChild(templateName);
    templateSelector.appendChild(templateInfo);

    templateSelector.addEventListener('click', () => {
      const templateSelectors = document.querySelectorAll(
        '.game__template-select'
      );
      templateSelectors.forEach((selector) =>
        selector.classList.remove('game__template-select--active')
      );
      templateSelector.classList.add('game__template-select--active');

      const currentGameGrid = document.querySelector('.game__grid');
      const controls = document.querySelector('.game__controls');

      if (currentGameGrid) {
        currentGameGrid.remove();
      }
      if (controls) {
        controls.remove();
      }

      setCurrentTemplate(template);
      createGameGrid(template.size, template);
      createControls();
      resetGame();
    });

    templatesContainer.appendChild(templateSelector);
  });

  const difficulties = ['Easy', 'Medium', 'Hard'];
  difficulties.forEach((difficulty, index) => {
    const difficultySelector = document.createElement('div');
    difficultySelector.className = 'game__difficulty-select';
    difficultySelector.textContent = difficulty;

    if (index === 0) {
      difficultySelector.classList.add('game__difficulty-select--active');
    }

    difficultySelector.addEventListener('click', () => {
      const difficultySelectors = document.querySelectorAll(
        '.game__difficulty-select'
      );
      difficultySelectors.forEach((selector) =>
        selector.classList.remove('game__difficulty-select--active')
      );
      difficultySelector.classList.add('game__difficulty-select--active');

      const selectedDifficulty = difficulty.toLowerCase();
      showTemplates(selectedDifficulty);
    });

    difficultyContainer.appendChild(difficultySelector);
  });

  selectorContainer.appendChild(selectorTitle);
  selectorContainer.appendChild(difficultyContainer);
  selectorContainer.appendChild(templatesContainer);

  document.body.appendChild(selectorContainer);
  showTemplates('easy');
}

export function selectRandomTemplate() {
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const randomDifficultyIndex = Math.floor(Math.random() * difficulties.length);
  const randomDifficulty = difficulties[randomDifficultyIndex];

  const difficultyButtons = document.querySelectorAll(
    '.game__difficulty-select'
  );
  difficultyButtons.forEach((button) => {
    if (button.textContent === randomDifficulty) {
      button.click();
    }
  });

  const visibleTemplates = Array.from(
    document.querySelectorAll('.game__template-select')
  ).filter((template) => template.style.display !== 'none');
  const randomTemplateIndex = Math.floor(
    Math.random() * visibleTemplates.length
  );
  visibleTemplates[randomTemplateIndex].click();
}
