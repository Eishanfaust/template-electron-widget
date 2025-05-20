export function initButtons() {
    const controls = document.querySelector('.controls');
    controls.innerHTML = `
        <button class="game-btn settings-btn">⚙️ Settings</button>
        <button class="game-btn leaderboards-btn">🏆 Leaderboards</button>
        <button class="game-btn rules-btn">📜 Rules</button>
        <button class="game-btn open-concede-modal-btn">🏳️ Concede</button>
    `;

    // Shared modal handling function
    const handleGameInterruption = (isConcede = false) => {
        const gameInfoPanel = document.querySelector('.game-info-panel');
        const settingsConfirmModal = document.getElementById('settingsConfirmModal');
        
        if (!gameInfoPanel?.classList.contains('hidden')) {
            // Update modal content
            const modalHeader = settingsConfirmModal.querySelector('h2');
            const modalBody = settingsConfirmModal.querySelector('.modal-body p');
            
            if (isConcede) {
                modalHeader.textContent = '⚠️ Concede Game';
                modalBody.textContent = 'Are you sure you want to concede the current game?';
            } else {
                modalHeader.textContent = '⚠️ Game Interrupted';
                modalBody.textContent = 'Are you sure you want to interrupt the current game?';
            }
            
            settingsConfirmModal.classList.remove('hidden');
        } else if (!isConcede) {
            document.querySelector('.settings-panel')?.classList.remove('hidden');
        }
    };

    // Event listeners
    document.querySelector('.settings-btn')?.addEventListener('click', () => handleGameInterruption(false));
    document.querySelector('.open-concede-modal-btn')?.addEventListener('click', () => handleGameInterruption(true));

    // Connect button styling
    const connectBtn = document.querySelector('.connect-btn');
    if (connectBtn) {
        connectBtn.style.background = '#d32f2f';
        connectBtn.style.color = 'white';
        connectBtn.style.fontWeight = 'bold';
    }
}