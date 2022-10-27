// model
let gameRunning = false;
let gameStarted = false;
let currentPlayer = 0;
let generation = 1;
let universe = [];
let universe_x_dim = 0;
let universe_y_dim = 0;

function toggleAlive(x, y) {
    universe[x][y] = !universe[x][y];
}

function createUniverse(x, y) {
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

function resetUniverse() {
    universe = [];
    generation = 1;
}

function checkLife() {

    for (let i = 0; i < universe_x_dim; i++) {
        for (let j = 0; j < universe_y_dim; j++) {
            if (universe[i][j]) return true;
        }
    }

    return false;
}

//
// neighors
// - upper left: (x-1, y-1)
// - upper: (x, y-1)
// - upper right: (x+1, y-1)
// - left: (x-1, y)
// - right: (x+1, y)
// - lower left: (x-1, y+1)
// - lower: (x, y+1)
// - lower right: (x+1, y+1)

// flat universe: on the edge no continuation on the
// other side
function neighborhood_flat(x, y) {
    let neighbors = [];

    let upper = y - 1;
    let lower = y + 1;
    let left = x - 1;
    let right = x + 1;

    if (upper >= 0 && left >= 0)
        neighbors.push(universe[left][upper]);
    if (upper >= 0)
        neighbors.push(universe[x][upper]);
    if (upper >= 0 && right < universe_x_dim)
        neighbors.push(universe[right][upper]);
    if (left >= 0)
        neighbors.push(universe[left][y]);
    if (right < universe_y_dim)
        neighbors.push(universe[right][y]);
    if (lower < universe_y_dim && left >= 0)
        neighbors.push(universe[left][lower]);
    if (lower < universe_y_dim)
        neighbors.push(universe[x][lower]);
    if (lower < universe_y_dim && right < universe_x_dim)
        neighbors.push(universe[right][lower]);

    console.log(neighbors);
    return neighbors;
}

// donut universe: the universe continues on the other side
// when reaching the edge
//
// neighbors of a given neighbor i:
// - upper left neighbor: i - (universe_x_dim + 1)
// - upper neighbor: i - universe_x_dim
// - upper right neighbor: i - (universe_x_dim - 1)
// - left neighbor: i-1
// - right neighbor = i + 1
// - lower left neighbor = i + (universe_x_dim - 1)
// - lower neighbor = i + universe_x_dim
// - lower right neighbor =  i + (universe_x_dim + 1)
function neighborhood_donut(i) {
    let neighbors = [];

    neighbors.push(i - (universe_x_dim + 1));
    neighbors.push(i - universe_x_dim);
    neighbors.push(i - (universe_x_dim - 1));
    neighbors.push(i - 1);
    neighbors.push(i + 1);
    neighbors.push(i + (universe_x_dim - 1));
    neighbors.push(i + universe_x_dim);
    neighbors.push(i + (universe_x_dim + 1));

    return neighbors;
}

// get all neighbors of a given cell
// we currently assume a flat universe, no donut
function neighborhood(x, y) {
    return neighborhood_flat(x, y);
}

// Regeln:
// 1. Eine tote Zelle wird geboren, wenn sie genau 3 Nachbarn hat
// 2. Eine lebende Zelle mit weniger als 2 Nachbarn stirbt (an Vereinsamung)
// 3. Eine lebende Zelle mit 2 oder 3 Nachbarn bleibt am Leben
// 4. Eine lebende Zelle mit mehr als 3 Nachbarn stirbt (an Überbevölkerung)
function calcNextGeneration() {
    generation = generation + 1;

    next_universe = createUniverse(universe_y_dim, universe_x_dim);

    for (let x = 0; x < universe_x_dim; x++) {
        for (let y = 0; y < universe_y_dim; y++) {
            neighbors = neighborhood(x, y);
            let alive_neighbors = neighbors.filter(n => n === true).length;

            if (universe[x][y] === false && alive_neighbors == 3) { // 1.
                next_universe[x][y] = true;
            }
            else if (universe[x][y] === true && alive_neighbors < 2) { // 2.
                next_universe[x][y] = false;
            }
            else if (universe[x][y] === true && (alive_neighbors == 2 || alive_neighbors == 3)) { // 3.
                next_universe[x][y] = true;
            }
            else if (universe[x][y] === true && alive_neighbors > 3) { // 4.
                next_universe[x][y] = false;
            }
        }
    }

    // change original universe
    for (let x = 0; x < universe_x_dim; x++) {
        for (let y = 0; y < universe_y_dim; y++) {
            universe[x][y] = next_universe[x][y];
        }
    }
}

// View
function render() {
    let x = parseInt(document.getElementById('x').value);
    let game = document.getElementById("universe");
    game.innerHTML = "";

    for (let i = 0; i < universe_x_dim; i++) {
        for (let j = 0; j < universe_y_dim; j++) {
            let part = document.createElement("button");
            part.value = i.toString() + "," + j.toString();
            part.addEventListener('click', () => {revitalize(part.value);});

            if (universe[i][j] == true) {
                part.className = "button_alive";
            }
            else {
                part.className = "button_dead";
            }

            game.appendChild(part);
        }
        let br = document.createElement("br");
        game.appendChild(br);
    }

    let p_gen = document.getElementById("p_current_generation");
    p_gen.innerText = 'Generation: ' + generation;

    if (gameRunning === false && gameStarted === true) {
        let p_result = document.getElementById("p_result");
        if (checkLife() == false) {
            p_result.innerText = 'Alles Leben wurde ausgelöscht!';
        }
        else {
            p_result.innerText = '';
        }
    }
}

// Controller
function revitalize(id) {
    if (gameRunning === false) {
        let arr = id.toString().split(",");
        toggleAlive(parseInt(arr[0]), parseInt(arr[1]));
        render();
    }
}

function create() {
    let x = parseInt(document.getElementById('x').value);
    let y = parseInt(document.getElementById('y').value);
    let msg = document.getElementById("error");

    if (isNaN(x) || isNaN(y)) {
      msg.hidden = false;
      msg.innerText = 'x oder y ist keine Zahl!';
    }
    else {
        gameRunning = false;
        gameStarted = false;

        msg.hidden = true;
        universe_x_dim = x;
        universe_y_dim = y;
        resetUniverse();
        universe = createUniverse(universe_y_dim, universe_x_dim);
        render();
    }
}

function run() {
    setTimeout(
        function() {
            calcNextGeneration();
            if (checkLife() === false) {
                gameRunning = false;
            }
            render();
            if (gameRunning === true) {
                run();
            }
        }, 500);
}

function start() {
    gameRunning = true;
    gameStarted = true;
    run();
}

function stop() {
    gameStarted = false;
    gameRunning = false;
}