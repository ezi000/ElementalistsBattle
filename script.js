function getComputerChoice() {
  let random = Math.floor(Math.random() * 3);

  switch (random) {
    case 0:
      komputerEmoji.innerHTML = "✊";
      break;
    case 1:
      komputerEmoji.innerHTML = "✋";
      break;
    case 2:
      komputerEmoji.innerHTML = "✌";
      break;
  }

  return random;
}

let kamien = document.getElementById("kamien");
let papier = document.getElementById("papier");
let nozyczki = document.getElementById("nozyczki");

let wygrane = document.getElementById("wygrane");
let przegrane = document.getElementById("przegrane");

let graczEmoji = document.getElementById("xd");
let komputerEmoji = document.getElementById("xdd");
let tytul = document.getElementById("h1");

let punktyW = 0;
let punktyP = 0;

kamien.addEventListener("click", function () {
  graczEmoji.innerHTML = "✊";
  czyWygrana(0);
});

papier.addEventListener("click", function () {
  graczEmoji.innerHTML = "✋";
  czyWygrana(1);
});

nozyczki.addEventListener("click", function () {
  graczEmoji.innerHTML = "✌";
  czyWygrana(2);
});

function czyWygrana(playerChoice) {
  let computerChoice = getComputerChoice();
  if (playerChoice === computerChoice) {
    tytul.innerHTML = "It's a draw!";
  } else if (
    (playerChoice === 0 && computerChoice === 2) ||
    (playerChoice === 1 && computerChoice === 0) ||
    (playerChoice === 2 && computerChoice === 1)
  ) {
    tytul.innerHTML = "You win!";
    wygrane.innerHTML = ++punktyW;
  } else {
    tytul.innerHTML = "You lose!";
    przegrane.innerHTML = ++punktyP;
  }
}
