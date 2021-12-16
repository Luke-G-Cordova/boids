import BoidSimulation from '../src/BoidSimulation.js';
import Boid from "../src/Boid.js";
import {default as V} from "../src/Vector.js";

let boids = []; 
let paragraph = document.querySelector('.myP');
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let text = paragraph.childNodes[0];
// split the text node into letters
let letters = [];
let hold; 
let lettersLength = text.length;
let tag;
for(let i = 0, k = 0;i<lettersLength;i++){
    hold = text.splitText(1);
    if(text.data.trim() !== ''){
        tag = document.createElement('span');
        tag.innerHTML = text.data;
        paragraph.insertBefore(tag, hold);
        text.data = '';
        letters.push(tag);
        boids.push(
            new Boid(
                Math.random() * ctx.canvas.innerWidth, 
                Math.random() * ctx.canvas.innerHeight
            )
        )
        boids[k].velocity.add(
            V.createNew(
                (Math.random() * 2) -1, 
                (Math.random() * 2) -1
            ).normalize().mult(3)
        );
        boids[k].tag = letters[k];
        let range = document.createRange();
        range.selectNodeContents(letters[k].firstChild);
        boids[k].nodeRect = range.getClientRects()[0];
        boids[k].nodePosVec = V.createNew(boids[k].nodeRect.x, boids[k].nodeRect.y);
        boids[k].text = letters[k].firstChild.data;
        boids[k].element = document.createElement('span');
        boids[k].element.innerHTML = boids[k].text;
        boids[k].element.style.position = 'absolute';
        boids[k].element.style.top = `${boids[k].position.y}px`;
        boids[k].element.style.left = `${boids[k].position.x}px`;
        parent.appendChild(boids[k].element);
        k++;
    }
    text = hold;
}