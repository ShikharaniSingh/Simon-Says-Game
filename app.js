// Simon Says Game Logic

const buttonColors = ["yellow", "red", "green", "purple"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let highScore = 0;

// Restart button element
const restartButton = document.getElementById('restart-btn');

// Detect keypress to start/restart the game
document.addEventListener("keydown", function() {
    if (!started) {
        document.querySelector("h2").textContent = "Level " + level;
        nextSequence();
        started = true;
    }
});

// Button click handler for color buttons
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function() {
        const userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    });
});

// Check the user's answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        // Game over logic
        document.querySelector("h2").textContent = "Game Over, Press Restart";
        document.body.classList.add("game-over");
        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 200);

        // Show the restart button
        restartButton.classList.remove('hidden');

        // Update the high score
        updateHighScore();

        // Disable keydown event to prevent restarting by keypress
        started = false;
    }
}

// Generate the next sequence
function nextSequence() {
    userClickedPattern = [];
    level++;
    document.querySelector("h2").textContent = "Level " + level;

    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Flash the button in sequence
    const button = document.getElementById(randomChosenColor);
    buttonFlash(button);
}

// Flash the chosen button
function buttonFlash(button) {
    button.classList.add("flash");
    setTimeout(() => {
        button.classList.remove("flash");
    }, 300);
}

// Animate button press
function animatePress(currentColor) {
    const activeButton = document.getElementById(currentColor);
    activeButton.classList.add("pressed");
    setTimeout(() => {
        activeButton.classList.remove("pressed");
    }, 100);
}

// Update high score display
function updateHighScore() {
    if (level - 1 > highScore) {
        highScore = level - 1;
        document.querySelector("h4").textContent = "High Score: " + highScore;
    }
}

// Restart button click handler
restartButton.addEventListener("click", function() {
    startOver(); // Reset the game variables
    restartButton.classList.add('hidden'); // Hide the restart button
    document.querySelector("h2").textContent = "Level " + level;
    nextSequence(); // Start a new game sequence
    started = true; // Set the game as started
});

// Reset game variables
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
