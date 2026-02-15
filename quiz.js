// Language Quiz Application
class LanguageQuiz {
    constructor() {
        // Check URL parameter for language
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        this.currentLanguage = (langParam === 'spanish' || langParam === 'telugu' || langParam === 'french') ? langParam : 'telugu';

        this.selectedLevel = 1;
        this.numQuestions = 10;
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.wrongAnswers = 0;
        this.answered = false;

        this.init();
    }

    async init() {
        console.log('Initializing Language Quiz...');
        console.log(`Language from URL: ${this.currentLanguage}`);

        // Set active language button based on URL parameter
        this.setActiveLanguageButton();

        // Update flashcards links with current language
        this.updateFlashcardsLinks();

        await this.loadLanguageData();
        this.setupEventListeners();
        this.updateUI();
        this.showScreen('start-screen');
    }

    // Set active language button
    setActiveLanguageButton() {
        document.querySelectorAll('.language-btn').forEach(btn => {
            if (btn.dataset.language === this.currentLanguage) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Update flashcards links to include current language
    updateFlashcardsLinks() {
        document.querySelectorAll('.flashcards-link').forEach(link => {
            link.href = `index.html?lang=${this.currentLanguage}`;
        });
    }

    // Dynamically load language data
    async loadLanguageData() {
        try {
            // IMPORTANT: Clear the old FLASHCARD_DATA to ensure fresh load
            if (typeof window.FLASHCARD_DATA !== 'undefined') {
                delete window.FLASHCARD_DATA;
            }

            // Remove ALL existing language data scripts
            document.querySelectorAll('script[src*="-data.js"]').forEach(script => {
                script.remove();
            });

            // Add cache-busting timestamp to force reload
            const timestamp = new Date().getTime();
            const dataPath = `${this.currentLanguage}/${this.currentLanguage}-data.js?t=${timestamp}`;

            console.log(`Loading ${dataPath}...`);

            // Load the script dynamically
            await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = dataPath;
                script.onload = () => {
                    console.log(`Script loaded: ${dataPath}`);
                    // Small delay to ensure script is fully executed
                    setTimeout(() => resolve(), 100);
                };
                script.onerror = () => reject(new Error(`Failed to load ${dataPath}`));
                document.body.appendChild(script);
            });

            if (typeof FLASHCARD_DATA === 'undefined') {
                throw new Error('FLASHCARD_DATA not found after loading script.');
            }

            console.log(`✓ Loaded ${this.currentLanguage} quiz data`);
        } catch (error) {
            console.error('Error loading quiz data:', error);
            alert(`Failed to load ${this.currentLanguage} quiz data. Please check the data file.`);
        }
    }

    // Update UI based on selected language
    updateUI() {
        const languageConfig = {
            telugu: {
                title: '📝 Telugu Quiz',
                subtitle: 'Test your Telugu vocabulary knowledge'
            },
            spanish: {
                title: '📝 Spanish Quiz',
                subtitle: 'Test your Spanish vocabulary knowledge'
            },
            french: {
                title: '📝 French Quiz',
                subtitle: 'Test your French vocabulary knowledge'
            }
        };

        const config = languageConfig[this.currentLanguage];
        document.getElementById('quiz-title').textContent = config.title;
        document.getElementById('quiz-subtitle').textContent = config.subtitle;
    }

    // Get the native language field name
    getNativeField() {
        if (this.currentLanguage === 'telugu') return 'telugu';
        if (this.currentLanguage === 'spanish') return 'spanish';
        if (this.currentLanguage === 'french') return 'french';
        return 'telugu';
    }

    // Get the display name for question types
    getQuestionTypeDisplay(isNativeToEnglish) {
        const displays = {
            telugu: isNativeToEnglish ? 'Telugu → English' : 'English → Telugu',
            spanish: isNativeToEnglish ? 'Spanish → English' : 'English → Spanish',
            french: isNativeToEnglish ? 'French → English' : 'English → French'
        };
        return displays[this.currentLanguage];
    }

    setupEventListeners() {
        // Language selector buttons
        const languageButtons = document.querySelectorAll('.language-btn');
        languageButtons.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const language = e.target.dataset.language;
                if (language !== this.currentLanguage) {
                    languageButtons.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    this.currentLanguage = language;

                    // Update URL parameter for deep linking
                    const url = new URL(window.location);
                    url.searchParams.set('lang', language);
                    window.history.pushState({}, '', url);

                    // Update flashcards links to preserve language
                    this.updateFlashcardsLinks();

                    await this.loadLanguageData();
                    this.updateUI();
                    this.showScreen('start-screen');
                    this.resetQuiz();
                }
            });
        });

        // Level selection
        document.querySelectorAll('.quiz-level-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.quiz-level-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.selectedLevel = parseInt(e.currentTarget.dataset.level);
            });
        });

        // Number of questions
        document.getElementById('num-questions').addEventListener('change', (e) => {
            this.numQuestions = parseInt(e.target.value);
        });

        // Start quiz
        document.getElementById('btn-start').addEventListener('click', () => {
            this.startQuiz();
        });

        // Submit answer
        document.getElementById('btn-submit').addEventListener('click', () => {
            this.submitAnswer();
        });

        // Retry quiz
        document.getElementById('btn-retry').addEventListener('click', () => {
            this.showScreen('start-screen');
            this.resetQuiz();
        });
    }

    resetQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.wrongAnswers = 0;
        this.answered = false;
        this.questions = [];
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    startQuiz() {
        this.resetQuiz();
        this.generateQuestions();
        this.showScreen('quiz-screen');
        this.displayQuestion();
        this.updateProgress();
        this.updateScore();
    }

    generateQuestions() {
        // Get flashcards from selected level
        const level = FLASHCARD_DATA.levels.find(l => l.id === this.selectedLevel);
        if (!level || level.flashcards.length === 0) {
            alert('No flashcards available for this level!');
            return;
        }

        const nativeField = this.getNativeField();

        // Shuffle and select random flashcards
        const shuffled = [...level.flashcards].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, Math.min(this.numQuestions, shuffled.length));

        // Generate questions
        this.questions = selected.map(card => {
            const questionType = Math.random() > 0.5 ? 'native-to-english' : 'english-to-native';

            if (questionType === 'native-to-english') {
                // Show native language, ask for English
                const wrongAnswers = this.getRandomWrongAnswers(card, level.flashcards, 'english', 3);
                const options = this.shuffleArray([card.english, ...wrongAnswers]);

                return {
                    type: this.getQuestionTypeDisplay(true),
                    question: card[nativeField],
                    romanization: card.romanization,
                    correctAnswer: card.english,
                    options: options
                };
            } else {
                // Show English, ask for native language
                const wrongAnswers = this.getRandomWrongAnswers(card, level.flashcards, nativeField, 3);
                const options = this.shuffleArray([card[nativeField], ...wrongAnswers]);

                return {
                    type: this.getQuestionTypeDisplay(false),
                    question: card.english,
                    romanization: '',
                    correctAnswer: card[nativeField],
                    options: options
                };
            }
        });

        document.getElementById('total-questions').textContent = this.questions.length;
    }

    getRandomWrongAnswers(correctCard, allCards, field, count) {
        const wrongOptions = allCards
            .filter(card => card[field] !== correctCard[field])
            .map(card => card[field]);

        // Shuffle and select random wrong answers
        const shuffled = wrongOptions.sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    displayQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.showResults();
            return;
        }

        this.answered = false;
        const question = this.questions[this.currentQuestionIndex];

        // Update question display
        document.getElementById('question-type').textContent = question.type;
        document.getElementById('question-text').textContent = question.question;

        if (question.romanization) {
            document.getElementById('question-romanization').textContent = `(${question.romanization})`;
            document.getElementById('question-romanization').style.display = 'block';
        } else {
            document.getElementById('question-romanization').style.display = 'none';
        }

        // Create answer options
        const answersContainer = document.getElementById('answers');
        answersContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'answer-option';
            optionDiv.innerHTML = `
                <input type="radio" name="answer" id="option-${index}" value="${option}">
                <label for="option-${index}">${option}</label>
            `;

            optionDiv.addEventListener('click', () => {
                if (!this.answered) {
                    document.getElementById(`option-${index}`).checked = true;
                    document.querySelectorAll('.answer-option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    optionDiv.classList.add('selected');
                    document.getElementById('btn-submit').disabled = false;
                }
            });

            answersContainer.appendChild(optionDiv);
        });

        // Reset submit button
        document.getElementById('btn-submit').disabled = true;
        document.getElementById('btn-submit').textContent = 'Submit Answer';

        // Hide feedback
        document.getElementById('feedback').classList.remove('show', 'correct', 'incorrect');

        // Update progress
        this.updateProgress();
    }

    submitAnswer() {
        if (this.answered) {
            // Move to next question
            this.currentQuestionIndex++;
            this.displayQuestion();
            return;
        }

        const selectedOption = document.querySelector('input[name="answer"]:checked');
        if (!selectedOption) return;

        this.answered = true;
        const question = this.questions[this.currentQuestionIndex];
        const isCorrect = selectedOption.value === question.correctAnswer;

        // Update score
        if (isCorrect) {
            this.score++;
        } else {
            this.wrongAnswers++;
        }
        this.updateScore();

        // Highlight correct/incorrect answers
        document.querySelectorAll('.answer-option').forEach(option => {
            const input = option.querySelector('input[type="radio"]');
            if (input.value === question.correctAnswer) {
                option.classList.add('correct');
            } else if (input.checked && !isCorrect) {
                option.classList.add('incorrect');
            }
        });

        // Show feedback
        const feedback = document.getElementById('feedback');
        feedback.classList.add('show', isCorrect ? 'correct' : 'incorrect');
        feedback.textContent = isCorrect
            ? '✓ Correct! Well done!'
            : `✗ Wrong! The correct answer is: ${question.correctAnswer}`;

        // Update button text
        document.getElementById('btn-submit').textContent =
            this.currentQuestionIndex < this.questions.length - 1 ? 'Next Question' : 'See Results';
    }

    updateProgress() {
        const current = this.currentQuestionIndex + 1;
        const total = this.questions.length;
        const percentage = (current / total) * 100;

        document.getElementById('current-question').textContent = current;
        document.getElementById('progress-fill').style.width = `${percentage}%`;
    }

    updateScore() {
        document.getElementById('score-correct').textContent = this.score;
        document.getElementById('score-wrong').textContent = this.wrongAnswers;
    }

    showResults() {
        const total = this.questions.length;
        const percentage = Math.round((this.score / total) * 100);

        // Update results display
        document.getElementById('result-percentage').textContent = `${percentage}%`;
        document.getElementById('final-correct').textContent = this.score;
        document.getElementById('final-wrong').textContent = this.wrongAnswers;
        document.getElementById('final-total').textContent = total;

        // Set result message based on score
        let message = '';
        if (percentage === 100) {
            message = `🎉 Perfect score! You're a ${this.currentLanguage === 'telugu' ? 'Telugu' : 'Spanish'} master!`;
        } else if (percentage >= 80) {
            message = '🌟 Excellent work! You\'re doing great!';
        } else if (percentage >= 60) {
            message = '👍 Good job! Keep practicing!';
        } else if (percentage >= 40) {
            message = '💪 Not bad! Review and try again!';
        } else {
            message = '📚 Keep studying! Practice makes perfect!';
        }

        document.getElementById('result-message').textContent = message;

        // Show results screen
        this.showScreen('results-screen');
    }
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const quiz = new LanguageQuiz();
    window.languageQuiz = quiz; // Make accessible for debugging
    console.log('Language Quiz initialized!');
});
