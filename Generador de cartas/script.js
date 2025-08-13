const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const SUITS = [
  { symbol: "♠", name: "picas", color: "black" },
  { symbol: "♥", name: "corazones", color: "red" },
  { symbol: "♦", name: "diamantes", color: "red" },
  { symbol: "♣", name: "tréboles", color: "black" },
];

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const $card = document.getElementById("card");
const $cornerTop = document.getElementById("corner-top");
const $cornerBottom = document.getElementById("corner-bottom");
const $center = document.getElementById("center");
const $btn = document.getElementById("btn");
const $widthInput = document.getElementById("widthInput");
const $heightInput = document.getElementById("heightInput");

function drawRandomCard() {
  const rank = randomItem(RANKS);
  const suit = randomItem(SUITS);
  const text = `${rank}${suit.symbol}`;

  $cornerTop.textContent = text;
  $cornerBottom.textContent = text;
  $center.textContent = suit.symbol;
  $widthInput.addEventListener("input", applyCardSize);
  $heightInput.addEventListener("input", applyCardSize);

  const colorClass = suit.color === "red" ? "red" : "black";
  const opposite = suit.color === "red" ? "black" : "red";
  [$card, $cornerTop, $cornerBottom, $center].forEach(el => {
    el.classList.remove(opposite);
    el.classList.add(colorClass);
  });

  $card.setAttribute("aria-label", `Carta: ${rank} de ${suit.name}`);
}

function applyCardSize() {
  const w = parseInt($widthInput.value, 10);
  const h = parseInt($heightInput.value, 10);

  if (!isNaN(w) && w > 0) {
    $card.style.width = `${w}px`;
  }
  if (!isNaN(h) && h > 0) {
    $card.style.height = `${h}px`;
    $card.style.aspectRatio = "unset"; // desactiva el aspect-ratio fijo
  }
}


$btn.addEventListener('click', drawRandomCard);
window.addEventListener('keydown', (ev) => {
  if (ev.code === 'Space') {
    ev.preventDefault();
    drawRandomCard();
  }
});

drawRandomCard();
setInterval(drawRandomCard, 5000);
applyCardSize();
