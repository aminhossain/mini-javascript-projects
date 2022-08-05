
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// fetch photos container
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photos = [];

// API Constrains
const apiKEY = `unspalsh api key`;
const count = 10;
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKEY}&count=${count}`;


function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded == totalImages) {
        ready = true;
        loader.hidden = true;
    }
}


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
    imagesLoaded = 0;
    totalImages = photos.length;

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

        //Load more images
        img.addEventListener('load', imageLoaded)

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
        displayPhotos();
    } catch(error) {
        //Error 
    }
}

window.addEventListener('scroll', () => {
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getRandomPhotos();
    }
})

/**
 * Execute fetch function on load event
 */
window.addEventListener('load', () => {
    getRandomPhotos();
})
