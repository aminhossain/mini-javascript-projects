/**
 * Generate quote using REST API
 */

let apiQuotes = null;

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
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyURL + apiURL);
        apiQuotes = await response.json();
        main();
    } catch (error) {
        console.log(error);
    }
}

function main() {
    showloadingSpinner();
    generateNewQuote();
    btnQuote.addEventListener('click', getQuotes);
    btnTweet.addEventListener('click', tweetQuote);
}

function generateNewQuote() {
    quoteText.innerHTML = !apiQuotes.quoteText ? 'No Quotes Today' : apiQuotes.quoteText;
    quoteAuthor.innerHTML = !apiQuotes.quoteAuthor ? 'Unknown' : apiQuotes.quoteAuthor;
    hideloadingSpinner();
}


function tweetQuote() {
    const tweetURL = `https://twitter.com/intent/tweet?text=${apiQuotes.quoteText} - ${apiQuotes.quoteAuthor}`;
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

