document.addEventListener('DOMContentLoaded', function() {
    const checkAnswerBtn = document.getElementById('checkAnswer');
    const userAnswerInput = document.getElementById('userAnswer');
    const feedbackContainer = document.getElementById('feedbackContainer');
    const wordContainer = document.getElementById('wordContainer');
    const practiceArea = document.getElementById('practiceArea');
    const practiceList = document.getElementById('practiceList');

    let currentWord;
    let practiceCount = 0;

    loadRandomWord();

    userAnswerInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            checkAnswerBtn.click();
        }
    });

    checkAnswerBtn.addEventListener('click', function() {
        if (checkAnswerBtn.textContent === 'Next Word') {
            practiceArea.classList.add('hidden');
            loadRandomWord();
            checkAnswerBtn.textContent = 'Check Answer';
            return;
        }

        const userAnswer = userAnswerInput.value;

        if (userAnswer.trim().toLowerCase() === currentWord.article.toLowerCase()) {
            feedbackContainer.textContent = 'Correct!';
            feedbackContainer.style.color = 'green';
            checkAnswerBtn.textContent = 'Next Word';
            practiceCount = 0;
            practiceList.innerHTML = '';
        } else {
            feedbackContainer.textContent = 'Incorrect. Practice below.';
            feedbackContainer.style.color = '#e74c3c';
            practiceCount = 0;
            updatePracticeArea();
        }
    });

    function loadRandomWord() {
        const randomIndex = Math.floor(Math.random() * words.length);
        currentWord = words[randomIndex];
        wordContainer.textContent = currentWord.noun;
        userAnswerInput.value = '';
        feedbackContainer.textContent = '';
        practiceCount = 0;
    }

    function updatePracticeArea() {
        practiceList.innerHTML = '';
        for (let i = 1; i <= 10; i++) {
            const listItem = document.createElement('li');
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.placeholder = `${i}. ${currentWord.article} ${currentWord.noun}`;
            listItem.appendChild(inputField);
            practiceList.appendChild(listItem);
        }
        practiceArea.classList.remove('hidden');
    }
});
