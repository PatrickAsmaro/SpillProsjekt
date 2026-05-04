//#region Globale Variabler
let karakterer = [
  {navn : "test", evne : evne1, liv : 3, bilde : "../Bilder/testKarakter.jpg"},
  {navn : "karakter2", evne : evne2, liv : 3, bilde : "bildeSti"},
  {navn : "karakter3", evne : evne3, liv : 3, bilde : "bildeSti"}
]

//#endregion

//#region Elementer
let bodyEl = document.querySelector("body");
let startKnappEl = document.querySelector("#startKnapp");
let startMenyEl = document.querySelector("#startSide");

//#endregion


//#region DOM
startKnappEl.addEventListener("click",startSpill);


//#endregion


//#region Funksjoner
/**
 *Funksjon som starter spillet. Ingen parametre
 */
function startSpill(){
  startMenyEl.style.display = "none";
  kobleBildeTilDiv(karakterer[0]);
  console.log("du trykket knappen");
};

/**
 * denne funksjonen skal feste et karakter-objekt til et HTML-div element.
 * @param {object} obj #objektet til karakteren som skal linkes til DIV-en.
 */
function kobleBildeTilDiv(obj) {
    let div = document.createElement("div");
    div.id = obj.navn;
    div.style.display = "none";
    div.img = obj.bilde;
    bodyEl.appendChild(div);
};

function oppdaterSpill() {

};
//#endregion