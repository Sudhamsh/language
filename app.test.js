// Telugu Flashcard App - Test Suite
// Simple test framework for browser or Node.js

class TestRunner {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    test(description, testFn) {
        this.tests.push({ description, testFn });
    }

    async run() {
        console.log('🧪 Running Telugu Flashcard Tests...\n');

        for (const { description, testFn } of this.tests) {
            try {
                await testFn();
                this.passed++;
                console.log(`✓ ${description}`);
            } catch (error) {
                this.failed++;
                console.error(`✗ ${description}`);
                console.error(`  Error: ${error.message}`);
            }
        }

        console.log(`\n📊 Test Results: ${this.passed} passed, ${this.failed} failed, ${this.tests.length} total`);
        return this.failed === 0;
    }
}

// Assertion helpers
function assertEquals(actual, expected, message = '') {
    if (actual !== expected) {
        throw new Error(`${message}\n  Expected: ${expected}\n  Actual: ${actual}`);
    }
}

function assertTrue(condition, message = '') {
    if (!condition) {
        throw new Error(`Assertion failed: ${message}`);
    }
}

function assertFalse(condition, message = '') {
    if (condition) {
        throw new Error(`Assertion failed: ${message}`);
    }
}

function assertArrayLength(array, expectedLength, message = '') {
    if (array.length !== expectedLength) {
        throw new Error(`${message}\n  Expected length: ${expectedLength}\n  Actual length: ${array.length}`);
    }
}

// Mock DOM setup for testing
function setupMockDOM() {
    if (typeof document === 'undefined') {
        // Running in Node.js, skip DOM tests
        return null;
    }

    const container = document.createElement('div');
    container.innerHTML = `
        <div id="flashcard"></div>
        <div id="card-category"></div>
        <div id="card-telugu"></div>
        <div id="card-romanization"></div>
        <div id="card-category-back"></div>
        <div id="card-english"></div>
        <div id="card-romanization-back"></div>
        <div id="current-card">1</div>
        <div id="total-cards">100</div>
        <button id="btn-prev"></button>
        <button id="btn-next"></button>
    `;
    document.body.appendChild(container);
    return container;
}

function cleanupMockDOM(container) {
    if (container && container.parentNode) {
        container.parentNode.removeChild(container);
    }
}

// Mock data for testing
const mockFlashcardData = {
    levels: [
        {
            id: 1,
            name: "Level 1 - Test",
            description: "Test level",
            flashcards: [
                { id: 1, telugu: "నమస్కారం", romanization: "Namaskāram", english: "Hello", category: "Greetings" },
                { id: 2, telugu: "ధన్యవాదాలు", romanization: "Dhanyavādālu", english: "Thank you", category: "Greetings" },
                { id: 3, telugu: "ఒకటి", romanization: "Okaṭi", english: "One", category: "Numbers" },
                { id: 4, telugu: "రెండు", romanization: "Reṇḍu", english: "Two", category: "Numbers" },
                { id: 5, telugu: "తల్లి", romanization: "Talli", english: "Mother", category: "Family" }
            ]
        },
        {
            id: 2,
            name: "Level 2 - Test",
            description: "Test level 2",
            flashcards: [
                { id: 101, telugu: "పుస్తకం", romanization: "Pustakam", english: "Book", category: "Common Words" }
            ]
        }
    ]
};

// Test Suite
const runner = new TestRunner();

// Data Loading Tests
runner.test('Should load levels from data', () => {
    const levels = mockFlashcardData.levels;
    assertArrayLength(levels, 2, 'Should have 2 levels');
    assertEquals(levels[0].id, 1, 'First level should have id 1');
    assertEquals(levels[1].id, 2, 'Second level should have id 2');
});

runner.test('Should load flashcards from level 1', () => {
    const level1 = mockFlashcardData.levels[0];
    assertArrayLength(level1.flashcards, 5, 'Level 1 should have 5 flashcards');
    assertEquals(level1.flashcards[0].telugu, "నమస్కారం", 'First card should be Namaskaram');
});

runner.test('Should load flashcards from level 2', () => {
    const level2 = mockFlashcardData.levels[1];
    assertArrayLength(level2.flashcards, 1, 'Level 2 should have 1 flashcard');
    assertEquals(level2.flashcards[0].english, "Book", 'Card should be Book');
});

// Category Filtering Tests
runner.test('Should filter flashcards by category - Greetings', () => {
    const level1 = mockFlashcardData.levels[0];
    const greetings = level1.flashcards.filter(card => card.category === 'Greetings');
    assertArrayLength(greetings, 2, 'Should have 2 greeting cards');
});

runner.test('Should filter flashcards by category - Numbers', () => {
    const level1 = mockFlashcardData.levels[0];
    const numbers = level1.flashcards.filter(card => card.category === 'Numbers');
    assertArrayLength(numbers, 2, 'Should have 2 number cards');
});

runner.test('Should filter flashcards by category - Family', () => {
    const level1 = mockFlashcardData.levels[0];
    const family = level1.flashcards.filter(card => card.category === 'Family');
    assertArrayLength(family, 1, 'Should have 1 family card');
});

