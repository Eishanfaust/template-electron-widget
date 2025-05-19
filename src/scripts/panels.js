// panels.js
export function initPanels() {
    // DOM Elements
    const settingsPanel = document.querySelector('.settings-panel');
    const leaderboardsPanel = document.querySelector('.leaderboards-panel');
    const settingsBtn = document.querySelector('.settings-btn');
    const leaderboardsBtn = document.querySelector('.leaderboards-btn');
    const resetBtn = document.querySelector('.reset-btn');
    const skipBtn = document.querySelector('.skip-btn');
    const resetLeaderboardBtn = document.querySelector('.reset-leaderboard-btn');

    // Panel Toggle Functionality
    if (settingsBtn && leaderboardsBtn) {
        settingsBtn.addEventListener('click', () => {
            leaderboardsPanel.classList.add('hidden');
            settingsPanel.classList.remove('hidden');
        });

        leaderboardsBtn.addEventListener('click', () => {
            settingsPanel.classList.add('hidden');
            leaderboardsPanel.classList.remove('hidden');
            populateLeaderboards();
        });
    }

    // Game Mode Handling
    const gameModeSelect = document.querySelector('#gameMode');
    const multiplayerSettings = document.querySelector('.multiplayer-only');
    if (gameModeSelect && multiplayerSettings) {
        gameModeSelect.addEventListener('change', (e) => {
            multiplayerSettings.style.display = e.target.value === 'multi' ? 'block' : 'none';
        });
        multiplayerSettings.style.display = gameModeSelect.value === 'multi' ? 'block' : 'none';
    }

    // Theme Switcher
    const themeButtons = document.querySelectorAll('.theme-btn');
    if (themeButtons.length > 0) {
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
        const initialThemeBtn = document.querySelector(`.theme-btn.${savedTheme}`);
        if (initialThemeBtn) {
            initialThemeBtn.classList.add('active');
            document.body.classList.toggle('dark-mode', savedTheme === 'dark');
        }
    }

    // Game Control Buttons
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            console.log('Reset game logic here');
        });
    }

    if (skipBtn) {
        skipBtn.addEventListener('click', () => {
            console.log('Skip set logic here');
        });
    }

    // Leaderboard Reset
    if (resetLeaderboardBtn) {
        resetLeaderboardBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all leaderboard data?')) {
                localStorage.removeItem('leaderboard');
                populateLeaderboards();
            }
        });
    }
}

export function populateLeaderboards() {
    const tableBody = document.getElementById('leaderboardBody');
    if (!tableBody) return;

    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    
    // Generate demo data if empty
    if (leaderboard.length === 0) {
        leaderboard = Array.from({length: 15}, (_, i) => ({
            name: `Player ${i + 1}`,
            wins: Math.floor(Math.random() * 20),
            losses: Math.floor(Math.random() * 15)
        })).sort((a, b) => b.wins - a.wins);
    }

    // Clear existing content
    tableBody.innerHTML = '';

    if (leaderboard.length === 0) {
        tableBody.innerHTML = `
            <tr class="no-data">
                <td colspan="4">No records found</td>
            </tr>
        `;
        return;
    }

    // Populate table with top 10
    leaderboard.slice(0, 10).forEach((player, index) => {
        const totalGames = player.wins + player.losses;
        const winRatio = totalGames > 0 
            ? `${((player.wins / totalGames) * 100).toFixed(1)}%` 
            : '0%';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player.name}</td>
            <td>${player.wins}</td>
            <td>${player.losses}</td>
            <td>${winRatio}</td>
        `;
        tableBody.appendChild(row);
    });

    // Save generated data
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}