const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

function drawStar(ctx, cx, cy, spikes, outerRadius) {

  let innerRadius = outerRadius / 2.5; // fix inner size → proper star
  let rot = Math.PI / 2 * 3;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);

  for (let i = 0; i < spikes; i++) {

    ctx.lineTo(
      cx + Math.cos(rot) * outerRadius,
      cy + Math.sin(rot) * outerRadius
    );
    rot += step;

    ctx.lineTo(
      cx + Math.cos(rot) * innerRadius,
      cy + Math.sin(rot) * innerRadius
    );
    rot += step;
  }

  ctx.closePath();
  ctx.fillStyle = "white","#f8f7ff","#fff4ea","#d4fbff","#ffe9c4";
  ctx.fill();
}

function initStars(count = 120) {
  stars = [];

  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 2, // cute stars (6-12px)
      speed: Math.random() * 1 + 0.3
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(s => {
    drawStar(ctx, s.x, s.y, 5, s.size, s.color);
  });
}

function updateStars() {
  stars.forEach(s => {

    s.y += s.speed;

    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }

  });
}

function animate() {
  drawStars();
  updateStars();
  requestAnimationFrame(animate);
}

initStars();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initStars();
});