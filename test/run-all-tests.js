// Comprehensive test runner for all languages
const fs = require('fs');

console.log('🧪 Running Comprehensive Language Tests');
console.log('=' .repeat(50));
console.log('');

let totalPassed = 0;
let totalFailed = 0;

// Test Telugu
console.log('📚 Testing Telugu Data...');
try {
    global.window = {};
    const teluguCode = fs.readFileSync('telugu/telugu-data.js', 'utf8');
    eval(teluguCode);
    const teluguData = window.FLASHCARD_DATA;

    if (teluguData.levels.length === 2 &&
        teluguData.levels[0].flashcards.length === 100 &&
        teluguData.levels[1].flashcards.length === 100 &&
        teluguData.levels[0].flashcards[0].id === 1 &&
        teluguData.levels[0].flashcards[99].id === 100 &&
        teluguData.levels[1].flashcards[0].id === 101 &&
        teluguData.levels[1].flashcards[99].id === 200) {
        console.log('  ✅ Telugu: 200 words, correct structure');
        totalPassed++;
    } else {
        console.log('  ❌ Telugu: Invalid structure');
        totalFailed++;
    }
} catch (error) {
    console.log('  ❌ Telugu: Error -', error.message);
    totalFailed++;
}

// Test Spanish
console.log('📚 Testing Spanish Data...');
try {
    global.window = {};
    const spanishCode = fs.readFileSync('spanish/spanish-data.js', 'utf8');
    eval(spanishCode);
    const spanishData = window.FLASHCARD_DATA;

    if (spanishData.levels.length === 2 &&
        spanishData.levels[0].flashcards.length === 100 &&
        spanishData.levels[1].flashcards.length === 100 &&
        spanishData.levels[0].flashcards[0].id === 1 &&
        spanishData.levels[0].flashcards[99].id === 100 &&
        spanishData.levels[1].flashcards[0].id === 101 &&
        spanishData.levels[1].flashcards[99].id === 200) {
        console.log('  ✅ Spanish: 200 words, correct structure');
        totalPassed++;
    } else {
        console.log('  ❌ Spanish: Invalid structure');
        totalFailed++;
    }
} catch (error) {
    console.log('  ❌ Spanish: Error -', error.message);
    totalFailed++;
}

// Test French
console.log('📚 Testing French Data...');
try {
    global.window = {};
    const frenchCode = fs.readFileSync('french/french-data.js', 'utf8');
    eval(frenchCode);
    const frenchData = window.FLASHCARD_DATA;

    if (frenchData.levels.length === 2 &&
        frenchData.levels[0].flashcards.length === 100 &&
        frenchData.levels[1].flashcards.length === 100 &&
        frenchData.levels[0].flashcards[0].id === 1 &&
        frenchData.levels[0].flashcards[99].id === 100 &&
        frenchData.levels[1].flashcards[0].id === 101 &&
        frenchData.levels[1].flashcards[99].id === 200) {
        console.log('  ✅ French: 200 words, correct structure');
        totalPassed++;
    } else {
        console.log('  ❌ French: Invalid structure');
        totalFailed++;
    }
} catch (error) {
    console.log('  ❌ French: Error -', error.message);
    totalFailed++;
}

console.log('');
console.log('🧪 Running Unit Tests...');

// Load and run app.test.js tests
try {
    delete global.window;
    global.window = undefined;

    // Mock console for test output
    const testLogs = [];
    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args) => {
        const msg = args.join(' ');
        testLogs.push(msg);
        if (msg.includes('✓') || msg.includes('📊')) {
            originalLog(...args);
        }
    };

    console.error = (...args) => {
        testLogs.push(args.join(' '));
        originalError(...args);
    };

    // Load test file
    const testCode = fs.readFileSync('app.test.js', 'utf8');

    // Remove the auto-run code and export code
    const cleanTestCode = testCode
        .replace(/\/\/ Run tests[\s\S]*$/, '')
        .replace(/if \(typeof window[^}]*\}[^}]*\}/g, '')
        .replace(/if \(typeof module[^}]*\}/g, '');

    eval(cleanTestCode);

    // Run the tests
    const result = runner.run();

    // Restore console
    console.log = originalLog;
    console.error = originalError;

    // Count results
    const passedMatches = testLogs.filter(log => log.includes('✓')).length;
    const failedMatches = testLogs.filter(log => log.includes('✗')).length;

    console.log(`  Unit Tests: ${passedMatches} passed`);

    if (failedMatches > 0) {
        console.log(`  ❌ ${failedMatches} tests failed`);
        totalFailed++;
    } else {
        totalPassed++;
    }
} catch (error) {
    console.log('  ❌ Unit Tests: Error -', error.message);
    totalFailed++;
}

console.log('');
console.log('=' .repeat(50));
console.log('📊 Final Results');
console.log('=' .repeat(50));
console.log(`Total Tests Passed: ${totalPassed}`);
console.log(`Total Tests Failed: ${totalFailed}`);
console.log('');

if (totalFailed === 0) {
    console.log('✅ ALL TESTS PASSED!');
    console.log('');
    console.log('🎉 French language support successfully added!');
    console.log('📝 Summary:');
    console.log('   - Telugu: 200 words (Level 1: 100, Level 2: 100)');
    console.log('   - Spanish: 200 words (Level 1: 100, Level 2: 100)');
    console.log('   - French: 200 words (Level 1: 100, Level 2: 100)');
    console.log('   - Total: 600 vocabulary words across 3 languages!');
    process.exit(0);
} else {
    console.log('❌ SOME TESTS FAILED');
    console.log('Please review the errors above.');
    process.exit(1);
}
