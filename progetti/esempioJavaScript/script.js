/*funzione*/
function generaElenco(){
    /*variabile interna*/
    let s = "";
    //assegna il tag alla stringa
    s + "<ul>";
    //crea la lista di item 
    for(let i = 0; i < 3; i++)
        s +="<li> Item numero: " + i + "</li>";
    s += "</ul>";
    //ritorna s
    return s;
}

const elenco = document.getElementById("prova"); /*costante che non cambierà*/
elenco.innerHTML = generaElenco();/*richiama la funzione*/