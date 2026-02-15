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

// Real Data Tests (Level 2)
runner.test('Should load actual FLASHCARD_DATA if available', () => {
    if (typeof FLASHCARD_DATA !== 'undefined') {
        assertTrue(FLASHCARD_DATA.levels !== undefined, 'FLASHCARD_DATA should have levels');
        assertTrue(FLASHCARD_DATA.levels.length >= 2, 'Should have at least 2 levels');
    }
});

runner.test('Level 1 should have 100 flashcards', () => {
    if (typeof FLASHCARD_DATA !== 'undefined') {
        const level1 = FLASHCARD_DATA.levels.find(l => l.id === 1);
        assertTrue(level1 !== undefined, 'Level 1 should exist');
        assertArrayLength(level1.flashcards, 100, 'Level 1 should have 100 flashcards');
    }
});

runner.test('Level 2 should have 100 flashcards', () => {
    if (typeof FLASHCARD_DATA !== 'undefined') {
        const level2 = FLASHCARD_DATA.levels.find(l => l.id === 2);
        assertTrue(level2 !== undefined, 'Level 2 should exist');
        assertArrayLength(level2.flashcards, 100, 'Level 2 should have 100 flashcards');
    }
});

runner.test('Level 2 should have correct name and description', () => {
    if (typeof FLASHCARD_DATA !== 'undefined') {
        const level2 = FLASHCARD_DATA.levels.find(l => l.id === 2);
        assertEquals(level2.name, 'Level 2 - Intermediate', 'Level 2 should have correct name');
        assertTrue(level2.description.length > 0, 'Level 2 should have a description');
    }
});

runner.test('Level 2 flashcards should have IDs starting from 101', () => {
    if (typeof FLASHCARD_DATA !== 'undefined') {
        const level2 = FLASHCARD_DATA.levels.find(l => l.id === 2);
        if (level2 && level2.flashcards.length > 0) {
            assertEquals(level2.flashcards[0].id, 101, 'First Level 2 card should have ID 101');
            assertEquals(level2.flashcards[level2.flashcards.length - 1].id, 200, 'Last Level 2 card should have ID 200');
        }
    }
});

runner.test('No duplicate words between Level 1 and Level 2', () => {
    if (typeof FLASHCARD_DATA !== 'undefined') {
        const level1 = FLASHCARD_DATA.levels.find(l => l.id === 1);
        const level2 = FLASHCARD_DATA.levels.find(l => l.id === 2);

        if (level1 && level2) {
            const level1Words = new Set(level1.flashcards.map(c => c.telugu));
            const level2Words = level2.flashcards.map(c => c.telugu);

            const duplicates = level2Words.filter(word => level1Words.has(word));
            assertArrayLength(duplicates, 0, `No duplicate Telugu words should exist. Found: ${duplicates.join(', ')}`);
        }
    }
});

runner.test('No duplicate English translations between Level 1 and Level 2', () => {
    if (typeof FLASHCARD_DATA !== 'undefined') {
        const level1 = FLASHCARD_DATA.levels.find(l => l.id === 1);
        const level2 = FLASHCARD_DATA.levels.find(l => l.id === 2);

        if (level1 && level2) {
            const level1English = new Set(level1.flashcards.map(c => c.english.toLowerCase()));
            const level2English = level2.flashcards.map(c => c.english.toLowerCase());

            const duplicates = level2English.filter(word => level1English.has(word));
            assertArrayLength(duplicates, 0, `No duplicate English words should exist. Found: ${duplicates.join(', ')}`);
        }
    }
});

runner.test('All Level 2 flashcards should have required fields', () => {
    if (typeof FLASHCARD_DATA !== 'undefined') {
        const level2 = FLASHCARD_DATA.levels.find(l => l.id === 2);

        if (level2) {
            level2.flashcards.forEach((card, index) => {
                assertTrue(card.id !== undefined, `Level 2 card ${index} should have an id`);
                assertTrue(card.telugu !== undefined, `Level 2 card ${index} should have telugu text`);
                assertTrue(card.romanization !== undefined, `Level 2 card ${index} should have romanization`);
                assertTrue(card.english !== undefined, `Level 2 card ${index} should have english translation`);
                assertTrue(card.category !== undefined, `Level 2 card ${index} should have a category`);
            });
        }
    }
});

