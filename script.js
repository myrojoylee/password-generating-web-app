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

function generatePassword() {
  userInputLength();
}

// This is to validate the length parameter.

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
