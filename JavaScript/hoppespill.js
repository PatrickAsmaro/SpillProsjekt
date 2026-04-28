//#region Globale Variabler
let karakter1 ={
  bildet1 : "bildetSti1",
  evne1 : "evne",
  x: 0,
  y: 0,
};

//#endregion

//#region Elementer
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
 * denne funksjonen skal feste en karakter til en html DIV
 * @param {object} obj #objektet til karakteren som skal linkes til DIV-en
 * @param {HTMLElement} divisjon# et HTML-div element man skal feste objektet til 
 */
function lagKarakter(obj,divisjon) {

};
//#endregion
