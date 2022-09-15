
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable or Enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Pass joke to VoiceRSS api
function tellMe(joke) {
    VoiceRSS.speech({
        key: 'api_key',
        src: joke,
        hl: 'en-us', v: 'Linda', r: 0, c: 'mp3', f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get joke from joke api.
async function getJokes() {
    const apiURL = `https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist`;

    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        let joke = ``;

        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // TextToSpeech api
        tellMe(joke);
        // Toggle Button
        toggleButton();

    } catch (error) {
        console.log("Joke Error : ", error);
    }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);