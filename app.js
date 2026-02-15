// Flashcard App - Main Application Logic
class FlashcardApp {
    constructor() {
        this.flashcards = [];
        this.filteredCards = [];
        this.currentIndex = 0;
        this.currentCategory = 'all';
        this.isFlipped = false;

        this.init();
    }

    async init() {
        console.log('Initializing Telugu Flashcard App...');
        await this.loadFlashcards();
        console.log('✓ Flashcards loaded');
        this.setupEventListeners();
        console.log('✓ Event listeners set up');
        this.displayCard();
        console.log('✓ First card displayed');
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

    console.log('Telugu Flashcard App initialized!');
    console.log('Keyboard shortcuts:');
    console.log('  Space/Enter: Flip card');
    console.log('  Left/Right Arrow: Navigate');
});
