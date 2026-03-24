function generaTabellaPitagorica(){

    let s = "<table border ='1'>"; // tag di apertura

    
    for (let i = 1; i <= 10; i++) { // ciclo per le righe

        s += "<tr>"; // tag di apertura della riga 
        
        for (let j = 1; j <= 10; j++) { // ciclo per le colonne

            let n = i * j; // moltiplica la colonna per la riga

            if(n % 2 != 0)
                s += "<td class ='dispari'>" + n + "</td>"; // inserimento del risultato nella tabella n dispari
            else
                s += "<td>" + n + "</td>"; // inserimento del risultato nella tabella n pari
        }

        s += "</tr>"; //tag di chiusura della riga 
    }
    
    s += "</table>"; // tag di chiusura
    return s;
}

const elenco = document.getElementById("table"); //creazione della costante
elenco.innerHTML = generaTabellaPitagorica(); // richiama la funzione
