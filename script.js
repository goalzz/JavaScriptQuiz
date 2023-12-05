document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.getElementById("start-btn");
    const questionContainer = document.getElementById("question-container");
    const answersContainer = document.getElementById("answers-container");
    const resultContainer = document.getElementById("result-container");
    const scoreContainer = document.getElementById("score-container");
    const timerContainer = document.getElementById("timer-container");
    const timerSpan = document.getElementById("timer");
    const submitBtn = document.getElementById("submit-btn");
    const initialsContainer = document.getElementById("initials-container");
    const saveBtn = document.getElementById("save-btn");
    const toggleScoresBtn = document.getElementById("toggle-scores-btn");
    const clearScoresBtn = document.getElementById("clear-scores-btn");
    const buttonsContainer = document.getElementById("buttons-container");

    let currentQuestionIndex = 0;
    let score = 0;
    let timeLeft = 60;
    let timerInterval;
    let highScores = [];


    const questions = [
    {
    question: "1. Javascript is an _ _ _ _ _ language?",
    answers: ["A. Object-Oriented", "B. Object-Based", "C. Procedural", "D. None of these"],
    correctAnswer: "A. Object-Oriented",
    },

    {
    question: "2. Which function is used to serialize an object into a JSON string in Javascript?",
    answers: ["A. stringify()", "B. parse()", "C. convert()", "D.None of these"],
    correctAnswer: "A. stringify()",
    },

    {
    question: "3. Which of the following are closures in Javascript?",
    answers: ["A. Variables", "B. Functions", "C. Objects", "D. All of these"],
    correctAnswer: "D. All of these",
    },

    {
    question: "4. What keyword is used to declare an asynchronous function in Javascript?",
    answers: ["A. await", "B. setTimeout", "C. async", "D. clearInterval"],
    correctAnswer: "C. async",
    },

    {
    question: "5. How do we write a comment in javascript?",
    answers: ["A. /**/", "B. //", "C. #", "D. $$"],
    correctAnswer: "B. //",
    },
    
    ];

    function startQuiz() {
        // Displaying an alert with instructions before user starts the quiz
    alert("Welcome to the JavaScript Fundamentals Quiz!\n\nFor each incorrect answer, 10 seconds will be deducted from your total time. Good Luck!");

        startBtn.style.display = "none";
        displayQuestion();
        startTimer();
    }

    function displayQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionContainer.textContent = currentQuestion.question;

        answersContainer.innerHTML = "";
        currentQuestion.answers.forEach(function (answer) {
            const button = document.createElement("button");
            button.textContent = answer;
            button.addEventListener("click", function () {
                checkAnswer(answer === currentQuestion.correctAnswer);
            });
            answersContainer.appendChild(button);
        });
    }

    function checkAnswer(isCorrect) {
        if (isCorrect) {
            score += 20; // Each correct answer is worth 20 points
            resultContainer.textContent = "Correct!";
            resultContainer.classList.remove("incorrect");
        } else {
            resultContainer.textContent = "Incorrect!";
            resultContainer.classList.add("incorrect");

            timeLeft -= 10; // deducting 10 seconds from timer if answer is incorrect
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    }

    function startTimer() {
        timerInterval = setInterval(function () {
            timeLeft--;
            timerSpan.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endQuiz();
                alert("You've run out of time! Try again.");
            }
        }, 1000);
    }

    function endQuiz() {
        questionContainer.textContent = "Quiz Over!";
        answersContainer.innerHTML = "";
        resultContainer.textContent = "";
        clearInterval(timerInterval);

        // Calculating the time taken for the quiz
        const timeTaken = 60 - timeLeft; 

        const totalPoints = questions.length * 20; // Each question is worth 20 points
        const scoreFraction = score + " / " + totalPoints;

        scoreContainer.textContent = "Your Score: " + scoreFraction + " | Time taken: " + timeTaken + " seconds";

        initialsContainer.style.display = "block";
    }

    function displayHighScores() {
        // Assuming you have an element with id "high-scores" to display the high scores
        const highScoresContainer = document.getElementById("high-scores");

        if (highScoresContainer) {
        highScoresContainer.innerHTML = "<h2>Highscore</h2>";

        // Display high scores
        highScores.forEach((entry, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${entry.initials} - ${entry.score}`;
            highScoresContainer.appendChild(listItem);
        });
    } else {
        console.error("Element with id 'high-scores' not found");
    }
    }

    function saveHighScores() {
        // Save high scores to local storage
        localStorage.setItem("highScores", JSON.stringify(highScores));
    }

    function loadHighScores() {
        const storedHighScores = localStorage.getItem("highScores");

        if (storedHighScores) {
            highScores = JSON.parse(storedHighScores);
        }
    }

    //adding an event listener for the save button

    saveBtn.addEventListener("click", function () {
        const initialsInput = document.getElementById("initials");
        const initials = initialsInput.value.toUpperCase(); // Convert to uppercase

        if (initials.trim() !== "") {
            highScores.push({ initials: initials, score: score });

            // Sort high scores in descending order
            highScores.sort((a, b) => b.score - a.score);

            // Display high scores
            displayHighScores();

            // Save high scores to local storage
            saveHighScores();

            alert("High score saved!");
        } else {
            alert("Please enter your initials.");
        }
    });

     // adding an event listener to toggle highscore + styling it briefly
    toggleScoresBtn.addEventListener("click", function () {
        const highScoresContainer = document.getElementById("high-scores");
        highScoresContainer.style.display = highScoresContainer.style.display === "none" ? "block" : "none";
    });

    // adding an event listener to clear highscore
    clearScoresBtn.addEventListener("click", function () {
        highScores = [];
        saveHighScores();
        displayHighScores();
        alert("High scores cleared!");
    });

    loadHighScores();
    displayHighScores();

    startBtn.addEventListener("click", startQuiz);
});