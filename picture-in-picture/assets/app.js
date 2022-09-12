const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// prompt meadia stream to select and then play
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadeddata = () => {
            videoElement.play();
        }
    } catch(error) {

    }
}

//button listener to popup the picture-in-picture mode
button.addEventListener('click', async () => {
    // disable button;
    button.disabled = true;
    await videoElement.requestPictureInPicture();
    button.disabled = false;
}) 

//meadia stream execute on load
window.onload = () => {
    selectMediaStream();
}