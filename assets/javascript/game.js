// var level1 = ["y","o","u"," ", "s", "h", "a", "l","l", " ", "n", "o", "t", " ", "p", "a","s","s"];
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", 
                "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", 
                "u", "v", "w", "x", "y", "z" ];
var lotrPhrases = ['you shall not pass', '' ];
var level1 = stringToArray(lotrPhrases[0]);
var level1_Blanks = blanksCreator(level1, alphabet);
var wrongLettersArray = [];
var lives = 10;

// var level1_Blanks = ["_","_","_"," ", "_","_","_","_","_", " ","_","_", "_"," ","_","_","_","_" ];


// var music = document.getElementById("music");
// music.volume = 0.1;


//This let's the DOM receive the key inputs from an anonymous function 
//that gets passed an input, which is the user
document.onkeyup = function(event) {
    //This puts the User's input into the variable UserGuess
    //This allows us to manipulate the blanks, the level, hp, and dialogue
    var gameResult = document.getElementById("blanks");
    var level = document.getElementById("level");
    var hp = document.getElementById("hp");
    var frodoDialogue = document.getElementById("frodoDialogue");
    var smeagolDialogue = document.getElementById("smeagolDialogue");
    var wrongLetters = document.getElementById("wrongLetters");
    var frodoPic = document.getElementById('frodo-pic');
    var gameTitle = document.getElementById('gameTitle');
    var wrongLettersLine = document.querySelector("#wrongLettersP");

    
    //If you lose all hp
    if ( lives < 1) {
        gameTitle.textContent = "Game Over";
        wrongLettersLine.textContent = ""
        window.setTimeout(function() {frodoPic.classList.add('deadFrodo');});
        window.setTimeout(function() {smeagolDialogue.textContent = "Precious is ours now!!"});
        window.setTimeout(function() {frodoDialogue.textContent = "..."});
        window.setTimeout(function() {
            gameResult.textContent = "$Frodo has been slain...Sauron returned, and Middle Earth has been destroyed..";
        });  
    } else {
        var userGuess = event.key;
        
        //alter music settings
        var music = document.getElementById('music');
        music.volume = 0.1;

        //Call the addLetter Function to add inputs
        var userGuessMatches = addLetter(userGuess,level1);

        //Dialogues
        dialogueAndConsequences(userGuess, userGuessMatches);

        //Prints result to the screen
        var currentGameResult = level1_Blanks.toString().replace(/,/g, '')

        //This prints out the gameresult to the DOM
        gameResult.textContent = currentGameResult;


        if (currentGameResult === lotrPhrases[0]) {
            level.textContent = "2";
        }
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
                level1_Blanks[i] = level1[i];
                userGuessMatches = true;
            } 
        }   
        return userGuessMatches;
    }
    //FUNCTION 2: dialogue. The function changes the dialogue based on whether or not you're right or wrong
    function dialogueAndConsequences(userGuess, userGuessMatches) {
        //Smeagol's response to your input
        if (userGuessMatches === true) {
            smeagolDialogue.textContent = "that's correct..hehe";
        } else {
            //the first time you get something wrong, Frodo reacts to Smeagol hitting him with a rock
            if ((wrongLettersArray === undefined || wrongLettersArray.length === 0) && lives > 0) {
                //frodoPic.classList.toggle('hitFrodo');
                window.setTimeout(function() {frodoPic.classList.toggle('hitFrodo');},500);
                window.setTimeout(function() {frodoPic.classList.toggle('hitFrodo');},2000);
                window.setTimeout(function() {
                    frodoDialogue.textContent = "ow, did you just throw a rock at me?";},2000);
                window.setTimeout(function() {
                    smeagolDialogue.textContent = "hehe..stupid hobbitses, i throw a rocksy everytime you guess wrong hehe";
                },2500);
            } else {
                smeagolDialogue.textContent = "stupid hobitses";

            }
            // if the user's guess is not inside of the array, you lose 5 health
            if (wrongLettersArray.indexOf(userGuess) === -1) {
                wrongLettersArray.push(userGuess);
                hp.textContent -= 10;
                lives--;
                window.setTimeout(function() {frodoPic.classList.toggle('hitFrodo');},500);
                window.setTimeout(function() {frodoPic.classList.toggle('hitFrodo');}, 1000);
                if (lives < 6) {
                    window.setTimeout(function() {frodoPic.classList.toggle('angryFrodo');},500);
                }
                // var placeholderPic = new Image(40,90);
                // placeholderPic.src = './assets/';
                // frodoDialogue.textContent = userGuess + "?";    
            } else { //if you already guess it, smeagol will tell you
                frodoDialogue.textContent = userGuess + "?";    
                smeagolDialogue.textContent = "ekhh...why does hobbitses guess that wrong agian?";
            }
            wrongLetters.textContent = wrongLettersArray.join(' ');
        }  
        

    } 
};


function stringToArray(string) {
    var array = [];
    for (var i = 0 ; i < string.length ; i++ ) {
        array.push(string[i]);
    }
    return array;
}

function blanksCreator(currentLevel, alphabet) {
    var currentLevelBlanks = [];
    for (var i = 0; i < currentLevel.length; i++) {
        if ( alphabet.indexOf(currentLevel[i]) !== -1 ) {
            currentLevelBlanks.push("_")
        } else { 
            currentLevelBlanks.push(" ")
        }
    }
    return currentLevelBlanks;
}