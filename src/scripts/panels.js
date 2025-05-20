export function initPanels() {
    // DOM Elements
    const settingsPanel = document.querySelector('.settings-panel');
    const gameInfoPanel = document.querySelector('.game-info-panel');
    const rulesModal = document.getElementById('rulesModal');
    const leaderboardsModal = document.getElementById('leaderboardsModal');
    const playOnlineModal = document.getElementById('playOnlineModal');
    const settingsConfirmModal = document.getElementById('settingsConfirmModal');
    
    // Buttons
    const playBtn = document.querySelector('.play-btn');
    const playOnlineBtn = document.querySelector('.play-online-btn');
    const rulesBtn = document.querySelector('.rules-btn');
    const leaderboardsBtn = document.querySelector('.leaderboards-btn');
    const closeModals = document.querySelectorAll('.close-modal');
    const resetLeaderboardBtn = document.querySelector('.reset-leaderboard-btn');
    
    // Initialize Default State
    settingsPanel?.classList.remove('hidden');
    gameInfoPanel?.classList.add('hidden');
    
    // Play Button Handler
    playBtn?.addEventListener('click', () => {
        settingsPanel.classList.add('hidden');
        gameInfoPanel.classList.remove('hidden');
        
        // Get the selected game mode
        const gameMode = document.querySelector('#gameMode').value;
        
        // Initialize the appropriate game info panel based on game mode
        if (gameMode === 'single') {
            initSinglePlayerPanel();
            updateGameCounter(0, 'single');
        } else {
            initMultiPlayerPanel();
            updateGameCounter(0, 'multi');
        }
    });
    
    // Play Online Button Handler
    playOnlineBtn?.addEventListener('click', () => {
        playOnlineModal.classList.remove('hidden');
    });

    // Modal Handling - Show the specific modal when button is clicked
    rulesBtn?.addEventListener('click', () => {
        rulesModal.classList.remove('hidden');
    });
    
    leaderboardsBtn?.addEventListener('click', () => {
        populateLeaderboards();
        leaderboardsModal.classList.remove('hidden');
    });

    // Close Modals
    closeModals.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Find the parent modal and hide it
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.classList.add('hidden');
            }
        });
    });

    // Theme Switcher (now in permanent container)
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            themeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const isDark = btn.classList.contains('dark');
            document.body.classList.toggle('dark-mode', isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.querySelector(`.theme-btn.${savedTheme}`)?.classList.add('active');
    document.body.classList.toggle('dark-mode', savedTheme === 'dark');

    // Leaderboard Reset
    resetLeaderboardBtn?.addEventListener('click', () => {
        // Get active tab to know which leaderboard to reset
        const activeTab = document.querySelector('.leaderboard-tab.active');
        const tabType = activeTab?.dataset.tab || 'local';
        
        const confirmMessage = tabType === 'local' 
            ? 'Are you sure you want to reset local leaderboard data?' 
            : 'Are you sure you want to reset global leaderboard data?';
            
        if (confirm(confirmMessage)) {
            if (tabType === 'local') {
                localStorage.removeItem('localLeaderboard');
            } else {
                localStorage.removeItem('globalLeaderboard');
            }
            populateLeaderboards();
        }
    });

    // Leaderboard Tabs
    const leaderboardTabs = document.querySelectorAll('.leaderboard-tab');
    leaderboardTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab styling
            leaderboardTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show the correct leaderboard
            const tabType = tab.dataset.tab;
            const localLeaderboard = document.getElementById('localLeaderboard');
            const globalLeaderboard = document.getElementById('globalLeaderboard');
            
            if (tabType === 'local') {
                localLeaderboard.classList.remove('hidden');
                globalLeaderboard.classList.add('hidden');
            } else {
                localLeaderboard.classList.add('hidden');
                globalLeaderboard.classList.remove('hidden');
            }
        });
    });

    // Game Mode Handling
    const gameModeSelect = document.querySelector('#gameMode');
    gameModeSelect?.addEventListener('change', (e) => {
        const isMultiplayer = e.target.value === 'multi';
        document.querySelectorAll('.multiplayer-only').forEach(el => {
            el.style.display = isMultiplayer ? 'block' : 'none';
        });
    });
    
    // Online Game Type Handler
    const onlineGameType = document.getElementById('onlineGameType');
    const privateRoomOption = document.querySelector('.private-room-option');
    onlineGameType?.addEventListener('change', (e) => {
        privateRoomOption.classList.toggle('hidden', e.target.value !== 'private');
    });
    
    // Settings Confirmation Modal Handlers
    const concedeConfirmBtn = document.querySelector('.confirm-concede-btn');
    const continueBtn = document.querySelector('.continue-btn');
    
    concedeConfirmBtn?.addEventListener('click', () => {
        settingsConfirmModal.classList.add('hidden');
        
        // Clear the game board cells
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x-mark', 'o-mark', 'red-mark', 'blue-mark', 'winning-cell');
        });
        
        // Hide game info panel and show settings panel
        gameInfoPanel.classList.add('hidden');
        settingsPanel.classList.remove('hidden');
    });
    
    continueBtn?.addEventListener('click', () => {
        settingsConfirmModal.classList.add('hidden');
    });
    
    // Connect button styling update
    const connectBtn = document.querySelector('.connect-btn');
    if (connectBtn) {
        connectBtn.style.background = '#800000';
        connectBtn.style.color = 'white';
    }
}

