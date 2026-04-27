function calcolaTotale(){
    let tot = 0;
    q1 = document.getElementById("qta1").value;
    c1 = document.getElementById("costo1").value;

    let t = q1 * c1;
    tot += t;
    tot1.innerHTML = t;

    q2 = document.getElementById("qta2").value;
    c2 = document.getElementById("costo2").value;

    t = q2 * c2;
    tot += t;
    tot2.innerHTML = t;

    q3 = document.getElementById("qta3").value;
    c3 = document.getElementById("costo3").value;

    t = q2 * c3;
    tot += t;
    tot3.innerHTML = t.toString();

    q4 = document.getElementById("qta4").value;
    c4 = document.getElementById("costo4").value;

    t = q4 * c4;
    tot += t;
    tot4.innerHTML = t;

    totale.innerHTML = tot;
}