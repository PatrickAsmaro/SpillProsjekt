//#region Globale Variabler
let karakter1 ={
  bildet : "bildetSti1",
  evne : "evne",
  liv : 3,
  x: 0,
  y: 0,
};

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
 * @param {string} navnPaaKarakter navnet skal settes som ${navn}Div og id. 
 * @param {object} obj #objektet til karakteren som skal linkes til DIV-en.
 */
function lagKarakter(navnPaaKarakter, obj, divisjon) {
    //lage en div og feste bildet av karakteren til div-en
    let div = document.createElement("div");
    div.id = navnPaaKarakter;
    div.style.display = "none";
    div.img = obj.bilde;
    bodyEl.appendChild(div);



}
//#endregion