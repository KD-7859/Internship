document.addEventListener('DOMContentLoaded', () => {
    const textToTypeElement = document.getElementById('text-to-type');
    const textInput = document.getElementById('text-input');
    const charTypedDisplay = document.getElementById('char-typed');
    const accuracyDisplay = document.getElementById('accuracy');
    const errorsDisplay = document.getElementById('errors');
    const progressBar = document.getElementById('progress-bar');
    const wpmDisplay = document.getElementById('wpm');
    const timerDisplay = document.getElementById('timer');
    const correctWordsDisplay = document.getElementById('correct-words');
    const incorrectWordsDisplay = document.getElementById('incorrect-words');
    const resetButton = document.getElementById('reset-button');
    const feedbackElement = document.querySelector('.feedback');
    const levelButtons = document.querySelectorAll('.level-button');

    let timer;
    let startTime;
    let textToType = '';
    let isTimerRunning = false;

    const paragraphs = [
        {
            level: 'beginner',
            text: "This is a simple sentence. It is easy to type."
        },
        {
            level: 'intermediate',
            text: "Typing speed and accuracy are important skills to develop. Practice regularly."
        },
        {
            level: 'advanced',
            text: "The quick brown fox jumps over the lazy dog. This sentence contains every letter."
        }
    ];

    function getRandomParagraph(level) {
        const filteredParagraphs = paragraphs.filter(p => p.level === level);
        return filteredParagraphs[Math.floor(Math.random() * filteredParagraphs.length)].text;
    }

    function startTyping(level) {
        textToType = getRandomParagraph(level);
        textToTypeElement.textContent = textToType;
        textInput.value = '';
        charTypedDisplay.textContent = '0';
        accuracyDisplay.textContent = '100';
        errorsDisplay.textContent = '0';
        wpmDisplay.textContent = '0';
        timerDisplay.textContent = '0';
        correctWordsDisplay.textContent = '0';
        incorrectWordsDisplay.textContent = '0';
        progressBar.style.width = '0%';
        clearInterval(timer);
        isTimerRunning = false;
        feedbackElement.textContent = '';
    }

    function startTimer() {
        if (!isTimerRunning) {
            startTime = new Date();
            timer = setInterval(updateTime, 1000);
            isTimerRunning = true;
        }
    }

    function stopTimer() {
        clearInterval(timer);
        isTimerRunning = false;
    }

    function updateTime() {
        const currentTime = new Date();
        const timeElapsed = Math.floor((currentTime - startTime) / 1000);
        timerDisplay.textContent = timeElapsed;
        const wordsTyped = textInput.value.split(/\s+/).filter(word => word.length > 0).length;
        const wpm = Math.floor((wordsTyped / timeElapsed) * 60);
        wpmDisplay.textContent = isNaN(wpm) || !isFinite(wpm) ? '0' : wpm;
    }

    textInput.addEventListener('input', () => {
        startTimer();
        const inputText = textInput.value;
        const charactersTyped = inputText.length;
        charTypedDisplay.textContent = charactersTyped;

        const correctCharacters = countCorrectCharacters(inputText, textToType);
        const accuracy = ((correctCharacters / charactersTyped) * 100).toFixed(2);
        const errors = charactersTyped - correctCharacters;
        
        accuracyDisplay.text
