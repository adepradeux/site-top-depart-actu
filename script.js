let conteneurArticleCards = document.getElementById("conteneur-article-cards");
let tabArticles = new Array;
//Importation des données des fichiers .csv pour les calculettes et les tableaux historique de données
fetch("./contenus_articles.csv")   // fetch permet d'accéder à des ressources sur le réseau : dans ce cas accès au fichier.csv du dossier - fetch renvoie une promise
   .then(response => response.text())
   .then((response) => {
       ExtractData (response, tabArticles)
       console.log(tabArticles.length);
       ImporterArticles();   
   })
   
   
   function ImporterArticles () {
       for (let i = 1; i < tabArticles.length; i++) {
           let dateArticle = tabArticles[i][1];
           let tag = tabArticles[i][2];
           let titre = tabArticles[i][3];
           let accroche = tabArticles[i][4];
                      
           //lien vers l'image de l'article
           let numArticle = tabArticles[i][0];
           let pathRoot = "images\\image_article_";
           pathRoot = pathRoot.concat('', numArticle, ".png");
           console.log(pathRoot);

           //création de l'élément card qui contient tag, titre, accroche, date et photo de l'article
           let newLien = document.createElement("a");
           newLien.href = "article.html?num=" + numArticle;
           newLien.className = "lien";
           conteneurArticleCards.appendChild(newLien);
          
           let newArticleCard = document.createElement("div");
           newArticleCard.className = "article-card";
           newLien.appendChild(newArticleCard);

           let newCardContenu = document.createElement("div");
           newCardContenu.className = "card-contenu";
          
           newArticleCard.appendChild(newCardContenu);
           
           //création des éléments du bloc gauche (tag, titre, accroche + bouton pour accéder à l'article)
           let newCardBlocGauche = document.createElement("div");
           newCardBlocGauche.className = "card-bloc-gauche";
           newCardContenu.appendChild(newCardBlocGauche);

           let newTagActu = document.createElement("div");
           newTagActu.className = "tag-actu";
           newTagActu.innerText = tag;
           newCardBlocGauche.appendChild(newTagActu);

           let newTitreActu = document.createElement("div");
           newTitreActu.className = "titre-actu";
           newTitreActu.innerText = titre;
           newCardBlocGauche.appendChild(newTitreActu);

           let newAccrocheActu = document.createElement("div");
           newAccrocheActu.className = "accroche-actu";
           newAccrocheActu.innerText = accroche;
           newCardBlocGauche.appendChild(newAccrocheActu);

           let newBouton = document.createElement("div");
           newBouton.className = "lien-contenu-global";
           newBouton.innerText = "Lire la suite";
           newCardBlocGauche.appendChild(newBouton);

           //création élements du bloc droit
           let newCardBlocDroit = document.createElement("div");
           newCardBlocDroit.className = "card-bloc-droit";
           newCardContenu.appendChild(newCardBlocDroit);

           let newImageBox = document.createElement("div");
           newImageBox.className = "img-actu";
           newCardBlocDroit.appendChild(newImageBox);
           let newImage = document.createElement("img");
           newImage.src = pathRoot;
           newImageBox.appendChild(newImage);

           let newDateActu = document.createElement("div");
           newDateActu.className = "date-actu";
           newDateActu.innerText = dateArticle;
           newCardBlocDroit.appendChild(newDateActu);

           
         
           }
    }
    
    function ExtractData (text, tabFinal) {
        let tabInit = text.split('\n');        /*tableau avec autant de ligne que de retour à la ligne*/
        let nbRows = tabInit.length;
        for (let i = 0; i < nbRows; i++) {
            tabFinal[i] = tabInit[i].split(';'); 
            
        }
    }
