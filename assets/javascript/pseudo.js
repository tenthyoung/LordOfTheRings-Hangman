//I need a start menu
//I need a character select menu

//I need words
//I need a function that converts phrases into arrays


//I need to validate user's input
if (answer.indexOf(UserGuess) !== -1) { //checks to see if its a letter
    addLetter();
    wrongGuess();
} else {
    print('invalid input, only lowercase letters please');
}
//addLetter() function
function addLetter(userGuess,answer) {
    for(var i = 0 ; i < level1.length() ; i++) {
        if (userGuess === level1[i]){
            level1_Blanks[i] = level1[i];
        }
    }   
}

//wrongGuess()

//function that ends the game if you lose

//I need a function that goes to the next level when you get them all correct
//prints a victory when you win

//


// var level1 = ["y","o","u"," ", "s", "h", "a", "l","l", " ", "n", "o", "t", " ", "p", "a","s","s"];
var lotrPhrases = ['you shall not pass', '' ]
// var level1_Blanks = ["_","_","_"," ", "_","_","_","_","_", " ","_","_", "_"," ","_","_","_","_" ]

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", 
                "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", 
                "u", "v", "w", "x", "y", "z"];

// var music = document.getElementById("music");
// music.volume = 0.1;




//This let's the DOM receive the key inputs from an anonymous function 
//that gets passed an input, which is the user
document.onkeyup = function(event) {
    //This puts the User's input into the variable UserGuess
    var userGuess = event.key;

    //This allows us to manipulate the blanks, the level, hp, and dialogue
    var gameResult = document.getElementById("blanks");
    var level = document.getElementById("level");
    var hp = document.getElementById("hp");
    var frodoDialogue = document.getElementById("frodoDialogue");
    var smeagolDialogue = document.getElementById("smeagolDialogue");

    //alter music settings
    var music = document.getElementById('music');
    music.volume = 0.1;

    //converts a string to an array
    var currentLevel = stringToArray(lotrPhrases[0]);
    var currentLevelBlanks = blanksCreator(currentLevel);

    //Call the addLetter Function to add inputs
    var userGuessMatches = addLetter(userGuess,currentLevel);

    //Dialogues
    dialogue(userGuessMatches);

    //Prints result to the screen
    var currentGameResult = currentLevelBlanks.toString().replace(/,/g, '')

    //This prints out the gameresult to the DOM
    gameResult.textContent = currentGameResult;

    if (currentGameResult === lotrPhrases[0]) {
        level.textContent = "2";
    }

    //************************************************//
    //************     FUNCTIONS   *****************||/
    //***********************************************//
    //FUNCTION 1: This array adds the letter to the gameresult if 
    //you guess right. Returns value if the guess is right
    function addLetter(userGuess,level1) {
        var userGuessMatches = false;
        //checks to see if userGuess is in the array
        for(var i = 0 ; i < level1.length ; i++) {
            frodoDialogue.textContent = userGuess + "?";    
            if (userGuess === level1[i]){
                currentLevelBlanks[i] = level1[i];
                userGuessMatches = true;
            } 
        }   
        return userGuessMatches;
    }
    //FUNCTION 2: dialogue. The function changes the dialogue based on whether or not you're right or wrong
    function dialogue(userGuessMatches) {
        //Smeagol's response to your input
        if (userGuessMatches === true) {
            smeagolDialogue.textContent = "that's right";
        } else {
            smeagolDialogue.textContent = "hehe..stupid hobbitses, i throw a rocksy everytime you guess wrong hehe";
            hp.textContent -= 5;
            frodoDialogue.textContent = "ow, did you just throw a rock at me?";
        }    
    } 
    
    function stringToArray(string) {
        var array = [];
        for (var i = 0 ; i < string.length ; i++ ) {
            array.push(string[i]);
        }
        return array;
    }

    function blanksCreator(currentLevel) {
        var currentLevelBlanks = [];
        for (let i = 0; i < currentLevel.length; i++) {
            if ( alphabet.indexOf(currentLevel[i]) !== -1 ) {
                currentLevelBlanks.push("_")
            } else {
                currentLevelBlanks.push(" ")
            }
            
        }
        return currentLevelBlanks;
    }
};