// Initialize Single Player Panel
function initSinglePlayerPanel() {
    const gameInfoPanel = document.querySelector('.game-info-panel');
    gameInfoPanel.innerHTML = `
        <div class="game-counter">
            <div class="bot-thinking hidden">Bot is thinking...</div>
            <div class="score-display single-player">
                <span class="player-score">Score: 0</span>
            </div>
        </div>
    `;
}

// Initialize Multi Player Panel
function initMultiPlayerPanel() {
    const gameInfoPanel = document.querySelector('.game-info-panel');
    const numSets = document.querySelector('#numSets').value;
    
    gameInfoPanel.innerHTML = `
        <div class="game-counter multi-player">
            <div class="sets-display">
                <span class="current-set">Set: 1/${numSets}</span>
            </div>
            <div class="score-display">
                <div class="player red-player">
                    <div class="player-marker red-square"></div>
                    <span class="player-score">Player 1: 0</span>
                </div>
                <div class="player blue-player">
                    <div class="player-marker blue-square"></div>
                    <span class="player-score">Player 2: 0</span>
                </div>
            </div>
            <div class="game-commentary">Game in progress...</div>
        </div>
    `;
}

export function populateLeaderboards() {
    // Local Leaderboard
    const localTableBody = document.getElementById('localLeaderboardBody');
    if (localTableBody) {
        let localLeaderboard = JSON.parse(localStorage.getItem('localLeaderboard')) || [];
        
        if (localLeaderboard.length === 0) {
            localLeaderboard = Array.from({length: 10}, (_, i) => ({
                name: `Player ${i + 1}`,
                score: Math.floor(Math.random() * 50)
            })).sort((a, b) => b.score - a.score);
        }

        localTableBody.innerHTML = localLeaderboard.map((player, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${player.name}</td>
                <td>${player.score}</td>
            </tr>
        `).join('');

        localStorage.setItem('localLeaderboard', JSON.stringify(localLeaderboard));
    }
    
    // Global Leaderboard
    const globalTableBody = document.getElementById('globalLeaderboardBody');
    if (globalTableBody) {
        let globalLeaderboard = JSON.parse(localStorage.getItem('globalLeaderboard')) || [];
        
        if (globalLeaderboard.length === 0) {
            // Simulated global data
            globalLeaderboard = Array.from({length: 10}, (_, i) => ({
                name: `GlobalPlayer${i + 1}`,
                streaks: Math.floor(Math.random() * 20)
            })).sort((a, b) => b.streaks - a.streaks);
        }

        globalTableBody.innerHTML = globalLeaderboard.map((player, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${player.name}</td>
                <td>${player.streaks}</td>
            </tr>
        `).join('');

        localStorage.setItem('globalLeaderboard', JSON.stringify(globalLeaderboard));
    }
}

export function updateGameCounter(rounds, mode) {
    if (mode === 'single') {
        const playerScore = document.querySelector('.player-score');
        if (playerScore) playerScore.textContent = `Score: ${rounds}`;
    } else {
        // For multiplayer mode
        // This would update the set information or player scores
        const commentary = document.querySelector('.game-commentary');
        if (commentary) commentary.textContent = getMultiplayerCommentary(rounds);
    }
}

// Show/hide bot thinking status
export function toggleBotThinking(isThinking) {
    const botThinking = document.querySelector('.bot-thinking');
    if (botThinking) {
        botThinking.classList.toggle('hidden', !isThinking);
    }
}

// Update set information in multiplayer mode
export function updateSetInfo(currentSet, totalSets) {
    const setInfo = document.querySelector('.current-set');
    if (setInfo) {
        setInfo.textContent = `Set: ${currentSet}/${totalSets}`;
    }
}

// Update multiplayer scores
export function updatePlayerScores(player1Score, player2Score) {
    const player1 = document.querySelector('.red-player .player-score');
    const player2 = document.querySelector('.blue-player .player-score');
    
    if (player1) player1.textContent = `Player 1: ${player1Score}`;
    if (player2) player2.textContent = `Player 2: ${player2Score}`;
}

// Update commentary for multiplayer
export function updateCommentary(message) {
    const commentary = document.querySelector('.game-commentary');
    if (commentary) commentary.textContent = message;
}

function getMultiplayerCommentary(round) {
    if (round === 0) return "Game in progress...";
    if (round === -1) return "Set completed!";
    if (round === -2) return "Game over!";
    return `Round ${round} completed!`;
}