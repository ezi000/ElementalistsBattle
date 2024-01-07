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

let drawCount = 0;
let winCount = 0;
let loseCount = 0;

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
    drawCount++;
    if (drawCount > 1) {
      tytul.innerHTML = "It's a draw! #" + drawCount;
    } else {
      tytul.innerHTML = "It's a draw!";
    }
    winCount = 0;
    loseCount = 0;
  } else if (
    (playerChoice === 0 && computerChoice === 2) ||
    (playerChoice === 1 && computerChoice === 0) ||
    (playerChoice === 2 && computerChoice === 1)
  ) {
    winCount++;
    if (winCount > 1) {
      tytul.innerHTML = "You won! #" + winCount;
    } else {
      tytul.innerHTML = "You won!";
    }
    wygrane.innerHTML = ++punktyW;
    drawCount = 0;
    loseCount = 0;
  } else {
    loseCount++;

    if (loseCount > 1) {
      tytul.innerHTML = "You lost! #" + loseCount;
    } else {
      tytul.innerHTML = "You lost!";
    }
    przegrane.innerHTML = ++punktyP;
    drawCount = 0;
    winCount = 0;
  }
  if (Number(wygrane.innerHTML) === 5 || Number(przegrane.innerHTML) === 5) {
    if (Number(wygrane.innerHTML) === 5) {
      drawCount = 0;
      winCount = 0;
      loseCount = 0;
      openModalik();
      setTimeout(function () {
        zaktualizujWygrane();
      }, 2000);
    } else {
      drawCount = 0;
      winCount = 0;
      loseCount = 0;
      openModalik2();
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    }
  }
}

const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

function openModalik() {
  const napisModal = document.getElementById("napisModal");
  napisModal.innerHTML =
    "You <span style='color: green;'>WON</span> this battle!";
  document.getElementById("myModal").classList.add("active");
  overlay.classList.add("active");
}

function openModalik2() {
  const napisModal = document.getElementById("napisModal");
  napisModal.innerHTML =
    "You <span style='color: red;'>LOST</span> this battle!";
  document.getElementById("myModal").classList.add("active");
  overlay.classList.add("active");
}

function zaktualizujWygrane() {
  fetch("http://localhost:3000/users/wins", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    window.location.reload();
  });
}
