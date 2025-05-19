export function initializeTitlebar() {
    const titlebarSection = document.querySelector('.titlebar-section');
    
    // Titlebar HTML structure
    titlebarSection.innerHTML = `
        <div class="app-header">
            <span>Game Title</span>
            <div class="window-controls">
                <button class="control-button minimize">−</button>
                <button class="control-button maximize">□</button>
                <button class="control-button close">×</button>
            </div>
        </div>
    `;

    // Window controls logic
    document.querySelectorAll('.control-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const action = e.target.classList.contains('minimize') ? 'minimize' :
                          e.target.classList.contains('maximize') ? 'maximize' : 'close';
            window.electronAPI.windowAction(action);
        });
    });
}