// Utilise l'id de l'article pour faire un get avec une URL //
const urlParams = new URLSearchParams(window.location.search);
const teddieId = urlParams.get('id');

if (localStorage.getItem('Articles') === null) {
  let arr = [];
  localStorage.setItem('Articles', JSON.stringify(arr));
};
  
// Promesse GET avec l'id de l'article //
makeRequest("GET", "http://localhost:3000/api/teddies/" + teddieId)
  .then(
    function (response) {
      const teddieJSON = JSON.parse(response);

      // Selectionne les balises html pour injecter les infos de l'article. //
      document.querySelector(".peluche").src = teddieJSON.imageUrl;
      document.querySelector(".h1-model").textContent = teddieJSON.name;
      document.querySelector(".color-price").textContent =
        teddieJSON.price / 100 + "€";
      document.querySelector(".p-model").textContent = teddieJSON.description;
      document.querySelector(".btn-panier").addEventListener("click", clic);
      document.querySelector(".tittle").textContent =
        "Peluche" + " " + teddieJSON.name;

      // Utilise une boucle for pour injecter les infos couleur de l'article //
      for (color of teddieJSON.colors) {
        document.querySelector(
          "#couleur"
        ).innerHTML += `<option value='${color}'>${color}</option>`;
      };

      function clic() {
        let obj = {id: teddieJSON._id, qt: 1 };
        let array = JSON.parse(localStorage.getItem("Articles"));
        array.push(obj)
        localStorage.setItem('Articles', JSON.stringify(array))
      };
    }
  );

effetFondu();
