const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let dino = {
  x: 50,
  y: 150,
  width: 40,
  height: 40,
  vy: 0,
  jumping: false
};

const groundY = 190; // altura do chão
const gravity = 1.2;
let obstacles = [];
let frame = 0;
let score = 0;
let gameOver = false;

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !dino.jumping && !gameOver) {
    dino.vy = -18;
    dino.jumping = true;
  }
  if (gameOver && e.code === "Enter") restartGame();
});

function restartGame() {
  dino.y = 150;
  dino.vy = 0;
  dino.jumping = false;
  obstacles = [];
  frame = 0;
  score = 0;
  gameOver = false;
  loop();
}

function drawGround() {
  ctx.fillStyle = "#666";
  ctx.fillRect(0, groundY, canvas.width, 10);
}

function drawDino() {
  ctx.fillStyle = "#00ff88";
  ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function drawObstacles() {
  ctx.fillStyle = "#ff5555";
  obstacles.forEach(o => ctx.fillRect(o.x, o.y, o.width, o.height));
}

function update() {
  // movimentação do dino
  dino.y += dino.vy;
  dino.vy += gravity;
  if (dino.y + dino.height >= groundY) {
    dino.y = groundY - dino.height;
    dino.vy = 0;
    dino.jumping = false;
  }

  // gerar obstáculos
  if (frame % 90 === 0) {
    let height = Math.random() * 30 + 20;
    obstacles.push({
      x: canvas.width,
      y: groundY - height,
      width: 20,
      height: height
    });
  }

  // mover obstáculos
  obstacles.forEach(o => (o.x -= 6));
  obstacles = obstacles.filter(o => o.x + o.width > 0);

  // colisão — ajustada!
  obstacles.forEach(o => {
    if (
      dino.x < o.x + o.width - 5 && // pequena margem
      dino.x + dino.width - 5 > o.x &&
      dino.y + dino.height - 5 > o.y
    ) {
      gameOver = true;
    }
  });

  score++;
}

function drawScore() {
  ctx.fillStyle = "#000";
  ctx.font = "20px monospace";
  ctx.fillText("Score: " + score, 650, 30);
}

function loop() {
  if (gameOver) {
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.font = "25px monospace";
    ctx.fillText("GAME OVER", 320, 100);
    ctx.fillText("Pressione Enter para reiniciar", 230, 140);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGround();
  update();
  drawDino();
  drawObstacles();
  drawScore();
  frame++;
  requestAnimationFrame(loop);
}

loop();
