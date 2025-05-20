export function initButtons() {
    const controls = document.querySelector('.controls');
    controls.innerHTML = `
        <button class="game-btn settings-btn">⚙️ Settings</button>
        <button class="game-btn leaderboards-btn">🏆 Leaderboards</button>
        <button class="game-btn rules-btn">📜 Rules</button>
        <button class="game-btn reset-btn">🔄 Reset</button>
    `;
    
    // Add event listeners for buttons that manipulate the UI
    const settingsBtn = controls.querySelector('.settings-btn');
    settingsBtn?.addEventListener('click', () => {
        // Check if game is in progress
        const gameInfoPanel = document.querySelector('.game-info-panel');
        const settingsPanel = document.querySelector('.settings-panel');
        
        if (!gameInfoPanel?.classList.contains('hidden')) {
            // Game is in progress, show confirmation modal
            const settingsConfirmModal = document.getElementById('settingsConfirmModal');
            settingsConfirmModal?.classList.remove('hidden');
        } else {
            // No game in progress, toggle settings panel normally
            settingsPanel?.classList.remove('hidden');
            gameInfoPanel?.classList.add('hidden');
        }
    });
    
    // Reset button functionality (enhanced to handle both game modes)
    const resetBtn = controls.querySelector('.reset-btn');
    resetBtn?.addEventListener('click', () => {
        // Clear the game board cells
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x-mark', 'o-mark', 'red-mark', 'blue-mark');
        });
        
    // Add event listeners for buttons that manipulate the UI
    const settingsBtn = controls.querySelector('.settings-btn');
    settingsBtn?.addEventListener('click', () => {
        // Check if game is in progress
        const gameInfoPanel = document.querySelector('.game-info-panel');
        const settingsPanel = document.querySelector('.settings-panel');
        
        if (!gameInfoPanel?.classList.contains('hidden')) {
            // Game is in progress, show confirmation modal
            const settingsConfirmModal = document.getElementById('settingsConfirmModal');
            settingsConfirmModal?.classList.remove('hidden');
        } else {
            // No game in progress, toggle settings panel normally
            settingsPanel?.classList.remove('hidden');
            gameInfoPanel?.classList.add('hidden');
        }
    });
    
    // Concede game button functionality
    const concedeBtn = controls.querySelector('.concede-btn');
    concedeBtn?.addEventListener('click', () => {
        // Show confirmation dialog
        const settingsConfirmModal = document.getElementById('settingsConfirmModal');
        if (settingsConfirmModal) {
            settingsConfirmModal.classList.remove('hidden');
        }})
    })}