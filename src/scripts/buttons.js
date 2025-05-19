export function initButtons() {
    const controls = document.querySelector('.controls');
    controls.innerHTML = `
        <button class="game-btn settings-btn">⚙️ Settings</button>
        <button class="game-btn reset-btn">Reset Game</button>
        <button class="game-btn concede-btn">Concede Set</button>
        <button class="game-btn leaderboards-btn">Leaderboards</button>
    `;

    // Settings handler (now in buttons)
    document.querySelector('.settings-btn').addEventListener('click', () => {
        const gameBoard = document.querySelector('.game-board');
        const settingsPanel = document.querySelector('.settings-panel');
        gameBoard.classList.toggle('hidden');
        settingsPanel.classList.toggle('hidden');
    });

    // Other button handlers...
}