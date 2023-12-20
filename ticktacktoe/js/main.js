let aktuellerSpieler = 1;
let spielAktiv = true;


function hatSpielerGewonnen(symbol) {
    let t1 = document.getElementById("1").innerText;
    let t2 = document.getElementById("2").innerText;
    let t3 = document.getElementById("3").innerText;
    let t4 = document.getElementById("4").innerText;
    let t5 = document.getElementById("5").innerText;
    let t6 = document.getElementById("6").innerText;
    let t7 = document.getElementById("7").innerText;
    let t8 = document.getElementById("8").innerText;
    let t9 = document.getElementById("9").innerText;

    if (( t1 == symbol && t2 == symbol && t3 == symbol) || // obere horizontale Reihe
		( t4 == symbol && t5 == symbol && t6 == symbol) || // mittlere
        ( t7 == symbol && t8 == symbol && t9 == symbol) || // untere
		( t1 == symbol && t4 == symbol && t7 == symbol) || // linke vertikale Reihe
		( t2 == symbol && t5 == symbol && t8 == symbol) || // mittlere
        ( t3 == symbol && t6 == symbol && t9 == symbol) || // rechte
		( t1 == symbol && t5 == symbol && t9 == symbol) || // erste Diagnoale
        ( t3 == symbol && t5 == symbol && t7 == symbol))   // zweite Diagnoale
    {
        return true;
    }
    else {
        return false;
    }
}

function istUnentschieden() {
  const felder = document.querySelectorAll(".Feld");

  for (let i = 0; i < felder.length; i++) {
    if (felder[i].innerText == "") return false;
  }

  return true;
}

function deaktiviereSpielfeld() {
  const felder = document.querySelectorAll(".Feld");

  for (let i = 0; i < felder.length; i++) {
    felder[i].disabled = true;
  }
}

function setzen(e) {
    let button = e.currentTarget;
    let spielerName = document.getElementById('spieler');
    let ergebnis = document.getElementById('Ergebnis');

    if (aktuellerSpieler == 1) {
        button.innerText = "X";
      if (hatSpielerGewonnen("X")) {
        ergebnis.innerText = "Spieler 1 hat gewonnen";
        spielAktiv = false;
      }
      else if (istUnentschieden()) {
        ergebnis.innerText = "Unentschieden";
        spielAktiv = false;
      }
      else {
        aktuellerSpieler = 2;
        spielerName.innerText = "Spieler 2";
      }
    }
    else {
          button.innerText = "O";
      if (hatSpielerGewonnen("O")) {
        ergebnis.innerText = "Spieler 2 hat gewonnen";
        spielAktiv = false;
      }
      else if (istUnentschieden()) {
        ergebnis.innerText = "Unentschieden";
        spielAktiv = false;
      }
      else {
        aktuellerSpieler = 1;
        spielerName.innerText = "Spieler 1";
      }
    }

    if (spielAktiv) {
        button.disabled = true;
    }
    else  // das Spiel ist nicht mehr aktiv
    {
         deaktiviereSpielfeld();
    }
}

function starten() {
    // den Text aller Button löschen
    document.getElementById("1").innerText = "";
    document.getElementById("2").innerText = "";
    document.getElementById("3").innerText = "";
    document.getElementById("4").innerText = "";
    document.getElementById("5").innerText = "";
    document.getElementById("6").innerText = "";
    document.getElementById("7").innerText = "";
    document.getElementById("8").innerText = "";
    document.getElementById("9").innerText = "";

    // alle Button aktivieren
    document.getElementById("1").disabled = false;
    document.getElementById("2").disabled = false;
    document.getElementById("3").disabled = false;
    document.getElementById("4").disabled = false;
    document.getElementById("5").disabled = false;
    document.getElementById("6").disabled = false;
    document.getElementById("7").disabled = false;
    document.getElementById("8").disabled = false;
    document.getElementById("9").disabled = false;

    // das Ergebnis löschen
    let ergebnis = document.getElementById('Ergebnis');
    ergebnis.innerText = "";

    // das Spiel aktivieren
    spielAktiv = true;
}
