form.email.addEventListener("change", function () {
  validEmail(this);
});
form.nom.addEventListener("change", function () {
  validName(this);
});
form.prenom.addEventListener("change", function () {
  validPrenom(this);
});
form.adresse.addEventListener("change", function () {
  validAdress(this);
});
form.city.addEventListener("change", function () {
  validCity(this);
});

const validEmail = function (inputEmail) {
  let emailRegexp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-z]+[.]{1}[a-z]{2,10}$",
    "g"
  );

  if (emailRegexp.test(inputEmail.value)) {
    form.email.style.backgroundColor = "white";
    return true;
  } else if (form.email.value === "") {
    form.email.style.backgroundColor = "rgb(255, 235, 205)";
  } else {
    form.email.style.backgroundColor = "rgb(242, 113, 113)";
    return false;
  }
};

const validName = function (name) {
  let nameRegexp = new RegExp("[a-zA-Z]+$", "g");

  if (nameRegexp.test(name.value)) {
    form.nom.style.backgroundColor = "white";
    return true;
  } else if (form.nom.value === "") {
    form.nom.style.backgroundColor = "rgb(255, 235, 205)";
  } else {
    form.nom.style.backgroundColor = "rgb(242, 113, 113)";
    return false;
  }
};

const validPrenom = function (prenom) {
  let prenomRegexp = new RegExp("[a-zA-Z-éç-]+$", "g");

  if (prenomRegexp.test(prenom.value)) {
    form.prenom.style.backgroundColor = "white";
    return true;
  } else if (form.prenom.value === "") {
    form.prenom.style.backgroundColor = "rgb(255, 235, 205)";
  } else {
    form.prenom.style.backgroundColor = "rgb(242, 113, 113)";
    return false;
  }
};

const validAdress = function (adress) {
  let adressRegexp = new RegExp("[a-zA-Z0-9-éç-]+$", "g");

  if (adressRegexp.test(adress.value)) {
    form.adresse.style.backgroundColor = "white";
    return true;
  } else if (form.adresse.value === "") {
    form.adresse.style.backgroundColor = "rgb(255, 235, 205)";
  } else {
    form.adresse.style.backgroundColor = "rgb(242, 113, 113)";
    return false;
  }
};

const validCity = function (city) {
  let cityRegexp = new RegExp("[a-zA-Z-éç-]+$", "g");

  if (cityRegexp.test(city.value)) {
    form.city.style.backgroundColor = "white";
    return true;
  } else if (form.city.value === "") {
    form.city.style.backgroundColor = "rgb(255, 235, 205)";
  } else {
    form.city.style.backgroundColor = "rgb(242, 113, 113)";
    return false;
  }
};
