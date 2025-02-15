const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Oyun değişkenleri
let birdY = canvas.height / 2;
let birdX = 50;
let birdSpeed = 0;
let gravity = 0.5;
let isGameOver = false;

// Engeller
let pipes = [];
let pipeWidth = 50;
let pipeGap = 150;
let pipeSpeed = 2;
let frameCount = 0;
let score = 0;

// Kuşun boyutları
const birdSize = 20;

// Klavye kontrolü
document.addEventListener("keydown", () => {
  birdSpeed = -10;
});

// Oyun döngüsü
function gameLoop() {
  if (isGameOver) {
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over!", canvas.width / 4, canvas.height / 2);
    ctx.fillText(`Score: ${score}`, canvas.width / 3, canvas.height / 2 + 40);
    return;
  }

  // Arkaplanı temizle
  ctx.fillStyle = "skyblue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Kuşu çiz
  ctx.fillStyle = "yellow";
  ctx.fillRect(birdX, birdY, birdSize, birdSize);

  // Yerçekimi uygulama
  birdSpeed += gravity;
  birdY += birdSpeed;

  // Kuşun yere veya tepeye çarpmasını kontrol et
  if (birdY + birdSize > canvas.height || birdY < 0) {
    isGameOver = true;
  }

  // Engelleri yönet
  frameCount++;
  if (frameCount % 100 === 0) {
    let pipeTopHeight = Math.random() * (canvas.height - pipeGap - 50);
    pipes.push({
      x: canvas.width,
      top: pipeTopHeight,
      bottom: pipeTopHeight + pipeGap,
    });
  }

  for (let i = pipes.length - 1; i >= 0; i--) {
    const pipe = pipes[i];
    pipe.x -= pipeSpeed;

    // Engelleri çiz
    ctx.fillStyle = "green";
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top); // Üst boru
    ctx.fillRect(pipe.x, pipe.bottom, pipeWidth, canvas.height - pipe.bottom); // Alt boru

    // Kuşun borulara çarpmasını kontrol et
    if (
      birdX < pipe.x + pipeWidth &&
      birdX + birdSize > pipe.x &&
      (birdY < pipe.top || birdY + birdSize > pipe.bottom)
    ) {
      isGameOver = true;
    }

    // Skoru artır
    if (pipe.x + pipeWidth < birdX && !pipe.scored) {
      score++;
      pipe.scored = true;
    }

    // Kullanılmayan boruları kaldır
    if (pipe.x + pipeWidth < 0) {
      pipes.splice(i, 1);
    }
  }

  // Skoru çiz
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);

  // Oyun döngüsünü tekrar çağır
  requestAnimationFrame(gameLoop);
}

// Oyun başlat
gameLoop();
