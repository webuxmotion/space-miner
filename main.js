const canvas = document.getElementById("app");
const ctx = canvas.getContext("2d");

const ship = new Ship();
ship.x = canvas.width / 2;
ship.y = canvas.height / 2;

const keys = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false,
};

let vr = 0;
let vx = 0;
let vy = 0;
let thrust = 0;
let speed = 0;

window.addEventListener("keydown", (e) => {
  keys[e.code] = true;
  keyHandler();
});

window.addEventListener("keyup", (e) => {
  keys[e.code] = false;
  keyHandler();
});

(function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ship.rotation += vr;
  const angle = ship.rotation;
  const ax = Math.cos(angle) * thrust;
  const ay = Math.sin(angle) * thrust;
  vx += ax;
  vy += ay;
  ship.x += vx;
  ship.y += vy;
  speed = Math.sqrt(vx * vx + vy * vy);

  
  const halfWidth = ship.width / 2;
  if (ship.x - halfWidth > canvas.width) {
    ship.x = 0 - halfWidth;
  } else if (ship.x + halfWidth < 0) {
    ship.x = canvas.width + halfWidth;
  }
  const halfHeight = ship.height / 2;
  if (ship.y + halfHeight < 0) {
    ship.y = canvas.height + halfHeight;
  } else if (ship.y - halfHeight > canvas.height) {
    ship.y = 0 - halfHeight;
  }

  ship.draw(ctx);

  window.requestAnimationFrame(animate);
})();

function keyHandler() {
  if (
    (!keys.ArrowLeft && !keys.ArrowRight) ||
    (keys.ArrowLeft && keys.ArrowRight)
  ) {
    vr = 0;
  } else if (keys.ArrowLeft) {
    vr = -0.03;
  } else if (keys.ArrowRight) {
    vr = 0.03;
  }

  if (!keys.ArrowUp) {
    thrust = 0;
    ship.showFlame = false;
  } else {
    thrust = 0.05;
    ship.showFlame = true;
  }
}
