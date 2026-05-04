//#region Globale Variabler
let y = 0;
let fartY = 0;
let paaBakken = true;
let aktivKarakterEl;

let karakterer = [
  { navn: "test", evne: "evne1", liv: 3, bilde: "../Bilder/testKarakter.jpg" },
  { navn: "karakter2", evne: "evne2", liv: 3, bilde: "bildeSti" },
  { navn: "karakter3", evne: "evne3", liv: 3, bilde: "bildeSti" }
];
//#endregion

//#region Elementer
let bodyEl = document.querySelector("body");
let startKnappEl = document.querySelector("#startKnapp");
let startMenyEl = document.querySelector("#startSide");
//#endregion

//#region DOM
startKnappEl.addEventListener("click", startSpill);
//#endregion

//#region Funksjoner
function startSpill() {
  startMenyEl.style.display = "none";

  document.addEventListener("keydown", hopp);

  for (let i = 0; i < karakterer.length; i++) {
    kobleBildeTilDiv(karakterer[i]);
  }

  visDiv(karakterer[0]);
  aktivKarakterEl = document.querySelector("#" + karakterer[0].navn);

  oppdaterSpill();
}

function kobleBildeTilDiv(obj) {
  if (document.querySelector("#" + obj.navn)) {
    return;
  }

  let div = document.createElement("div");
  div.id = obj.navn;
  div.style.display = "none";
  div.style.position = "absolute";
  div.style.bottom = "0px";
  div.style.left = "100px";

  let img = document.createElement("img");
  img.src = obj.bilde;
  img.alt = obj.navn;
  img.style.width = "100px";

  div.appendChild(img);
  bodyEl.appendChild(div);
}

function visDiv(obj) {
  let divEl = document.querySelector("#" + obj.navn);

  if (divEl) {
    divEl.style.display = "block";
  }
}

function hopp(event) {
  if (event.code === "Space" && paaBakken) {
    event.preventDefault();
    fartY = 15;
    paaBakken = false;
  }
}

function oppdaterSpill() {
  fartY = fartY - 1;
  y = y + fartY;

  if (y <= 0) {
    y = 0;
    fartY = 0;
    paaBakken = true;
  }

  if (aktivKarakterEl) {
    aktivKarakterEl.style.bottom = y + "px";
  }

  requestAnimationFrame(oppdaterSpill);
}
//#endregion