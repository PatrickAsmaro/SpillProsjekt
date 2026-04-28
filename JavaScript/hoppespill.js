//#region Globale Variabler

//#endregion

//#region Elementer
let startKnapp = document.getElementById("startKnapp");
let startMeny = document.getElementById("startSide");

//#endregion


//#region DOM
startKnapp.addEventListener("click",startSpill);

//#endregion


//#region Funksjoner
function startSpill(){    //Funksjon som starter spillet. Ingen parametre
  startMeny.style.display = "none"
}


//#endregion
