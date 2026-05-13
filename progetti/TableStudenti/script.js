// Costruttore per l'oggetto Studente
class Studente {
    constructor(nome, cognome, eta) {
        this.nome = nome;
        this.cognome = cognome;
        this.eta = eta;
    }
}


let studenti = [];


function aggiungiStudente() {
    const inputNome = document.getElementById('nome');
    const inputCognome = document.getElementById('cognome');
    const inputEta = document.getElementById('eta');


    if (inputNome.value.trim() === "" || inputCognome.value.trim() === "" || inputEta.value === "") {
        alert("Attenzione: devi compilare tutti i campi!");
        return; 
    }


    const nuovoStudente = new Studente(
        inputNome.value.trim(), 
        inputCognome.value.trim(), 
        inputEta.value
    );

    studenti.push(nuovoStudente);

    mostraStudenti();


    inputNome.value = "";
    inputCognome.value = "";
    inputEta.value = "";
}

function mostraStudenti() {
    const tbody = document.getElementById("corpoTabella");
    tbody.innerHTML = ""; // Svuota corpo tabella

    studenti.forEach((studente, indice) => {
        const riga = document.createElement('tr');
        riga.innerHTML = `
            <td>${studente.nome}</td>
            <td>${studente.cognome}</td>
            <td>${studente.eta}</td>
            <td class="text-center">
                <button onclick="eliminaStudente(${indice})" class="btn btn-danger btn-sm">
                    Elimina
                </button>
            </td>
        `;
        tbody.appendChild(riga);
    });
}

function eliminaStudente(indice) {
    studenti.splice(indice, 1);
    mostraStudenti();
}