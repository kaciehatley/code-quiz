// All global variables stored here
var highscoreEl = document.querySelector("#highscore");
var timerEl = document.querySelector("#timer");
var landingPageContent = document.querySelector("#landingPage");
var startButton = document.querySelector("#start");
// Parent Element for questions
var questionsDiv = document.querySelector(".questions");
questionsDiv.setAttribute("style", "display: none;");
// Parent Element for initials
var initialsDiv = document.querySelector("#initials");
// Parent Element for high score page
var highscoreDiv = document.querySelector("#highScoreDiv");
// Parent Element for ul
var buttonParent = document.querySelector("ul");
// Audio for right and wrong answers
var correctSound = document.querySelector("#correctAudio");
correctSound.volume = 0.5;
var wrongSound = document.querySelector("#wrongAudio");
wrongSound.volume = 0.5;
// Input initials input and submit button
var submitButton = initialsDiv.querySelector(".submit");
var initialsInput = initialsDiv.querySelector(".inputSection");
// Buttons on high score page
var scoreButton = document.querySelector(".scoreButton");
var homeButton = document.querySelector(".home");

// Variable for current question
var questionCounter = 0;
// Empty array for high scores
var scores = [];

// When page loads, it gets scores in local storage and adds to the "scores" array
init();

function init() {
    var storedScores = JSON.parse(localStorage.getItem("highscores"));
    
    if (storedScores !== null) {
        scores = storedScores;
    }
  }

// High score button in top left corner that renders high scores
scoreButton.addEventListener("click", function() {
    highscoreDiv.innerHTML="";
    renderScores();
});

//Start button sets off timer
// Allots 15 seconds per question for total time remaining
var timeLeft = questions.length * 15;
startButton.addEventListener("click", function() {
    landingPageContent.setAttribute("style", "display: none;");
    var timerId = setInterval(countdown, 1000);

    function countdown() {
        if (timeLeft == -1) {
            clearTimeout(timerId);
        } else {
            timerEl.innerHTML = timeLeft + ' seconds remaining';
            timeLeft--;

            if (questionCounter === 10) {
                clearTimeout(timerId);
            }
        }
    }
    questionFunction();
});


// Creating and setting attributes for all variables that will be appended to the questions div

var questionHead = document.createElement("h2");
questionHead.setAttribute("id", "whiteBackground");
var ans1 = document.createElement("button");
ans1.setAttribute("class", "ansButton btn");
var ans2 = document.createElement("button");
ans2.setAttribute("class", "ansButton btn");
var ans3 = document.createElement("button");
ans3.setAttribute("class", "ansButton btn");
var ans4 = document.createElement("button");
ans4.setAttribute("class", "ansButton btn");
var toHome = document.createElement("button");
toHome.setAttribute("class", "btn");
toHome.setAttribute("style", "display: block; margin: auto;")

// When quiz begins, questionFunction runs.
function questionFunction() {

    questionsDiv.setAttribute("style", "display: block;");

    // Appends the questions and answer choices to the div. Once the questions are finished, it runs the "allDone" function.
    if (questionCounter === questions.length) {
        console.log("All done!");
        allDone();
    } else {
        questionHead.innerHTML="Question " + (questionCounter+1) + ": " + questions[questionCounter].title;
        questionsDiv.appendChild(questionHead);
        ans1.innerHTML=questions[questionCounter].choices[0];
        questionsDiv.appendChild(ans1);
        ans2.innerHTML=questions[questionCounter].choices[1];
        questionsDiv.appendChild(ans2);
        ans3.innerHTML=questions[questionCounter].choices[2];
        questionsDiv.appendChild(ans3);
        ans4.innerHTML=questions[questionCounter].choices[3];
        questionsDiv.appendChild(ans4);
        toHome.innerHTML="Back To Home Page";
        toHome.setAttribute("style", "color: white; margin-top: 50px; background: #575757; margin-bottom: 200px;")
        homeButton.appendChild(toHome);       
    }
    // Button to return to home page at any point.
    toHome.addEventListener("click", function() {
        window.location.reload();
    })
}

// P tag variable that displays whether users answer is correct or inccrrect
var rightOrWrong = document.createElement("p");
rightOrWrong.setAttribute("style", "color: #575757; font-style: italic; padding-top: 15px; background: white;")

