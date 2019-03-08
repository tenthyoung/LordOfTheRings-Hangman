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