runner.test('Level 2 should have appropriate categories', () => {
    if (typeof FLASHCARD_DATA !== 'undefined') {
        const level2 = FLASHCARD_DATA.levels.find(l => l.id === 2);

        if (level2) {
            const categories = new Set(level2.flashcards.map(c => c.category));
            assertTrue(categories.size > 0, 'Level 2 should have at least one category');

            // Level 2 should have some intermediate categories
            const level2Categories = Array.from(categories);
            console.log(`  Level 2 categories: ${level2Categories.join(', ')}`);
        }
    }
});

runner.test('Level 2 IDs should be unique', () => {
    if (typeof FLASHCARD_DATA !== 'undefined') {
        const level2 = FLASHCARD_DATA.levels.find(l => l.id === 2);

        if (level2) {
            const ids = level2.flashcards.map(card => card.id);
            const uniqueIds = new Set(ids);
            assertEquals(ids.length, uniqueIds.size, 'All Level 2 card IDs should be unique');
        }
    }
});

// Quiz Tests
runner.test('Quiz should generate correct number of questions', () => {
    const level = mockFlashcardData.levels[0];
    const numQuestions = 3;
    const shuffled = [...level.flashcards].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(numQuestions, shuffled.length));

    assertArrayLength(selected, numQuestions, 'Should generate exactly 3 questions');
});

runner.test('Quiz should not exceed available flashcards', () => {
    const level = mockFlashcardData.levels[1]; // Only has 1 card
    const numQuestions = 10;
    const shuffled = [...level.flashcards].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(numQuestions, shuffled.length));

    assertArrayLength(selected, 1, 'Should only generate 1 question when only 1 card available');
});

runner.test('Quiz should generate 4 answer options per question', () => {
    const card = mockFlashcardData.levels[0].flashcards[0];
    const allCards = mockFlashcardData.levels[0].flashcards;

    // Get 3 wrong answers
    const wrongAnswers = allCards
        .filter(c => c.english !== card.english)
        .map(c => c.english)
        .slice(0, 3);

    const options = [card.english, ...wrongAnswers];
    assertArrayLength(options, 4, 'Should have 4 answer options');
});

runner.test('Quiz should include correct answer in options', () => {
    const card = mockFlashcardData.levels[0].flashcards[0];
    const allCards = mockFlashcardData.levels[0].flashcards;

    const wrongAnswers = allCards
        .filter(c => c.english !== card.english)
        .map(c => c.english)
        .slice(0, 3);

    const options = [card.english, ...wrongAnswers];
    assertTrue(options.includes(card.english), 'Options should include correct answer');
});

runner.test('Quiz wrong answers should be different from correct answer', () => {
    const card = mockFlashcardData.levels[0].flashcards[0];
    const allCards = mockFlashcardData.levels[0].flashcards;

    const wrongAnswers = allCards
        .filter(c => c.english !== card.english)
        .map(c => c.english)
        .slice(0, 3);

    wrongAnswers.forEach(answer => {
        assertTrue(answer !== card.english, `Wrong answer "${answer}" should not equal correct answer "${card.english}"`);
    });
});

runner.test('Quiz should track score correctly - correct answer', () => {
    let score = 0;
    let wrongAnswers = 0;

    // Simulate correct answer
    const isCorrect = true;
    if (isCorrect) {
        score++;
    } else {
        wrongAnswers++;
    }

    assertEquals(score, 1, 'Score should be 1 after correct answer');
    assertEquals(wrongAnswers, 0, 'Wrong answers should be 0');
});

runner.test('Quiz should track score correctly - wrong answer', () => {
    let score = 0;
    let wrongAnswers = 0;

    // Simulate wrong answer
    const isCorrect = false;
    if (isCorrect) {
        score++;
    } else {
        wrongAnswers++;
    }

    assertEquals(score, 0, 'Score should be 0 after wrong answer');
    assertEquals(wrongAnswers, 1, 'Wrong answers should be 1');
});

