// Promesse d'appel //

makeRequest("GET", "http://localhost:3000/api/teddies")
     .then(
          function (reponse) {
               let teddies = JSON.parse(reponse);

               // Sélection du model article //
               let article = document.querySelector('#model');

               // Boucle qui créé un clone de 'article' puis injecte les infos des articles //
               for (let teddie of teddies) {

                    //Création du clone d'article
                    let articleClone = article.cloneNode(true);
                    articleClone.removeAttribute('id');
                    document.querySelector('.bloc').appendChild(articleClone);

                    // Selectionne les balises de article pour injecter les infos des articles //
                    articleClone.children[0].querySelector('.peluche').src = teddie.imageUrl;
                    articleClone.children[0].querySelector('.h2-model').textContent = teddie.name;
                    articleClone.children[0].querySelector('.p-model').textContent = teddie.description;

                    // Utilise l'id de l'article pour créer une URL qui affichera le produit dans la page produit //
                    articleClone.children[0].querySelector('.href-model').href = "Page-produit.html?id=" + teddie._id;
               };
               effetFondu()
          }
     );