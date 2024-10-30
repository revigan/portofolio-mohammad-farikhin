//Toggle class active hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
//ketika hamburger-menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};
//Toggle class active search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

//klik di luar elemen
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
});

// game
const cards = document.querySelectorAll(".card");

let matchedCards = 0;
let cardOne, cardTwo;
let disableDeck = false;
let timer,
  timeElapsed = 0,
  attempts = 0;
let timerStarted = false;

function startTimer() {
  timer = setInterval(() => {
    timeElapsed++;
    document.getElementById("timer").textContent = `Time: ${timeElapsed}s`;
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timeElapsed = 0;
  document.getElementById("timer").textContent = "Time: 0s";
}

function updateAttempts() {
  attempts++;
  document.getElementById("attempts").textContent = `Attempts: ${attempts}`;
}

function flipCard(e) {
  if (!timerStarted) {
    startTimer();
    timerStarted = true;
  }

  let clickedCard = e.target;
  if (clickedCard !== cardOne && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector("img").src,
      cardTwoImg = cardTwo.querySelector("img").src;
    checkForMatch(cardOneImg, cardTwoImg);
    updateAttempts(); 
  }
}

function checkForMatch(img1, img2) {
  if (img1 === img2) {
    matchedCards++;
    if (matchedCards === 8) {
      setTimeout(() => {
        shuffleCards();
        resetGame();
      }, 1000);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    disableDeck = false;
  } else {
    setTimeout(() => {
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
      cardOne.classList.remove("shake", "flip");
      cardTwo.classList.remove("shake", "flip");
      cardOne = cardTwo = null;
      disableDeck = false;
    }, 1200);
  }
}

function shuffleCards() {
  matchedCards = 0;
  cardOne = cardTwo = "";
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, index) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector("img");
    imgTag.src = `img/img-${arr[index]}.png`;
    card.addEventListener("click", flipCard);
  });
}

function resetGame() {
  matchedCards = 0;
  attempts = 0;
  disableDeck = false;
  timerStarted = false;
  resetTimer();
  document.getElementById("attempts").textContent = "Attempts: 0";
}

shuffleCards();
resetGame();
