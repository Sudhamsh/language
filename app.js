// Flashcard App - Main Application Logic
class FlashcardApp {
    constructor() {
        this.levels = [];
        this.currentLevel = 1;

        // Check URL parameter for language
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        this.currentLanguage = (langParam === 'spanish' || langParam === 'telugu' || langParam === 'french') ? langParam : 'telugu';

        this.flashcards = [];
        this.filteredCards = [];
        this.currentIndex = 0;
        this.currentCategory = 'all';
        this.isFlipped = false;

        this.init();
    }

    async init() {
        console.log('Initializing Language Flashcard App...');
        console.log(`Language from URL: ${this.currentLanguage}`);

        // Set active language button based on URL parameter
        this.setActiveLanguageButton();

        // Update quiz link with current language
        this.updateQuizLink();

        await this.loadFlashcards();
        console.log('✓ Flashcards loaded');
        this.setupEventListeners();
        console.log('✓ Event listeners set up');
        this.updateUI();
        this.displayCard();
        console.log('✓ First card displayed');
        console.log('App ready!');
    }

    // Set active language button
    setActiveLanguageButton() {
        document.querySelectorAll('.language-btn').forEach(btn => {
            if (btn.dataset.language === this.currentLanguage) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Dynamically load language data
    async loadFlashcards() {
        try {
            // IMPORTANT: Clear the old FLASHCARD_DATA to ensure fresh load
            if (typeof window.FLASHCARD_DATA !== 'undefined') {
                delete window.FLASHCARD_DATA;
            }

            // Remove ALL existing language data scripts
            document.querySelectorAll('script[src*="-data.js"]').forEach(script => {
                script.remove();
            });

            // Add cache-busting timestamp to force reload
            const timestamp = new Date().getTime();
            const dataPath = `${this.currentLanguage}/${this.currentLanguage}-data.js?t=${timestamp}`;

            console.log(`Loading ${dataPath}...`);

            // Load the script dynamically
            await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = dataPath;
                script.onload = () => {
                    console.log(`Script loaded: ${dataPath}`);
                    // Small delay to ensure script is fully executed
                    setTimeout(() => resolve(), 100);
                };
                script.onerror = () => reject(new Error(`Failed to load ${dataPath}`));
                document.body.appendChild(script);
            });

            if (typeof FLASHCARD_DATA === 'undefined') {
                throw new Error('FLASHCARD_DATA not found after loading script.');
            }

            console.log(`FLASHCARD_DATA loaded with ${FLASHCARD_DATA.levels[0].flashcards[0].telugu || FLASHCARD_DATA.levels[0].flashcards[0].spanish}`);

            this.levels = FLASHCARD_DATA.levels;
            this.switchLevel(this.currentLevel);
            console.log(`✓ Loaded ${this.levels.length} levels for ${this.currentLanguage}`);
        } catch (error) {
            console.error('Error loading flashcards:', error);
            alert(`Failed to load ${this.currentLanguage} flashcards. Please check the data file.`);
        }
    }

    // Update UI text based on selected language
    updateUI() {
        const languageConfig = {
            telugu: {
                title: '🇮🇳 Telugu Flashcards',
                subtitle: 'Master Telugu vocabulary with interactive flashcards',
                footer: 'Practice regularly to master Telugu! Use categories to focus on specific topics.',
                fieldName: 'telugu'
            },
            spanish: {
                title: '🇪🇸 Spanish Flashcards',
                subtitle: 'Master Spanish vocabulary with interactive flashcards',
                footer: 'Practice regularly to master Spanish! Use categories to focus on specific topics.',
                fieldName: 'spanish'
            },
            french: {
                title: '🇫🇷 French Flashcards',
                subtitle: 'Master French vocabulary with interactive flashcards',
                footer: 'Practice regularly to master French! Use categories to focus on specific topics.',
                fieldName: 'french'
            }
        };

        const config = languageConfig[this.currentLanguage];
        document.getElementById('app-title').textContent = config.title;
        document.getElementById('app-subtitle').textContent = config.subtitle;
        document.getElementById('footer-text').textContent = config.footer;
    }

    // Get the native language field name
    getNativeField() {
        if (this.currentLanguage === 'telugu') return 'telugu';
        if (this.currentLanguage === 'spanish') return 'spanish';
        if (this.currentLanguage === 'french') return 'french';
        return 'telugu';
    }

    // Setup event listeners
    setupEventListeners() {
        // Flashcard flip
        const flashcard = document.getElementById('flashcard');
        flashcard.addEventListener('click', () => this.flipCard());

        // Navigation buttons
        document.getElementById('btn-prev').addEventListener('click', () => this.previousCard());
        document.getElementById('btn-next').addEventListener('click', () => this.nextCard());

        // Control buttons
        document.getElementById('btn-shuffle').addEventListener('click', () => this.shuffleCards());

        // Language selector buttons
        const languageButtons = document.querySelectorAll('.language-btn');
        languageButtons.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const language = e.target.dataset.language;
                if (language !== this.currentLanguage) {
                    languageButtons.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    await this.switchLanguage(language);
                }
            });
        });

        // Level selector buttons
        const levelButtons = document.querySelectorAll('.level-btn');
        levelButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const level = parseInt(e.target.dataset.level);
                levelButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.switchLevel(level);
            });
        });

        // Category filter buttons
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                categoryButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.filterByCategory(e.target.dataset.category);
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    // Switch language
    async switchLanguage(language) {
        console.log(`Switching language to: ${language}`);
        this.currentLanguage = language;
        this.currentIndex = 0; // Reset to first card

        // Update URL parameter for deep linking
        const url = new URL(window.location);
        url.searchParams.set('lang', language);
        window.history.pushState({}, '', url);

        // Update quiz link to preserve language
        this.updateQuizLink();

        await this.loadFlashcards();
        this.updateUI();

        // Force display update
        console.log(`Forcing display update for ${language}`);
        this.displayCard();

        console.log(`✓ Switched to ${language}`);
    }

    // Update quiz link to include current language
    updateQuizLink() {
        const quizLink = document.getElementById('quiz-link');
        if (quizLink) {
            quizLink.href = `quiz.html?lang=${this.currentLanguage}`;
        }
    }

    // Display current card
    displayCard() {
        if (this.filteredCards.length === 0) {
            alert('No cards to display. Try changing the category filter.');
            return;
        }

        // Ensure index is within bounds
        if (this.currentIndex >= this.filteredCards.length) {
            this.currentIndex = 0;
        }

        const card = this.filteredCards[this.currentIndex];
        const nativeField = this.getNativeField();

        console.log(`Displaying card - Language: ${this.currentLanguage}, Field: ${nativeField}, Card:`, card);
        console.log(`Native text: ${card[nativeField]}`);

        // Reset flip state
        const flashcard = document.getElementById('flashcard');
        flashcard.classList.remove('flipped');
        this.isFlipped = false;

        // Update front of card (native language)
        document.getElementById('card-category').textContent = card.category;
        document.getElementById('card-telugu').textContent = card[nativeField];
        document.getElementById('card-romanization').textContent = card.romanization;

        // Update back of card (English)
        document.getElementById('card-category-back').textContent = card.category;
        document.getElementById('card-english').textContent = card.english;
        document.getElementById('card-romanization-back').textContent = card.romanization;

        // Update counter
        document.getElementById('current-card').textContent = this.currentIndex + 1;
        document.getElementById('total-cards').textContent = this.filteredCards.length;

        // Update navigation button states
        document.getElementById('btn-prev').disabled = this.currentIndex === 0;
        document.getElementById('btn-next').disabled = this.currentIndex === this.filteredCards.length - 1;
    }

    // Flip card
    flipCard() {
        const flashcard = document.getElementById('flashcard');
        flashcard.classList.toggle('flipped');
        this.isFlipped = !this.isFlipped;
    }

    // Navigate to previous card
    previousCard() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.displayCard();
        }
    }

    // Navigate to next card
    nextCard() {
        console.log(`Next card clicked. Current: ${this.currentIndex}, Total: ${this.filteredCards.length}`);
        if (this.currentIndex < this.filteredCards.length - 1) {
            this.currentIndex++;
            console.log(`Moving to card ${this.currentIndex + 1}`);
            this.displayCard();
        } else {
            console.log('Already at last card');
        }
    }

    // Switch to a different level
    switchLevel(levelId) {
        const level = this.levels.find(l => l.id === levelId);
        if (!level) {
            console.error(`Level ${levelId} not found`);
            return;
        }

        if (level.flashcards.length === 0) {
            alert(`${level.name} has no flashcards yet. Please add flashcards to this level.`);
            return;
        }

        this.currentLevel = levelId;
        this.flashcards = level.flashcards;
        this.filteredCards = [...this.flashcards];
        this.currentIndex = 0;
        this.currentCategory = 'all';

        // Reset category filter to "All"
        document.querySelectorAll('.category-btn').forEach(btn => {
            if (btn.dataset.category === 'all') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        console.log(`✓ Switched to ${level.name} (${this.flashcards.length} cards)`);
        this.displayCard();
    }

    // Filter cards by category
    filterByCategory(category) {
        this.currentCategory = category;

        if (category === 'all') {
            this.filteredCards = [...this.flashcards];
        } else {
            this.filteredCards = this.flashcards.filter(card => card.category === category);
        }

        this.currentIndex = 0;
        this.displayCard();
    }

    // Shuffle cards
    shuffleCards() {
        if (confirm('Shuffle all cards in current category?')) {
            // Fisher-Yates shuffle algorithm
            for (let i = this.filteredCards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.filteredCards[i], this.filteredCards[j]] = [this.filteredCards[j], this.filteredCards[i]];
            }
            this.currentIndex = 0;
            this.displayCard();
        }
    }

    // Handle keyboard shortcuts
    handleKeyboard(e) {
        switch(e.key) {
            case ' ':
            case 'Enter':
                e.preventDefault();
                this.flipCard();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.previousCard();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextCard();
                break;
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new FlashcardApp();

    // Make app globally accessible for debugging
    window.flashcardApp = app;

    console.log('Language Flashcard App initialized!');
    console.log('Keyboard shortcuts:');
    console.log('  Space/Enter: Flip card');
    console.log('  Left/Right Arrow: Navigate');
});
