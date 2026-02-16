// Centralized language configuration
// Add new languages here and they will automatically appear in the UI
window.AVAILABLE_LANGUAGES = [
    {
        id: 'telugu',
        name: 'Telugu',
        flag: '🇮🇳',
        isDefault: true
    },
    {
        id: 'hindi',
        name: 'Hindi',
        flag: '🇮🇳',
        isDefault: false
    },
    {
        id: 'spanish',
        name: 'Spanish',
        flag: '🇪🇸',
        isDefault: false
    },
    {
        id: 'french',
        name: 'French',
        flag: '🇫🇷',
        isDefault: false
    }
];

// Helper function to render language buttons
window.renderLanguageButtons = function(containerId, selectedLanguage = null) {
    const container = document.querySelector(containerId);
    if (!container) {
        console.error(`Container ${containerId} not found`);
        return;
    }

    // Clear existing buttons
    container.innerHTML = '';

    // Determine which language should be active
    const defaultLang = window.AVAILABLE_LANGUAGES.find(lang => lang.isDefault)?.id || 'telugu';
    const activeLang = selectedLanguage || defaultLang;

    // Create and append buttons
    window.AVAILABLE_LANGUAGES.forEach(language => {
        const button = document.createElement('button');
        button.className = 'language-btn';
        button.dataset.language = language.id;
        button.textContent = `${language.flag} ${language.name}`;

        // Set active class for the current language
        if (language.id === activeLang) {
            button.classList.add('active');
        }

        container.appendChild(button);
    });
};

// Helper function to get valid language from URL parameter
window.getLanguageFromURL = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');

    // Check if the language parameter is valid
    const isValidLang = window.AVAILABLE_LANGUAGES.some(lang => lang.id === langParam);

    if (isValidLang) {
        return langParam;
    }

    // Return default language if not valid
    return window.AVAILABLE_LANGUAGES.find(lang => lang.isDefault)?.id || 'telugu';
};
