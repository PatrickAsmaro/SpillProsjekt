//#region Globale variabler

// Hopp og fysikk
let y = 0;
let fartY = 0;
let paaBakken = true;
const tyngdekraft = 1;

// Spillstatus
let aktivKarakterObj = null;
let aktivKarakterEl = null;
let fienderAktiv = [];
let fiendeTeller = 0;
let fiendeFartOkning = 0;
let animasjonId = null;
let spillKjorer = false;
let level = 1;
let score = 0;

// Brett
const brettBredde = 1200;
const brettHoyde = 600;

// Bakgrunner
const bakgrunn = {
  1: "../Bilder/AysaBakgrunn.png",
  2: "../Bilder/AureliaBakgrunn.png",
  3: "../Bilder/bakgrunn3.png"
};

// Karakter
const karakterBredde = 100;
const karakterHoyde = 120;
const karakterX = 50;

const karakterer = [
  { navn: "Aysa", evne: "sakteTid", liv: 3, bilde: "../Bilder/Aysa.png" },
  { navn: "Aurelia", evne: "hoppeHoeyere", liv: 3, bilde: "../Bilder/Aurelia.png" },
  { navn: "Karakter3", evne: "evne3", liv: 3, bilde: "../Bilder/karakter3.png" }
];

// Fiender
const fiendeIntervall = 120;
const fiendeStartX = brettBredde - 50;
const fiendeStartY = 0;

const fiendeFartMin = 3;
const fiendeFartMax = 7;

const aysaFiendeMaler = [
  { type: "liten", bredde: 40, hoyde: 85, img: "../Bilder/AysaFiende1.png" },
  { type: "medium", bredde: 70, hoyde: 85, img: "../Bilder/AysaFiende2.png" },
  { type: "stor", bredde: 120, hoyde: 85, img: "../Bilder/AysaFiende3.png" }
];

const aureliaFiendeMaler = [
  { type: "liten", bredde: 40, hoyde: 85, img: "../Bilder/AureliaFiende1.png" },
  { type: "medium", bredde: 70, hoyde: 85, img: "../Bilder/AureliaFiende2.png" },
  { type: "stor", bredde: 120, hoyde: 85, img: "../Bilder/AureliaFiende3.png" }
];

const karakter3FiendeMaler = [
  { type: "liten", bredde: 40, hoyde: 85, img: "../Bilder/fiende1.png" },
  { type: "medium", bredde: 70, hoyde: 85, img: "../Bilder/fiende2.png" },
  { type: "stor", bredde: 120, hoyde: 85, img: "../Bilder/fiende3.png" }
];

// DOM-elementer
const startKnappEl = document.querySelector("#startKnapp");
const startMenyEl = document.querySelector("#startSide");
const spillflateEl = document.querySelector("#spillflate");

//#endregion


//#region Event listeners

startKnappEl.addEventListener("click", startSpill);

document.addEventListener("keydown", function (event) {
  if (
    event.code === "Space" ||
    event.code === "ArrowUp" ||
    event.code === "ArrowDown" ||
    event.code === "ArrowLeft" ||
    event.code === "ArrowRight"
  ) {
    event.preventDefault();
  }
});

document.addEventListener("keydown", hopp);

//#endregion


//#region Oppstart

function startSpill() {
  if (spillKjorer) return;

  startMenyEl.style.display = "none";
  spillKjorer = true;

  lagKarakterer();
  byttTilLevel(1);
  oppdaterSpill();
}

//#endregion


//#region Karakter

function lagKarakterer() {
  for (let i = 0; i < karakterer.length; i++) {
    kobleBildeTilDiv(karakterer[i]);
  }
}

