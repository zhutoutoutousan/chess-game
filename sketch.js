let tileSize = 100;


function setup() {
    createCanvas(800,800);
    initializeHtmlElements();

    // load all chess pieces images
    for(let i = 1; i< 10; i++){
        image.push(loadImage())
    }
    
}


function mousePressed() {
    let x = floor(mouseX / tileSize);
    let y = floor(mouseY / tileSize);
    if(!test.isDone()) {
        
    }
}


function initializeHtmlElements() {
    let paraBody = document.createElement('p');
    paraBody.innerText = 'Control Panel';
}