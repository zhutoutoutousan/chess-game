let tileSize = 100;
let calDepth = 3;
let maxDepth = 6;

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
    const titlePara = document.createElement('h3');
    const buttonPlus = document.createElement('button');
    const buttonMinus = document.createElement('button');
    const displayPara = document.createElement('p')
    const addDepth = _ => {
         displayPara.innerText = `Thinking ${++calDepth} moves ahead`;
         console.log(calDepth);
         console.log('Add');
    };
    
    const minusDepth = _ =>{
         displayPara.innerText = `Thinking ${--calDepth} moves ahead`;
         console.log(calDepth);
         console.log('Minus');
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