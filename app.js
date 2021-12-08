// Select DOM elements
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const loader = document.querySelector("#loader");
const quoteContainer = document.querySelector("#quote-container");

// Show loading
const loading = function () {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

// Hide Loading
const complete = function () {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

// Get Quotes from API
const getQuote = async function () {
  try {
    loading();
    // Get data from api
    const data = await fetch("https://type.fit/api/quotes");
    const res = await data.json();
    // Random quote
    const randomQuote = res[Math.floor(Math.random() * 500) + 1];
    // Display quote text and quote author
    quoteText.textContent = randomQuote.text;
    // Check exist of author if blank give name 'Unknow'
    randomQuote.author
      ? (authorText.textContent = randomQuote.author)
      : "Unknow";
    // Check quote length to determine styling
    if (randomQuote.text.length > 100) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    complete();
    //Handle error
  } catch (err) {
    console.error(err);
  }
};

//Tweet Quote
const tweetQuote = function () {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};

// Event listeners
document.querySelector("#twitter").addEventListener("click", tweetQuote);
document.querySelector("#new-quote").addEventListener("click", getQuote);
getQuote();
