export function initPanels() {
    // Elements
    const settingsPanel = document.querySelector('.settings-panel');
    const leaderboardsPanel = document.querySelector('.leaderboards-panel');
    const settingsBtn = document.querySelector('.settings-btn');
    const leaderboardsBtn = document.querySelector('.leaderboards-btn');

    // Null checks
    if (!settingsPanel || !leaderboardsPanel || !settingsBtn || !leaderboardsBtn) {
        console.error('Panel elements not found!');
        return;
    }

    // Toggle panels
    settingsBtn.addEventListener('click', () => {
        leaderboardsPanel.classList.add('hidden');
        settingsPanel.classList.remove('hidden');
        console.log('Settings panel shown');
    });

    leaderboardsBtn.addEventListener('click', () => {
        settingsPanel.classList.add('hidden');
        leaderboardsPanel.classList.remove('hidden');
        console.log('Leaderboards panel shown');
    });

    // Game mode handler
    const gameModeSelect = document.querySelector('#gameMode');
    const multiplayerSettings = document.querySelector('.multiplayer-only');
    if (gameModeSelect && multiplayerSettings) {
        gameModeSelect.addEventListener('change', (e) => {
            multiplayerSettings.style.display = e.target.value === 'multi' ? 'block' : 'none';
        });
    }

    // Theme switcher
    const themeButtons = document.querySelectorAll('.theme-btn');
    if (themeButtons.length) {
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
    }
}