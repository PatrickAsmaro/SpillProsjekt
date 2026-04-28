//#region Globale Variabler
let karakterer = [
  {karakter : karakter1, evne : evne1, liv : 3, bilde : bildeSti},
  {karakter : karakter2, evne : evne2, liv : 3, bilde : bildeSti},
  {karakter : karakter3, evne : evne3, liv : 3, bilde : bildeSti}
]

//#endregion

//#region Elementer
let bodyEl = document.querySelector("body");
let startKnappEl = document.getElementById("startKnapp");
let startMenyEl = document.getElementById("startSide");

//#endregion


//#region DOM
startKnappEl.addEventListener("click",startSpill);


//#endregion


//#region Funksjoner
function startSpill(){    //Funksjon som starter spillet. Ingen parametre
  startMeny.style.display = "none";
};

/**
 * denne funksjonen skal feste et karakter-objekt til en HTML-div element.
 * @param {string} navnPaaKarakter navnet skal settes som ${navn}Div og id-en til den spesifikke div-en. 
 * @param {object} obj #objektet til karakteren som skal linkes til DIV-en.
 */
function kobleBildeTilDiv(navnPaaKarakter, obj) {
    let div = document.createElement("div");
    div.id = navnPaaKarakter;
    div.style.display = "none";
    div.img = obj.bilde;
    bodyEl.appendChild(div);
};

function oppdaterSpill() {

};
//#endregion