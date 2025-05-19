import { initGameboard } from './gameboard.js';
import { initButtons } from './buttons.js';
import { initPanels } from './panels.js';

document.addEventListener('DOMContentLoaded', () => {
    initGameboard();
    initButtons();
    initPanels();
});