function kobleBildeTilDiv(obj) {
  if (document.querySelector("#" + obj.navn)) return;

  const div = document.createElement("div");
  div.id = obj.navn;
  div.style.display = "none";
  div.style.position = "absolute";
  div.style.left = karakterX + "px";
  div.style.bottom = "0px";
  div.style.zIndex = "2";

  const img = document.createElement("img");
  img.src = obj.bilde;
  img.alt = obj.navn;
  img.style.width = karakterBredde + "px";
  img.style.height = karakterHoyde + "px";
  img.draggable = false;

  div.appendChild(img);
  spillflateEl.appendChild(div);
}

function skjulAlleKarakterer() {
  for (let i = 0; i < karakterer.length; i++) {
    const el = document.querySelector("#" + karakterer[i].navn);
    if (el) {
      el.style.display = "none";
    }
  }
}

function visKarakter(obj) {
  skjulAlleKarakterer();

  aktivKarakterObj = obj;
  aktivKarakterEl = document.querySelector("#" + obj.navn);

  if (aktivKarakterEl) {
    aktivKarakterEl.style.display = "block";
    aktivKarakterEl.style.bottom = "0px";
  }
}

function hopp(event) {
  if (!spillKjorer) return;

  if (event.code === "Space" && paaBakken) {
    fartY = aktivKarakterObj.evne === "hoppeHoeyere" ? 30 : 25;
    paaBakken = false;
  }
}

//#endregion


//#region Fiender

function hentFiendeMalerForLevel() {
  if (level === 1) return aysaFiendeMaler;
  if (level === 2) return aureliaFiendeMaler;
  return karakter3FiendeMaler;
}

function lagFiendeObjekt(mal, fart) {
  return {
    type: mal.type,
    img: mal.img,
    x: fiendeStartX,
    y: fiendeStartY,
    width: mal.bredde,
    height: mal.hoyde,
    fart: fart
  };
}

function lagFiende() {
  const fiendeMaler = hentFiendeMalerForLevel();
  const spawnSjanse = Math.floor(Math.random() * 10) + 1;

  let mal;
  if (spawnSjanse > 9) {
    mal = fiendeMaler[2];
  } else if (spawnSjanse >= 7) {
    mal = fiendeMaler[1];
  } else {
    mal = fiendeMaler[0];
  }

  const nedreGrense = Math.min(fiendeFartMin + fiendeFartOkning, fiendeFartMax);
  const fart = nedreGrense + Math.random() * (fiendeFartMax - nedreGrense);

  const nyFiende = lagFiendeObjekt(mal, fart);
  fienderAktiv.push(nyFiende);

  if (fienderAktiv.length > 5) {
    fienderAktiv.shift();
  }
}

function tegnFiender() {
  const gamleFiender = spillflateEl.querySelectorAll(".fiende");
  for (let i = 0; i < gamleFiender.length; i++) {
    gamleFiender[i].remove();
  }

  for (let i = 0; i < fienderAktiv.length; i++) {
    const fiende = fienderAktiv[i];

    const img = document.createElement("img");
    img.src = fiende.img;
    img.alt = fiende.type + " fiende";
    img.className = "fiende";
    img.style.position = "absolute";
    img.style.left = fiende.x + "px";
    img.style.bottom = fiende.y + "px";
    img.style.width = fiende.width + "px";
    img.style.height = fiende.height + "px";
    img.style.zIndex = "2";
    img.draggable = false;

    spillflateEl.appendChild(img);
  }
}

function kollisjon() {
  const karakterVenstre = karakterX;
  const karakterHoyre = karakterX + karakterBredde;
  const karakterBunn = y;
  const karakterTopp = y + karakterHoyde;

  for (let i = 0; i < fienderAktiv.length; i++) {
    const f = fienderAktiv[i];

    const treffer =
      f.x < karakterHoyre &&
      f.x + f.width > karakterVenstre &&
      f.y < karakterTopp &&
      f.y + f.height > karakterBunn;

    if (treffer) {
      fienderAktiv.splice(i, 1);
      i--;

      aktivKarakterObj.liv--;

      if (aktivKarakterObj.liv <= 0) {
        nesteLevel();
        return;
      }
    }
  }
}

//#endregion


//#region Level og bakgrunn

