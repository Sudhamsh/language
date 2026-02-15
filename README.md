# Language Flashcards - Interactive Learning App

A professional, interactive web application for learning Telugu and Spanish vocabulary through flashcards. Perfect for English speakers learning new languages!

## Features

### 🌍 Multi-Language Support
- **Telugu**: 200 words across 2 levels (🇮🇳 Telugu script with romanization)
- **Spanish**: 200 words across 2 levels (🇪🇸 Spanish with pronunciation guide)
- Easy language switching with one click

### 🎴 Interactive Flashcards
- Click or tap to flip between native language and English
- Beautiful card flip animations
- Pronunciation guides (romanization for Telugu, phonetics for Spanish)

### 📝 Quiz Mode
- Test your knowledge with multiple-choice questions
- Choose your language (Telugu or Spanish)
- Choose between Level 1 (Basics) or Level 2 (Intermediate)
- Configurable question count (5, 10, 15, or 20 questions)
- Two question types: Native Language → English and English → Native Language
- Real-time score tracking
- Detailed results with performance feedback

### 🎯 Smart Learning Features
- **Two Languages**: Telugu and Spanish, both with 200 words each
- **Two Levels**: Level 1 (100 basic words) and Level 2 (100 intermediate words)
- **Category Filters**: Filter by Greetings, Numbers, Family, Verbs, and more
- **Shuffle Mode**: Randomize cards for better learning
- **Keyboard Shortcuts**: Learn faster with keyboard navigation

### 💾 Browser Storage
- No internet required after initial load
- Works completely offline
- Pure HTML/CSS/JavaScript - no dependencies

### 📱 Mobile-Friendly
- Fully responsive design for all screen sizes
- Optimized for tablets (768px) and phones (480px)
- Touch-friendly buttons and interface
- Works seamlessly on iOS and Android devices

## How to Use

### Flashcard Mode
1. Open `index.html` in your web browser
2. **Select your language** (🇮🇳 Telugu or 🇪🇸 Spanish)
3. Select a level (Level 1: Basics or Level 2: Intermediate)
4. Click on a card to flip between native language and English
5. Use Previous/Next buttons or arrow keys to navigate
6. Switch languages anytime by clicking the language selector

### Quiz Mode
1. Open `quiz.html` in your web browser
2. **Select your language** (🇮🇳 Telugu or 🇪🇸 Spanish)
3. Select a level (1 or 2)
4. Choose number of questions (5, 10, 15, or 20)
5. Click **Start Quiz**
6. Read the question and select your answer from 4 options
7. Click **Submit Answer** to check if you're correct
8. View your results at the end with detailed statistics

### Keyboard Shortcuts (Flashcard Mode)
- **Space/Enter**: Flip the current card
- **Left Arrow**: Previous card
- **Right Arrow**: Next card

### Navigation
- Use **Previous/Next** buttons to navigate through cards
- Click **category buttons** to filter by topic
- Click **Shuffle** to randomize card order
- Switch between **Level 1** and **Level 2** using level selector buttons

## File Structure

```
language/
├── index.html              # Flashcard interface (multi-language)
├── style.css               # Flashcard styling and animations
├── app.js                  # Flashcard application logic (multi-language)
├── quiz.html               # Quiz interface (multi-language)
├── quiz-style.css          # Quiz styling
├── quiz.js                 # Quiz application logic (multi-language)
├── app.test.js             # Comprehensive test suite
├── test.html               # Telugu test runner UI
├── test-spanish.html       # Spanish test runner UI
├── README.md               # This file
├── telugu/
│   └── telugu-data.js      # Telugu vocabulary data (Levels 1 & 2, 200 words total)
└── spanish/
    └── spanish-data.js     # Spanish vocabulary data (Levels 1 & 2, 200 words total)
```

## Extending the Flashcards

The flashcard data is stored in `flashcards-data.json` in an extensible format. To add more flashcards:

### JSON Format
```json
{
  "flashcards": [
    {
      "id": 101,
      "telugu": "తెలుగు పాఠం",
      "romanization": "Telugu Pāṭham",
      "english": "Telugu Lesson",
      "category": "Education"
    }
  ]
}
```

### Fields
- **id**: Unique identifier (integer)
- **telugu**: Telugu script text
- **romanization**: Romanized pronunciation guide
- **english**: English translation
- **category**: Category for filtering

### Adding New Categories
1. Add new flashcards with a new category name
2. Add a category button in `index.html`:
```html
<button class="category-btn" data-category="YourCategory">Your Category</button>
```

## Categories Included

- **Greetings**: Basic greetings and polite phrases
- **Numbers**: 1-10
- **Family**: Family member terms
- **Verbs**: Common action words
- **Common Words**: Frequently used vocabulary
- **Pronouns**: I, you, he, she, we, they
- **Adjectives**: Descriptive words
- **Colors**: Color names
- **Body Parts**: Parts of the body
- **Places**: Locations and buildings
- **Time**: Time-related words
- **Questions**: Question words (who, what, where, when, why, how)

## Testing

The application includes comprehensive test suites for both languages to ensure reliability.

### Running Tests

**Telugu Tests:**
1. Open [test.html](test.html) in your web browser
2. Tests will run automatically and display results
3. Tests validate Telugu data structure, duplicates, and integrity

**Spanish Tests:**
1. Open [test-spanish.html](test-spanish.html) in your web browser
2. Tests will run automatically and display results
3. Tests validate Spanish data structure, duplicates, and integrity

**Via Console:**
```bash
# If you have Node.js installed
node app.test.js
```

### Test Coverage

The test suite includes 50+ tests covering:
- ✓ Data loading and validation
- ✓ Level switching functionality (Levels 1 & 2)
- ✓ Category filtering
- ✓ Navigation (next/previous cards)
- ✓ Shuffle algorithm
- ✓ Card display
- ✓ Edge cases and error handling
- ✓ Data integrity checks (no duplicate words between levels)
- ✓ Quiz question generation
- ✓ Quiz answer option generation (1 correct + 3 random wrong)
- ✓ Quiz score tracking and calculation
- ✓ Quiz progress tracking
- ✓ Quiz percentage calculations
- ✓ Quiz completion logic

### Test Results

All tests should pass. If any fail, check:
- Data file format is correct
- All required fields are present
- IDs are unique within each level

## Technical Details

### Technologies Used
- Pure HTML5, CSS3, and JavaScript (ES6+)
- No external dependencies
- Responsive design for mobile and desktop
- LocalStorage API for persistence

### Browser Compatibility
- Works on all modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-friendly responsive design
- Requires JavaScript enabled

## Tips for Learning

1. **Daily Practice**: Review 10-20 cards daily for best retention
2. **Active Recall**: Try to recall the answer before flipping
3. **Spaced Repetition**: Review known cards periodically
4. **Category Focus**: Master one category at a time
5. **Use Romanization**: Learn pronunciation alongside vocabulary

## License

Free to use for educational purposes.

## Contributing

To add more flashcards or improve the app:
1. Edit `flashcards-data.json` to add vocabulary
2. Modify `style.css` for design changes
3. Update `app.js` for new features

---

Happy Learning! నేర్చుకోవడం ఆనందంగా! (Nērchukōvaḍaṁ ānandaṅgā!)
