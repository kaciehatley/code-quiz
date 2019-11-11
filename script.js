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
var correctSound = document.querySelector("#correctAudio");
correctSound.volume = 0.5;
var wrongSound = document.querySelector("#wrongAudio");
wrongSound.volume = 0.5;
var submitButton = initialsDiv.querySelector(".submit");
var initialsInput = initialsDiv.querySelector(".inputSection");
var scoreButton = document.querySelector(".scoreButton");
var homeButton = document.querySelector(".home");

var scores = [];

scoreButton.addEventListener("click", function() {
    renderScores();
});

init();

var questions = [
    {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
    },
    {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
    },
    {
    title: "Arrays in JavaScript can be used to store _____.",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above"
    },
    {
    title: "String values must be enclosed within _______ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes"
    },
    {
    title: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal/bash", "for loops", "console log"],
    answer: "console log"
    },
];

var questionCounter = 0;

//Start button sets off timer

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

            if (questionCounter === 5) {
                clearTimeout(timerId);
            }
        }
    }
    
    questionFunction();
    console.log(questionCounter);
});


//New code

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



var rightOrWrong = document.createElement("p");
rightOrWrong.setAttribute("style", "color: #575757; font-style: italic; padding-top: 15px; background: white;")

function pTagDelay() {
    setTimeout(function () {
        rightOrWrong.innerHTML="";
    }, 1000);
}

var currentQuestion = questions[questionCounter].title;
var currentChoices = questions[questionCounter].choices;

function questionFunction() {

    questionsDiv.setAttribute("style", "display: block;");

    if (questionCounter === 5) {
        console.log("All done!");
        allDone();
    } else {
        questionHead.innerHTML=questions[questionCounter].title;
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

    toHome.addEventListener("click", function() {
        window.location.reload();
    })
}

questionsDiv.addEventListener("click", function(event) {
    if (event.target.innerHTML === questions[questionCounter].answer) {
        correctSound.play();
        questionsDiv.innerHTML="";
        questionCounter++;
        questionFunction();
        rightOrWrong.innerHTML="Correct!";
        questionsDiv.appendChild(rightOrWrong);
        pTagDelay();
        console.log(questionCounter);
    } 
    else {
        wrongSound.play();
        questionsDiv.innerHTML="";
        questionFunction();
        rightOrWrong.innerHTML="Incorrect! Try again.";
        questionsDiv.appendChild(rightOrWrong);
        pTagDelay();
        console.log(questionCounter);
        timeLeft = timeLeft - 10;
    }

    if (timeLeft <= 0) {
        timeLeft = 0;
        clearInterval(timerInterval);
    }
})

function storeScores() {
    localStorage.setItem("highscores", JSON.stringify(scores));
}

function renderScores() {
    toHome.setAttribute("style", "display: none;");
    initialsDiv.setAttribute("style", "display: none;");
    questionsDiv.setAttribute("style", "display: none;");
    landingPageContent.setAttribute("style", "display: none;");
    highscoreDiv.setAttribute("style", "display: none;");
    highscoreDiv.setAttribute("style", "display: inline;");
    timeLeft = 0;

    for (var i=0; i < scores.length; i++) {
        console.log(scores[i]);
        var scoreDiv = document.createElement("div");
        scoreDiv.setAttribute("style", "background-color: white; border: 3px solid #CB5858; width: 100px; margin: 20px auto; border-radius: 25px; font-size: 22px;");
        highscoreDiv.appendChild(scoreDiv);
        var scoreDisplay = document.createElement("p");
        scoreDisplay.innerHTML = scores[i];
        scoreDisplay.setAttribute("style", "color: #CB5858;")
        scoreDiv.appendChild(scoreDisplay);
    }

    var gobackButton = document.createElement("button");
    gobackButton.setAttribute("id", "scorePageButtons");
    gobackButton.innerHTML = "Go Back";
    highscoreDiv.appendChild(gobackButton);

    var clearButton = document.createElement("button");
    clearButton.setAttribute("id", "scorePageButtons");
    clearButton.innerHTML = "Clear Highscores";
    highscoreDiv.appendChild(clearButton);

    gobackButton.addEventListener("click", function() {
        window.location.reload();
    });

    clearButton.addEventListener("click", function() {
        window.localStorage.clear();
        scores = [];
        highscoreDiv.innerHTML= "";
        renderScores();
    })
}

function allDone() {
    toHome.setAttribute("style", "display: none;");
    questionsDiv.setAttribute("style", "display: none;");
    initialsDiv.setAttribute("style", "display: inline;");
    var finalScoreLine = initialsDiv.querySelector("#finalScore");
    finalScoreLine.innerHTML="Your final score is " + timeLeft + "!";

    submitButton.addEventListener("click", function() {
        event.preventDefault();

        var inputText = initialsInput.value.trim();
        
        if (inputText === "") {
            return;
        }

        scores.push(inputText + "-" + timeLeft);
        storeScores();
        renderScores();
    })

    document.addEventListener("keyup", function(e) {
        if (e.keyCode === 13) {
            event.preventDefault();

            var inputText = initialsInput.value.trim();
            
            if (inputText === "") {
                return;
            }
    
            scores.push(inputText + "-" + timeLeft);
            storeScores();
            renderScores();
        }
    })

}

function init() {

    var storedScores = JSON.parse(localStorage.getItem("highscores"));
    
    if (storedScores !== null) {
        scores = storedScores;
    }

  }