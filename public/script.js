// Game logic variables
var sequence = [];
var userSequence = [];
var level = 1;
var score = 0;

// Game elements
var gameContainer = document.getElementById("game-container");
var startButton = document.createElement("button");
startButton.textContent = "Start Game";
gameContainer.appendChild(startButton);

var scoreElement = document.createElement("div");
scoreElement.id = "score";
gameContainer.appendChild(scoreElement);

// Event listener for the start button
startButton.addEventListener("click", startGame);

function startGame() {
  startButton.style.display = "none";
  scoreElement.textContent = "Level: " + level;

  generateSequence();
  showSequence();
}

function generateSequence() {
  for (var i = 0; i < level; i++) {
    var randomNumber = Math.floor(Math.random() * 9) + 1;
    sequence.push(randomNumber);
  }
}

function showSequence() {
  disableUserInput();

  var i = 0;
  var interval = setInterval(function () {
    highlightButton(sequence[i]);

    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
      enableUserInput();
    }
  }, 1000);
}

function highlightButton(number) {
  var button = document.getElementById("button-" + number);
  button.classList.add("highlight");

  setTimeout(function () {
    button.classList.remove("highlight");
  }, 500);
}

function enableUserInput() {
  for (var i = 1; i <= 9; i++) {
    var button = document.getElementById("button-" + i);
    button.addEventListener("click", handleUserInput);
  }
}

function disableUserInput() {
  for (var i = 1; i <= 9; i++) {
    var button = document.getElementById("button-" + i);
    button.removeEventListener("click", handleUserInput);
  }
}

function handleUserInput(event) {
  var selectedNumber = parseInt(event.target.textContent);
  userSequence.push(selectedNumber);

  highlightButton(selectedNumber);

  if (userSequence.length === sequence.length) {
    checkUserInput();
  }
}

function checkUserInput() {
  disableUserInput();

  var userInputCorrect = true;
  for (var i = 0; i < sequence.length; i++) {
    if (sequence[i] !== userSequence[i]) {
      userInputCorrect = false;
      break;
    }
  }

  if (userInputCorrect) {
    score++;
    level++;
    scoreElement.textContent = "Level: " + level;
    userSequence = [];

    setTimeout(function () {
      generateSequence();
      showSequence();
    }, 1000);
  } else {
    endGame();
  }
}

function endGame() {
  gameContainer.innerHTML = "<h2>Game Over</h2><p>Final Score: " + score + "</p>";
  startButton.style.display = "block";
  sequence = [];
  userSequence = [];
  level = 1;
  score = 0;
}
