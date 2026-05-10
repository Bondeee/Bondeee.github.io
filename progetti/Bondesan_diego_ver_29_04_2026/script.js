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

let citta = ["Milano","Bergamo","Brescia","Como","Cremona","Lecco","Lodi","Mantova","Monza","Pavia","Sondrio","Varese"]
function riempiPartenzaDestinazione(){
    let s = "";
    for(let i = 0; i < citta.length; i++)
    {
        s+="<option> " + citta[i] + "</option>"
    }
    document.getElementById("start").innerHTML = s;
    document.getElementById("end").innerHTML = s;
}

let mesi = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"]
function riempiMese(){
    let s = "";
    for(let i = 0; i < mesi.length; i++)
    {
        s+="<option> " + mesi[i] + "</option>"
    }
    document.getElementById("mese").innerHTML = s;

}

function controlloP1(){
    let nome = document.getElementById("nome").value;
    let cognome = document.getElementById("cognome").value;

    //controlli per il nome
    if(nome.length === 0)
        {alert("inserire il nome"); return;}

    if(nome[0] < "A" || nome[0] > "Z")
        {alert("La prima lettera del nome deve essere maiuscola"); return;}
    
    for(let i = 1; i < nome.length; i++)
        if(nome[i] < "a" || nome[i] > "z")
            {alert("le lettere del nome non devono contenere caratteri speciali o numeri o lettere maiuscole"); return;}


    //controlli per il cognome
    if(cognome.length === 0)
        {alert("inserire il cognome"); return;}

    if(cognome[0] < "A" || cognome[0] > "Z")
        {alert("La prima lettera del cognome deve essere maiuscola"); return;}

    for(let i = 1; i < cognome.length; i++)
        if(cognome[i] <"a" || cognome[i] > "z")
            {alert("le lettere del cognome non devono contenere caratteri speciali o numeri o lettere maiuscole"); return;}
        
        setCookie("nome",nome,1);
        setCookie("cognome",cognome,1);

    window.location.href="selezioneCitta.html";
}

function controlliP2(){
    let start = document.getElementById("start").value;
    let end = document.getElementById("end").value;

    if(start === end)
        {alert("le città di partenza e di destinzaione devono essere diverse"); return;}

        window.location.href="selezioneData.html";
    
    setCookie("partenza",start,1)
    setCookie("destinazione",end,1)
}

function controlliP3(){
    let giorno = document.getElementById("giorno").value;
    let anno = document.getElementById("anno").value;
    let mese = document.getElementById("mese").value;

    if(giorno < 1)
        {alert("il giorno deve essere compreso tra 1 e n"); return;}

    if(mese === "Novembre" || mese === "Aprile" || mese === "Giugno" || mese === "Settembre" && giorno > 30)
        {alert("il mese di " + mese + " ha 30 giorni"); return;}
    else if(mese === "Febbraio" && giorno > 28)
        {alert("il mese di " + mese + " ha 28 giorni"); return;}
    else if(giorno > 31)
        {alert("il mese di " + mese + " ha 31 giorni"); return;}

    
    let giornoOggi = new Date().getDate();
    let meseOggi = new Date().getMonth() + 1;
    let annoOggi = new Date().getFullYear();

    if(anno < annoOggi)
        {alert("devi inserire un anno che non sia nel passato"); return;}

    let mesi = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"]
    
    let nmesi = ["1","2","3","4","5","6","7","8","9","10","11","12"]

    // let nMese = 0;
    // for(let i = 0; i < mesi.length; i++)
    // {
    //     if(mese === mesi[i])
    //     {nMese = nmesi[i]; break;}
    // }

    // let datasel = parseInt(gionro) + nMese + parseInt(anno);
    // let dataoggi = giornoOggi + meseOggi + annoOggi;

    if(datasel - dataOggi > 30)
        {alert("la prenotazione deve avvenire almeno prima di 30 giorni"); return;}

    setCookie("giorno", giorno, 1);
    setCookie("mese", mese, 1);
    setCookie("anno", anno, 1);

    window.location.href="riepilogo.html";
}

function Stilariepilogo(){
    let nome = getCookie("nome");
    let cognome = getCookie("cognome");
    let start = getCookie("partenza");
    let end = getCookie("destinazione");
    let giorno = getCookie("giorno");
    let anno = getCookie("anno");
    let mese = getCookie("mese");


    let s = "";

    s +=  "Nome: " + nome + "<br>"
        + "Cognome: " + cognome + "<br>"
        + "partenza: " + start + "<br>"
        + "Destinazione: " + end + "<br>"
        + "Giorno: " + giorno + "<br>"
        + "Anno: " + anno + "<br>"
        + "Mese: " + mese + "<br>"

    document.getElementById("riepilogo").innerHTML = s;

}

function Fine(){
    window.location.href="validazioni.html";
}