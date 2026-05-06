function calcolaTotale() {
    let tot = 0;

    // --- Prodotto 1 ---
    // parseInt converte la stringa in numero. || 0 serve se il campo è vuoto.
    let q1 = parseInt(document.getElementById("qta1").value) || 0;
    let c1 = parseInt(document.getElementById("costo1").value) || 0;
    let t1 = q1 * c1;
    document.getElementById("tot1").innerHTML = t1;
    tot += t1;

    // --- Prodotto 2 ---
    let q2 = parseInt(document.getElementById("qta2").value) || 0;
    let c2 = parseInt(document.getElementById("costo2").value) || 0;
    let t2 = q2 * c2;
    document.getElementById("tot2").innerHTML = t2;
    tot += t2;

    // --- Prodotto 3 ---
    let q3 = parseInt(document.getElementById("qta3").value) || 0;
    let c3 = parseInt(document.getElementById("costo3").value) || 0;
    let t3 = q3 * c3;
    document.getElementById("tot3").innerHTML = t3;
    tot += t3;

    // --- Prodotto 4 ---
    let q4 = parseInt(document.getElementById("qta4").value) || 0;
    let c4 = parseInt(document.getElementById("costo4").value) || 0;
    let t4 = q4 * c4;
    document.getElementById("tot4").innerHTML = t4;
    tot += t4;

    // --- Totale Finale ---
    document.getElementById("totale").innerHTML = tot;
}