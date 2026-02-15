// Validate all language data files
const fs = require('fs');

console.log('🧪 Validating All Language Data Files');
console.log('=' .repeat(60));
console.log('');

let allValid = true;

// Helper function to validate a language
function validateLanguage(name, path, fieldName) {
    console.log(`📚 Validating ${name}...`);

    try {
        global.window = {};
        const code = fs.readFileSync(path, 'utf8');
        eval(code);
        const data = window.FLASHCARD_DATA;

        const checks = [];

        // Check 2 levels
        if (data.levels.length === 2) {
            checks.push('✓ 2 levels');
        } else {
            checks.push(`✗ Expected 2 levels, got ${data.levels.length}`);
            allValid = false;
        }

        // Check Level 1: 100 cards, IDs 1-100
        const level1 = data.levels[0];
        if (level1.flashcards.length === 100) {
            checks.push('✓ Level 1: 100 cards');
        } else {
            checks.push(`✗ Level 1: Expected 100 cards, got ${level1.flashcards.length}`);
            allValid = false;
        }

        if (level1.flashcards[0].id === 1 && level1.flashcards[99].id === 100) {
            checks.push('✓ Level 1: IDs 1-100');
        } else {
            checks.push(`✗ Level 1: Invalid ID range (${level1.flashcards[0].id}-${level1.flashcards[99].id})`);
            allValid = false;
        }

        // Check Level 2: 100 cards, IDs 101-200
        const level2 = data.levels[1];
        if (level2.flashcards.length === 100) {
            checks.push('✓ Level 2: 100 cards');
        } else {
            checks.push(`✗ Level 2: Expected 100 cards, got ${level2.flashcards.length}`);
            allValid = false;
        }

        if (level2.flashcards[0].id === 101 && level2.flashcards[99].id === 200) {
            checks.push('✓ Level 2: IDs 101-200');
        } else {
            checks.push(`✗ Level 2: Invalid ID range (${level2.flashcards[0].id}-${level2.flashcards[99].id})`);
            allValid = false;
        }

        // Check for duplicates
        const allWords = [...level1.flashcards, ...level2.flashcards].map(c => c[fieldName]);
        const uniqueWords = new Set(allWords);
        if (allWords.length === uniqueWords.size) {
            checks.push('✓ No duplicate words');
        } else {
            const duplicates = allWords.filter((word, index) => allWords.indexOf(word) !== index);
            checks.push(`✗ Duplicate words: ${[...new Set(duplicates)].join(', ')}`);
            allValid = false;
        }

        // Check all cards have required fields
        let missingFields = false;
        data.levels.forEach(level => {
            level.flashcards.forEach(card => {
                if (!card.id || !card[fieldName] || !card.romanization || !card.english || !card.category) {
                    missingFields = true;
                }
            });
        });

        if (!missingFields) {
            checks.push('✓ All required fields present');
        } else {
            checks.push('✗ Some cards missing required fields');
            allValid = false;
        }

        // Print results
        checks.forEach(check => console.log('  ' + check));
        console.log('');

    } catch (error) {
        console.log(`  ✗ Error: ${error.message}`);
        console.log('');
        allValid = false;
    }
}

// Validate all three languages
validateLanguage('Telugu', 'telugu/telugu-data.js', 'telugu');
validateLanguage('Spanish', 'spanish/spanish-data.js', 'spanish');
validateLanguage('French', 'french/french-data.js', 'french');

console.log('=' .repeat(60));
console.log('📊 Summary');
console.log('=' .repeat(60));
console.log('');

if (allValid) {
    console.log('✅ ALL DATA FILES ARE VALID!');
    console.log('');
    console.log('📝 Language Support:');
    console.log('   🇮🇳 Telugu:  200 words (Level 1: 100, Level 2: 100)');
    console.log('   🇪🇸 Spanish: 200 words (Level 1: 100, Level 2: 100)');
    console.log('   🇫🇷 French:  200 words (Level 1: 100, Level 2: 100)');
    console.log('   ─────────────────────────────────────────────────');
    console.log('   📚 TOTAL:    600 vocabulary words');
    console.log('');
    console.log('🎉 French language support successfully added!');
    console.log('');
    console.log('📖 To test the application:');
    console.log('   1. Open index.html in a browser for flashcards');
    console.log('   2. Open quiz.html in a browser for the quiz');
    console.log('   3. Open test.html for Telugu tests');
    console.log('   4. Open test-spanish.html for Spanish tests');
    console.log('   5. Open test-french.html for French tests');
    console.log('');
    process.exit(0);
} else {
    console.log('❌ VALIDATION FAILED');
    console.log('Please review the errors above.');
    console.log('');
    process.exit(1);
}
