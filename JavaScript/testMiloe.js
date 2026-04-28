let navn = "detteErEnTest";
let obj = {bilde : "sti"};

kobleBildeTilDiv(navn,obj)



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
print(bodyEl)