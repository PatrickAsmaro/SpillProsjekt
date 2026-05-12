//#region Globale Variabler
let y = 0;
let fartY = 0;
let paaBakken = true;
let aktivKarakter;

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
/**
 * Starter spillet ved å skjule startmenyen, legge til en keydown-event listener for hopp, koble bilder til karakter-divs, vise den første karakteren og starte spilloppdateringen.
 * 
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
 * 
 * @param {Object} obj - Karakterobjektet med egenskapen navn og bilde
 * @returns {HTMLElement} - Det opprettede div-elementet
 */
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


/**
 * Viser en div-element på skjermen basert på karakterobjektet.
 * 
 * Betingelser:
 * - obj.navn må eksistere (karakteren må ha et navn)
 * - Div-elementet med id lik obj.navn må eksistere i DOM
 * 
 * Endrer:
 * - style.display til "block" (gjør elementet synlig)
 * 
 * @param {Object} obj - Karakterobjektet med egenskapen navn
 */
function visDiv(obj) {
  let divEl = document.querySelector("#" + obj.navn);

  if (divEl) {
    divEl.style.display = "block";
  }
}

/**
 * Funksjonen hopp() starter et hopp når mellomromstasten trykkes.
 * 
 * Betingelser:
 * - event.code må være "Space" (mellomromstasten)
 * - paaBakken må være true (spilleren står på bakken)
 * 
 * Endrer:
 * - fartY til 15 (gir spilleren fart oppover)
 * - paaBakken til false (spilleren er i lufta)
 * 
 * @param {KeyboardEvent} event - Tastetrykk-hendelsen fra nettleseren
 */
function hopp(event) {
  if (event.code === "Space" && paaBakken) {
    event.preventDefault();  // Hindrer at siden scroller
    fartY = 15;
    paaBakken = false;
  }
}

/**
 * Oppdaterer spillet ved å flytte karakteren opp eller ned.
 * Funksjonen bruker fartY og y for å regne ut hopp og landing.
 * Hvis karakteren treffer bakken, settes y til 0 og paaBakken til true.
 * Flytter aktivKarakter ved å endre style.bottom.
 * Returnerer ingen verdi.
 */
function oppdaterSpill() {
  fartY = fartY - 1;
  y = y + fartY;

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
 * Plasserer en fiende på skjermen med en tilfeldig sjanse for størrelse.
 * Endrer:
 * - Legger til et fiendeobjekt i fienderArray med egenskaper img, x, y, width, height basert på en tilfeldig sjanse.
 * 
 * Sjanser:
 * - 10% sjanse for en stor fiende (fiende3)
 * - 30% sjanse for en medium fiende (fiende2)
 * - 60% sjanse for en liten fiende (fiende1)
 * 
 */
function plasserFiende() {
  let fiende = {
    img : null,
    x : fiendeX,
    y : fiendeY,
    width : null,
    height : fiendeHoyde
  }

  let spawnSjanse = Math.floor(Math.random() * 10 + 1)

  if(spawnSjanse > 9){         //10% sjanse for en stor fiende
    fiende.img = fiende3Img;
    fiende.width = fiende3Bredde
    fienderArray.push(fiende)
  }
   else if (spawnSjanse >= 7){    //30% sjanse for en medium fiende
    fiende.img = fiende2Img;
    fiende.width = fiende2Bredde
    fienderArray.push(fiende)
  }
   else if (spawnSjanse <= 6){    //60% sjanse for en liten fiende
    fiende.img = fiende1Img;
    fiende.width = fiende1Bredde
    fienderArray.push(fiende)
  }
}


/**
 * Sjekker for kollisjon mellom spilleren og fiender.
 * 
 */
function kollisjon() {
  for(let i = 0; i < fienderArray.length; i++){
    let fiende = fienderArray[i];
    if(aktivKarakter && fiende.x < 150 && fiende.x + fiende.width > 100 && y < fiende.y + fiende.height){
      // Kollisjon oppdaget, håndter skade eller spill-over her
      console.log("Kollisjon med fiende!");
      // Fjern fienden fra arrayet etter kollisjon
      fienderArray.splice(i, 1);
      i--; // Juster indeksen etter fjerning
    }
  }
};



//#endregion