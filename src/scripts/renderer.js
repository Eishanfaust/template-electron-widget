// renderer.js
import { initGameboard } from './gameboard.js';
import { initButtons } from './buttons.js';
import { initPanels, populateLeaderboards } from './panels.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize components in proper order
    initButtons();      // 1. Create buttons first
    initPanels();       // 2. Initialize panel functionality
    initGameboard();    // 3. Set up game board
    populateLeaderboards(); // 4. Load initial leaderboard data

    // Remove the process.env check or replace with:
    // For development mode detection (alternative):
    if (window.location.href.includes('localhost')) {
        console.log('Development mode detected');
    }
});