// Adds event listener to all answer choices in the div.
questionsDiv.addEventListener("click", function(event) {
    if (event.target.innerHTML === questions[questionCounter].answer) {
        correctSound.play();
        questionsDiv.innerHTML="";
        questionCounter++;
        questionFunction();
        rightOrWrong.innerHTML="Correct!";
        questionsDiv.appendChild(rightOrWrong);
        pTagDelay();
    } 
    else {
        wrongSound.play();
        questionsDiv.innerHTML="";
        questionFunction();
        rightOrWrong.innerHTML="Incorrect! Try again.";
        questionsDiv.appendChild(rightOrWrong);
        pTagDelay();
        timeLeft = timeLeft - 10;
    }

    if (timeLeft <= 0) {
        timeLeft = 0;
        clearInterval(timerInterval);
    }
})

// function that displays "correct" or "incorrect" for 1 second
function pTagDelay() {
    setTimeout(function () {
        rightOrWrong.innerHTML="";
    }, 1000);
}

// function displays final scores and displays initials div where user inputs initials
function allDone() {
    toHome.setAttribute("style", "display: none;");
    questionsDiv.setAttribute("style", "display: none;");
    initialsDiv.setAttribute("style", "display: inline;");
    var finalScoreLine = initialsDiv.querySelector("#finalScore");
    finalScoreLine.innerHTML="Your final score is " + timeLeft + ".";

    // Function for submit button event listener
    function submitButtonFunc() {
        event.preventDefault();

        var inputText = initialsInput.value.trim();
        
        if (inputText === "") {
            return;
        }

        scores.push(inputText + "-" + timeLeft);
        storeScores();
        renderScores();
    }

    // When  user "submits" score, it pushes initials and score into "scores" array
    submitButton.addEventListener("click", submitButtonFunc);

    //  Another event listener for enter key, not click.
    initialsDiv.addEventListener("keyup", function(e) {
        if (e.keyCode === 13) {
            submitButtonFunc();
        }
    })
}

// stores highscores in "scores" array in local storage under "highscores"
function storeScores() {
    localStorage.setItem("highscores", JSON.stringify(scores));
}

// Creates and displays high score page
function renderScores() {
    highscoreDiv.setAttribute("style", "display: none;");
    toHome.setAttribute("style", "display: none;");
    initialsDiv.setAttribute("style", "display: none;");
    questionsDiv.setAttribute("style", "display: none;");
    landingPageContent.setAttribute("style", "display: none;");
    highscoreDiv.setAttribute("style", "display: inline;");
    timeLeft = 0;
    var scoreHeader = document.createElement("h2");
    scoreHeader.innerHTML = "High Scores";
    highscoreDiv.appendChild(scoreHeader);

    for (var i=0; i < scores.length; i++) {
        var scoreDiv = document.createElement("div");
        scoreDiv.setAttribute("style", "background: none; border: 4px solid #CB5858; width: 200px; padding: 7px 7px 0px 7px; margin: 20px auto; border-radius: 25px; font-size: 22px;");
        highscoreDiv.appendChild(scoreDiv);
        var scoreDisplay = document.createElement("p");
        scoreDisplay.innerHTML = scores[i];
        scoreDisplay.setAttribute("style", "color: #CB5858; font-weight: bold;")
        scoreDiv.appendChild(scoreDisplay);
    }

    // creates "Go Back Home" button
    var gobackButton = document.createElement("button");
    gobackButton.setAttribute("id", "scorePageButtons");
    gobackButton.innerHTML = "Back To Home";
    highscoreDiv.appendChild(gobackButton);

    // creates "Clear Highscores" button
    var clearButton = document.createElement("button");
    clearButton.setAttribute("id", "scorePageButtons");
    clearButton.innerHTML = "Clear Highscores";
    highscoreDiv.appendChild(clearButton);

    // adds event listener for "Go Back Home" button
    gobackButton.addEventListener("click", function() {
        window.location.reload();
    });

    // adds event listener for "Clear Highscores" button
    clearButton.addEventListener("click", function() {
        window.localStorage.clear();
        scores = [];
        highscoreDiv.innerHTML= "";
        renderScores();
    })
}

