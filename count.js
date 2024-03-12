let video, model, countElement, count = 0;

async function loadModel() {
    model = await cocoSsd.load();
}

function detectPeople() {
    model.detect(video).then(predictions => {
        count = predictions.filter(prediction => prediction.class === 'person').length;
        countElement.textContent = count;

        requestAnimationFrame(detectPeople);
    });
}

async function setupCamera() {
    video = document.getElementById('video');
    const stream = await navigator.mediaDevices.getUserMedia({ 'video': {} });
    video.srcObject = stream;

    return new Promise((resolve) => {
        video.onloadedmetadata = () => {
            resolve(video);
        };
    });
}

async function start() {
    countElement = document.getElementById('count');

    await setupCamera();
    await loadModel();
    detectPeople();
}

start();
