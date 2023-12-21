const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const pointViewer = document.getElementById("points");
const messageViewer = document.getElementById("message");
const startButton = document.getElementById("start");

// refresh of screen is snake speed
const SNAKE_SPEED = 250;
const TILE_SIZE = 20;
const X_TILES = canvas.width / TILE_SIZE;
const Y_TILES = canvas.height / TILE_SIZE;

let isRunning = true;
let points = 0;

const Direction = Object.freeze({
  Up: "Up",
  Down: "Down",
  Left: "Left",
  Right: "Right"
});

let direction = Direction.Right;

let snakeGrow = 0;
let selfBite = false;
let snake = [
  {x: 10, y: 15},
  {x: 9, y: 15},
  {x:8, y:15},
  {x:7, y:15}
];

let gold = { x: Math.floor(Math.random() * X_TILES),
             y: Math.floor(Math.random() * Y_TILES)};


// MODEL
function updateEntities() {

  // update snake
  let head = {...snake[0]};

  if (direction === Direction.Up) {
    head.y -= 1;
  }
  else if (direction === Direction.Down) {
    head.y += 1;
  }
  else if (direction === Direction.Left) {
    head.x -= 1;
  }
  else { // direction === Direction.Right
    head.x += 1;
  }

  // check collission with border
  if (head.x < 0 || head.x >= X_TILES || head.y < 0 || head.y >= Y_TILES) {
    isRunning = false;
  }

  // check if snake bites itself
  for (let i = 0; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      isRunning = false;
      selfBite = true;
    }
  }

  // check collission with gold
  if (head.x === gold.x && head.y === gold.y) {
    points += 1;
    snakeGrow = 3;
    // random new gold position
    gold.x = Math.floor(Math.random() * X_TILES)
    gold.y = Math.floor(Math.random() * Y_TILES)
  }

  // move the snake
  // add the new head
  snake.unshift(head);

  // remove the tail
  if (snakeGrow === 0) {
    if (!selfBite) {
      snake.pop();
    }
  }
  else {
    snakeGrow -= 1;
  }
}

// VIEW
function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0,0, canvas.width, canvas.height);
}

function drawGame () {
  // draw snake
  ctx.shadowBlur = 0;
  ctx.fillStyle = "lime";
  for(let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * TILE_SIZE, snake[i].y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  if (selfBite) {
    ctx.fillStyle = "red";
    ctx.fillRect(snake[0].x * TILE_SIZE, snake[0].y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  // draw gold
  // Shadow
  ctx.shadowColor = "gold";
  ctx.shadowBlur = 25;
  ctx.fillStyle = "gold";
  ctx.fillRect(gold.x * TILE_SIZE, gold.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);

  // update points
  pointViewer.innerText = points;

  if (!isRunning) {
    messageViewer.hidden = false;
    startButton.hidden = false;
  }
}

// CONTROLER
document.body.addEventListener("keydown", keyDown);

// do not allow switch from opposite direction
function keyDown(e) {
  if (e.keyCode == 37) {
    if (direction !== Direction.Right)
      direction = Direction.Left;
  }
  if (e.keyCode == 38) {
    if (direction !== Direction.Down)
      direction = Direction.Up;
  }
  if (e.keyCode == 39) {
    if (direction !== Direction.Left)
      direction = Direction.Right;
  }
  if (e.keyCode == 40) {
    if (direction !== Direction.Up)
      direction = Direction.Down;
  }
};

// main function
function gameLoop() {
  if (isRunning) {
    clearScreen();
    updateEntities();
    drawGame();
  }
}

function startGame() {
  const startSnake = [
    {x: 10, y: 15},
    {x: 9, y: 15},
    {x:8, y:15},
    {x:7, y:15}
  ];

  // reset everything
  direction = Direction.Right;
  snake = [...startSnake];
  gold = { x: Math.floor(Math.random() * X_TILES),
           y: Math.floor(Math.random() * Y_TILES)};
  snakeGrow = 0;
  selfBite = false;
  points = 0;
  isRunning = true;
  messageViewer.hidden = true;
  startButton.hidden = true;
}

setInterval(gameLoop, SNAKE_SPEED);