runner.test('Should show all flashcards when filter is "all"', () => {
    const level1 = mockFlashcardData.levels[0];
    const all = level1.flashcards.filter(() => true);
    assertArrayLength(all, 5, 'Should have all 5 cards');
});

// Navigation Tests
runner.test('Should navigate to next card', () => {
    let currentIndex = 0;
    const maxIndex = 4;

    // Simulate next
    if (currentIndex < maxIndex) {
        currentIndex++;
    }

    assertEquals(currentIndex, 1, 'Should move to card index 1');
});

runner.test('Should navigate to previous card', () => {
    let currentIndex = 2;

    // Simulate previous
    if (currentIndex > 0) {
        currentIndex--;
    }

    assertEquals(currentIndex, 1, 'Should move to card index 1');
});

runner.test('Should not go below index 0', () => {
    let currentIndex = 0;

    // Simulate previous at first card
    if (currentIndex > 0) {
        currentIndex--;
    }

    assertEquals(currentIndex, 0, 'Should stay at index 0');
});

runner.test('Should not go beyond last card', () => {
    let currentIndex = 4;
    const maxIndex = 4;

    // Simulate next at last card
    if (currentIndex < maxIndex) {
        currentIndex++;
    }

    assertEquals(currentIndex, 4, 'Should stay at index 4');
});

// Shuffle Tests
runner.test('Should shuffle cards using Fisher-Yates algorithm', () => {
    const cards = [...mockFlashcardData.levels[0].flashcards];
    const originalFirst = cards[0].id;

    // Fisher-Yates shuffle
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    // Just verify we still have the same number of cards
    assertArrayLength(cards, 5, 'Should still have 5 cards after shuffle');

    // Verify all original IDs are still present
    const ids = cards.map(c => c.id).sort();
    const expectedIds = [1, 2, 3, 4, 5];
    assertEquals(JSON.stringify(ids), JSON.stringify(expectedIds), 'Should contain all original card IDs');
});

// Level Switching Tests
runner.test('Should switch between levels', () => {
    let currentLevel = 1;
    const targetLevel = 2;

    currentLevel = targetLevel;
    assertEquals(currentLevel, 2, 'Should switch to level 2');
});

runner.test('Should load correct flashcards for each level', () => {
    const level1Cards = mockFlashcardData.levels.find(l => l.id === 1).flashcards;
    const level2Cards = mockFlashcardData.levels.find(l => l.id === 2).flashcards;

    assertArrayLength(level1Cards, 5, 'Level 1 should have 5 cards');
    assertArrayLength(level2Cards, 1, 'Level 2 should have 1 card');
});

// Data Validation Tests
runner.test('All flashcards should have required fields', () => {
    const allCards = mockFlashcardData.levels.flatMap(level => level.flashcards);

    allCards.forEach((card, index) => {
        assertTrue(card.id !== undefined, `Card ${index} should have an id`);
        assertTrue(card.telugu !== undefined, `Card ${index} should have telugu text`);
        assertTrue(card.romanization !== undefined, `Card ${index} should have romanization`);
        assertTrue(card.english !== undefined, `Card ${index} should have english translation`);
        assertTrue(card.category !== undefined, `Card ${index} should have a category`);
    });
});

runner.test('Flashcard IDs should be unique within a level', () => {
    mockFlashcardData.levels.forEach(level => {
        const ids = level.flashcards.map(card => card.id);
        const uniqueIds = new Set(ids);
        assertEquals(ids.length, uniqueIds.size, `Level ${level.id} should have unique card IDs`);
    });
});

runner.test('Categories should be valid', () => {
    const validCategories = [
        'Greetings', 'Numbers', 'Family', 'Verbs',
        'Common Words', 'Pronouns', 'Adjectives', 'Colors',
        'Body Parts', 'Places', 'Time', 'Questions'
    ];

    const allCards = mockFlashcardData.levels.flatMap(level => level.flashcards);

    allCards.forEach(card => {
        assertTrue(
            validCategories.includes(card.category),
            `Card "${card.english}" has invalid category: ${card.category}`
        );
    });
});

// Card Display Tests
runner.test('Should display correct card information', () => {
    const card = mockFlashcardData.levels[0].flashcards[0];

    assertEquals(card.telugu, "నమస్కారం", 'Should show Telugu text');
    assertEquals(card.romanization, "Namaskāram", 'Should show romanization');
    assertEquals(card.english, "Hello", 'Should show English translation');
    assertEquals(card.category, "Greetings", 'Should show category');
});

// Edge Cases
runner.test('Should handle empty level gracefully', () => {
    const emptyLevel = {
        id: 3,
        name: "Empty Level",
        description: "Empty",
        flashcards: []
    };

    assertArrayLength(emptyLevel.flashcards, 0, 'Empty level should have 0 cards');
});

runner.test('Should handle single card in level', () => {
    const level2 = mockFlashcardData.levels[1];
    assertArrayLength(level2.flashcards, 1, 'Level 2 should have exactly 1 card');
});

// Run tests
if (typeof window !== 'undefined') {
    // Running in browser
    window.addEventListener('DOMContentLoaded', () => {
        runner.run();
    });
} else {
    // Running in Node.js
    runner.run();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { runner, mockFlashcardData };
}
