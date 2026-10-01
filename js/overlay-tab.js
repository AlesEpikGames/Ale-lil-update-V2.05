(() => {
    const overlay = document.createElement('aside');
    overlay.className = 'overlay-sidebar';
    const isGameScreen = document.body.classList.contains('game-screen');
    const homePath = isGameScreen ? '../index.html' : 'index.html';
    const educationPath = isGameScreen ? '../education.html' : 'education.html';
    const otherWebsitesPath = isGameScreen ? '../otherwebsites.html' : 'otherwebsites.html';
    const searchPath = isGameScreen ? '../search.html' : 'search.html';
    overlay.innerHTML = `
        <button class="overlay-tab" type="button" aria-expanded="false">Menu</button>
        <div class="overlay-panel">
            <a href="${homePath}">Home</a>
            <a href="${educationPath}">Education</a>
            <a href="${otherWebsitesPath}">Other Websites</a>
            <a href="${searchPath}">Search</a>
        </div>
    `;

    document.body.appendChild(overlay);
    const tab = overlay.querySelector('.overlay-tab');
    const gameFrame = document.querySelector('.game-screen iframe, #search-frame');

    tab.addEventListener('click', () => {
        const isOpen = overlay.classList.toggle('open');
        tab.setAttribute('aria-expanded', String(isOpen));
    });

    if (gameFrame) {
        const fullscreenControl = document.createElement('button');
        fullscreenControl.className = 'fullscreen-control';
        fullscreenControl.type = 'button';
        fullscreenControl.textContent = 'Fullscreen';
        fullscreenControl.setAttribute('aria-label', 'Enter fullscreen');
        document.body.appendChild(fullscreenControl);
        gameFrame.setAttribute('allowfullscreen', '');
        gameFrame.setAttribute('allow', 'fullscreen');

        function updateFullscreenLabel() {
            const isFullscreen = document.fullscreenElement === gameFrame;
            fullscreenControl.textContent = isFullscreen ? 'Exit Fullscreen' : 'Fullscreen';
            fullscreenControl.setAttribute('aria-label', isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen');
        }

        fullscreenControl.addEventListener('click', async () => {
            try {
                if (document.fullscreenElement) {
                    await document.exitFullscreen();
                } else if (gameFrame.requestFullscreen) {
                    await gameFrame.requestFullscreen();
                } else if (gameFrame.webkitRequestFullscreen) {
                    gameFrame.webkitRequestFullscreen();
                }
            } catch (error) {
                fullscreenControl.textContent = 'Fullscreen unavailable';
            }
            updateFullscreenLabel();
        });

        document.addEventListener('fullscreenchange', updateFullscreenLabel);
        document.addEventListener('webkitfullscreenchange', updateFullscreenLabel);
    }
})();