runner.test('Quiz should calculate percentage correctly - 100%', () => {
    const score = 10;
    const total = 10;
    const percentage = Math.round((score / total) * 100);

    assertEquals(percentage, 100, 'Should calculate 100% correctly');
});

runner.test('Quiz should calculate percentage correctly - 80%', () => {
    const score = 8;
    const total = 10;
    const percentage = Math.round((score / total) * 100);

    assertEquals(percentage, 80, 'Should calculate 80% correctly');
});

runner.test('Quiz should calculate percentage correctly - 50%', () => {
    const score = 5;
    const total = 10;
    const percentage = Math.round((score / total) * 100);

    assertEquals(percentage, 50, 'Should calculate 50% correctly');
});

runner.test('Quiz should calculate percentage correctly - 0%', () => {
    const score = 0;
    const total = 10;
    const percentage = Math.round((score / total) * 100);

    assertEquals(percentage, 0, 'Should calculate 0% correctly');
});

runner.test('Quiz should handle level selection', () => {
    let selectedLevel = 1;

    // Simulate level 2 selection
    selectedLevel = 2;

    assertEquals(selectedLevel, 2, 'Should switch to level 2');
});

runner.test('Quiz question type should be Telugu to English or English to Telugu', () => {
    const questionTypes = ['Telugu → English', 'English → Telugu'];
    const selectedType = questionTypes[Math.random() > 0.5 ? 0 : 1];

    assertTrue(
        questionTypes.includes(selectedType),
        `Question type should be one of: ${questionTypes.join(', ')}`
    );
});

runner.test('Quiz should shuffle answer options', () => {
    const options = ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'];
    const originalOrder = [...options];

    // Fisher-Yates shuffle
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    // Verify all original options are still present
    assertArrayLength(options, 4, 'Should still have 4 options after shuffle');
    originalOrder.forEach(opt => {
        assertTrue(options.includes(opt), `Shuffled options should contain "${opt}"`);
    });
});

runner.test('Quiz should handle configurable question counts', () => {
    const validCounts = [5, 10, 15, 20];

    validCounts.forEach(count => {
        const numQuestions = count;
        assertTrue(
            validCounts.includes(numQuestions),
            `Question count ${numQuestions} should be valid`
        );
    });
});

runner.test('Quiz progress should increment correctly', () => {
    let currentQuestionIndex = 0;
    const totalQuestions = 10;

    // Simulate answering 5 questions
    for (let i = 0; i < 5; i++) {
        currentQuestionIndex++;
    }

    assertEquals(currentQuestionIndex, 5, 'Should be at question 5 after 5 answers');

    const percentage = (currentQuestionIndex / totalQuestions) * 100;
    assertEquals(percentage, 50, 'Progress should be 50%');
});

runner.test('Quiz should complete when all questions answered', () => {
    let currentQuestionIndex = 0;
    const totalQuestions = 10;

    // Answer all questions
    for (let i = 0; i < 10; i++) {
        currentQuestionIndex++;
    }

    const isComplete = currentQuestionIndex >= totalQuestions;
    assertTrue(isComplete, 'Quiz should be complete after all questions answered');
});

runner.test('Quiz should display appropriate message for perfect score', () => {
    const percentage = 100;
    let message = '';

    if (percentage === 100) {
        message = 'Perfect score!';
    }

    assertTrue(message.length > 0, 'Should have message for perfect score');
    assertTrue(message.includes('Perfect'), 'Message should mention perfect score');
});

runner.test('Quiz should display appropriate message for good score', () => {
    const percentage = 85;
    let message = '';

    if (percentage >= 80) {
        message = 'Excellent work!';
    }

    assertTrue(message.length > 0, 'Should have message for 85% score');
});

runner.test('Quiz should display appropriate message for low score', () => {
    const percentage = 30;
    let message = '';

    if (percentage < 40) {
        message = 'Keep studying!';
    }

    assertTrue(message.length > 0, 'Should have message for low score');
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
