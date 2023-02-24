function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Récuperer les elements du FORM
const modalBtn = document.querySelectorAll(".modal-btn");
const modalbg = document.querySelector(".bground");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
let form = document.querySelector("form");
let firstName = document.querySelector("#first");
let lastName = document.querySelector("#last");
let email = document.querySelector("#email");
let birthDate = document.querySelector("#birthdate");
let termsConditions = document.querySelector("#checkbox1");
let submitBtn = document.querySelector(".btn-submit");
let confirmation = document.querySelector(".confirmation");

// EVEN LISTENER BOUTON "JE M'INSCRIS"
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// FONCTION POUR FAIRE APPARAITRE LE FORMULAIRE
function launchModal() {
  modalbg.classList.add("visible");
}

// EVEN LISTENER BOUTON "X"
closeBtn.addEventListener("click", launchClosing);

// FONCTION POUR FAIRE DISPARAITRE LE FORMULAIRE
function launchClosing() {
  modalbg.classList.remove("visible");
}

termsConditions.addEventListener("change", isAccepted);

// EVENLISTENER BOUTON SUBMIT et FONCTION POUR SUBMIT FORMULAIRE
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let firstNameOk = verifyName(firstName);
  let lastNameOk = verifyName(lastName);
  let emailOk = verifyEmail();
  let birthDateOk = verifyBirthDate();
  let radioOk = isChecked();
  let termsOk = isAccepted();

  if (
    firstNameOk &&
    lastNameOk &&
    emailOk &&
    birthDateOk &&
    radioOk &&
    termsOk === true
  ) {
    toggleFormVisibility();
    return true;
  }
});

// FONCTIONS DE VERIFICATION DES DIFFERENTS CHAMPS DU FORMULAIRE

// Vérification PRÉNOM et NOM
function verifyName(element) {
  let elementVal = element.value.trim();

  if (elementVal === "" || elementVal.length < 2) {
    error(element);
  } else {
    validInput(element);
    return true;
  }
}
// Vérification EMAIL
function verifyEmail() {
  let emailVal = email.value.trim();
  let mailformat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (emailVal != emailVal.match(mailformat)) {
    error(email);
  } else {
    validInput(email);
    return true;
  }
}

// Vérification DATE DE NAISSANCE
function verifyBirthDate() {
  let dateVal = birthDate.value;
  if (!dateVal) {
    error(birthDate);
  } else {
    validInput(birthDate);
    return true;
  }
}

// Vérification VILLE CHECKED
function isChecked() {
  let firstRadio = document.querySelector("input[name='location']");
  let checkedRadio = document.querySelector("input[name='location']:checked");

  if (checkedRadio === null) {
    error(firstRadio);
  } else {
    validInput(firstRadio);
    return true;
  }
}

// Vérification TERMS ET CONDITIONS CHECKED
function isAccepted() {
  if (!termsConditions.checked) {
    error(termsConditions);
  } else {
    validInput(termsConditions);
    return true;
  }
}

// FONCTION INPUT ERREUR
function error(element) {
  let formControl = element.parentElement;

  //Mofifie la propriete data-error-visible
  formControl.dataset.errorVisible = "true";
}

// FONCTION INPUT VALID
function validInput(element) {
  let formControl = element.parentElement;

  //Mofifie la propriete data-error-visible à son état initial
  formControl.dataset.errorVisible = "false";
}

function toggleFormVisibility() {
  form.classList.toggle("hidden");
  confirmation.classList.toggle("hidden");
}
