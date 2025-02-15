// Array containing the colors that can be chosen by the user.
var buttonColours = ["red", "blue", "green", "yellow"];

// Array to store the sequence of colors generated by the game.
var gamePattern = [];
// Array to keep track of the user's clicked sequence.
var userClickedPattern = [];

// Variables to track the game's state and level.
var started = false; // Indicates if the game has started.
var level = 0; // Tracks the current level of the game.

// Event listener for a key press to start the game.
$(document).keypress(function () {
  if (!started) {
    // Check if the game hasn't started yet.
    $("#level-title").text("Level " + level); // Update the title with the current level.
    nextSequence(); // Call the nextSequence function to generate the first sequence.
    started = true; // Set the game state to started.
  }
});

// Event listener for button clicks (the colored buttons).
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id"); // Get the ID of the clicked button (color).
  userClickedPattern.push(userChosenColour); // Add the chosen color to the user's pattern.

  playSound(userChosenColour); // Play the sound associated with the chosen color.
  animatePress(userChosenColour); // Animate the button press for visual feedback.

  checkAnswer(userClickedPattern.length - 1); // Check the user's answer at the last index.
});

// Function to check the user's answer against the game pattern.
function checkAnswer(currentLevel) {
  // Compare the current level of the game pattern to the user's clicked pattern.
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // If the user's answer is correct, check if the user has completed the sequence.
    if (userClickedPattern.length === gamePattern.length) {
      // If the user completed the sequence, call nextSequence after a delay.
      setTimeout(function () {
        nextSequence();
      }, 1000); // 1000 ms delay before generating the next sequence.
    }
  } else {
    // If the answer is wrong, play the wrong sound and trigger game over effects.
    playSound("wrong");
    $("body").addClass("game-over"); // Add a class to change the body style for game over.
    $("#level-title").text("Game Over, Press Any Key to Restart"); // Update title to indicate game over.

    // Remove the game-over class after a brief delay to reset the body style.
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200); // 200 ms delay before removing the class.

    startOver(); // Call the startOver function to reset the game.
  }
}

// Function to generate the next sequence in the game.
function nextSequence() {
  userClickedPattern = []; // Reset the user's clicked pattern for the new sequence.
  level++; // Increment the level for the next sequence.
  $("#level-title").text("Level " + level); // Update the title with the new level.

  var randomNumber = Math.floor(Math.random() * 4); // Generate a random number between 0 and 3.
  var randomChosenColour = buttonColours[randomNumber]; // Choose a color based on the random number.
  gamePattern.push(randomChosenColour); // Add the chosen color to the game pattern.

  // Animate the chosen color button and play its sound.
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour); // Play the sound associated with the randomly chosen color.
}

// Function to animate the button press with visual feedback.
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed"); // Add 'pressed' class to the button.

  // Remove the 'pressed' class after a brief delay to create a button press effect.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100); // 100 ms delay before removing the class.
}

// Function to play sound based on the color name passed.
function playSound(name) {
  var audio = new Audio("sound/" + name + ".mp3"); // Create a new Audio object with the sound file.
  audio.play(); // Play the sound.
}

// Function to reset the game variables when the game is over.
function startOver() {
  level = 0; // Reset the level to 0.
  gamePattern = []; // Clear the game pattern array.
  started = false; // Set the game state to not started.
}
