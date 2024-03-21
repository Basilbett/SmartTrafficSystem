
let video, model, countElement, count = 0;

async function loadModel() {
    model = await cocoSsd.load();
}

function detectPeople() {
    model.detect(video).then(predictions => {
        count = predictions.filter(prediction => prediction.class === 'person').length;
        countElement.textContent = count;

        if (count <=0) {
            messageElement.textContent = 'Smooth Traffic😀';
            green.style.backgroundColor="green";
            orange.style.backgroundColor="black";
            red.style.backgroundColor="black";
           
            
        } 
        else if(count>=4 ){
            messageElement.textContent = 'Stop😀';
            orange.style.backgroundColor="black";
            green.style.backgroundColor="black";
            red.style.backgroundColor="red";
           
           
        }

        else  if(count>=1 ) {
            messageElement.textContent = 'get ready😀';
            red.style.backgroundColor="black";
            orange.style.backgroundColor="yellow";
            green.style.backgroundColor="black";
        }


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
    messageElement = document.getElementById('message');
    roadstop = document.getElementById('road');
    

    

    await setupCamera();
    await loadModel();
    detectPeople();
}

start();

function stoproad(){

    if(count=1){
        road.animation=stop();

    }


}



