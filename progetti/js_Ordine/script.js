function calcolaTotale() {
    let totG = 0;
    for (let i = 1; i <= 4; i++) {
        let inputField = document.getElementById("qta" + i);
        let q = parseInt(inputField.value) || 0;
        
        if (q < 0 || q > 20) {
            alert("Errore Articolo " + i + ": inserire un valore tra 0 e 20.");
            inputField.focus();
            return null;
        }

        let c = parseInt(document.getElementById("costo" + i).innerText);
        let t = q * c;
        document.getElementById("tot" + i).innerHTML = t;
        totG += t;
    }
    document.getElementById("totale").innerHTML = totG;
    return totG;
}

function resetForm() {
    if (confirm("Ripristinare i valori di default?")) {
        for (let i = 1; i <= 4; i++) {
            document.getElementById("qta" + i).value = "";
            document.getElementById("tot" + i).innerHTML = "0";
        }
        document.getElementById("totale").innerHTML = "0";
        document.getElementById("mail").value = "";
        document.getElementById("pagamento").selectedIndex = 0;
        document.getElementById("notifSi").checked = true;
    }
}

function inviaOrdine() {
    let totaleEffettivo = calcolaTotale();
    if (totaleEffettivo === null) return;

    let email = document.getElementById("mail").value;
    if (!email.includes("@")) {
        alert("Errore: la mail deve contenere il carattere @");
        return;
    }
    if (email.charAt(0) >= '0' && email.charAt(0) <= '9') {
        alert("Errore: la mail non può iniziare con una cifra");
        return;
    }

    let pagamento = document.getElementById("pagamento").value;
    alert("Grazie per il suo ordine di " + totaleEffettivo + "€, il pagamento avverrà tramite " + pagamento + ". Riceverà notifiche all’indirizzo " + email + ".");
}