/**
 * Generate quote using basic API
 */

let apiQuotes = [];
let randomQuote = null;

const btnQuote = document.getElementById('quote-btn');
const btnTweet = document.getElementById('tweet-btn');
const quoteText   = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const loader = document.getElementById('loader');
const quoteContainer = document.getElementById('quote-container');


window.onload = () => {
    getQuotes();
}

async function getQuotes() {
    showloadingSpinner();
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        main();
    } catch (error) {
        console.log(error);
    }
}

function main() {
    showloadingSpinner();
    generateNewQuote();
    btnQuote.addEventListener('click', generateNewQuote);
    btnTweet.addEventListener('click', tweetQuote);
}

function generateNewQuote() {
    randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    quoteText.innerHTML = !randomQuote.text ? 'No Quotes Today' : randomQuote.text;
    quoteAuthor.innerHTML = !randomQuote.author ? 'Unknown' : randomQuote.author;
    hideloadingSpinner();
}


function tweetQuote() {
    const tweetURL = `https://twitter.com/intent/tweet?text=${randomQuote.text} - ${randomQuote.author}`;
    window.open(tweetURL, '_blank');
}

function showloadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideloadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

