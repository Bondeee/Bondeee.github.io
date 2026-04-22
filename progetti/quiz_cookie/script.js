let risposte2 = ["1","2","4","256"];
function riempiR2() {
    let html = "";
    for (let i = 0; i <= 3; i++)
        html += "<option value=" + risposte2[i] + ">" + risposte2[i] + "</option>";
    r2.innerHTML = html;
}
window.onload = function () { riempiR2() }

function setCookie(nome,valore,giorni){
    let data = new Date();
    data.setTime(data.getTime() + (giorni * 24 * 60 * 60 * 1000));
    document.cookie = nome + 
                        "=" + encodeURIComponent(valore) +
                        ";expires=" + data.toUTCString() +
                        ";path=/";
}

function getCookie(nome){
    let cookies = document.cookie.split(";");
    for(let i = 0; i < cookies.length; i++){
        let c = cookies[i].trim();
        if(c.startsWith(nome + "="))
                return decodeURIComponent(c.substring(nome.length + 1));
    }
    return;
}


function salvaDati(risposta){
    switch(risposta)
    {
        case 1:
            let r1 = document.getElementById("r1").value;
            setCookie("risp1", r1, 1);
            window.location.href = "pagina2.html";
        break;

        case 2:
            let r2 = document.getElementById("r2").value;
            setCookie("risp2", r2, 1);
            window.location.href = "pagina3.html";
        break;

        case 3:
            let opzioni = document.getElementsByName("tipoLibrerie");
            for (let i = 0; i < opzioni.length; i++)
                if (opzioni[i].checked) 
                    r3 = opzioni[i].value;

            setCookie("risp3", r3, 1);
            window.location.href = "pagina4.html";
        break;

        case 4:
            let r4 = "";
            let rispDate = [];
            rispDate[0] = document.getElementById("void").checked;
            rispDate[1] = document.getElementById("integer").checked;
            rispDate[2] = document.getElementById("char").checked;

            if(rispDate[0])
                r4 += "void_";
            if(rispDate[1])
                r4 += "integer_";
            if(rispDate[2])
                r4 += "char_";

            setCookie("risp4", r4, 1);
            window.location.href = "pagina5.html";
        break;

        case 5:
            let r5 = document.getElementById("r5").value;
            setCookie("risp5", r5, 1);
            window.location.href = "riepilogo.html";
        break;
    }
}

let rispCorrette = ["SQL", "2", "Dinamiche","void_char_", "Byte"];

function caricaRiepilogo(){
    let risp1 = getCookie("risp1");
    let risp2 = getCookie("risp2");
    let risp3 = getCookie("risp3");
    let risp4 = getCookie("risp4");
    let risp5 = getCookie("risp5");

    let s = "";
    let punti = 0;

    if(risp1 == rispCorrette[0])
        {s += "Risposta 1: risposta corretta"; punti++;}
    else 
        s += "Risposta 1: risposta sbagliata(risposta corretta: SQL)";
    s += "<br>";

    if(risp2 == rispCorrette[1])
        {s += "Risposta 2: risposta corretta"; punti++;}
    else 
        s += "Risposta 2: risposta sbagliata(risposta corretta: 2)";
    s += "<br>";

    if(risp3 == rispCorrette[2])
        {s += "Risposta 3: risposta corretta"; punti++;}
    else 
        s += "Risposta 3: risposta sbagliata(risposta corretta: Dinamiche)";
    s += "<br>";
    
    if(risp4 == rispCorrette[3])
        {s += "Risposta 4: risposta corretta"; punti++;}
    else 
        s += "Risposta 4: risposta sbagliata(risposta corretta: void char)";
    s += "<br>";

    if(risp5 == rispCorrette[4])
        {s += "Risposta 5: risposta corretta" ; punti++;}
    else 
        s += "Risposta 5: risposta sbagliata(risposta corretta: Byte)";
    s += "<br>";
    s += "<br>";
    s += "<br>";

    s += "Totale risposte corrette: " + punti + "/5";

    document.getElementById("riepilogo").innerHTML = s;
}

