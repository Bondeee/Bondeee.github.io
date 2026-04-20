let mes = document.getElementById("mese");



let punti = 0;

let mesi = ["GEN","FEB","MAR","APR","MAG","GIU","LUG","AGO","SET","OTT","NOV","DIC"];

function riempiMesi() {
    let html = "";
    for (let i = 0; i <= 11; i++)
        html += "<option value=" + mesi[i] + ">" + mesi[i] + "</option>";
    mes.innerHTML = html;
}

window.onload = function () { riempiMesi() }

let risposte2 = ["1","2","4","256"];
function riempiR2() {
    let html = "";
    for (let i = 0; i <= 3; i++)
        html += "<option value=" + risposte2[i] + ">" + risposte2[i] + "</option>";
    r2.innerHTML = html;
}
window.onload = function () { riempiR2() }

let rispCorrette = ["SQL", "2", "Dinamiche", true, false, true, "Byte"];
let rispDate = [];

function ElaboraRisposte() {
    punti = 0;

    //prima risposta
    rispDate[0] = document.getElementById("r1").value;

    //seconda risposta
    rispDate[1] = document.getElementById("r2").value;

    //terza risposta
    let opzioni = document.getElementsByName("tipoLibrerie");
    for (let i = 0; i < opzioni.length; i++)
        if (opzioni[i].checked) 
            rispDate[2] = opzioni[i].value;
    
    //quarta risposta
    rispDate[3] = document.getElementById("void").checked;
    rispDate[4] = document.getElementById("integer").checked;
    rispDate[5] = document.getElementById("char").checked;

    //quinta risposta
    rispDate[6] = document.getElementById("r5").value;

    // Confronto
    let indiciSingoli = [0, 1, 2, 6]; 
    for (let i of indiciSingoli) 
        if (rispDate[i] === rispCorrette[i])
            punti++;
    

    if (rispDate[3] === rispCorrette[3] && 
        rispDate[4] === rispCorrette[4] && 
        rispDate[5] === rispCorrette[5]) {
        punti++; 
    }

    
}
    