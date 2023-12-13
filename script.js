// Add event listener for when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get references to various elements on the page
    const checkAnswerBtn = document.getElementById('checkAnswer');
    const userAnswerInput = document.getElementById('userAnswer');
    const feedbackContainer = document.getElementById('feedbackContainer');
    const wordContainer = document.getElementById('wordContainer');
    const practiceArea = document.getElementById('practiceArea');
    const practiceList = document.getElementById('practiceList');
    const practiceDoneBtn = document.getElementById('practiceDone');

    // Variables to hold the current word and the practice count
    let currentWord;
    let practiceCount = 0;

    // Load a random word when the app starts
    loadRandomWord();

    // Event listener to check the answer when the Enter key is pressed
    userAnswerInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            checkAnswerBtn.click();
        }
    });

    // Event listener for the Check Answer/Next Word button
    checkAnswerBtn.addEventListener('click', function() {
        // If the button is set to 'Next Word', load a new word and reset the button
        if (checkAnswerBtn.textContent === 'Next Word') {
            practiceArea.classList.add('hidden');
            loadRandomWord();
            checkAnswerBtn.textContent = 'Check Answer';
            return;
        }

        // Get the user's answer and format it for comparison
        const userAnswer = userAnswerInput.value.trim().toLowerCase();
        const correctArticle = currentWord.article.toLowerCase();
        const correctCombination = (correctArticle + ' ' + currentWord.noun).toLowerCase();

        // Check if the user's answer matches the correct article or article-word combination
        if (userAnswer === correctArticle || userAnswer === correctCombination) {
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

    // Event listener for the practice area
    practiceList.addEventListener('keyup', function(event) {
        // Check each input field in the practice list
        if (event.target.tagName.toLowerCase() === 'input' && event.key === 'Enter') {
            // Check if the entered practice is correct
            if (event.target.value.trim().toLowerCase() === (currentWord.article + ' ' + currentWord.noun).toLowerCase()) {
                event.target.disabled = true;
                practiceCount++;
                // Move on if all 10 practices are done
                if (practiceCount === 10) {
                    practiceDoneBtn.click();
                }
            } else {
                event.target.value = '';
                feedbackContainer.textContent = 'Incorrect. Try again.';
                feedbackContainer.style.color = '#e74c3c';
            }
        }
    });

    // Event listener for the practice done button
    practiceDoneBtn.addEventListener('click', function() {
        // Check if all practices are completed
        if (practiceCount === 10) {
            practiceArea.classList.add('hidden');
            loadRandomWord();
        } else {
            feedbackContainer.textContent = 'Please complete the practice.';
            feedbackContainer.style.color = '#e74c3c';
        }
    });

    // Function to load a random word from the word list
    function loadRandomWord() {
        const randomIndex = Math.floor(Math.random() * words.length);
        currentWord = words[randomIndex];
        wordContainer.textContent = currentWord.noun;
        userAnswerInput.value = '';
        feedbackContainer.textContent = '';
        practiceCount = 0;
    }

    // Function to update the practice area for the user to practice
    function updatePracticeArea() {
        practiceList.innerHTML = '';
        // Create 10 practice input fields
        for (let i = 1; i <= 10; i++) {
            const listItem = document.createElement('li');
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.placeholder = `${i}. ${currentWord.article} ${currentWord.noun}`;
            listItem.appendChild(inputField);
            practiceList.appendChild(listItem);
        }
        // Show the practice area
        practiceArea.classList.remove('hidden');
    }
});
