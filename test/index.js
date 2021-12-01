import Turtle from "../src/Turtle.js";
import {default as V} from "../src/Vector.js";
import Boid from "../src/Boid.js";
import Flock from "../src/Flock.js";
import BoidSimulation from '../src/BoidSimulation.js';

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let mouseX = canvas.width/2, mouseY = canvas.height/2;


let vector = V.createNew(100, 100);
let origin = V.createNew(mouseX, mouseY);

let ogFill = ctx.fillStyle;
ctx.fillStyle = 'rgba(0,0,0,1)';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = ogFill;
let r = 255, g = 0, b = 0;

let color = `rgb(${r}, ${g}, ${b})`;

function loop(){
    clear(ctx);
    drawVector(vector, origin, `rgb(${r}, ${g}, ${b})`);
    vector.addAngle(.01);
    let mag = vector.magnitude;
    mag += (Math.random() * 30) - 15;
    vector.normalize();
    vector.mult(mag);
    vector.upperLimit(400);
    vector.lowerLimit(50);
    if(r === 255){
        if(b===0){
            g++;
        }else{
            b--;
        }
    }
    if(g===255){
        if(r===0){
            b++;
        }else{
            r--;
        }
    }
    if(b===255){
        if(g===0){
            r++;
        }else{
            g--;
        }
    }

}


setTimeout(() => {
    setInterval(loop, 1)
}, 500);
function drawVector(vector, origin = V.createNew(0, 0), color = 'white'){
    let ogCopy = origin.clone();
    ogCopy.add(vector);
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(ogCopy.x, ogCopy.y);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(ogCopy.x, ogCopy.y, 3, 0, 2*Math.PI);
    ctx.fill();
}
function drawTurt(turtle, size, color = 'cyan'){
    ctx.fillStyle = color;
    ctx.strokeStyle = 'magenta'
    ctx.beginPath();
    ctx.arc(turtle.getX(), turtle.getY(), size, 0, 2*Math.PI);
    ctx.fill();
}

function clear(ctx){
    let ogFill = ctx.fillStyle;
    ctx.fillStyle = 'rgba(0,0,0,.003)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = ogFill;
}

// canvas.addEventListener('mousemove', (e) => {
//     mouseX = e.offsetX;
//     mouseY = e.offsetY;
// });