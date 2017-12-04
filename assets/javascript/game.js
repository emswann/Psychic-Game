/* Declare constants to avoid hard-coding values. */
const MAX_GUESSES = 9;

/* Create an array that holds all the lowercase letters of the alphabet.
   Also, create an empty array to hold user guesses. */
var arrComputerChoices = "abcdefghijklmnopqrstuvwxyz".split("")
    arrUserGuesses     = [];

/* Declare variable to hold computer choice. Must be outside event loop, so it is not reset each time. Will get set/reset in initVals() */
var computerChoice;

/* Declare variables to hold calculated totals for the game. Will get set/reset in initVals. */
var totalWins,
    totalLosses,
    totalRemGuesses;

/* Initialize global variables. Used to initialize and reset. */
initVals(true);

/* This event function is called after user presses and releases a key. */
document.onkeyup = function(event) {

  /* Variables to store guesses. Reset for each key release. */
  var userInput = event.key.toLowerCase();

  console.log("User " + userInput);
  console.log("Computer " + computerChoice);

  if (arrComputerChoices.indexOf(userInput) >= 0) {

    if (arrUserGuesses.indexOf(userInput) === -1) {
      arrUserGuesses.push(userInput);

      if (userInput === computerChoice) {
        totalWins++;
        initVals(false);
      }
      else
      {
        totalRemGuesses--;

        if (totalRemGuesses === 0) {
          totalLosses++;
          initVals(false)
        }
        // else nothing.
      }

      updateHTML();
    }
    else {
      alert("Invalid guess = '" + userInput + "'.\nYou have already guessed the letter.");
    }
  }
  else {
    alert("Invalid guess = '" + userInput + "'.\nYou need to type a letter of the alphabet.");
  }
}

function initVals(initAll) {
  if (initAll) {
    totalWins = 0;
    totalLosses = 0;
  }

  totalRemGuesses = MAX_GUESSES;
  arrUserGuesses.length = 0;

  computerChoice = getComputerChoice();
}

function getComputerChoice() {
  /* Random number generator for min-inclusive and max-exclusive. */
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  return arrComputerChoices[getRndInteger(0, arrComputerChoices.length)];
}

function updateHTML() {
  var htmlWins        = '<span id="wins">' + totalWins + '</span>',
      htmlLosses      = '<span id="losses">' + totalLosses + '</span>',
      htmlRemGuesses  = '<span id="guesses-left">' + totalRemGuesses + '</span>',
      htmlUserGuesses = '<span id="user-guesses">' + arrUserGuesses.toString() + '</span>';

  // Set the inner HTML contents of the web page.
  document.querySelector("#wins").innerHTML = htmlWins;
  document.querySelector("#losses").innerHTML = htmlLosses;
  document.querySelector("#guesses-left").innerHTML = htmlRemGuesses;
  document.querySelector("#user-guesses").innerHTML = htmlUserGuesses;
}
