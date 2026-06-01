//#region Globale Variabler

// Hopp
let y = 0;
let fartY = 0;
let paaBakken = true;

// Spill
let aktivKarakter;
let fienderAktiv = [];
let fiendeTeller = 0;

// Brett
const brettBredde = 1200;
const brettHoyde  = 300;

// Bakgrunner
const bakgrunn = {
  1: "../Bilder/AysaBakgrunn.png",
  2: "../Bilder/AureliaBakgrunn.png",
  3: "../Bilder/bakgrunn3.png"
};


// Karakter
const karakterBredde = 100;
const karakterHoyde  = 120;
const karakterX      = 50;

const karakterer = [
  { navn: "Aysa",      evne: "sakteTid", liv: 3, bilde: "../Bilder/Aysa.png" },
  { navn: "Aurelia", evne: "hoppeHoeyere", liv: 3, bilde: "../Bilder/Aurelia.png" },
  { navn: "karakter3", evne: "evne3", liv: 3, bilde: "../Bilder/karakter3.png" }
];

// Fiender

const fiendeIntervall = 120; // Ny fiende hvert 120. frame (ca. 2 sekunder)
const fiendeStartX    = brettBredde - 50;
const fiendeStartY    = 0; // Justert for fiendehøyde
const fiendeFart      = 5;
const aysaFiendeMaler = [
  { bredde: 40,  hoyde: 85, img: "../Bilder/AysaFiende1.png" }, // liten  – 60%
  { bredde: 70,  hoyde: 85, img: "../Bilder/AysaFiende2.png" }, // medium – 30%
  { bredde: 120, hoyde: 85, img: "../Bilder/AysaFiende3.png" }  // stor   – 10%
];

const aureliaFiendeMaler = [
  { bredde: 40,  hoyde: 85, img: "../Bilder/AureliaFiende1.png" }, // liten  – 60%
  { bredde: 70,  hoyde: 85, img: "../Bilder/AureliaFiende2.png" }, // medium – 30%
  { bredde: 120, hoyde:85, img: "../Bilder/AureliaFiende3.png" }  // stor   – 10%
];

// Fiender – fart
const fiendeFartMin = 3;   // Laveste mulige fart ved start
const fiendeFartMax = 7;   // Høyeste mulige fart
let fiendeFartOkning = 0;  // Øker over tid for å gjøre spillet vanskeligere

//#endregion


//#region Elementer
let bodyEl       = document.querySelector("body");
let startKnappEl = document.querySelector("#startKnapp");
let startMenyEl  = document.querySelector("#startSide");
let spillflateEl = document.querySelector("#spillflate");
//#endregion


//#region DOM
startKnappEl.addEventListener("click", startSpill);
//#endregion


//#region Funksjoner

// --- Oppstart ---

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
   settBakgrunn(1);
}


// --- Karakter ---

/**
 * Kobler et bilde til et div-element basert på karakterobjektet.
 * Oppretter ikke ny div hvis den allerede finnes.
 * @param {Object} obj - Karakterobjekt med egenskapene navn og bilde
 */
function kobleBildeTilDiv(obj) {
  if (document.querySelector("#" + obj.navn)) return;

  let div = document.createElement("div");
  div.id = obj.navn;
  div.style.cssText =
    "display:none; position:absolute;" +
    "bottom:0px; left:" + karakterX + "px;";

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
    fartY = 25;
    paaBakken = false;
  }
}


// --- Fiender ---

/**
 * Lager en ny aktiv fiende basert på tilfeldighet og legger den til fienderAktiv.
 * 10% sjanse: stor, 30% sjanse: medium, 60% sjanse: liten.
 * Farten er tilfeldig mellom fiendeFartMin + fiendeFartOkning og fiendeFartMax.
 * Fjerner eldste fiende hvis listen overstiger 5.
 */
function lagFiende(fiendeMaler) {
  let spawnSjanse = Math.floor(Math.random() * 10 + 1);

  let mal;
  if (spawnSjanse > 9) {
    mal = fiendeMaler[2];
  } else if (spawnSjanse >= 7) {
    mal = fiendeMaler[1];
  } else {
    mal = fiendeMaler[0];
  }

  let nedreGrense = fiendeFartMin + fiendeFartOkning;
  let fart = nedreGrense + Math.random() * (fiendeFartMax - nedreGrense);

  fienderAktiv.push({
    img:    mal.img,
    x:      fiendeStartX,
    y:      fiendeStartY,
    width:  mal.bredde,
    height: mal.hoyde,
    fart:   fart
  });

  if (fienderAktiv.length > 5) {
    fienderAktiv.shift();
  }
}

/**
 * Tegner alle aktive fiender på skjermen.
 * Fjerner gamle fiende-elementer og oppretter nye basert på fienderAktiv.
 */
function tegnFiender() {
  let gamleFiender = document.querySelectorAll(".fiende");
  for (let i = 0; i < gamleFiender.length; i++) {
    gamleFiender[i].remove();
  }

  for (let i = 0; i < fienderAktiv.length; i++) {
    let fiende = fienderAktiv[i];

    let img = document.createElement("img");
    img.src = fiende.img;
    img.alt = "fiende";
    img.className = "fiende";
    img.style.cssText =
      "position:absolute;" +
      "left:"   + fiende.x      + "px;" +
      "bottom:" + fiende.y      + "px;" +
      "width:"  + fiende.width  + "px;" +
      "height:" + fiende.height + "px;";

    bodyEl.appendChild(img);
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
    let f = fienderAktiv[i];
    let treffer =
      f.x              < karakterHoyre  &&
      f.x + f.width    > karakterVenstre &&
      f.y              < karakterTopp   &&
      f.y + f.height   > y;

    if (treffer) {
      console.log("Kollisjon med fiende!");
      fienderAktiv.splice(i, 1);
      aktivKarakter.liv--;
      i--;
    }
  }
}
/**
 * Setter bakgrunnen til spillet basert på det gitte nummeret.
 * @param {number} bakgrunnsNummer - Nummeret på den ønskede bakgrunnen
 */
function settBakgrunn(bakgrunnsNummer) {
  spillflateEl.style.backgroundImage = `url(${bakgrunn[bakgrunnsNummer]})`;
}
// --- Spilløkke ---

/**
 * Oppdaterer spillet for hver frame:
 * - Hopp og landing for karakter
 * - Fiender flyttes mot venstre og ryddes opp
 * - Ny fiende spawnes med jevne mellomrom
 * - Kollisjon sjekkes
 * - Fiender tegnes
 * Returnerer ingen verdi.
 */
function oppdaterSpill() {
  // Hopp
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

  // Fiender – flytt og rydd
  for (let i = 0; i < fienderAktiv.length; i++) {
    fienderAktiv[i].x -= fienderAktiv[i].fart;  // Bruker fiendens egen fart

    if (fienderAktiv[i].x + fienderAktiv[i].width < 0) {
      fienderAktiv.splice(i, 1);
      i--;
    }
  }

  // Spawn
  fiendeTeller++;
  if (fiendeTeller >= fiendeIntervall) {
    lagFiende(aysaFiendeMaler);
    fiendeTeller = 0;

    // Øk nedre grense litt for hver spawn, men aldri over maks
    fiendeFartOkning = Math.min(
      fiendeFartOkning + 0.3,
      fiendeFartMax - fiendeFartMin
    );
  }
  // Kollisjon og tegning
  kollisjon();
  tegnFiender();

  requestAnimationFrame(oppdaterSpill);
}

//#endregion