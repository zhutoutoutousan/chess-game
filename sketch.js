let tileSize = 100;
let calDepth = 3;
let maxDepth = 6;

function setup() {
    createCanvas(800,800);
    initializeHtmlElements();

    // load all chess pieces images
    for(let i = 1; i< 10; i++){
        image.push(loadImage(`assets/2000px-Chess_Pieces_Sprite_0${i}.png`));
    }
    for(let i = 10; i< 13; i++){
        image.push(loadImage(`assets/2000px-Chess_Pieces_Sprite_${i}.png`));
    }
    test = new Board();
}

function draw() {
    background(100);
    showGrid();
    test.show();
}

function mousePressed() {
    let x = floor(mouseX / tileSize);
    let y = floor(mouseY / tileSize);
    if(!test.isDone()) {
        
    }
}

function showGrid() {
    
}

function initializeHtmlElements() {
    const titlePara = document.createElement('h3');
    const buttonPlus = document.createElement('button');
    const buttonMinus = document.createElement('button');
    const displayPara = document.createElement('p')
    const addDepth = _ => {
         displayPara.innerText = calDepth > 5 ? 
                                `Thinking ${calDepth} moves ahead` :
                                `Thinking ${++calDepth} moves ahead`;
    };
    
    const minusDepth = _ =>{
        displayPara.innerText = calDepth < 2 ? 
                                `Thinking ${calDepth} moves ahead` :
                                `Thinking ${--calDepth} moves ahead`;
    };
    
    buttonPlus.class = 'button plus';
    buttonPlus.innerText = "+";
    buttonMinus.class = 'button minus';
    buttonMinus.innerText = "-";

    titlePara.innerText = 'Control Panel';
    displayPara.innerText = `Thinking ${calDepth} moves ahead`;
    document.body.appendChild(titlePara);
    document.body.appendChild(displayPara);
    document.body.appendChild(buttonPlus);
    document.body.appendChild(buttonMinus);
    
    buttonPlus.addEventListener('click', addDepth);
    buttonMinus.addEventListener('click', minusDepth);

}