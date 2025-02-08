import '../styles/style.scss';
import { createControls } from './_controls';
import { createTemplateSelector } from './_templateSelector';
import { defaultTemplate } from './_gameData';
import { createGameContainer, createGameGrid } from './_gameGrid';
import { createHighScoresList } from './_saveResults';
import { createHeader } from './_header';
import { createFooter } from './_footer';

createHeader();
createTemplateSelector();
createGameContainer();
createGameGrid(defaultTemplate.size, defaultTemplate);
createControls();
createHighScoresList();
createFooter();
