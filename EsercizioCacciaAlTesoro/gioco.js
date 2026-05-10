// ============================================================
//   CACCIA AL TESORO DIGITALE — gioco.js (VERSIONE COMPLETA)
// ============================================================

// --- MOTORE DELLO STATO (MODULO 1) ---
// inizializzazione delle VARIABILI DI CONTROLLO per la sessione
let nomeGiocatore = '';
let punteggio = 0;
let vite = 3;
let partitaTerminata = false;
let indizioCorrenteIdx = 0;
let modalitaNoGps = false; // interruttore per il SISTEMA DI EMERGENZA senza sensori

// --- ARCHITETTURA DATI (MODULO 2) ---
// modello per la CREAZIONE DEGLI OGGETTI indizio
class Indizio {
  constructor(testo, soluzione, punti, coordinate) {
    this.testo = testo;
    this.soluzione = soluzione;
    this.punti = punti;
    this.coordinate = coordinate; // PUNTO CARTOGRAFICO { lat, lon }
    this.risolto = false;
  }

  // esegue la COMPARAZIONE STRINGHE tra input e soluzione
  verifica(risposta) {
    return risposta.trim().toUpperCase() === this.soluzione.toUpperCase();
  }
}

// --- ARCHIVIO CONTENUTI (MODULO 2) ---
// elenco strutturato dei TRAGUARDI DA RAGGIUNGERE
const indizi = [
  new Indizio('Cerca sotto la quercia nel parco.', 'QUERCIA', 50, { lat: 45.4654, lon: 9.1859 }),
  new Indizio('Vicino alla vecchia fontana.', 'FONTANA', 100, { lat: 45.4700, lon: 9.1900 }),
  new Indizio('Dove il muro diventa rosso.', 'MURO', 150, { lat: 45.4750, lon: 9.1950 })
];

// --- FUNZIONI DI UTILITÀ (MODULI 1 & 2) ---

// genera una CRONOLOGIA EVENTI visibile a schermo
const logEvento = (messaggio) => {
  const logDiv = document.querySelector('#log-eventi');
  const riga = document.createElement('p');
  riga.textContent = `[${new Date().toLocaleTimeString()}] ${messaggio}`;
  logDiv.prepend(riga); // posizionamento in ordine CRONOLOGICO INVERSO
};

// calcolo matematico per l' INCREMENTO DEL SCORE
const guadagnaPunti = (puntiAttuali, daAggiungere, moltiplicatore = 1) => {
  return puntiAttuali + (daAggiungere * moltiplicatore);
};

// analizza i RESIDUI DI PUNTEGGIO non ancora riscattati
const calcolaPuntiDisponibili = () => {
  return indizi
    .filter(i => !i.risolto)
    .reduce((acc, curr) => acc + curr.punti, 0);
};

// applicazione della TRIGONOMETRIA SFERICA per trovare la distanza
const calcolaDistanza = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // COSTANTE FISICA del raggio terrestre
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // valore finale espresso in UNITÀ METRICHE
};

// --- GESTIONE ASINCRONA (MODULO 3) ---

// mette in PAUSA L'ESECUZIONE per un tempo definito
const attendi = (ms) => new Promise(res => setTimeout(res, ms));

// richiede l' ACCESSO ALLA GEOLOCALIZZAZIONE del dispositivo
const ottieniPosizione = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) reject("HARDWARE GPS MANCANTE");
    navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
  });
};

// procedura di VALIDAZIONE POSIZIONALE dell'utente
const gestisciSonoQui = async () => {
  if (partitaTerminata) return;

  const btn = document.querySelector('#btn-sono-qui');
  const feedback = document.querySelector('#feedback');
  btn.disabled = true; // prevenzione di CLICK MULTIPLI simultanei
  feedback.textContent = "ACQUISIZIONE COORDINATE in corso...";

  try {
    if (modalitaNoGps) throw new Error("SENSORE DISATTIVATO");

    const pos = await ottieniPosizione();
    const indizio = indizi[indizioCorrenteIdx];
    const dist = calcolaDistanza(pos.coords.latitude, pos.coords.longitude, indizio.coordinate.lat, indizio.coordinate.lon);

    document.querySelector('#testo-distanza').textContent = `GAP SPAZIALE: ${Math.round(dist)} metri`;

    // verifica se l'utente si trova nel RAGGIO D'AZIONE
    if (dist < 50) { 
      logEvento("TARGET INDIVIDUATO con successo!");
      document.querySelector('#area-risposta').classList.remove('nascosto');
      feedback.textContent = "OBIETTIVO RAGGIUNTO! sblocca l'enigma.";
    } else {
      feedback.textContent = "SEI FUORI PORTATA!";
    }
  } catch (error) {
    console.warn("ATTIVAZIONE PROTOCOLLO DI RISERVA:", error);
    if (!modalitaNoGps) {
      modalitaNoGps = true;
      logEvento("ERRORE SENSORI. abilitata immissione forzata.");
    }
    feedback.textContent = "MODALITÀ MANUALE: inserisci la chiave.";
    document.querySelector('#area-risposta').classList.remove('nascosto');
    document.querySelector('#testo-distanza').textContent = "DISTANZA NON CALCOLABILE";
  } finally {
    btn.disabled = false;
  }
};

