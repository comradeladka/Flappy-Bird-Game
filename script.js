const canvas = document.getElementById("flappyBird");
const ctx = canvas.getContext("2d");

// Bird
let bird = {
  x: 50,
  y: 150,
  width: 30,
  height: 30,
  gravity: 1.2, // slightly slower than before
  lift: -20,
  velocity: 0
};

// Pipes
let pipes = [];
let pipeWidth = 50;
let gap = 120;
let frame = 0;

// Score
let score = 0;
let gameOver = false;

// Jump
document.addEventListener("keydown", e => {
  if (e.code === "Space") {
    bird.velocity = bird.lift;
  }
});
document.addEventListener("click", () => {
  bird.velocity = bird.lift;
});

function drawBird() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
  for (let i = 0; i < pipes.length; i++) {
    let pipe = pipes[i];
    ctx.fillStyle = "green";
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
    ctx.fillRect(pipe.x, pipe.top + gap, pipeWidth, canvas.height - (pipe.top + gap));
    pipe.x--;

    // Collision detection
    if (
      bird.x < pipe.x + pipeWidth &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.top || bird.y + bird.height > pipe.top + gap)
    ) {
      gameOver = true;
    }

    // Increase score
    if (pipe.x + pipeWidth === bird.x) {
      score++;
    }
  }

  // Add new pipes
  if (frame % 90 === 0) {
    let top = Math.random() * (canvas.height - gap - 50) + 20;
    pipes.push({ x: canvas.width, top: top });
  }
}

function drawScore() {
  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 25);
}

function update() {
  if (gameOver) {
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", 80, canvas.height / 2);
    ctx.fillText("Score: " + score, 100, canvas.height / 2 + 40);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPipes();
  drawBird();
  drawScore();

  // Bird physics
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  // Ground collision
  if (bird.y + bird.height >= canvas.height) {
    gameOver = true;
  }

  frame++;
  requestAnimationFrame(update);
}

update();
