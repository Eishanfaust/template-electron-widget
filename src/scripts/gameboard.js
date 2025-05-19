
export function initGameboard() {
    const middleSection = document.querySelector('.middle-section');
    middleSection.innerHTML = `
        <div class="game-board">
            ${Array(9).fill().map((_, i) => 
                `<div class="cell" data-index="${i}"></div>`
            ).join('')}
        </div>
        <div class="settings-panel hidden">
            <h3>Game Settings</h3>
            <!-- Add settings content later -->
            <p>Settings content coming soon...</p>
        </div>
    `;
}