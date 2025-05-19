export function initGameboard() {
    const gameBoardWrapper = document.querySelector('.game-board-wrapper');
    gameBoardWrapper.innerHTML = `
        <div class="game-board">
            ${Array(9).fill().map((_, i) => 
                `<div class="cell" data-index="${i}"></div>`
            ).join('')}
        </div>
    `;
}