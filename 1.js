const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
let favourite = document.getElementById("favourite");
let list = document.getElementById("list-of-favourite-quotes");
let showAllListOfFavourite = document.getElementById("show-list");
let clearButton = document.getElementById("clear-button");
let favoriteContainer = document.querySelector(".favorite-container");
let closeButton = document.getElementById("close-favorite");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const speakBtn = document.getElementById("speak");
let favorites = [];

let apiQuotes = [
  {
    text: "If you want to shine like a sun, first burn like a sun.",
    author: "-APJ Abdul Kalam",
  },
  {
    text: "To succeed in your mission, you must have single-minded devotion to your goal.",
    author: "-APJ Abdul Kalam",
  },
  {
    text: "Great teachers emanate out of knowledge, passion, and compassion.",
    author: "-APJ Abdul Kalam",
  },
  {
    text: "Look at the sky. We are not alone. The whole universe is friendly to us and conspires only to give the best to those who dream and work.",
    author: "-APJ Abdul Kalam",
  },
  {
    text: "Millions of kids across the world victims of war while millions other witnessing it. Imagine their state of mind.",
    author: "-Meraj Faheem",
  },
  {
    text: "Loyalty is tested by both giving and denying an opportunity. The loyal ones prove everytime, why they were worth the trust.",
    author: "-Meraj Faheem",
  },
  {
    text: "If you are young you can win the world with trial and error. If you are  old, you can win it with experience. Eventually, you will win.",
    author: "-Meraj Faheem",
  },
  {
    text: "The world has to look different with you and without you. You can’t just come and go.",
    author: "-Meraj Faheem",
  },
  {
    text: "It is in that which you love the most that you find the greatest tests.",
    author: "-Yasmin Mogahed",
  },
  {
    text: "The body has many needs. But the soul has only one: to be with God.",
    author: "-Yasmin Mogahed",
  },
  {
    text: "Holding on to hope when everything is dark, is the greatest test of faith.",
    author: "-Yasmin Mogahed",
  },
  {
    text: "If you want this life to stop breaking your heart, stop giving your heart to this life.",
    author: "-Yasmin Mogahed",
  },
];
var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 3,
    slideShadows: true,
  },
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 2,
    },
    1560: {
      slidesPerView: 3,
    },
  },
});

// Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

const updateQuote = (content, authorName) => {
  quoteText.innerText = content;
  authorText.innerText = authorName;
  let existsInFavorites = checkExistence(content, authorName);
  let heartIcon = favourite.firstElementChild;
  if (existsInFavorites) {
    heartIcon.classList.remove("fa-regular");
    heartIcon.classList.add("fa-solid", "active");
  } else {
    heartIcon.classList.add("fa-regular");
    heartIcon.classList.remove("fa-solid", "active");
  }
};

// Show new Quote
function newQuote() {
  loading();
  updateQuote();
  // Pick a random quote fro apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if Author field is blank and replace it with
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // Check Quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set quote, Hide loader

  quoteText.textContent = quote.text;
  complete();

  quoteText.textContent = quote.text;
}

const checkExistence = (content, authorName) => {
  return favorites.some(
    (q) => q.content === content && q.author === authorName
  );
};

// Function to display favorite quotes
const displayFavorites = () => {
  list.innerHTML = "";
  favorites.forEach((q, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${index + 1}. ${q.content} - ${q.author}`;
    list.appendChild(listItem);
  });
};

// Function to save favorites to local storage
const saveFavoritesToLocalStorage = () => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};
// Function to add a quote to favorites
const addToFavorites = () => {
  let heartIcon = favourite.firstElementChild;
  // if (heartIcon.classList.contains('fa-regular')) {

  heartIcon.classList.remove("fa-regular");
  heartIcon.classList.add("fa-solid", "active");
  const content = quoteText.innerText;
  const authorName = authorText.innerText;
  // Check if the quote is already in favorites
  const existsInFavorites = checkExistence(content, authorName);
  if (!existsInFavorites) {
    favorites.push({ content, author: authorName });
    saveFavoritesToLocalStorage(); // Save to local storage
    displayFavorites(); // Call this function to update the favorite quotes list
  }
};
// Function to clear favorites from local storage
const clearFavoritesFromLocalStorage = () => {
  localStorage.removeItem("favorites");
  favorites = []; // Clear the favorites array
  displayFavorites(); // Display the cleared favorites list
  favoriteContainer.style.display = "none";
  list.style.display = "none";
  let heartIcon = favourite.firstElementChild;
  if (heartIcon.classList.contains("fa-solid")) {
    heartIcon.classList.add("fa-regular");
    heartIcon.classList.remove("fa-solid", "active");
  }
};
showAllListOfFavourite.addEventListener("click", () => {
  if (favorites.length == 0) {
    list.innerHTML = "<p>You haven't added a favorite yet</p>";
  }
  list.style.display = "block";
  favoriteContainer.style.display = "block";
});
//close button
closeButton.addEventListener("click", () => {
  list.style.display = "none";
  favoriteContainer.style.display = "none";
});
// Attach event listeners
window.addEventListener("load", () => {
  list.style.display = "none"; // hide when window load or refresh
  favoriteContainer.style.display = "none";
  favourite.addEventListener("click", addToFavorites);
  clearButton.addEventListener("click", clearFavoritesFromLocalStorage);
  // Load favorites from local storage if available
  const storedFavorites = localStorage.getItem("favorites");
  if (storedFavorites) {
    favorites = JSON.parse(storedFavorites);
    displayFavorites();
  }
  complete();
});

//Speak Quote
let speakQuote = () => {
  let quote = document.querySelector(".quote-container .quote-text");
  let author = document.querySelector(".quote-container .quote-author");
  let synth = window.speechSynthesis;
  let speech = new SpeechSynthesisUtterance();
  speech.lang = "en-US";
  speech.text = `${quoteText.textContent} by ${authorText.textContent}`;
  speech.rate = 0.9;
  speech.volume = 1;
  speech.pitch = 1;
  speechSynthesis.speak(speech);
  let quoteSpeech = setInterval(() => {
    if (synth.speaking) {
      speakBtn.style.color = "#4CB480";
    } else {
      speakBtn.style.color = "#FFFFFF";
      clearInterval(quoteSpeech);
    }
  }, 1000);
};

//Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Event Listener
newQuoteBtn.addEventListener("click", newQuote);
speakBtn.addEventListener("click", speakQuote);
twitterBtn.addEventListener("click", tweetQuote);

//On load
complete();
