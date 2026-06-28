# 🌍 Multi-Language Flashcard Learning App

An interactive web application for learning **Telugu**, **Hindi**, **Spanish**, and **French** vocabulary with audio pronunciation support.

**Live Demo:** [https://sudhamsh.github.io/language/](https://sudhamsh.github.io/language/)

![Languages](https://img.shields.io/badge/Languages-Telugu%20%7C%20Hindi%20%7C%20Spanish%20%7C%20French-blue)
![Vocabulary](https://img.shields.io/badge/Vocabulary-900%20Words-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 📚 Interactive Flashcards
- **900 vocabulary words** across 4 languages
- **2-3 difficulty levels** per language (Basics, Intermediate, and Advanced for Hindi)
- **Hindi Level 3**: Complete numbers 1-100 in Devanagari script
- **Category filtering** (Greetings, Numbers, Family, Verbs, Colors, etc.)
- **Flip animation** to reveal translations
- **Romanization** for pronunciation guidance
- **Shuffle mode** for randomized practice

### 🔊 Audio Pronunciation
- **Native voice support** for Spanish and French
- **Click-to-hear** pronunciation on each flashcard
- **Auto-play mode** for hands-free learning
- **Quiz audio** for native language questions
- **Graceful fallback** for unsupported languages

### 📝 Quiz Mode
- **Multiple choice questions** with 4 options
- **Configurable difficulty** (5, 10, 15, or 20 questions)
- **Bidirectional testing** (Native → English and English → Native)
- **Score tracking** with instant feedback
- **Results summary** with percentage and performance message

### 🌐 Additional Features
- **Deep linking** - Share specific language with URL parameters
- **Mobile responsive** - Works on phones, tablets, and desktops
- **Keyboard shortcuts** - Space/Enter to flip, arrows to navigate
- **Offline ready** - No backend required, runs entirely in browser
- **Feedback system** - Built-in issue reporting via GitHub Issues

## 🚀 Quick Start

### Option 1: Use Online (Recommended)
Visit the live site: **[https://sudhamsh.github.io/language/](https://sudhamsh.github.io/language/)**

💡 **Need help?** Check out the **[FAQ page](https://sudhamsh.github.io/language/faq.html)** for troubleshooting, audio setup, and usage tips!

### Option 2: Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/Sudhamsh/language.git
   cd language
   ```

2. Open in browser:
   ```bash
   open index.html
   # or just double-click index.html
   ```

No build process or dependencies needed! 🎉

## 📖 Usage

### Flashcards Mode
1. **Select a language** using the language buttons (🇮🇳 Telugu, 🇪🇸 Spanish, 🇫🇷 French)
2. **Choose a level** (e.g. Level 1 - Basics, Level 2 - Intermediate, Level 3 - Advanced for Telugu)
3. **Filter by category** (optional) to focus on specific topics
4. **Click the card** to flip and see the translation
5. **Use navigation buttons** or arrow keys to move between cards
6. **Click 🔊** to hear pronunciation
7. **Enable auto-play** for automatic pronunciation on each card

### Quiz Mode
1. Click **"📝 Take Quiz"** from the flashcards page
2. **Select your language** and difficulty level
3. **Choose number of questions** (5, 10, 15, or 20)
4. **Answer questions** by selecting the correct translation
5. **Click 🔊** on native language questions to hear pronunciation
6. **View results** and retry to improve your score

### Keyboard Shortcuts
- **Space / Enter** - Flip flashcard
- **Left Arrow** - Previous card
- **Right Arrow** - Next card

## 🗂️ Project Structure

```
language/
├── index.html              # Main flashcards page
├── quiz.html              # Quiz page
├── faq.html               # FAQ and troubleshooting page
├── app.js                 # Flashcard logic
├── quiz.js               # Quiz logic
├── style.css             # Main styles
├── quiz-style.css        # Quiz-specific styles
├── telugu/
│   └── telugu-data.js    # Telugu vocabulary (300 words)
├── hindi/
│   └── hindi-data.js     # Hindi vocabulary (200 words)
├── spanish/
│   └── spanish-data.js   # Spanish vocabulary (200 words)
├── french/
│   └── french-data.js    # French vocabulary (200 words)
├── .github/
│   └── ISSUE_TEMPLATE/   # GitHub issue templates
│       ├── bug_report.yml
│       ├── feature_request.yml
│       └── feedback.yml
└── test/
    ├── test.html         # Telugu test suite
    ├── test-hindi.html   # Hindi test suite
    ├── test-spanish.html # Spanish test suite
    ├── test-french.html  # French test suite
    ├── app.test.js       # Comprehensive test suite
    ├── run-all-tests.js  # Test runner
    └── audio-test.html   # Audio diagnostic tool
```

## 📊 Vocabulary Coverage

| Language | Level 1 | Level 2 | Level 3 | Total | Categories |
|----------|---------|---------|---------|-------|------------|
| 🇮🇳 Telugu  | 100 | 100 | 100 (Advanced) | **300** | 20 categories |
| 🇮🇳 Hindi   | 100 | 100 | 100 (Numbers 1-100) | **300** | 14 categories |
| 🇪🇸 Spanish | 100 | 100 | - | 200 | 14 categories |
| 🇫🇷 French  | 100 | 100 | - | 200 | 14 categories |
| **Total** | **400** | **400** | **200** | **1000** | - |

### Categories Include:
- Greetings & Polite Phrases
- Numbers (1-1000)
- Family & Relationships
- Common Verbs & Actions
- Pronouns
- Adjectives & Descriptions
- Colors
- Body Parts
- Places & Locations
- Time & Days
- Food & Drink
- Clothing
- Questions Words
- Common Words & Phrases

## 🎯 Target Audience

Perfect for:
- 📖 **Language Teachers** - Use in classroom or assign as homework
- 👨‍🎓 **Students** - Self-paced vocabulary learning
- 🌏 **Travelers** - Learn essential phrases before trips
- 👨‍👩‍👧‍👦 **Parents** - Teach children heritage languages
- 🧠 **Language Enthusiasts** - Expand multilingual skills

## 🔧 Technical Details

### Built With
- **Pure HTML5, CSS3, JavaScript** - No frameworks or dependencies
- **Web Speech API** - For audio pronunciation
- **CSS Grid & Flexbox** - Responsive layouts
- **URL Parameters** - Deep linking support

### Browser Support
| Feature | Chrome | Safari | Firefox | Edge |
|---------|--------|--------|---------|------|
| Flashcards | ✅ | ✅ | ✅ | ✅ |
| Quiz | ✅ | ✅ | ✅ | ✅ |
| Audio (Spanish/French) | ✅ | ✅ | ✅ | ✅ |
| Audio (Telugu) | ⚠️ Fallback | ⚠️ Fallback | ⚠️ Fallback | ⚠️ Fallback |

*Telugu audio uses English voice fallback on most systems*

## 🧪 Testing

Run the test suites by opening in browser:
- **test/test.html** - Telugu data validation (69 tests)
- **test/test-hindi.html** - Hindi data validation (19 tests, includes Level 3)
- **test/test-spanish.html** - Spanish data validation (13 tests)
- **test/test-french.html** - French data validation (13 tests)
- **test/audio-test.html** - Audio pronunciation diagnostic tool

All tests validate:
- Correct word counts (100 per level, 300 for Hindi)
- Proper ID ranges (1-100, 101-200, 201-300 for Hindi Level 3)
- No duplicate words within or between levels
- Required fields present (native, romanization, english, category)
- Valid category names

## 🌟 Deep Linking

Share specific languages with URL parameters:
- Telugu flashcards: `index.html?lang=telugu`
- Spanish flashcards: `index.html?lang=spanish`
- French flashcards: `index.html?lang=french`
- Spanish quiz: `quiz.html?lang=spanish`

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### 💬 Report Issues or Share Feedback

Found a bug? Have a feature request? Want to share your thoughts?

**[Open an issue on GitHub](https://github.com/Sudhamsh/language/issues/new/choose)**

We have templates for:
- 🐛 **Bug Reports** - Report technical issues
- ✨ **Feature Requests** - Suggest new features or improvements
- 💬 **General Feedback** - Share your thoughts and suggestions

You can also use the "💬 Report Issue / Give Feedback" link in the app footer!

### 📚 Add More Vocabulary

To add more vocabulary words:

1. Edit the appropriate data file:
   - `telugu/telugu-data.js`
   - `spanish/spanish-data.js`
   - `french/french-data.js`

2. Follow the data structure:
   ```javascript
   {
     id: 1,
     telugu: "నమస్కారం",  // or spanish/french
     romanization: "Namaskāram",
     english: "Hello",
     category: "Greetings"
   }
   ```

3. Run tests to validate (`test/test.html`, `test/test-spanish.html`, `test/test-french.html`)
4. Submit a pull request

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created by **Sudhamsh Bachu**

## 🙏 Acknowledgments

- Vocabulary compiled with assistance from language teaching resources
- Audio powered by Web Speech API
- Built with ❤️ for language learners everywhere

---

**Happy Learning! 🎓**

నేర్చుకోవడం ఆనందంగా! (Telugu) | ¡Feliz aprendizaje! (Spanish) | Bon apprentissage! (French)
