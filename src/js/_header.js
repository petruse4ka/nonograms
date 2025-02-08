import soundOnIcon from '../assets/icons/volume.png';
import soundOffIcon from '../assets/icons/mute.png';
import lightThemeIcon from '../assets/icons/light.png';
import darkThemeIcon from '../assets/icons/dark.png';
import { toggleSound, getSoundState } from './_sounds';

export function createHeader() {
  const header = document.createElement('header');
  header.className = 'header';

  const headerContainer = document.createElement('div');
  headerContainer.className = 'header__container';

  const logo = document.createElement('div');
  logo.className = 'header__logo';

  const logoTitle = document.createElement('h1');
  logoTitle.className = 'header__logo-title';
  logoTitle.textContent = 'NONOGRAMS ';

  const logoAuthor = document.createElement('span');
  logoAuthor.className = 'header__logo-author';
  logoAuthor.textContent = 'by Konstantin Petrov';

  logo.appendChild(logoTitle);
  logo.appendChild(logoAuthor);

  const controls = document.createElement('div');
  controls.className = 'header__controls';

  const soundButton = document.createElement('button');
  soundButton.className = 'header__button header__button--sound';

  const soundIcon = document.createElement('img');
  soundIcon.src = getSoundState() ? soundOnIcon : soundOffIcon;
  soundIcon.alt = 'Sound';
  soundButton.appendChild(soundIcon);

  soundButton.addEventListener('click', () => {
    toggleSound();
    soundIcon.src = getSoundState() ? soundOnIcon : soundOffIcon;
  });

  const themeToggle = document.createElement('label');
  themeToggle.className = 'header__theme-toggle';

  const themeInput = document.createElement('input');
  themeInput.type = 'checkbox';
  themeInput.className = 'header__theme-input';

  const themeSlider = document.createElement('div');
  themeSlider.className = 'header__theme-slider';

  const lightThemeImg = document.createElement('img');
  lightThemeImg.src = lightThemeIcon;
  lightThemeImg.className = 'theme-icon theme-icon--light';
  lightThemeImg.alt = 'Light theme';

  const darkThemeImg = document.createElement('img');
  darkThemeImg.src = darkThemeIcon;
  darkThemeImg.className = 'theme-icon theme-icon--dark';
  darkThemeImg.alt = 'Dark theme';

  themeSlider.appendChild(lightThemeImg);
  themeSlider.appendChild(darkThemeImg);

  themeToggle.appendChild(themeInput);
  themeToggle.appendChild(themeSlider);

  themeInput.addEventListener('change', () => {
    document.body.classList.toggle('body--dark-theme');
  });

  controls.appendChild(soundButton);
  controls.appendChild(themeToggle);
  headerContainer.appendChild(logo);
  headerContainer.appendChild(controls);
  header.appendChild(headerContainer);
  document.body.appendChild(header);
}
