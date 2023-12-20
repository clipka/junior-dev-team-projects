let gameRunning = false;
let score = 0;
let world = [];
let goldAt = {
  x: 0,
  y: 0
}

function createWorld(x, y) {
  let arr = new Array(x);
  for (let i = 0; i < x; i++) {
    arr[i] = new Array(y);
  }

  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      arr[i][j] = false;
    }
  }

  return arr;
}

function resetWorld() {
  world = [];
  score = 0;
  goldAt = {x: 0, y: 0}
}

function setGoldPosition(max_x, max_y) {
  const x = Math.floor(Math.random() * max_x);
  const y = Math.floor(Math.random() * max_y);

  console.log("goldAt:", {x: x, y: y});
  return {x: x, y: y}
}

function startGame() {
  world = createWorld(10, 20);

  goldAt = setGoldPosition(10, 20);

  gameRunning = true;
  run();
}

function stopGame() {
  gameRunning = false;
}

// View
function render() {
  let game = document.getElementById("world");
  game.innerHTML = "";

  // render world
  for (let i = 0; i < world.length; i++) {
    let row_div = document.createElement("div");
    row_div.classList = "tile-row";

    for (let j = 0; j < world[i].length; j++) {
      let tile = document.createElement("div");
      tile.className = "tile";
      const id = `x${i}y${j}`
      tile.id = id;
      row_div.appendChild(tile);
    }
    game.appendChild(row_div);
  }

  // render gold
  let gold = document.getElementById(`x${goldAt.x}y${goldAt.y}`)
  console.log(gold)
  gold.classList.add("gold");
}

function run() {
  setTimeout(
    function() {
      render();
      if (gameRunning === true) {
        run();
      }
    }, 500);
}

// controller

function changeDirectionByKey(e) {

  switch(e.code) {
    case 'ArrowLeft': changeDirection("left"); break;
    case 'ArrowRight': changeDirection("right"); break;
    case 'ArrowUp': changeDirection("up"); break;
    case 'ArrowDown': changeDirection("down"); break;
  }
}

function changeDirection(direction) {
  console.log("direction:", direction)
  document.getElementById("direction").innerText = direction;
}

window.document.body.onkeydown = function(event){changeDirectionByKey(event)};

let configuration = {
  test: 12,
  arr: ['aaa', 'bbb'],
  boo: false,
  obj: {
    inner: 'zzzZZZzzz'
  }
}

console.log(configuration)
