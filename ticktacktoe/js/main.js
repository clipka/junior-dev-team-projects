let tictactoe = [
    {
      id: "1",
      mark: "",
      set: false
    },
    {
      id: "2",
      mark: "",
      set: false
    },
    {
      id: "3",
      mark: "",
      set: false
    },
    {
      id: "4",
      mark: "",
      set: false
    },
    {
      id: "5",
      mark: "",
      set: false
    },
    {
      id: "6",
      mark: "",
      set: false
    },
    {
      id: "7",
      mark: "",
      set: false
    },
    {
      id: "8",
      mark: "",
      set: false
    },
    {
      id: "9",
      mark: "",
      set: false
    }
];

let players = [
{
    name: "Spieler 1",
    mark: "X"
},
{
    name: "Spieler 2",
    mark: "O"
}
];

let gameRunning = false;
let currentPlayer = 0;

function setMark(id) {
    tictactoe.forEach((element) => {
        if (element.id === id) {
        element.mark = players[currentPlayer].mark;
        element.set = true;
        }
    });
}

function nextPlayer() {
    if (currentPlayer === 0) {
        currentPlayer = 1;
    } else {
        currentPlayer = 0;
    }
}

function resetField() {
    tictactoe.forEach((element) => {
        element.mark = "";
        element.set = false;
    });
}

function checkWinner() {
    // winner is when a row or a colum or a diagonal
    // has the same mark
    // all rows
    if (
        (tictactoe[0].set === true &&
        tictactoe[1].set === true &&
        tictactoe[2].set === true &&
        tictactoe[0].mark === tictactoe[1].mark &&
        tictactoe[0].mark === tictactoe[2].mark) ||
        (tictactoe[3].set === true &&
        tictactoe[4].set === true &&
        tictactoe[5].set === true &&
        tictactoe[3].mark === tictactoe[4].mark &&
        tictactoe[5].mark === tictactoe[2].mark) ||
        (tictactoe[6].set === true &&
        tictactoe[7].set === true &&
        tictactoe[8].set === true &&
        tictactoe[6].mark === tictactoe[7].mark &&
        tictactoe[8].mark === tictactoe[2].mark) ||
        (tictactoe[0].set === true &&
        tictactoe[3].set === true &&
        tictactoe[6].set === true &&
        tictactoe[0].mark === tictactoe[3].mark &&
        tictactoe[0].mark === tictactoe[6].mark) ||
        (tictactoe[1].set === true &&
        tictactoe[4].set === true &&
        tictactoe[7].set === true &&
        tictactoe[1].mark === tictactoe[4].mark &&
        tictactoe[1].mark === tictactoe[7].mark) ||
        (tictactoe[2].set === true &&
        tictactoe[5].set === true &&
        tictactoe[8].set === true &&
        tictactoe[2].mark === tictactoe[5].mark &&
        tictactoe[2].mark === tictactoe[8].mark) ||
        (tictactoe[0].set === true &&
        tictactoe[4].set === true &&
        tictactoe[8].set === true &&
        tictactoe[0].mark === tictactoe[4].mark &&
        tictactoe[0].mark === tictactoe[8].mark) ||
        (tictactoe[2].set === true &&
        tictactoe[4].set === true &&
        tictactoe[6].set === true &&
        tictactoe[2].mark === tictactoe[4].mark &&
        tictactoe[2].mark === tictactoe[6].mark)
    ) {
        alert("Gewinner: " + players[currentPlayer].name);
        gameRunning = false;
    }

    if (gameRunning == true) {
        // check if it is a draw
        isDraw = tictactoe.every((element) => {
            if (element.mark == "") {
                return false;
            }
            return true;
        });

        if (isDraw) {
            alert("Unentschieden!");
            gameRunning = false;
        }
    }
}

// View
function render() {
let field = document.getElementById("field");
field.innerHTML = "";

tictactoe.forEach((element) => {
    const fieldPart = document.createElement("button");
    if (gameRunning === false) {
    fieldPart.disabled = true;
    }

    if (element.mark === "") {
    fieldPart.className = "tictactoe_button_default";
    } else {
    fieldPart.className = "tictactoe_button_set";
    fieldPart.innerText = element.mark;
    }

    fieldPart.onclick = setzen;
    fieldPart.id = element.id;
    field.appendChild(fieldPart);
});

// print current player
const p = document.getElementById("p_current_player");
    p.innerText = players[currentPlayer].name + " ist an der Reihe";
}

// Controller
function setzen(event) {
    // set new mark only if game is running
    if (gameRunning === true) {
        setMark(event.target.id);
        checkWinner();
        nextPlayer();
        render();
    }
}

function start() {
    gameRunning = true;
    resetField();
    render();
}
