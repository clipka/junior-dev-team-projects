const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const pointViewer = document.getElementById("points");
const messageViewer = document.getElementById("message");
const difficultyPanel = document.getElementById("difficulty");
const playerPanel = document.getElementById("playerPanel");
const startButton = document.getElementById("start");

const TILE_SIZE = 20;
const X_TILES = canvas.width / TILE_SIZE;
const Y_TILES = canvas.height / TILE_SIZE;

let isRunning = false;
let points = 0;


// refresh of screen is snake speed - determines the difficulty of the game
const Speed = Object.freeze({
  easy: 600,
  normal: 300,
  fast: 150
});

let speed = Speed.normal;

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
  {x: 10, y: 10},
  {x: 9, y: 10},
  {x:8, y:10},
  {x:7, y:10}
];

let gold = { x: 0, y: 0};

// MODEL
function setGold() {
  gold.x = Math.floor(Math.random() * X_TILES)
  gold.y = Math.floor(Math.random() * Y_TILES)

  for (let i = 0; i < snake.length; i++) {
    if (gold.x === snake[i].x && gold.y === snake[i].y) {
      setGold(); // retry; cannot set gold in occupied place
    }
  }
}


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
    setGold();
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
    difficultyPanel.hidden = false;
    for (let i = 0; i < difficultyPanel.children.length; i++) {
      difficultyPanel.children[i].hidden = false;
    }
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

function  setDifficulty(difficulty) {

  console.log("set speed:", difficulty)
  if (difficulty === 'easy') {
    speed = Speed.easy;
  }
  else if (difficulty === 'normal') {
    speed = Speed.normal;
  }
  else { // hard
    speed = Speed.fast;
  }
}

// main function
function gameLoop() {

    if (isRunning) {
      clearScreen();
      updateEntities();
      drawGame();
      setTimeout(() => {
        gameLoop();
      }, speed);
    }
    console.log("end game loop");
}

function startGame() {
  const startSnake = [
    {x: 10, y: 10},
    {x: 9, y: 10},
    {x:8, y:10},
    {x:7, y:10}
  ];

  // reset everything
  direction = Direction.Right;
  snake = [...startSnake];
  setGold();
  snakeGrow = 0;
  selfBite = false;
  points = 0;
  isRunning = true;
  messageViewer.hidden = true;
  startButton.hidden = true;
  for (let i = 0; i < difficultyPanel.children.length; i++) {
    difficultyPanel.children[i].hidden = true;
  }
  canvas.hidden = false;

  gameLoop();
}
