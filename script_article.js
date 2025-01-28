let elementTitre = document.getElementById("titre");
let elementDate = document.getElementById("date");
let elementAccroche = document.getElementById("accroche");
let elementContenu = document.getElementById("contenu");

let tabArticles = new Array;

let urlParams = new URLSearchParams(window.location.search);
let numArticle = urlParams.get('num');
console.log("num article " + numArticle);

//Importation des données des fichiers .csv pour les calculettes et les tableaux historique de données
fetch("./contenus_articles.csv")   // fetch permet d'accéder à des ressources sur le réseau : dans ce cas accès au fichier.csv du dossier - fetch renvoie une promise
   .then(response => response.text())
   .then((response) => {
       ExtractData (response, tabArticles)

       ImporterArticles(numArticle);   
   })


   function ImporterArticles(numArticle) {
   //on recherche l'indice de la ligne correspondant au numéro de l'article
  
   let indiceLigne;
   let titre;
   let date;
   let accroche;
   let contenu;
    for (let i = 1; i < tabArticles.length; i++) {
        if (tabArticles[i][0] == numArticle) {
        indiceLigne = i;       
        }
    }

    console.log("verif indice ", indiceLigne);

    try {
        titre = tabArticles[indiceLigne][3];
        date = tabArticles[indiceLigne][1];
        accroche = tabArticles[indiceLigne][4];
        contenu = tabArticles[indiceLigne][5];

        elementTitre.innerText = titre;
        elementDate.innerText = "Mis à jour le " + date;
        elementAccroche.innerText = accroche;
        elementContenu.innerHTML = contenu;
    } catch (error) {
        console.error("erreur à l'importation de l'article")
    }
}   

function ExtractData (text, tabFinal) {
    let tabInit = text.split('\n');        /*tableau avec autant de ligne que de retour à la ligne*/
    let nbRows = tabInit.length;
    for (let i = 0; i < nbRows; i++) {
        tabFinal[i] = tabInit[i].split(';'); 
        
    }
}