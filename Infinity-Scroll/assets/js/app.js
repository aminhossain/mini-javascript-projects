
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// fetch photos container
let photos = [];

// API Constrains
const apiKEY = `unsplash api key`;
const count = 10;
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKEY}&count=${count}`;

/**
 * Set attrbute to element
 * @param {*} element 
 * @param {*} attributes 
 */
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

/**
 * Display fetch photos from unsplash API
 */
function displayPhotos() {
    photos.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href : photo.links.html,
            target : '_blank',
        })

        const img = document.createElement('img');
        setAttributes(img, {
            src : photo.urls.regular,
            alt : photo.alt_description,
            title : photo.alt_description,
        })

        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

/**
 * Fetch photos from Unsplash API
 */
async function getRandomPhotos() {
    try {
        const response = await fetch(apiURL);
        photos = await response.json();
        console.log(photos);
        displayPhotos();
    } catch(error) {
        //Error 
    }
}

/**
 * Execute fetch function on load event
 */
window.addEventListener('load', () => {
    // getRandomPhotos();
})
