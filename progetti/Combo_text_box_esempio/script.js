let menu = document.getElementById("menu");
let testo = document.getElementById("testo");
let annoCorrente = new Date().getFullYear();

function stampaSelezionato(){
    let selezionato = menu.value;
    console.log(selezionato);
    let testo = menu.options[menu.selectedIndex].text;
    console.log(testo);
}

function riempiConAnni(){
    let html = "";
    for(let i = 1900; i <= annoCorrente; i++)
        html +="<option value=" + i + ">" + i + "</option>";
    menu.innerHTML = html;
}

let txt1 = document.getElementById("textBox1")

function stampaTextBox(){
    console.log(txt1.value);
    let html = "";
        html +="<label> " + txt1.value +"</label>"
    testo.innerHTML = html;

}