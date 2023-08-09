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

  if (Number.isNaN(length)) {
    alert("Password must be a number.");
    return null;
  }

  if (length < 8) {
    alert("Password must be longer than 8 characters.");
    return null;
  }

  if (length > 128) {
    alert("Password must be shorter than 128 characters.");
    return null;
  }

  var hasSpecialCharacters = confirm("Add Special Characters?");
  var hasNumericCharacters = confirm("Add Numeric Characters?");
  var hasLowerCasedCharacters = confirm("Add Lower Characters?");
  var hasUpperCasedCharacters = confirm("Add UpperCased Characters?");

  if (
    hasSpecialCharacters === false &&
    hasNumericCharacters === false &&
    hasLowerCasedCharacters === false &&
    hasUpperCasedCharacters === false
  ) {
    alert("Must choose one of the options.");
    return null;
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
  var characterPool = "";

  if (passwordOptions.hasSpecialCharacters) {
    characterPool += specialCharacters;
  }
  if (passwordOptions.hasNumericCharacters) {
    characterPool += numericCharacters;
  }
  if (passwordOptions.hasLowerCasedCharacters) {
    characterPool += lowerCasedCharacters;
  }
  if (passwordOptions.hasUpperCasedCharacters) {
    characterPool += upperCasedCharacters;
  }

  var password = "";
  for (var i = 0; i < passwordOptions.length; i++) {
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