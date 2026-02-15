// Validate French data structure
const fs = require('fs');
const code = fs.readFileSync('french/french-data.js', 'utf8');

// Create global window object for the data
global.window = {};
eval(code);
const data = window.FLASHCARD_DATA;

console.log('🧪 Checking French data structure...');
console.log('');

// Check levels
console.log('✓ Number of levels:', data.levels.length);
if (data.levels.length !== 2) {
    console.log('✗ Expected 2 levels, got', data.levels.length);
    process.exit(1);
}

// Check Level 1
const level1 = data.levels[0];
console.log('✓ Level 1 flashcards:', level1.flashcards.length);
if (level1.flashcards.length !== 100) {
    console.log('✗ Expected 100 flashcards in Level 1, got', level1.flashcards.length);
    process.exit(1);
}
console.log('✓ Level 1 first ID:', level1.flashcards[0].id);
console.log('✓ Level 1 last ID:', level1.flashcards[level1.flashcards.length - 1].id);
console.log('✓ Level 1 first word:', level1.flashcards[0].french);

if (level1.flashcards[0].id !== 1) {
    console.log('✗ Expected Level 1 first ID to be 1, got', level1.flashcards[0].id);
    process.exit(1);
}
if (level1.flashcards[99].id !== 100) {
    console.log('✗ Expected Level 1 last ID to be 100, got', level1.flashcards[99].id);
    process.exit(1);
}

// Check Level 2
const level2 = data.levels[1];
console.log('✓ Level 2 flashcards:', level2.flashcards.length);
if (level2.flashcards.length !== 100) {
    console.log('✗ Expected 100 flashcards in Level 2, got', level2.flashcards.length);
    process.exit(1);
}
console.log('✓ Level 2 first ID:', level2.flashcards[0].id);
console.log('✓ Level 2 last ID:', level2.flashcards[level2.flashcards.length - 1].id);
console.log('✓ Level 2 first word:', level2.flashcards[0].french);

if (level2.flashcards[0].id !== 101) {
    console.log('✗ Expected Level 2 first ID to be 101, got', level2.flashcards[0].id);
    process.exit(1);
}
if (level2.flashcards[99].id !== 200) {
    console.log('✗ Expected Level 2 last ID to be 200, got', level2.flashcards[99].id);
    process.exit(1);
}

// Check for duplicate words
const level1Words = level1.flashcards.map(c => c.french);
const level2Words = level2.flashcards.map(c => c.french);
const allWords = [...level1Words, ...level2Words];
const uniqueWords = new Set(allWords);

console.log('✓ Total words:', allWords.length);
console.log('✓ Unique words:', uniqueWords.size);

if (allWords.length === uniqueWords.size) {
    console.log('✓ No duplicate words found!');
} else {
    console.log('✗ Duplicate words detected!');
    const duplicates = allWords.filter((word, index) => allWords.indexOf(word) !== index);
    console.log('  Duplicates:', [...new Set(duplicates)].join(', '));
    process.exit(1);
}

// Check for duplicates within Level 1
const uniqueLevel1Words = new Set(level1Words);
if (level1Words.length !== uniqueLevel1Words.size) {
    console.log('✗ Duplicate words in Level 1!');
    process.exit(1);
}

// Check for duplicates within Level 2
const uniqueLevel2Words = new Set(level2Words);
if (level2Words.length !== uniqueLevel2Words.size) {
    console.log('✗ Duplicate words in Level 2!');
    process.exit(1);
}

// Check for duplicates between levels
const level1Set = new Set(level1Words);
const duplicatesBetweenLevels = level2Words.filter(word => level1Set.has(word));
if (duplicatesBetweenLevels.length > 0) {
    console.log('✗ Duplicate words between levels:', duplicatesBetweenLevels.join(', '));
    process.exit(1);
}

// Check all cards have required fields
let valid = true;
data.levels.forEach((level, levelIndex) => {
    level.flashcards.forEach((card, cardIndex) => {
        if (!card.id || !card.french || !card.romanization || !card.english || !card.category) {
            console.log(`✗ Invalid card in Level ${levelIndex + 1}, Card ${cardIndex + 1}:`, card);
            valid = false;
        }
    });
});

if (valid) {
    console.log('✓ All cards have required fields!');
} else {
    console.log('✗ Some cards are missing required fields');
    process.exit(1);
}

// Check IDs are unique
const allIds = data.levels.flatMap(l => l.flashcards.map(c => c.id));
const uniqueIds = new Set(allIds);
if (allIds.length === uniqueIds.size) {
    console.log('✓ All IDs are unique!');
} else {
    console.log('✗ Duplicate IDs found!');
    process.exit(1);
}

// Check valid categories
const validCategories = [
    'Greetings', 'Numbers', 'Family', 'Verbs',
    'Common Words', 'Pronouns', 'Adjectives', 'Colors',
    'Body Parts', 'Places', 'Time', 'Questions', 'Food', 'Clothing'
];

const invalidCategories = [];
data.levels.forEach(level => {
    level.flashcards.forEach(card => {
        if (!validCategories.includes(card.category)) {
            invalidCategories.push({ word: card.french, category: card.category });
        }
    });
});

if (invalidCategories.length > 0) {
    console.log('✗ Invalid categories found:');
    invalidCategories.forEach(item => {
        console.log(`  - "${item.word}" has invalid category "${item.category}"`);
    });
    process.exit(1);
} else {
    console.log('✓ All categories are valid!');
}

console.log('');
console.log('✅ French data structure is valid!');
console.log('✅ All 200 French words are properly structured!');
