export function initButtons() {
    const controls = document.querySelector('.controls');
    
    if (!controls) {
        console.error('Controls container not found!');
        return;
    }

    controls.innerHTML = `
        <button class="game-btn settings-btn">⚙️ Settings</button>
        <button class="game-btn leaderboards-btn">🏆 Leaderboards</button>
        <button class="game-btn reset-btn">🔄 New Game</button>
    `;
}