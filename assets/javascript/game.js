//=====================//
// Game Setup
//=====================//
const ALPHABET = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const LOTR_PHRASES = [
    'you shall not pass',
    'a wizard is never late',
    'one does not simply walk into mordor',
    'smeagol freeeee',
    'you shall bow to no one'
];

//=====================//
// Global Variables
//=====================//
let levelsObj = {};
let numberOfLevels;
let userGuess = "";
let isLetterAMatch = false;
let currentLevel = 1;
let wrongLettersArray = [];
let healthPoints = 100;
let neverBeenHitBefore = true;
let currentLevelBlanks = [];
let currentLevelBlanksAsAString = "";
let greenButtonClicked = 0;


//=====================//
// DOM Variables
//=====================//
const FRODO_SAYS = document.getElementById("frodoDialogue");
const FRODO_PIC = document.getElementById('frodo-pic');
const SMEAGOL_SAYS = document.getElementById("smeagolDialogue");
const HEALTH_POINTS_DISPLAY = document.getElementById("hp");
const LEVEL_DISPLAY = document.getElementById("level")
const GAME_TITLE = document.getElementById('gameTitle');
const BLANKS_DISPLAY = document.getElementById("blanks");
const WRONG_LETTERS_CONTAINER = document.querySelector('#wrongLettersP')
const WRONG_LETTERS_DISPLAY = document.getElementById("wrongLetters");
const PLAY_BUTTON = document.getElementById("playButton");
const CONTINUE_BUTTON = document.getElementById("continueButton");
const MUSIC = document.getElementById('music');

MUSIC.play();


//========================================================================================================================//
// Main Setup
//========================================================================================================================//
prepareGame();
console.log(levelsObj);
console.log(levelsObj[currentLevel]);

$(document).on("click", "#playButton", function () {
    PLAY_BUTTON.classList.add('d-none');
    WRONG_LETTERS_CONTAINER.classList.remove('d-none');
    
    displayBlanks();

    window.onkeyup = function (event) {
        userGuess = event.key;

        if (ALPHABET.indexOf(userGuess) !== -1 && healthPoints > 0) {
            FRODO_SAYS.textContent = userGuess + "?";

            if (levelsObj[currentLevel].indexOf(userGuess) !== -1) {
                console.log("Its a match!");
                SMEAGOL_SAYS.textContent = "That's correct..hehe"
                displayCorrectLetters();

                if (currentLevelBlanksAsAString === LOTR_PHRASES[currentLevel - 1]) {
                    newLevel();
                }
            } else {
                console.log("Wrong!");
                wrongScenario();
            }
        }
    }

})



//========================================================================================================================//
// Functions
//========================================================================================================================//

//===================================//
// Animations
//===================================//
function wrongScenario() {
    if (wrongLettersArray.indexOf(userGuess) === -1) {
        wrongLettersArray.push(userGuess);
        healthPoints -= 10;
        HEALTH_POINTS_DISPLAY.textContent = healthPoints;
        WRONG_LETTERS_DISPLAY.textContent = wrongLettersArray.join(' ');
    } else {
        SMEAGOL_SAYS.textContent = "ekhh...why does hobbitses guess that wrong letter again?";
        return 0;
    }

    if (healthPoints === 0) {
        window.setTimeout(function () {
            gameOverScenario();
        }, 1500);
    } else {
        FRODO_PIC.classList.add('hitFrodo');
        window.setTimeout(function () { FRODO_PIC.classList.remove('hitFrodo'); }, 1000);

        if (neverBeenHitBefore) {
            neverBeenHitBefore = false;
            window.setTimeout(function () { FRODO_SAYS.textContent = "ow, did you just throw a rock at me?"; }, 2000);
            window.setTimeout(function () { SMEAGOL_SAYS.textContent = "hehe..stupid hobbitses, i throw a rocksy everytime you guess wrong hehe"; }, 2500);
        } else {
            SMEAGOL_SAYS.textContent = "stupid hobbitses";
        }
    }
}

function gameOverScenario() {
    const LOSING_MUSIC = document.getElementById('losingMusic');

    GAME_TITLE.textContent = "Game Over";
    WRONG_LETTERS_CONTAINER.textContent = "";
    FRODO_PIC.classList.add('deadFrodo');
    SMEAGOL_SAYS.textContent = "Precious is ours now!!";
    FRODO_SAYS.textContent = "...";
    BLANKS_DISPLAY.textContent = "Frodo has been slain...Sauron returned, and Middle Earth has been destroyed..";

    MUSIC.pause();
    LOSING_MUSIC.play();
}

//===================================//
// Blanks Creator
//===================================//
function blanksCreator() {
    let currentPhraseArray = levelsObj[currentLevel];
    currentLevelBlanks = [];

    for (var i = 0; i < currentPhraseArray.length; i++) {
        if (ALPHABET.indexOf(currentPhraseArray[i]) !== -1) {
            currentLevelBlanks.push("_")
        } else {
            currentLevelBlanks.push(" ")
        }
    }
}
//===================================//
// New Levels
//===================================//
function displayCorrectLetters() {
    let currentPhraseArray = levelsObj[currentLevel];

    for (let i = 0; i < currentPhraseArray.length; i++) {
        if (userGuess === currentPhraseArray[i]) {
            currentLevelBlanks[i] = currentPhraseArray[i];
        }
    }

    BLANKS_DISPLAY.textContent = currentLevelBlanksAsAString = currentLevelBlanks.toString().replace(/,/g, "");
}

function displayBlanks() {
    BLANKS_DISPLAY.textContent = currentLevelBlanks.toString().replace(/,/g, "");
}

//===================================//
// New Levels
//===================================//
function newLevel() {
    currentLevel++;
    LEVEL_DISPLAY.textContent = currentLevel.toString();

    if (currentLevel > numberOfLevels) {
        GAME_TITLE.textContent = "You win!";
        FRODO_SAYS.textContent = "sweet";
        SMEAGOL_SAYS.textContent = "fine...";
        WRONG_LETTERS_CONTAINER.classList.add("d-none");
        BLANKS_DISPLAY.classList.add("d-none");
    } else {
        GAME_TITLE.textContent = "You leveled up! Press a letter to continue";
        CONTINUE_BUTTON.classList.remove("d-none");

    }

}

$(document).on("click", "#continueButton", function() {
    CONTINUE_BUTTON.classList.add("d-none");
    GAME_TITLE.textContent = "Guess a letter!";
    WRONG_LETTERS_DISPLAY.textContent = "";
    blanksCreator();
    displayBlanks();
});

//===================================//
// Prepare the Game
//===================================//
function prepareGame() {
    populateLevelsObject();
    blanksCreator();
}

function stringToArray(string) {
    let array = [];
    for (let i = 0; i < string.length; i++) {
        array.push(string[i]);
    }
    return array;
}

function populateLevelsObject() {
    for (let i = 0; i < LOTR_PHRASES.length; i++) {
        levelsObj[i + 1] = stringToArray(LOTR_PHRASES[i]);
    }

    numberOfLevels = Object.keys(levelsObj).length;
    console.log("There are this many levels: " + numberOfLevels);
}