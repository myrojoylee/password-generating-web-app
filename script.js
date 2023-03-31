// Assignment code here
// ================ DECLARING GLOBAL VARIABLES =============

var countClicks = 1;
var userLength;
// to access modal for event listeners
var myModalEl = document.getElementById("exampleModal");

// ==========GIVING CLICK FUNCTIONALITY TO RED BUTTON========
// Get references to the #generate element
var generateBtn = document.querySelector("#generate");
// Add event listener to generate button
generateBtn.addEventListener("click", generatePassword);
// ==========================================================

// =================FORM AND FIELDSET VARIABLES==============
var askLength = document.getElementById("askLength");
var askCharacterTypes = document.getElementById("askCharacterTypes");
var inputLength = document.querySelector(".length");
var checkLowercase = document.getElementById("lowercase");
var checkUppercase = document.getElementById("uppercase");
var checkNumeral = document.getElementById("numeral");
var checkSpecialCharacters = document.getElementById("specialCharacters");

// this variable accesses the checked property for each character type
var inputCheck = document.querySelectorAll('input[type="checkbox"]');
// ==========================================================
var passwordText = document.querySelector("#password");
var closeModal = document.querySelector(".next");
var nextBtn = document.querySelector(".next");
var startOver = document.querySelector(".start-over");
var restart = document.querySelector(".restart");

// ===========================ARRAYS==========================
// declaring variables of arrays with character types
var lowercaseAlphabet = "abcdefghijklmnopqrstuvwxyz";
var uppercaseAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numerals = "0123456789";
var specialCharacters = `!"#$%&'()*+,-./:;<=>?@[\]^_{|}~` + "`";

// variable with all arrays together
var allCharacters = [
  lowercaseAlphabet,
  uppercaseAlphabet,
  numerals,
  specialCharacters,
];

var requiredCharacterPool = [];

// fieldset: once any or all boxes are checked, boolean values populate this array
var checkArray = [];

// fieldset: boolean values are assigned a 'yes' or 'no'
var checkArrayText = [];

// array where we push everything before shuffle
var finalPassword = [];

var allIndexes = [];

// ==========================================================
/////////////////////////////////////////////////////////////

function generatePassword() {
  // document.getElementById("password").placeholder = "Loading...";
  closeModal.innerHTML = "Step 2 >>";
  nextBtn.addEventListener("click", askForLength);

  return finalPassword;
}

// Prompt user for length with user validation
function askForLength() {
  countClicks++;
  userLength = document.getElementById("length").value;
  if (
    userLength >= 8 &&
    userLength <= 128 &&
    Number.isInteger(Number(userLength))
  ) {
    askForCharacterTypes();
  } else {
    inputLength.value = "";
    askLength.style.color = "red";
    askLength.innerHTML =
      "Please try again. Choose a number between 8 and 128:";
  }
}

// prompts user to click at least one criterion to proceed
function askForCharacterTypes() {
  closeModal.innerHTML = "Step 3 >>";
  askLength.style.display = "none";
  askLength.style.color = "black";
  inputLength.style.display = "none";
  askCharacterTypes.style.display = "block";
  nextBtn.addEventListener("click", checkForClicks);
}

// Checks whether at least box is checked.
function checkForClicks() {
  closeModal.innerHTML = "Get password";
  if (
    checkLowercase.checked ||
    checkUppercase.checked ||
    checkNumeral.checked ||
    checkSpecialCharacters.checked
  ) {
    for (var i = 0; i < inputCheck.length; i++) {
      checkArray.push(inputCheck[i].checked);
      // now we have the boolean values and text with checkboxes
      if (checkArray[i] == true) {
        checkArrayText.push("yes");
      } else {
        checkArrayText.push("no");
      }
    }
    startOver.style.display = "block";
    confirmationOrRestart();
  } else {
    askLength.innerHTML = "At least one box must be checked.";
    askLength.style.color = "red";
    askLength.style.display = "block";
    console.log("at least one box must be checked");
  }
}
// Confirms all info for the user
// User can choose to start over if information is incorrect.
function confirmationOrRestart() {
  closeModal.innerHTML = "Get password";
  closeModal.dataset.bsDismiss = "modal";

  myModalEl.removeEventListener("hidden.bs.modal", (event) => {
    window.location.reload();
  });
  askLength.style.display = "block";
  askCharacterTypes.style.display = "none";

  confirmationMessage =
    `Please confirm your password criteria: ` +
    "<br>" +
    "<br>" +
    "Length of password: " +
    userLength +
    "<br>" +
    "Lowercase letters? " +
    checkArrayText[0] +
    "<br>" +
    "Uppercase letters? " +
    checkArrayText[1] +
    "<br>" +
    "Numbers? " +
    checkArrayText[2] +
    "<br>" +
    "Special characters? " +
    checkArrayText[3] +
    "<br>" +
    "<br>" +
    `If this is not correct, please click 'Start Over'.` +
    "<br>" +
    "<br>" +
    `Otherwise, click 'Get password'.`;

  askLength.innerHTML = confirmationMessage;
  // passwordText.value = `I didn't program this part yet!!!!`;
  startOver.addEventListener("click", (event) => {
    window.location.reload();
  });
  nextBtn.addEventListener("click", randomPasswordGeneration);
}

function resetProcess() {
  // startOver.dataset.bsDismiss = "modal";

  // closeModal.dataset.bsDismiss = "modal";
  window.location.reload();
}

// we need to restrict the pool to user criteria
function generateRequiredCharacterPool() {
  for (var i = 0; i < checkArray.length - 4; i++) {
    if (checkArray[i]) {
      requiredCharacterPool.push(allCharacters[i]);
    }
  }
  requiredCharacterPool = requiredCharacterPool.join("");
  // console.log(checkArray, requiredCharacterPool);
}

// let's generate the password
function randomPasswordGeneration() {
  // passwordText.value = `I didn't program this part yet!!!!`;
  restart.style.display = "flex";

  //
  generateRequiredCharacterPool();
  //   randomIndexAllCharacters = Math.floor(Math.random() * allCharacters.length);
  for (var i = 0; i < Number(userLength); i++) {
    var y = Math.floor(Math.random() * requiredCharacterPool.length);
    finalPassword.push(requiredCharacterPool[y]);
  }
  finalPassword = finalPassword.join("");

  writePassword();
}

// Write password to the #password input
function writePassword() {
  passwordText.value = finalPassword;
  return finalPassword;
}
