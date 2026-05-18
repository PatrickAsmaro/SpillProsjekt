//#region Globale Variabler
let y = 0;
let fartY = 0;
let paaBakken = true;
let aktivKarakter;
let fienderAktiv = [];

let bakgrunn = {
  1: "../Bilder/bakgrunn1.jpg",
  2: "../Bilder/bakgrunn2.jpg",
  3: "../Bilder/bakgrunn3.jpg"
};

// Spillbrett
let brettBredde = 750;
let brettHoyde = 250;

// Spillkarakter
let karakterBredde = 80;
let karakterHoyde = 86;
let karakterX = 50;

let karakterer = [
  { navn: "test",       evne: "evne1", liv: 3, bilde: "../Bilder/testKarakter.jpg" },
  { navn: "karakter2",  evne: "evne2", liv: 3, bilde: "bildeSti" },
  { navn: "karakter3",  evne: "evne3", liv: 3, bilde: "bildeSti" }
];

// Fiende-typer (maler, skal ikke endres under spill)
const fiendeMaler = [
  { bredde: 34,  hoyde: 70, img: "../Bilder/fiende1.png" }, // liten  – 60%
  { bredde: 69,  hoyde: 70, img: "../Bilder/fiende2.png" }, // medium – 30%
  { bredde: 102, hoyde: 70, img: "../Bilder/fiende3.png" }  // stor   – 10%
];

const fiendeStartX = brettBredde - 50;
const fiendeStartY = brettHoyde - 70;
//#endregion


//#region Elementer
let bodyEl      = document.querySelector("body");
let startKnappEl = document.querySelector("#startKnapp");
let startMenyEl  = document.querySelector("#startSide");
//#endregion


//#region DOM
startKnappEl.addEventListener("click", startSpill);
//#endregion


//#region Funksjoner

/**
 * Starter spillet ved å skjule startmenyen, legge til keydown-lytter for hopp,
 * koble bilder til karakter-divs, vise første karakter og starte spilløkka.
 */
function startSpill() {
  startMenyEl.style.display = "none";
  document.addEventListener("keydown", hopp);

  for (let i = 0; i < karakterer.length; i++) {
    kobleBildeTilDiv(karakterer[i]);
  }

  visDiv(karakterer[0]);
  aktivKarakter = document.querySelector("#" + karakterer[0].navn);
  oppdaterSpill();
}


/**
 * Kobler et bilde til et div-element basert på karakterobjektet.
 * Oppretter ikke ny div hvis den allerede finnes.
 * @param {Object} obj - Karakterobjekt med egenskapene navn og bilde
 */
function kobleBildeTilDiv(obj) {
  if (document.querySelector("#" + obj.navn)) return;

  let div = document.createElement("div");
  div.id = obj.navn;
  div.style.cssText = "display:none; position:absolute; bottom:0px; left:" + karakterX + "px;";

  let img = document.createElement("img");
  img.src = obj.bilde;
  img.alt = obj.navn;
  img.style.width = karakterBredde + "px";

  div.appendChild(img);
  bodyEl.appendChild(div);
}


/**
 * Gjør div-elementet til obj synlig.
 * @param {Object} obj - Karakterobjekt med egenskapen navn
 */
function visDiv(obj) {
  let divEl = document.querySelector("#" + obj.navn);
  if (divEl) {
    divEl.style.display = "block";
  }
}


/**
 * Starter et hopp når mellomromstasten trykkes og karakteren er på bakken.
 * @param {KeyboardEvent} event - Tastetrykk-hendelsen fra nettleseren
 */
function hopp(event) {
  if (event.code === "Space" && paaBakken) {
    event.preventDefault();
    fartY = 15;
    paaBakken = false;
  }
}


/**
 * Oppdaterer spillet ved å flytte karakteren opp eller ned.
 * Bruker fartY og y for å beregne hopp og landing.
 * Returnerer ingen verdi.
 */
function oppdaterSpill() {
  fartY -= 1;
  y += fartY;

  if (y <= 0) {
    y = 0;
    fartY = 0;
    paaBakken = true;
  }

  if (aktivKarakter) {
    aktivKarakter.style.bottom = y + "px";
  }

  requestAnimationFrame(oppdaterSpill);
}


/**
 * Lager en ny aktiv fiende basert på tilfeldighet og legger den til fienderAktiv.
 * 10% sjanse: stor fiende, 30% sjanse: medium fiende, 60% sjanse: liten fiende.
 * Fjerner den eldste fienden hvis listen overstiger 5 elementer.
 */
function lagFiende() {
  let spawnSjanse = Math.floor(Math.random() * 10 + 1);

  let mal;
  if (spawnSjanse > 9) {
    mal = fiendeMaler[2];       // 10% – stor
  } else if (spawnSjanse >= 7) {
    mal = fiendeMaler[1];       // 30% – medium
  } else {
    mal = fiendeMaler[0];       // 60% – liten
  }

  let fiende = {
    img:    mal.img,
    x:      fiendeStartX,
    y:      fiendeStartY,
    width:  mal.bredde,
    height: mal.hoyde
  };

  fienderAktiv.push(fiende);

  if (fienderAktiv.length > 5) {
    fienderAktiv.shift();
  }
}


/**
 * Sjekker om aktivKarakter kolliderer med en fiende i fienderAktiv.
 * Fjerner fienden og logger kollisjon hvis treff oppdages.
 */
function kollisjon() {
  let karakterVenstre = karakterX;
  let karakterHoyre   = karakterX + karakterBredde;
  let karakterTopp    = y + karakterHoyde;

  for (let i = 0; i < fienderAktiv.length; i++) {
    let fiende = fienderAktiv[i];
    let treffer =
      fiende.x < karakterHoyre &&
      fiende.x + fiende.width > karakterVenstre &&
      fiende.y < karakterTopp &&
      fiende.y + fiende.height > y;

    if (treffer) {
      console.log("Kollisjon med fiende!");
      fienderAktiv.splice(i, 1);
      i--;
    }
  }
}

//#endregion