var level1 = ["y","o","u"," ", "s", "h", "a", "l","l", " ", "n", "o", "t", " ", "p", "a","s","s"];
var lotrPhrases = ['you shall not pass', ]
var level1_Blanks = ["_","_","_"," ", "_","_","_","_","_", " ","_","_", "_"," ","_","_","_", ]

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
"q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// var music = document.getElementById("music");
// music.volume = 0.1;


//This let's the DOM receive the key inputs from an anonymous function 
//that gets passed an input
document.onkeyup = function(event) {
    //This puts the User's input into the variable UserGuess
    var userGuess = event.key;

    //This allows us to manipulate the blanks, the level, hp, and dialogue
    var gameResult = document.getElementById("blanks");
    var level = document.getElementById("level");
    var hp = document.getElementById("hp");
    var frodoDialogue = document.getElementById("frodoDialogue");
    var smeagolDialogue = document.getElementById("smeagolDialogue");

    //Call the addLetter Function to add inputs
    addLetter(userGuess,level1);

    //Prints result to the screen
    var currentGameResult = level1_Blanks.toString().replace(/,/g, '')

    //This prints out the gameresult to the DOM
    gameResult.textContent = currentGameResult;

    if (currentGameResult === lotrPhrases[0]) {
        level.textContent = "2";
    }

    //************************************************//
    //************     FUNCTIONS   *****************||/
    //***********************************************//
    //FUNCTION 1: This array adds the letter to the gameresult if 
    //you guess right
    function addLetter(userGuess,level1) {
        var userGuessMatches = false;
        //checks to see if userGuess is in the array
        for(var i = 0 ; i < level1.length ; i++) {
            frodoDialogue.textContent = userGuess + "?";    
            if (userGuess === level1[i]){
                level1_Blanks[i] = level1[i];
                userGuessMatches = true;
            } 
        }   
        //Smeagol's response to your input
        if (userGuessMatches === true) {
            smeagolDialogue.textContent = "that's right";
        } else {
            smeagolDialogue.textContent = "hehe..stupid hobbitses, i throw a rocksy everytime you guess wrong hehe";
            hp.textContent -= 5;
            frodoDialogue.textContent = "ow, did you just throw a rock at me?";
        }
    }
    //FUNCTION:

};

