function inizializzaParagrafi(){
    /* Lista di titoli - Prende tutti elementi con classe titolo*/
    let titoli = document.querySelectorAll(".titolo");

    for(let i = 0;i < titoli.length;i++){
        /* Attribuisco ad ogni titolo un evento */
        titoli[i].addEventListener("click",gestisciClickTitolo);
    }
}

function gestisciClickTitolo(){
    /* Quello che si trova dopo il titolo */
    let contenuto = this.nextElementSibling;

    if(contenuto.classList.contains("visible"))
        /* Torno al contenuto base (nascosto) */
        contenuto.classList.remove("visible");
    else{
        let tutti_contenuti = document.querySelectorAll(".contenuto");

        for(let i = 0;i < tutti_contenuti.length;i++){
            tutti_contenuti[i].classList.remove("visible");
        }

        contenuto.classList.add("visible")
    }
}

/* Chiamata della funzione dopo che la pagina si è caricata completamente */
document.addEventListener("DOMContentLoaded",inizializzaParagrafi);