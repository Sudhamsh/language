// Telugu Quiz Application
class TeluguQuiz {
    constructor() {
        this.selectedLevel = 1;
        this.numQuestions = 10;
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.wrongAnswers = 0;
        this.answered = false;

        this.init();
    }

    init() {
        console.log('Initializing Telugu Quiz...');
        this.setupEventListeners();
        this.showScreen('start-screen');
    }

    setupEventListeners() {
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

        // Shuffle and select random flashcards
        const shuffled = [...level.flashcards].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, Math.min(this.numQuestions, shuffled.length));

        // Generate questions
        this.questions = selected.map(card => {
            const questionType = Math.random() > 0.5 ? 'telugu-to-english' : 'english-to-telugu';

            if (questionType === 'telugu-to-english') {
                // Show Telugu, ask for English
                const wrongAnswers = this.getRandomWrongAnswers(card, level.flashcards, 'english', 3);
                const options = this.shuffleArray([card.english, ...wrongAnswers]);

                return {
                    type: 'Telugu → English',
                    question: card.telugu,
                    romanization: card.romanization,
                    correctAnswer: card.english,
                    options: options
                };
            } else {
                // Show English, ask for Telugu
                const wrongAnswers = this.getRandomWrongAnswers(card, level.flashcards, 'telugu', 3);
                const options = this.shuffleArray([card.telugu, ...wrongAnswers]);

                return {
                    type: 'English → Telugu',
                    question: card.english,
                    romanization: '',
                    correctAnswer: card.telugu,
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
            message = '🎉 Perfect score! You\'re a Telugu master!';
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
    const quiz = new TeluguQuiz();
    window.teluguQuiz = quiz; // Make accessible for debugging
    console.log('Telugu Quiz initialized!');
});
