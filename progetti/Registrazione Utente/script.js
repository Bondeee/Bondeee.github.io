let anni = document.getElementById("anni");
let termini = document.getElementById("Termini");
let annoCorrente = new Date().getFullYear();

function riempiAnni() {
    let html = "";
    for (let i = 1900; i <= annoCorrente; i++)
        html += "<option value=" + i + ">" + i + "</option>";
    anni.innerHTML = html;
}

window.onload = function () { riempiAnni() }

function CompletamentoRegistrazione() {

    let nome = document.getElementById("nome").value;
    let cognome = document.getElementById("cognome").value;
    let cf = document.getElementById("CF").value;

    if (nome === "" || cognome === "" || cf === "") { alert("devi inserire il nome il cognome \n e il codice fiscale prima della registrazione"); return; }

    if (termini.checked === false) { alert("Devi prima accettare i termini di servizio"); return; }

    let check = true;
    if (cf > 16) {
        for (let i = 0; i < cf.length; i++) {
            if (i < 5) {
                if (cf[i] >= 'z' && cf[i] <= 'a' || cf[i] > 'Z' && cf[i] <= 'A')
                    check = false;
            }

        }
    }

    let message = "";
    message += "Gentile sig./sig.ra " + cognome + " " + nome + " \n la ringraziamo per la registrazione";

    alert(message);
}