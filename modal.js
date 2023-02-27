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
const form = document.querySelector("form");
const firstName = document.querySelector("#first");
const lastName = document.querySelector("#last");
const email = document.querySelector("#email");
const birthDate = document.querySelector("#birthdate");
const termsConditions = document.querySelector("#checkbox1");
const submitBtn = document.querySelector(".btn-submit");
const confirmation = document.querySelector(".confirmation");

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

// EVENLISTENER BOUTON SUBMIT et FONCTION POUR SUBMIT FORMULAIRE
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstNameOk = verifyName(firstName);
  const lastNameOk = verifyName(lastName);
  const emailOk = verifyEmail();
  const birthDateOk = verifyBirthDate();
  const radioOk = isChecked();
  const termsOk = isAccepted();

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
  const elementVal = element.value.trim();

  if (elementVal === "" || elementVal.length < 2) {
    error(element);
  } else {
    validInput(element);
    return true;
  }
}
// Vérification EMAIL
function verifyEmail() {
  const emailVal = email.value.trim();
  const mailformat =
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
  const dateVal = birthDate.value;
  if (!dateVal) {
    error(birthDate);
  } else {
    validInput(birthDate);
    return true;
  }
}

// Vérification VILLE CHECKED
function isChecked() {
  const firstRadio = document.querySelector("input[name='location']");
  const checkedRadio = document.querySelector("input[name='location']:checked");

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
  const formControl = element.parentElement;

  //Mofifie la propriete data-error-visible
  formControl.dataset.errorVisible = "true";
}

// FONCTION INPUT VALID
function validInput(element) {
  const formControl = element.parentElement;

  //Mofifie la propriete data-error-visible à son état initial
  formControl.dataset.errorVisible = "false";
}

// FONCTION POUR AFFICHER LE FORMULAIRE OU LA FENETRE DE REMERCIEMENTS
function toggleFormVisibility() {
  form.classList.toggle("hidden");
  confirmation.classList.toggle("hidden");
}
