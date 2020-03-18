# Code-Quiz

## About The Project
This project allows the user to test their JavaScript knowledge. User can take quiz multiple times and compare high scores.

## Obstacles
An immense amount of Googling and trial/error went into this project. Initially, I had the event listener for all answer choices inside the questionFunction(). I still do not understand why, but this caused my questionCounter to increase exponentially with each event. Separating the two solved the issue, but I still do not understand why this happened.

I also started by storing the high scores in two separate strings--names and scores. When I went back to clean up my code, I found that storing them as one string was more efficient.

My goal was to create multiple quizzes; however, while the styling looked beautiful from my local device, the Bootstrap did not display the elements the same way after pushed to github. After fiddling with it for a long time, I decided this could be a later project.

## Styling

The background has a lined paper image (fitting for a quiz) that can be found at toptal.com. https://www.toptal.com/designers/subtlepatterns/lined-paper-2/

All fonts are sans-serif.
For buttons, borders, and background, the following colors are used:
[white, a medium gray #575757, and a blush color #CB5858.

## How To Use

When you load the website, this is the home screen.
<img width="833" alt="Screen Shot 2019-11-11 at 11 23 36 AM" src="https://user-images.githubusercontent.com/55072295/68604012-822fa000-0477-11ea-909c-1fc243290806.png">
Notice the timer set to zero in the top right corner and the "View Highscores" button located in the top left corner. To begin the quiz, select the "Start Quiz" button.

Once the quiz begins, the timer starts. The seconds displayed in the timer is a formula (the number of questions total multiplied by 15). As each question loads, you will see four buttons containing answer choices. If you select the correct answer, a "ding" sound will play, the next question will display, and the word "Correct" will display for one second. If you select the incorrect answer, a "buzz" sound will play, 10 seconds will be subtracted from the timer, the same question will display, and the words "Inorrect. Try again!" will display for one second.
<img width="907" alt="Screen Shot 2019-11-11 at 11 24 52 AM" src="https://user-images.githubusercontent.com/55072295/68604261-169a0280-0478-11ea-9270-502cb71a9d61.png">
At any point, you may view the high scores or select the gray button at the bottom to return to the home screen. This will not save any progress.

At the end of the quiz, you may enter your initials to save the final score. The final score is equal to the seconds remaining.
<img width="705" alt="Screen Shot 2019-11-11 at 11 25 41 AM" src="https://user-images.githubusercontent.com/55072295/68604624-e7d05c00-0478-11ea-850b-bf800b5970d6.png">

Once you submit your score, the page will display all high scores currently stored.
<img width="820" alt="Screen Shot 2019-11-11 at 11 29 39 AM" src="https://user-images.githubusercontent.com/55072295/68604697-10585600-0479-11ea-88a0-0442fba0717c.png">

The highscore values will remain in the local storage key "highscores" until the "Clear Highscores" button is pressed.
<img width="574" alt="Screen Shot 2019-11-11 at 11 29 55 AM" src="https://user-images.githubusercontent.com/55072295/68604780-3847b980-0479-11ea-8d79-5913df97e4b6.png">


## Future Commits

In the future, I would like to return to create additional quizzes and allow user to save their progress.

## Acknowledgments

The sounds used were found at freesound.com.
* Correct Answer Sound: https://freesound.org/people/InspectorJ/sounds/411088/
* Wrong Answer Sound: https://freesound.org/people/Raclure/sounds/483598/
