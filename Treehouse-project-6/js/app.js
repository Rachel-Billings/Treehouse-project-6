//Variables declared
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
let missed = 0;
const btn__reset = document.getElementsByClassName('btn__reset')[0];
const letters = document.getElementsByClassName('letter');



//Function created to add a class to the overlay <div>
function clickMe (e) {
    overlay.classList.add("hidden");
}

//with the new class "hidden" , added an Event listener to the start button "btn__reset". 
//when the start button is clicked the start overlay is hidden.
 btn__reset.addEventListener('click', clickMe)

 //created an array with phrases in it
const phrases = 
['Michael Scott',
'Dwight Shrute', 
'Jim Halpert', 
'Pam Beesly',
'Andy Bernard']

//created a function to randomly choose a phrase
function getRandomNumber(num) {
    return Math.floor(Math.random() * num);
  }

// created a function to randomly choose a phrase from the phrases array and then split it into a new array of characters with spaces and letters.
function getRandomPhraseAsArray (pharses) {
    
/*
    input: pharses is an array

    instruction: 
    1. randomly choose a phrase from the phrases array
        a. understand how to randomly get number
        b. choose a phrase from the phrases array
    2. split that phrase into a new array of characters. 

    output: The function should then return the new character array.
    */

   let randomNumber = getRandomNumber(pharses.length)
   let randomPhrase = pharses[randomNumber].toLowerCase()
   let splitPhrase = randomPhrase.split('');
    return splitPhrase;
}
// saved the new array of characters in a variable called "characterArray"
const characterArray = getRandomPhraseAsArray(phrases);


// created a function to add list items to the unordered list
// then add a class to each letter
// if there is no letter in the the list item then no class was created 
function addPhraseToDisplay (characterArray) {
    /*
      <ul>
        <li class="letter">A</li>
        <li class="letter">n</li>
        <li class="letter">d</li>
        <li class="letter">y</li>
        </ul>
    
    */

for (i = 0; i < characterArray.length; i++) {
   const li = document.createElement("LI");
   const character = characterArray[i]
    li.textContent = character;
if (character !== " ") {
    li.classList.add('letter');
} else {
    li.classList.add('space');
}
   const ul = phrase.getElementsByTagName('ul')[0];
   ul.appendChild(li);
} 

/*
input: randomCharacterArray
instructions: 
Step 1: Loops through an array of characters.
    a. Inside the loop, for each character in the array, you’ll create a list item, 
    b. put the character inside of the list item, 
    c. and append that list item to the #phrase ul in your HTML. 
    step 2: If the character in the array is a letter and not a space, the function should add the class “letter” to the list item.

*/

} 

addPhraseToDisplay(characterArray);


//added a chosen class to button and added a disabled attribute so player can not click button twice
//removed a try from scoreboard when player misses a letter
document.addEventListener('click', (e) => {
    if (e.target.localName === 'button') { 
        //console.log(e.target);
        e.target.classList.add('chosen');
        e.target.disabled = true;
        const guessLetter = checkLetter(e.target.textContent)
       // console.log(guessLetter);

        if(guessLetter === null) {
            let triesListItem = document.getElementsByClassName('tries');
            tries(triesListItem, missed)
            missed++
        } else {

        } 
        checkWin()
    } 

    /* 
    step 1:
    If the checkLetter function returns a null value, the player has guessed the wrong letter. 
    step 2:
    In the keyboard event listener, after checkLetter is called, write a statement to check the value of the letterFound variable. 
    step 3: 
    If the value is null, remove one of the tries from the scoreboard. When you remove a try from the scoreboard, make sure to increase the missed count by 1.
    
    */
  
});


function tries (triesListItem, missed) {
    //replace src of 'liveheart' to 'lostheart'
 if (missed <= triesListItem.length -1) {
        const image = triesListItem[missed].getElementsByTagName('img')[0]
        console.log(triesListItem)
        console.log(image)
        image.src="images/lostHeart.png";
 }
} 


function checkLetter (buttonLetter) {
let letterFound = null;
//loops over letters to see if letter matches letter chosen
for (i = 0; i < letters.length; i++) {
        const letter = letters[i];
        const letterText = letter.textContent;
        const buttonPlayerHasClicked = buttonLetter
    if(letterText === buttonPlayerHasClicked) {
       letter.classList.add('show'); // added a show class to the button letter
       letterFound = buttonPlayerHasClicked;
    }
}

return letterFound

//document.getElementsByClassName('letter').textContent;
/* 
input:This function should have one parameter: the button the player has clicked when guessing a letter.
instructions:
step 1: get all of the elements with a class of “letter”
step 2: 
    a. loop over the letters 
    b. check if they match the letter the button the player has chosen.
step 3: If there’s a match, add the “show” class to the list item containing that letter 
step 4: store the matching letter inside of a variable (either a letter or null) 
output: return that letter or If a match wasn’t found, the function should return null.

*/
}



function checkWin () {
    const lostGame = missed === 5;
    
const letterShow = document.getElementsByClassName('show');

if (letterShow.length === letters.length) {
    overlay.classList.add('win');
    overlay.classList.remove("hidden");
    const title = document.getElementsByClassName('title')[0];
    title.textContent = 'You Win';
}
    

if (lostGame ) {
    overlay.classList.add('lose');
    overlay.classList.remove("hidden");
    const title = document.getElementsByClassName('title')[0];
    title.textContent = 'You Lose';
}
    /* 
        step 1:
        this function will check whether the game has been won or lost. 
        step 2:
        At the very end of the keyboard event listener, you’ll run this function to check if the number of letters with class “show” is equal to the number of letters with class “letters”.
        step 3:
         If they’re equal, show the overlay screen with the “win” class and appropriate text.
        step 4:
        if the number of misses is equal to or greater than 5, show the overlay screen with the “lose” class and appropriate text.
    */
   
}



