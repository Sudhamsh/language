# Telugu Flashcards - Interactive Learning App

A professional, interactive web application for learning Telugu vocabulary through flashcards. Perfect for English speakers learning Telugu!

## Features

### 🎴 Interactive Flashcards
- Click or tap to flip between Telugu and English
- Beautiful card flip animations
- 100 essential Telugu words with romanization

### 📊 Progress Tracking
- Automatic progress saving in browser
- Track known vs. learning cards
- Visual progress dashboard

### 🎯 Smart Learning Features
- **Category Filters**: Filter by Greetings, Numbers, Family, Verbs, and more
- **Shuffle Mode**: Randomize cards for better learning
- **Review Mode**: Practice only the cards you've marked as known
- **Keyboard Shortcuts**: Learn faster with keyboard navigation

### 💾 Browser Storage
- All progress saved automatically
- No internet required after initial load
- Works completely offline

## How to Use

### Getting Started
1. Open `index.html` in your web browser
2. Start learning! Click on a card to flip it
3. Use "I Know This" or "Don't Know" buttons to track progress

### Keyboard Shortcuts
- **Space/Enter**: Flip the current card
- **Left Arrow**: Previous card
- **Right Arrow**: Next card
- **K**: Mark as known
- **U**: Mark as unknown

### Navigation
- Use **Previous/Next** buttons to navigate through cards
- Click **category buttons** to filter by topic
- Click **Shuffle** to randomize card order
- Click **Review Known** to practice cards you've marked as known

### Progress Management
- Your progress is saved automatically in your browser
- Click **Reset Progress** to start over (warning: this cannot be undone)

## File Structure

```
language/
├── index.html              # Main HTML file
├── style.css              # Styling and animations
├── app.js                 # Application logic
├── flashcards-data.json   # Telugu vocabulary data
└── README.md              # This file
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
