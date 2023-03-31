// Assignment code here
// Assignment code here
var countClicks = 1;
var userLength;

var askLength = document.getElementById("askLength");
var askCharacterTypes = document.getElementById("askCharacterTypes");

var inputLength = document.querySelector(".length");
var checkLowercase = document.getElementById("lowercase");
var checkUppercase = document.getElementById("uppercase");
var checkNumeral = document.getElementById("numeral");
var checkSpecialCharacters = document.getElementById("specialCharacters");

var inputCheck = document.querySelectorAll('input[type="checkbox"]');

var uppercaseText = "no";
var passwordText = document.querySelector("#password");

var closeModal = document.querySelector(".next");
var nextBtn = document.querySelector(".next");
var startOver = document.querySelector(".start-over");
var restart = document.querySelector(".restart");

var alphabetString = "abcdefghijklmnopqrstuvwxyz";
var numerals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var specialCharactersList = `!"#$%&'()*+,-./:;<=>?@[\]^_{|}~` + "`";
var randomIndexAlphabet, randomIndexSpecialCharacters, randomIndexNumeral;
var checkArray = [];
var checkArrayText = [];

var passwordBefore = [];

var myModalEl = document.getElementById("exampleModal");

// We first do some styling changes in DOM.
function generatePassword() {
  document.getElementById("password").placeholder = "Loading...";
  closeModal.innerHTML = "Step 2 >>";
  nextBtn.addEventListener("click", askForLength);
}

// Prompt user for length.
// If user inputs an invalid action, it won't go forward.
function askForLength() {
  countClicks++;
  userLength = document.getElementById("length").value;
  if (
    userLength >= 8 &&
    userLength <= 128 &&
    Number.isInteger(Number(userLength))
  ) {
    console.log(`The user picked a password length of ${userLength}.`);

    askForCharacterTypes();
  } else {
    inputLength.value = "";
    askLength.style.color = "red";
    askLength.innerHTML =
      "Please try again. Choose a number between 8 and 128:";
  }
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
