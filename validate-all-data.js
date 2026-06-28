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

        // At least one level
        if (data.levels.length >= 1) {
            checks.push(`✓ ${data.levels.length} level(s)`);
        } else {
            checks.push('✗ Expected at least 1 level, got 0');
            allValid = false;
        }

        // Check each level: 100 cards with sequential IDs starting where the previous left off
        data.levels.forEach((level, index) => {
            const expectedStart = index * 100 + 1;
            const expectedEnd = expectedStart + 99;

            if (level.flashcards.length === 100) {
                checks.push(`✓ Level ${index + 1}: 100 cards`);
            } else {
                checks.push(`✗ Level ${index + 1}: Expected 100 cards, got ${level.flashcards.length}`);
                allValid = false;
            }

            const firstId = level.flashcards[0].id;
            const lastId = level.flashcards[level.flashcards.length - 1].id;
            if (firstId === expectedStart && lastId === expectedEnd) {
                checks.push(`✓ Level ${index + 1}: IDs ${expectedStart}-${expectedEnd}`);
            } else {
                checks.push(`✗ Level ${index + 1}: Invalid ID range (${firstId}-${lastId}), expected ${expectedStart}-${expectedEnd}`);
                allValid = false;
            }
        });

        // Check for duplicates across all levels
        const allWords = data.levels.flatMap(l => l.flashcards).map(c => c[fieldName]);
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

// Validate all languages
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
