// Comprehensive test runner for all languages
const fs = require('fs');
const path = require('path');

(async () => {
    console.log('🧪 Running Comprehensive Language Tests');
    console.log('='.repeat(50));
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

        if (teluguData.levels.length === 3 &&
            teluguData.levels[0].flashcards.length === 100 &&
            teluguData.levels[1].flashcards.length === 100 &&
            teluguData.levels[2].flashcards.length === 100 &&
            teluguData.levels[0].flashcards[0].id === 1 &&
            teluguData.levels[0].flashcards[99].id === 100 &&
            teluguData.levels[1].flashcards[0].id === 101 &&
            teluguData.levels[1].flashcards[99].id === 200 &&
            teluguData.levels[2].flashcards[0].id === 201 &&
            teluguData.levels[2].flashcards[99].id === 300) {
            console.log('  ✅ Telugu: 300 words, correct structure');
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
        global.window = undefined;

        // Load test file (path relative to this script's directory)
        const testCode = fs.readFileSync(path.join(__dirname, 'app.test.js'), 'utf8');

        // Strip the browser/module auto-run footer so we control execution
        const cleanTestCode = testCode.replace(/\/\/ Run tests[\s\S]*$/, '');

        // Execute in a function scope and return the runner instance
        const runner = new Function(cleanTestCode + '; return runner;')();

        // Await the async runner (tests are synchronous but runner.run() is async)
        const ok = await runner.run();

        if (ok) {
            totalPassed++;
        } else {
            totalFailed++;
        }
    } catch (error) {
        console.error('  ❌ Unit Tests: Error -', error.message);
        totalFailed++;
    }

    console.log('');
    console.log('='.repeat(50));
    console.log('📊 Final Results');
    console.log('='.repeat(50));
    console.log(`Total Sections Passed: ${totalPassed}`);
    console.log(`Total Sections Failed: ${totalFailed}`);
    console.log('');

    if (totalFailed === 0) {
        console.log('✅ ALL TESTS PASSED!');
        console.log('');
        console.log('📝 Summary:');
        console.log('   - Telugu: 300 words (Level 1: 100, Level 2: 100, Level 3: 100)');
        console.log('   - Spanish: 200 words (Level 1: 100, Level 2: 100)');
        console.log('   - French: 200 words (Level 1: 100, Level 2: 100)');
        console.log('   - Total: 700 vocabulary words!');
        process.exit(0);
    } else {
        console.log('❌ SOME TESTS FAILED');
        console.log('Please review the errors above.');
        process.exit(1);
    }
})();
