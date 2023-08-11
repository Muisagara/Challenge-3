// Global variables
var specialCharacters = ['@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'];
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var lowerCasedCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var upperCasedCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Password options
var passwordOptions = {};

// Get password options from user input
function getPasswordOptions() {
  var length = parseInt(prompt("How many characters (Must be larger than 8 or smaller than 128)."));
// added while statement to stop the function running if things were false.
  while (Number.isNaN(length) || length < 8 || length > 128) {
    if (Number.isNaN(length)) {
      alert("Password must be a number.");
    } else if (length < 8) {
      alert("Password must be longer than 8 characters.");
    } else if (length > 128) {
      alert("Password must be shorter than 128 characters.");
    }
    length = parseInt(prompt("How many characters (Must be larger than 8 or smaller than 128)."));
  }

  var hasSpecialCharacters = confirm("Add Special Characters?");
  var hasNumericCharacters = confirm("Add Numeric Characters?");
  var hasLowerCasedCharacters = confirm("Add Lower Characters?");
  var hasUpperCasedCharacters = confirm("Add UpperCased Characters?");

  while (
    !hasSpecialCharacters &&
    !hasNumericCharacters &&
    !hasLowerCasedCharacters &&
    !hasUpperCasedCharacters
  ) {
    alert("Must choose at least one character type.");
    hasSpecialCharacters = confirm("Add Special Characters?");
    hasNumericCharacters = confirm("Add Numeric Characters?");
    hasLowerCasedCharacters = confirm("Add Lower Characters?");
    hasUpperCasedCharacters = confirm("Add UpperCased Characters?");
  }

  passwordOptions = {
    length: length,
    hasSpecialCharacters: hasSpecialCharacters,
    hasNumericCharacters: hasNumericCharacters,
    hasLowerCasedCharacters: hasLowerCasedCharacters,
    hasUpperCasedCharacters: hasUpperCasedCharacters,
  };
}

// Generate a random character from a given array
function getRandomCharacter(characters) {
  var randomIndex = Math.floor(Math.random() * characters.length);
  return characters[randomIndex];
}

// Generate the password based on the user's preferences
function generatePassword() {

  var password = "";
  var characterPool = [];
  // will always add them to the front of the password. if needed for a special character to not be in the front 
  // just move one of the if statements up and that will fix it.
  if (passwordOptions.hasSpecialCharacters) {
    characterPool = characterPool.concat(specialCharacters);

    password += getRandomCharacter(specialCharacters);
  }

  if (passwordOptions.hasNumericCharacters) {
    characterPool = characterPool.concat(numericCharacters)

    password += getRandomCharacter(numericCharacters);
  }

  if (passwordOptions.hasLowerCasedCharacters) {
    characterPool = characterPool.concat(lowerCasedCharacters)
    
    password += getRandomCharacter(lowerCasedCharacters);
  }

  if (passwordOptions.hasUpperCasedCharacters) {
    characterPool = characterPool.concat(upperCasedCharacters)
    
    password += getRandomCharacter(upperCasedCharacters);
  }

  var passwordLength = passwordOptions.length - password.length;

  for (var i = 0; i < passwordLength; i++) {
    password += getRandomCharacter(characterPool);
  }

  return password;
}

// Write password to the #password input
function writePassword() {
  getPasswordOptions();
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
var generateBtn = document.querySelector("#generate");
generateBtn.addEventListener("click", writePassword);