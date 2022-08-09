// déclare des variables
const form = document.querySelector("form");
const inputs = document.querySelectorAll(
  'input[type="text"], input[type="password"]'
);
const progressBar = document.getElementById("progress-bar");
let pseudo, email, password, confirmPass;

const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector("." + tag + "-container"); // pseudo-container // email-container ...
  const span = document.querySelector("." + tag + "-container > span");

  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
};

const pseudoChecker = (value) => {
  // on test la longueur,
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("pseudo", "Le pseudo doit faire entre 3 et 20 caractères");
    pseudo = null;

    // test si il n'y a pas de caractère spécial
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "pseudo",
      "le pesudo ne doit pas contenir de caractères spéciaux"
    );
    pseudo = null;
  } else {
    errorDisplay("pseudo", "", true);
    pseudo = value;
  }
};

// logic : récuppérer la valeur de input (value)
const emailChecker = (value) => {
  // console.log(value);
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "L'email n'est pas valide");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};

const passwordChecker = (value) => {
  // console.log(value);
  progressBar.classList = "";

  // si jamais différent on est pas dans la regex, message d'erreur
  if (
    !value.match(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
    )
  ) {
    // console.log("test"); // si on rentre dans cette condition, générer l'affichage de l'erreur
    errorDisplay(
      "password",
      "Minimum de 8 caractères, une majuscule, un chiffre et un caractère spécial"
    );
    progressBar.classList.add("progressRed");
    password = null;
  } else if (value.length < 12) {
    progressBar.classList.add("progressBlue");
    errorDisplay("password", "", true);
    password = value;
  } else {
    progressBar.classList.add("progressGreen");
    errorDisplay("password", "", true);
    password = value;
  }
  // si il y a qqch dans confirmPass, càd true, alors lancer le confirmChecker
  if (confirmPass) confirmChecker(confirmPass);
};

// comparer le password
const confirmChecker = (value) => {
  // console.log(value);
  if (value !== password) {
    // je pointe le confirm-container, et j'écris le message dans le span
    errorDisplay("confirm", "Les mots de passe ne correspondent pas");
    confirmPass = false;
  } else {
    errorDisplay("confirm", "", true);
    confirmPass = true;
  }
};

// creer 4 events déclanchés sur l'input, selon ce que fait le user
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    // console.log(e.target.id);
    // console.log(e.target.value);
    switch (e.target.id) {
      case "pseudo": // si tu tombes sur pseudo
        pseudoChecker(e.target.value); // jouer la fonction
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "password":
        passwordChecker(e.target.value);
        break;
      case "confirm":
        confirmChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault(); // soumettre le formulaire sans recharger la page

  if (pseudo && email && password && confirmPass) {
    const data = {
      pseudo, // sous-entend pseudo: pseudo, etc
      email,
      password,
    };
    console.log(data); // simuler l'envoi à la BDD en faisant un POST

    // après avoir envoyé la data, vider les 4 inputs
    inputs.forEach((input) => (input.value = ""));
    progressBar.classList = "";

    // une fois soumis, tout remttre à zéro, pour ne pas renvoyer le formulaire plusieurs fois
    pseudo = null;
    email = null;
    password = null;
    confirmPass = null;
    alert("Inscription validée !");
  } else {
    alert("Veuillez remplir correctement les champs");
  }
});

// // creer 4 fonctions pour contrôler les formats
// const pseudoChecker = (value) => {
//   //   console.log(value);
//   // se récuppérer, se pointer
//   const pseudoContainer = document.querySelector(".pseudo-container");
//   const errorDisplay = document.querySelector(".pseudo-container > span");

//   if (value.length > 0 && (value.length < 3 || value.length > 20)) {
//     pseudoContainer.classList.add("error");
//     errorDisplay.textContent = "Le pseudo doit faire entre 3 et 20 caractères";
//   } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
//     pseudoContainer.classList.add("error");
//     errorDisplay.textContent =
//       "Le pseudo ne doit pas contenir de caractères spéciaux";
//   } else {
//     pseudoContainer.classList.remove("error");
//     errorDisplay.textContent = "";
//   }
// };
