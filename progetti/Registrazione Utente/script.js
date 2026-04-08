let anni = document.getElementById("anni");
let nome = document.getElementById("nome");
let cognome = document.getElementById("cognome");
let cf = document.getElementById("CF").value;
let termini = document.getElementById("Termini");
let annoCorrente = new Date().getFullYear();

function riempiAnni() 
{
    let html = "";
    for(let i = 1900; i <= annoCorrente; i++)
        html +="<option value=" + i + ">" + i + "</option>";
    anni.innerHTML = html;
}

window.onload = function() { riempiAnni() }

function CompletamentoRegistrazione(){
    if(nome.value == "" || cognome.value == "" || cf == "")
    { alert("devi inserire il nome il cognome \n e il codice fiscale prima della registrazione"); return;}
    
    if(termini.checked == false) { alert("Devi prima accettare i termini di servizio"); return; }

    let check = true;
    if(cf > 16 )
    {
        for(let i = 0; i < cf.length; i++)
        {
            if(i < 5 )
            {
                if(cf[i] >= 'z' && cf[i] <= 'a' || cf[i] > 'Z' && cf[i] <= 'A')
                    check = false;
            }

        }
    }

    let message= "";
    message +="Gentile sig./sig.ra " + cognome.value + " " + nome.value + " \n la ringraziamo per la registrazione";

    alert(message);
}