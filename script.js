// All global variables stored here
var highscoreEl = document.querySelector("#highscore");
var timerEl = document.querySelector("#timer");
var landingPageContent = document.querySelector("#landingPage");
var startButton = document.querySelector("#start");
// Parent Element for questions
var questionsDiv = document.querySelector("#questions");
questionsDiv.setAttribute("style", "width:50%; margin: auto; align-content:left;");
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

var questionCounter = 0;

//Start button sets off timer

var timeLeft = 75;

function countdown() {
    if (timeLeft == -1) {
        clearTimeout(timerId);
    } else {
        timerEl.innerHTML = timeLeft + ' seconds remaining';
        timeLeft--;
    }
}

startButton.addEventListener("click", function() {
    landingPageContent.setAttribute("style", "display: none;");
    timerEl.textContent = timeLeft;
    var timerId = setInterval(countdown, 1000);
    
    questionFunction();
    console.log(questionCounter);
});


//New code

var questionHead = document.createElement("h2");
// questionHead.setAttribute("style", "width:50%; margin: auto; text-align:left;");
var ans1 = document.createElement("button");
ans1.setAttribute("class", "ansButton btn");
var ans2 = document.createElement("button");
ans2.setAttribute("class", "ansButton btn");
var ans3 = document.createElement("button");
ans3.setAttribute("class", "ansButton btn");
var ans4 = document.createElement("button");
ans4.setAttribute("class", "ansButton btn");


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

var rightOrWrong = document.createElement("p");
rightOrWrong.setAttribute("style", "color: #A0A0A0; font-style: italic; padding-top: 20px;")

function pTagDelay() {
    setTimeout(function () {
        rightOrWrong.innerHTML="";
    }, 3000);
}

var currentQuestion = questions[questionCounter].title;
var currentChoices = questions[questionCounter].choices;

function questionFunction() {

    if (questionCounter === 5) {
        console.log("All done!");
        clearTimeout(timerId);
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
        
    }
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

function allDone() {
    initialsDiv.setAttribute("style", "display: inline;");
    var finalScoreLine = initialsDiv.querySelector("#finalScore");

}