// Assignment code here
// ================ DECLARING GLOBAL VARIABLES =============
// =========================================================

// to access modal for event listeners
var myModalEl = document.getElementById("exampleModal");

// ==========GIVING CLICK FUNCTIONALITY TO RED BUTTON========
// Get references to the #generate element
var generateBtn = document.querySelector("#generate");
// Add event listener to generate button
generateBtn.addEventListener("click", generatePassword);

// ================ FORM AND FIELDSET VARIABLES =============
// ==========================================================
var userLength;
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
var cardHeader = document.querySelector(".card-header-text");

// =================== ARRAYS AND STRINGS ====================
// ===========================================================
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

// getting an index for required values
var randomRequiredIndex;

// getting at least one character from each required criterion
var requiredCharacterPool = [];

var getInitialRequiredCharacters = "";

// fieldset: once any or all boxes are checked, boolean values populate this array
var checkArray = [];

// fieldset: boolean values are assigned a 'yes' or 'no'
var checkArrayText = [];

// array where we push everything before scrambling it
var unscrambledPassword = [];

// =================================================================
//         -------------------CODE BELOW------------------
// =================================================================

function generatePassword() {
  document.getElementById("password").placeholder = "Loading...";
  closeModal.innerHTML = "Step 2 >>";
  nextBtn.addEventListener("click", askForLength);
}

// Prompt user for length with user validation
function askForLength() {
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
      "Please try again. Choose a valid number between 8 and 128:";
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
    closeModal.innerHTML = "Step 3 >>";
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
  startOver.addEventListener("click", (event) => {
    window.location.reload();
  });
  nextBtn.addEventListener("click", randomPasswordGeneration);
}

function resetProcess() {
  startOver.dataset.bsDismiss = "modal";

  // closeModal.dataset.bsDismiss = "modal";
  window.location.reload();
}

// we need to restrict the pool to user criteria
function generateRequiredCharacterPool() {
  for (var i = 0; i < checkArray.length - 4; i++) {
    if (checkArray[i]) {
      requiredCharacterPool.push(allCharacters[i]);
      randomRequiredIndex = Math.floor(Math.random() * allCharacters[i].length);
      getInitialRequiredCharacters = getInitialRequiredCharacters.concat(
        allCharacters[i][randomRequiredIndex]
      );
    }
  }
  requiredCharacterPool = requiredCharacterPool.join("");
}

// let's generate the password
function randomPasswordGeneration() {
  // passwordText.value = `I didn't program this part yet!!!!`;
  restart.style.display = "flex";
  restart.addEventListener("click", (event) => {
    window.location.reload();
  });
  //
  generateRequiredCharacterPool();

  for (
    var i = 0;
    i < Number(userLength) - getInitialRequiredCharacters.length;
    i++
  ) {
    var y = Math.floor(Math.random() * requiredCharacterPool.length);
    unscrambledPassword.push(requiredCharacterPool[y]);
  }

  unscrambledPassword = unscrambledPassword.concat(
    getInitialRequiredCharacters
  );
  unscrambledPassword = unscrambledPassword.join("");

  scrambledPassword();
}

// we need to scramble the string since our
// required characters were just attached together
// without it being randomized.
function scrambledPassword() {
  unscrambledPassword = unscrambledPassword.split("");

  for (var i = 0; i < unscrambledPassword.length - 1; i++) {
    var x = Math.floor(Math.random() * unscrambledPassword.length);
    var temp = unscrambledPassword[i];
    unscrambledPassword[i] = unscrambledPassword[x];
    unscrambledPassword[x] = temp;
  }

  finalPassword = unscrambledPassword.join("");
  writePassword();
}

// Write password to the #password input
function writePassword() {
  cardHeader.innerHTML = `Your password is below. Click 'Start Over' to begin again.`;
  cardHeader.style.textAlign = "center";
  passwordText.value = finalPassword;
  generateBtn.removeEventListener("click", generatePassword);
  return finalPassword;
}
