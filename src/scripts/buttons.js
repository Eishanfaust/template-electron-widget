export function initButtons() {
    const controls = document.querySelector('.controls');
    controls.innerHTML = `
        <button class="game-btn settings-btn">⚙️ Settings</button>
        <button class="game-btn leaderboards-btn">🏆 Leaderboards</button>
        <button class="game-btn reset-btn">🔄 Reset</button>
    `;
}