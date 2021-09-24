const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById(
  "final-message-reveal-word"
);

const figureParts = document.querySelectorAll(".figure-part");

const words = [
  "application",
  "programming",
  "interface",
  "wizard",
  "bumblebee",
  "bird",
  "cat",
  "cow",
  "dog",
  "fish",
  "horse",
  "monkey",
  "rabbit",
  "spider",
  "snake",
  "banana",
  "pizza",
  "popcorn",
  "spaghetti",
  "archery",
  "baseball",
  "basketball",
  "football",
  "golf",
  "soccer",
  "tennis",
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

let playable = true;

function displayWord() {
  wordEl.innerHTML = `
        ${[...selectedWord]
          .map(
            word =>
              `<span class="letter">${
                correctLetters.includes(word) ? word : ""
              }</span>`
          )
          .join("")}
          `;

  const innerWord = wordEl.innerText.replace(/[ \n]/g, "");

  if (innerWord === selectedWord) {
    finalMessage.textContent = "Tebrikler! Kazandin 😋";
    finalMessageRevealWord.textContent = "";
    popup.style.display = "flex";

    playable = false;
  }
}

function showNotification() {
  notification.classList.add("show");
  setTimeout(() => notification.classList.remove("show"), 2000);
}

function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Yanlis ⛔</p>" : ""}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  // Display parts
  figureParts.forEach((part, i) => {
    const errors = wrongLetters.length;

    i < errors ? (part.style.display = "block") : (part.style.display = "none");
  });

  // Check if lost

  if (wrongLetters.length === figureParts.length) {
    finalMessage.textContent = "Kaybettin ☹";
    finalMessageRevealWord.textContent = `kelime: ${selectedWord} idi.`;
    popup.style.display = "flex";

    playable = false;
  }
}

// Event Listeners

// Keydown letter press
window.addEventListener("keydown", e => {
  if (playable) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key.toLowerCase();

      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);

          updateWrongLettersEl();
        } else {
          showNotification();
        }
      }
    }
  }
});

// Restart game and play again
playAgainBtn.addEventListener("click", () => {
  playable = true;

  // Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = "none";
});

displayWord();
