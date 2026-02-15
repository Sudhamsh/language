// Flashcard App - Main Application Logic
class FlashcardApp {
    constructor() {
        this.flashcards = [];
        this.filteredCards = [];
        this.currentIndex = 0;
        this.currentCategory = 'all';
        this.knownCards = new Set();
        this.isFlipped = false;

        this.init();
    }

    async init() {
        console.log('Initializing Telugu Flashcard App...');
        await this.loadFlashcards();
        console.log('✓ Flashcards loaded');
        this.loadProgress();
        console.log('✓ Progress loaded');
        this.setupEventListeners();
        console.log('✓ Event listeners set up');
        this.displayCard();
        console.log('✓ First card displayed');
        this.updateStats();
        console.log('✓ Stats updated');
        console.log('App ready!');
    }

    // Load flashcards from embedded data
    async loadFlashcards() {
        try {
            // Use embedded FLASHCARD_DATA constant (loaded from flashcards-data.js)
            if (typeof FLASHCARD_DATA === 'undefined') {
                throw new Error('FLASHCARD_DATA not found. Make sure flashcards-data.js is loaded.');
            }
            this.flashcards = FLASHCARD_DATA.flashcards;
            this.filteredCards = [...this.flashcards];
            console.log(`✓ Loaded ${this.flashcards.length} flashcards successfully`);
        } catch (error) {
            console.error('Error loading flashcards:', error);
            alert('Failed to load flashcards. Please make sure flashcards-data.js is included before app.js in index.html');
        }
    }

    // Load user progress from localStorage
    loadProgress() {
        const saved = localStorage.getItem('teluguFlashcardsProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            this.knownCards = new Set(progress.knownCards || []);
            this.currentIndex = progress.currentIndex || 0;
            console.log(`Loaded progress: ${this.knownCards.size} cards known`);
        }
    }

    // Save user progress to localStorage
    saveProgress() {
        const progress = {
            knownCards: Array.from(this.knownCards),
            currentIndex: this.currentIndex,
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('teluguFlashcardsProgress', JSON.stringify(progress));
    }

    // Setup event listeners
    setupEventListeners() {
        // Flashcard flip
        const flashcard = document.getElementById('flashcard');
        flashcard.addEventListener('click', () => this.flipCard());

        // Navigation buttons
        document.getElementById('btn-prev').addEventListener('click', () => this.previousCard());
        document.getElementById('btn-next').addEventListener('click', () => this.nextCard());

        // Action buttons
        document.getElementById('btn-know').addEventListener('click', () => this.markAsKnown());
        document.getElementById('btn-dont-know').addEventListener('click', () => this.markAsUnknown());

        // Control buttons
        document.getElementById('btn-shuffle').addEventListener('click', () => this.shuffleCards());
        document.getElementById('btn-reset').addEventListener('click', () => this.resetProgress());
        document.getElementById('btn-review').addEventListener('click', () => this.reviewKnown());

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

        // Reset flip state
        const flashcard = document.getElementById('flashcard');
        flashcard.classList.remove('flipped');
        this.isFlipped = false;

        // Update front of card
        document.getElementById('card-category').textContent = card.category;
        document.getElementById('card-telugu').textContent = card.telugu;
        document.getElementById('card-romanization').textContent = card.romanization;

        // Update back of card
        document.getElementById('card-category-back').textContent = card.category;
        document.getElementById('card-english').textContent = card.english;
        document.getElementById('card-romanization-back').textContent = card.romanization;

        // Update counter
        document.getElementById('current-card').textContent = this.currentIndex + 1;
        document.getElementById('total-cards').textContent = this.filteredCards.length;

        // Update navigation button states
        document.getElementById('btn-prev').disabled = this.currentIndex === 0;
        document.getElementById('btn-next').disabled = this.currentIndex === this.filteredCards.length - 1;

        // Highlight if known
        this.updateCardStyle(card.id);
    }

    // Update card style based on known status
    updateCardStyle(cardId) {
        const flashcard = document.getElementById('flashcard');
        if (this.knownCards.has(cardId)) {
            flashcard.style.borderColor = 'var(--success-color)';
        } else {
            flashcard.style.borderColor = 'transparent';
        }
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
            this.saveProgress();
        }
    }

    // Navigate to next card
    nextCard() {
        console.log(`Next card clicked. Current: ${this.currentIndex}, Total: ${this.filteredCards.length}`);
        if (this.currentIndex < this.filteredCards.length - 1) {
            this.currentIndex++;
            console.log(`Moving to card ${this.currentIndex + 1}`);
            this.displayCard();
            this.saveProgress();
        } else {
            console.log('Already at last card');
        }
    }

    // Mark current card as known
    markAsKnown() {
        const card = this.filteredCards[this.currentIndex];
        this.knownCards.add(card.id);
        this.updateStats();
        this.saveProgress();
        this.updateCardStyle(card.id);

        // Auto-advance to next card
        setTimeout(() => {
            if (this.currentIndex < this.filteredCards.length - 1) {
                this.nextCard();
            }
        }, 300);
    }

    // Mark current card as unknown
    markAsUnknown() {
        const card = this.filteredCards[this.currentIndex];
        this.knownCards.delete(card.id);
        this.updateStats();
        this.saveProgress();
        this.updateCardStyle(card.id);

        // Auto-advance to next card
        setTimeout(() => {
            if (this.currentIndex < this.filteredCards.length - 1) {
                this.nextCard();
            }
        }, 300);
    }

    // Update statistics display
    updateStats() {
        const known = this.knownCards.size;
        const total = this.flashcards.length;
        const learning = total - known;

        document.getElementById('progress-count').textContent = `${known}/${total}`;
        document.getElementById('known-count').textContent = known;
        document.getElementById('learning-count').textContent = learning;
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
        this.updateStats();
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

    // Reset all progress
    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            this.knownCards.clear();
            this.currentIndex = 0;
            localStorage.removeItem('teluguFlashcardsProgress');
            this.updateStats();
            this.displayCard();
            alert('Progress has been reset!');
        }
    }

    // Review only known cards
    reviewKnown() {
        if (this.knownCards.size === 0) {
            alert('You haven\'t marked any cards as known yet. Keep learning!');
            return;
        }

        const knownCardIds = Array.from(this.knownCards);
        this.filteredCards = this.flashcards.filter(card => knownCardIds.includes(card.id));
        this.currentIndex = 0;

        // Update category buttons
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));

        this.displayCard();
        alert(`Reviewing ${this.knownCards.size} cards you've marked as known.`);
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
            case 'k':
            case 'K':
                e.preventDefault();
                this.markAsKnown();
                break;
            case 'u':
            case 'U':
                e.preventDefault();
                this.markAsUnknown();
                break;
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new FlashcardApp();

    // Make app globally accessible for debugging
    window.flashcardApp = app;

    console.log('Telugu Flashcard App initialized!');
    console.log('Keyboard shortcuts:');
    console.log('  Space/Enter: Flip card');
    console.log('  Left/Right Arrow: Navigate');
    console.log('  K: Mark as known');
    console.log('  U: Mark as unknown');
});
