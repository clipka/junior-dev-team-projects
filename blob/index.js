const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let x = 100;
let y = 100;
let radius = 25;
let downPressed = false;
let upPressed = false;
let leftPressed = false;
let rightPressed = false;

// game loop
function drawGame() {
  clearScreen();
  inputs();
  drawBlob();
}

function inputs() {
  if (downPressed) {
    y = y + 10;
    if (y >= canvas.height - radius) {
      y = canvas.height - radius;
    }
  }
  if (upPressed) {
    y = y - 10;
    if (y <= radius) {
      y = radius;
    }
  }
  if (leftPressed) {
    x = x - 10;
    if (x <= radius) {
      x = radius;
    }
  }
  if (rightPressed) {
    x = x + 10;
    if (x >= canvas.width - radius) {
      x = canvas.width - radius;
    }
  }

}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBlob() {
  ctx.fillStyle = "green";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

document.body.addEventListener("keydown", keyDown);
document.body.addEventListener("keyup", keyUp);

function keyDown(e) {
  if (e.keyCode == 37) {
    leftPressed = true;
  }
  if (e.keyCode == 38) {
    upPressed = true;
  }
  if (e.keyCode == 39) {
    rightPressed = true;
  }
  if (e.keyCode == 40) {
    downPressed = true;
  }
};

function keyUp(e) {
  if (e.keyCode == 37) {
    leftPressed = false;
  }
  if (e.keyCode == 38) {
    upPressed = false;
  }
  if (e.keyCode == 39) {
    rightPressed = false;
  }
  if (e.keyCode == 40) {
    downPressed = false;
  }
};

setInterval(drawGame, 1000 / 60);