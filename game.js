const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const overlayText = document.getElementById('overlayText');

const flashImg = new Image();
flashImg.src = 'assets/flash.png';

const playerImg = new Image();
playerImg.src = 'assets/player.png';

const clickSound = document.getElementById('clickSound');
const hitSound = document.getElementById('hitSound');
const bgMusic = document.getElementById('bgMusic');

let player = { x: 800, y: 800, width: 60, height: 60 };
let flash = { x: Math.random() * 1540, y: -60, width: 40, height: 40, speed: 5 };

let score = 0;
let lives = 3;
let gameStarted = false;
let gameOver = false;

document.getElementById('startButton').onclick = () => {
  clickSound.play();
  bgMusic.play();
  document.getElementById('startScreen').style.display = 'none';
  canvas.style.display = 'block';
  gameStarted = true;
  requestAnimationFrame(update);
};

document.addEventListener('mousemove', (e) => {
  let rect = canvas.getBoundingClientRect();
  player.x = e.clientX - rect.left - player.width / 2;
});

function update() {
  if (!gameStarted || gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

  flash.y += flash.speed;
  ctx.drawImage(flashImg, flash.x, flash.y, flash.width, flash.height);

  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.fillText(`Фраги: ${score}`, 20, 30);
  ctx.fillText(`Жизни: ${lives}`, 20, 60);

  if (
    flash.y + flash.height >= player.y &&
    flash.x < player.x + player.width &&
    flash.x + flash.width > player.x
  ) {
    hitSound.play();
    score += 1;
    if (score >= 50) {
      endGame(true);
      return;
    }
    resetFlash();
  }

  if (flash.y > canvas.height) {
    lives -= 1;
    if (lives <= 0) {
      endGame(false);
      return;
    }
    resetFlash();
  }

  requestAnimationFrame(update);
}

function resetFlash() {
  flash.x = Math.random() * (canvas.width - flash.width);
  flash.y = -flash.height;
}

function endGame(won) {
  gameOver = true;
  overlayText.style.display = 'block';
  overlayText.innerText = won ? 'Team Spirt Winner' : 'Вы ослепли';
}