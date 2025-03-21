let color = [];
let goal = 'RGB';
let gameOver = false;
let isEasyMode = false;

function newColors() {
    color = [];
    for (let i = 0; i < 6; i++) {
        color.push(randomColor());
    }

    goal = color[Math.floor(Math.random() * (isEasyMode ? 3 : color.length))];
    goalHeader.textContent = goal;
    gameOver = false;

    square.forEach((box, i) => {
        box.style.backgroundColor = color[i];
        box.style.visibility = 'visible';
        box.classList.remove("disabled"); // Re-enable boxes
    });

    score.textContent = 'PICK A COLOR';

    easy.disabled = false;
    hard.disabled = false;
}

// Get elements
let square = document.querySelectorAll('.color-box');
let goalHeader = document.getElementById('goal');
let score = document.getElementById('score');
let easy = document.querySelector('#easy');
let hard = document.querySelector('#hard');
let refresh = document.querySelector('#refresh');
let hide = document.querySelectorAll('.hard');

newColors(); // Initialize colors

// Add event listener for each square
square.forEach(function(box) {
    box.addEventListener("click", function() {
        if (gameOver) return; // Prevent clicks if game is over

        let clicked = this.style.backgroundColor;

        if (clicked === goal) {
            score.textContent = 'YAY! YOU DID IT';
            gameOver = true; // Set game over

            // Disable all color boxes
            square.forEach(box => box.classList.add("disabled"));

            // Disable difficulty buttons
            easy.disabled = true;
            hard.disabled = true;
        } else {
            this.style.visibility = 'hidden'; // Hide wrong choice
            score.textContent = 'NAH TRY AGAIN';
        }
    });
});

// Easy button event
easy.addEventListener("click", function() {
    if (gameOver) return; // Prevent switching after winning
    isEasyMode = true;

    for (let i = 0; i < hide.length; i++) {
        hide[i].style.visibility = 'hidden';
    }

    // Make sure goal is from the visible colors
    goal = color[Math.floor(Math.random() * 3)]; // Pick from the first 3 colors
    goalHeader.textContent = goal; // Update displayed goal
});

// Hard button event
hard.addEventListener("click", function() {
    if (gameOver) return; // Prevent switching after winning
    isEasyMode = false;

    for (let i = 0; i < hide.length; i++) {
        hide[i].style.visibility = 'visible';
    }

    // Ensure a random goal is selected again
    goal = color[Math.floor(Math.random() * color.length)];
    goalHeader.textContent = goal;
});

// Refresh button event
refresh.addEventListener("click", function() {
    newColors();
});

function randomColor() {
    let r = Math.floor(Math.random() * 256); // Red (0-255)
    let g = Math.floor(Math.random() * 256); // Green (0-255)
    let b = Math.floor(Math.random() * 256); // Blue (0-255)
    return "rgb(" + r + ", " + g + ", " + b + ")"; // Return formatted color
}