function settBakgrunn(bakgrunnsNummer) {
  spillflateEl.style.backgroundImage = `url(${bakgrunn[bakgrunnsNummer]})`;
  spillflateEl.style.backgroundRepeat = "no-repeat";
  spillflateEl.style.backgroundPosition = "center bottom";
  spillflateEl.style.backgroundSize = "100% 100%";
}

function byttTilLevel(nyttLevel) {
  level = nyttLevel;
  y = 0;
  fartY = 0;
  paaBakken = true;
  fienderAktiv = [];
  fiendeTeller = 0;
  fiendeFartOkning = 0;

  if (level === 1) {
    visKarakter({ ...karakterer[0] });
    settBakgrunn(1);
  } else if (level === 2) {
    visKarakter({ ...karakterer[1] });
    settBakgrunn(2);
  } else if (level === 3) {
    visKarakter({ ...karakterer[2] });
    settBakgrunn(3);
  }
}

function nesteLevel() {
  if (level < 3) {
    byttTilLevel(level + 1);
  } else {
    sluttSpill();
  }
}

//#endregion


//#region Sluttskjerm

function sluttSpill() {
  spillKjorer = false;

  if (animasjonId !== null) {
    cancelAnimationFrame(animasjonId);
  }

  const gammelGameOver = document.querySelector("#gameOver");
  if (gammelGameOver) {
    gammelGameOver.remove();
  }

  const gameOverEl = document.createElement("div");
  gameOverEl.id = "gameOver";
  gameOverEl.innerHTML = `
    <div style="text-align:center;">
      <h2>Spillet er ferdig!</h2>
      <p>Poeng: ${score}</p>
      <button id="startPaNyttKnapp">Start på nytt</button>
    </div>
  `;

  gameOverEl.style.position = "absolute";
  gameOverEl.style.inset = "0";
  gameOverEl.style.display = "flex";
  gameOverEl.style.justifyContent = "center";
  gameOverEl.style.alignItems = "center";
  gameOverEl.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
  gameOverEl.style.color = "white";
  gameOverEl.style.fontSize = "24px";
  gameOverEl.style.fontWeight = "bold";
  gameOverEl.style.zIndex = "20";

  spillflateEl.appendChild(gameOverEl);

  const startPaNyttKnapp = document.querySelector("#startPaNyttKnapp");
  startPaNyttKnapp.addEventListener("click", restartSpill);
}

function restartSpill() {
  const gameOverEl = document.querySelector("#gameOver");
  if (gameOverEl) {
    gameOverEl.remove();
  }

  skjulAlleKarakterer();
  fienderAktiv = [];
  score = 0;
  level = 1;
  y = 0;
  fartY = 0;
  paaBakken = true;
  fiendeTeller = 0;
  fiendeFartOkning = 0;
  spillKjorer = true;

  byttTilLevel(1);
  oppdaterSpill();
}

//#endregion


//#region Spilløkke

function oppdaterSpill() {
  if (!spillKjorer) return;

  fartY -= tyngdekraft;
  y += fartY;

  if (y <= 0) {
    y = 0;
    fartY = 0;
    paaBakken = true;
  }

  if (aktivKarakterEl) {
    aktivKarakterEl.style.bottom = y + "px";
  }

  for (let i = 0; i < fienderAktiv.length; i++) {
    fienderAktiv[i].x -= fienderAktiv[i].fart;

    if (fienderAktiv[i].x + fienderAktiv[i].width < 0) {
      fienderAktiv.splice(i, 1);
      i--;
      score++;
    }
  }

  fiendeTeller++;
  if (fiendeTeller >= fiendeIntervall) {
    lagFiende();
    fiendeTeller = 0;

    fiendeFartOkning = Math.min(
      fiendeFartOkning + 0.3,
      fiendeFartMax - fiendeFartMin
    );
  }

  kollisjon();
  tegnFiender();

  animasjonId = requestAnimationFrame(oppdaterSpill);
}

//#endregion