// --- AGGIORNAMENTO DINAMICO (UI) ---

// sincronizza i DATI DI GIOCO con gli elementi del dom
const aggiornaInterfaccia = () => {
  document.querySelector('#nome-giocatore').textContent = nomeGiocatore;
  document.querySelector('#punteggio').textContent = punteggio;
  document.querySelector('#vite').textContent = vite;
};

// stampa a video le ISTRUZIONI DELL'ENIGMA corrente
const mostraIndizio = () => {
  const indizio = indizi[indizioCorrenteIdx];
  if (indizio) {
    document.querySelector('#testo-indizio').textContent = indizio.testo;
    document.querySelector('#area-risposta').classList.add('nascosto');
    document.querySelector('#input-risposta').value = '';
    logEvento(`MISSIONE CORRENTE: ${indizio.testo.substring(0, 15)}...`);
  }
};

// analizza il TESTO INSERITO nel campo di input
const gestisciRisposta = () => {
  const input = document.querySelector('#input-risposta');
  const risposta = input.value;
  const indizio = indizi[indizioCorrenteIdx];

  if (indizio.verifica(risposta)) {
    indizio.risolto = true;
    punteggio = guadagnaPunti(punteggio, indizio.punti);
    logEvento(`CONFERMA POSITIVA! bonus di ${indizio.punti} pt.`);
    
    indizioCorrenteIdx++;
    // verifica se la LISTA OBIETTIVI è completata
    if (indizioCorrenteIdx < indizi.length) {
      aggiornaInterfaccia();
      mostraIndizio();
    } else {
      terminaPartita("CAMPIONE! hai recuperato tutti i dati.");
    }
  } else {
    vite--;
    logEvento(`ERRORE DI CODIFICA! integrità al: ${vite}`);
    if (vite <= 0) {
      terminaPartita("SISTEMA CRASHATO: vite esaurite!");
    }
  }
  aggiornaInterfaccia();
};

// esegue il DEPLOY DELLA SCHERMATA FINALE
const terminaPartita = (messaggio) => {
  partitaTerminata = true;
  document.querySelector('#sezione-gioco').classList.add('nascosto');
  document.querySelector('#sezione-fine').classList.remove('nascosto');
  document.querySelector('#messaggio-fine').textContent = messaggio;
  document.querySelector('#punteggio-finale').textContent = punteggio;
  
  const disponibili = calcolaPuntiDisponibili();
  logEvento(`LOGOUT. potenziale non espresso: ${disponibili}`);
};

// --- ASCOLTO EVENTI (MODULO 3) ---

// trigger per l' INIZIO DEL MATCH
document.querySelector('#btn-inizia').addEventListener('click', () => {
  const inputNome = document.querySelector('#input-nome');
  nomeGiocatore = inputNome.value.trim() || 'UTENTE_ANONIMO';
  
  document.querySelector('#sezione-avvio').classList.add('nascosto');
  document.querySelector('#sezione-gioco').classList.remove('nascosto');
  
  aggiornaInterfaccia();
  mostraIndizio();
  logEvento("SISTEMA ONLINE.");
});

document.querySelector('#btn-sono-qui').addEventListener('click', gestisciSonoQui);
document.querySelector('#btn-invia').addEventListener('click', gestisciRisposta);

// esegue il RESET INTEGRALE dell'applicazione
document.querySelector('#btn-ricomincia').addEventListener('click', () => {
  location.reload(); 
});