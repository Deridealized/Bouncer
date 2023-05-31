console.log("Starting. . . ");
var canvas = document.querySelector("canvas");
var view = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
view.fillStyle = `rgb(218, 240, 240)`;
view.strokeStyle = "white";
addEventListener("resize", resize);

function resize() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  view.fillStyle = "white";
}

class Ball {
  x = 0;
  y = 0;
  w = 5;
  h = 10;
  dx = 2;
  dy = 2;
  dmax = 4;

  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.dx = Math.random() * this.dmax - 2;
    this.dy = Math.random() * this.dmax - 2;
  }

  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.dx = -this.dx;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }

  draw() {
    view.beginPath();
    view.arc(this.x, this.y, this.w, 0, 2 * Math.PI);
    view.fill();
  }
}

let balls = [];
for (let i = 0; i < 100; ++i) {
  balls.push(new Ball());
}

function animation(timestamp) {
  view.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach((ball) => {
    ball.update();
  });

  for (let i = 0; i < balls.length; ++i) {
    for (let n = i + 1; n < balls.length; ++n) {
      const x = (balls[i].x - balls[n].x) ** 2;
      const y = (balls[i].y - balls[n].y) ** 2;
      const dist = 180 - Math.sqrt(x + y);
      if (dist < 180) {
        const strokeStyle = `rgba(155,255,255, ${dist / 200})`;
        view.strokeStyle = strokeStyle;

        view.beginPath();
        view.moveTo(balls[i].x, balls[i].y);
        view.lineTo(balls[n].x, balls[n].y);
        view.stroke();
      }
    }
  }

  window.requestAnimationFrame(animation);
}

window.requestAnimationFrame(animation);
