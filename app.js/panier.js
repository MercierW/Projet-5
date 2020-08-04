let table = document.querySelector('.tableau');

let data = {
    contact: {
        lastName: '',
        firstName: '',
        email: '',
        address: '',
        city: '',
    },

    products: [

    ],

    qt: [

    ]
};

if (localStorage.getItem('Articles') === null) {
    document.getElementsByClassName('total-tittle')[0].innerText = '';
    document.getElementsByClassName('total-price')[0].innerText = 'Panier vide...';

} else {
    let arr = JSON.parse(localStorage.getItem("Articles"));

    if (arr.length === 0) {
        localStorage.removeItem('Articles');
        document.getElementsByClassName('total-tittle')[0].innerText = '';
        document.getElementsByClassName('total-price')[0].innerText = 'Panier vide...';
    } else {
        let arrArticles = JSON.parse(localStorage.getItem('Articles'));

        for (let i = 0; i < arrArticles.length; i++) {
            // Clone le tableau model //
            let tableClone = table.cloneNode(true);
            // Ajoute la class 'cart-quantity' à l'input de quantité //
            let inputValue = tableClone.children[1].querySelector('.TR').querySelector('.th-input').querySelector('.inputPrix');
            inputValue.classList.add('cart-quantity')

            makeRequest(
                "GET",
                "http://localhost:3000/api/teddies/" + arrArticles[i].id
            ).then(function (reponse) {
                const teddie = JSON.parse(reponse);

                // stock le prix de l'article et le divise par 100 //
                let teddiePrice = teddie.price / 100;

                // Ajoute la class 'cart-item' au clone du tableau d'article //
                tableClone.classList.add("cart-item");
                tableClone.id = teddie.name;
                document.querySelector(".box__table").appendChild(tableClone);

                // Sélectionne les balises html du tableau pour leur injecter les infos de l'article. //
                tableClone.children[0]
                    .querySelector(".trSize")
                    .querySelector(".th-name").textContent = "Peluche" + " " + teddie.name;
                tableClone.children[1]
                    .querySelector(".TR")
                    .querySelector(".TH").children[0].src = teddie.imageUrl;
                tableClone.children[1]
                    .querySelector(".TR")
                    .querySelector(".tr")
                    .classList.add("cart-price");
                tableClone.children[1]
                    .querySelector(".TR")
                    .querySelector(".tr").textContent = teddiePrice + "€";

                totalUpdate();
            });

            // Bouton qui supprime l'article //
            let removeCartBtn = tableClone.querySelector('.btn-danger');
            removeCartBtn.addEventListener('click', function (e) {
                let buttonClicked = e.target;
                buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();

                let array = JSON.parse(localStorage.getItem("Articles"));

                if (array.length === 1) {
                    localStorage.removeItem('Articles')
                } else {
                    const deleteArticle = (id) => {
                        array = array.filter((article) => article.id !== id);
                    };

                    deleteArticle(array[i].id)

                    localStorage.setItem("Articles", JSON.stringify(array));
                }

                totalUpdate();
            })

            // Sélectionne le bouton '+' et lui ajoute une fonction flèché qui augmente la valeur de l'input quantité au clic //
            tableClone.children[1].querySelector('.TR').querySelector('.th-input').querySelector('.BTNADD').addEventListener("click", () => {
                if (inputValue.value < 5) {
                    inputValue.value++
                    let array = JSON.parse(localStorage.getItem("Articles"));
                    array[i].qt = parseFloat(inputValue.value);
                    localStorage.setItem("Articles", JSON.stringify(array));
                };
                totalUpdate();
            });
            // Sélectionne le bouton '-' et lui ajoute une fonction flèché qui diminue la valeur de l'input quantité au clic //
            tableClone.children[1].querySelector('.TR').querySelector('.th-input').querySelector('.BTNREM').addEventListener("click", () => {
                if (inputValue.value > 1) {
                    inputValue.value--;
                    let array = JSON.parse(localStorage.getItem("Articles"));
                    array[i].qt = parseFloat(inputValue.value);
                    localStorage.setItem("Articles", JSON.stringify(array));
                };
                totalUpdate();
            });

            let Article = arrArticles[i];
            data.products.push(Article.id);
            data.qt.push(Article.id + ' ' + 'QT' + Article.qt);
        };

    };

};

console.log(data)


// Script POST //
let form = document.getElementById('Form');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (
      validName(form.nom) &&
      validPrenom(form.prenom) &&
      validEmail(form.email) &&
      validAdress(form.adresse) &&
      validCity(form.city)
    ) {
      // Information à envoyé au serveur sous forme d'objet //
      (data.contact = {
        lastName: document.getElementById("nom").value,
        firstName: document.getElementById("prenom").value,
        email: document.getElementById("email").value,
        address: document.getElementById("adresse").value,
        city: document.getElementById("city").value,
      }),
        // Fonction POST AJAX qui envoie les données du panier au serveur //
        postAjaxCall("http://localhost:3000/api/teddies/order", data).then(
          function (reponse) {
            localStorage.setItem("Reponse", reponse);
            document.location = "remerciement.html";
          }
        );
      localStorage.removeItem("Articles");
    }
});



// Fonction qui calcul le prix total //
function totalUpdate() {
    // Sélectionne l'élément html avec la classe 'cart-item' //
    let arraysClones = document.getElementsByClassName('cart-item');
    // Déclaration de la variable 'total' qui vaut 0 //
    let total = 0;
    for (let i = 0; i < arraysClones.length; i++) {
        // Cible tous les éléments arraysClones //
        let article = arraysClones[i];

        let priceElement = article.getElementsByClassName('cart-price')[0];
        let quantityElement = article.getElementsByClassName('cart-quantity')[0];
        // Variable du prix de l'article //
        let price = parseFloat(priceElement.innerText);
        // Quantité de l'article //
        let quantity = quantityElement.value;
        // Calcul du total //
        total = total + (price * quantity);
    };
    // Affiche le total //
    document.getElementsByClassName('total-price')[0].innerText = total + '€';
    document.getElementsByClassName('total-tittle')[0].innerText = 'Total';
    localStorage.setItem('Total', document.getElementsByClassName('total-price')[0].innerText)
    // Si le total vaut 0, affiche le message 'Panier vide...'
    if (total === 0) {
        document.getElementsByClassName('total-price')[0].innerText = 'Panier vide...';
        let totalTittle = document.getElementsByClassName('total-tittle')[0];
        totalTittle.innerText = "";
    };
};