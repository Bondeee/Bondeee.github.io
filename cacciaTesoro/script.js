console.log("=== CACCIA AL TESORO ===")
console.log("Il gioco sta partendo...")
console.log("Preparati!")

// Dati dell'indizio corrente
const codiceCorretto = "PONTE42";
const puntiPerSblocco = 50;

// Simuliamo l'input del giocatore (per ora è fisso)
const inputGiocatore = "PONTE42";
let punteggio = 80;

// Logica di verifica
if(inputGiocatore === codiceCorretto && punteggio >= puntiPerSblocco) {
  console.log("✅ Codice corretto! Indizio sbloccato.")
  punteggio+= 30;  // += identico a C#
  console.log(`Nuovo punteggio: ${punteggio}`)
} else if(inputGiocatore !== codiceCorretto) {
  console.log("❌ Codice errato. Riprova!")
} else {
  console.log("⚠️ Codice giusto ma punti insufficienti.")
}

// Senza destructuring — verboso
// const testo = indizio.testo;
// const punti = indizio.punti;
// const risolto = indizio.risolto;
 
// Con destructuring — conciso
const { testo, punti, risolto } = indizio;
console.log(testo, punti, risolto)
 
// Destructuring annidato: estrarre lat e lon dall'oggetto coordinate
const { coordinate: { lat, lon } } = indizio;
console.log(`Lat: ${lat} — Lon: ${lon}`)


const indizioBonus = {
    id: 4,
    testo: "Bonus: trova il murale nascosto",
    coordinate: { lat: 45.4670, lon: 9.1890 },
    soluzione: "MURALE99",
    punti: 100,
    risolto: false
  }
   
  indizi.push(indizioBonus)
  console.log(`Totale indizi: ${indizi.length}`)
  // → Totale indizi: 4
  
  const riepilogoPartita = (indizi) => {
    const risolti = indizi.filter(i => i.risolto)
    const daFare = indizi.filter(i => !i.risolto)
    const punteggio = risolti.reduce((acc, i) => acc + i.punti, 0)
   
    console.log("═══ STATO DELLA PARTITA ═══")
    console.log(`Indizi totali  : ${indizi.length}`)
    console.log(`Risolti        : ${risolti.length}`)
    console.log(`Rimanenti      : ${daFare.length}`)
    console.log(`Punteggio      : ${punteggio} pt`)
   
    if(daFare.length > 0) {
      console.log("Prossimo indizio:")
      console.log(`  ${daFare[0].testo}`)
    } else {
      console.log("🏆 Hai completato la caccia al tesoro!")
    }
  }
   
  riepilogoPartita(indizi)