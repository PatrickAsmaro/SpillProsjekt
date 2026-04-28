//#region Globale Variabler
let karakter1 ={
  bildet1 : "bildetSti1",
  evne1 : "evne"
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


//#endregion
