import Turtle from "../src/Turtle.js";
import {default as V} from "../src/Vector.js";
import Boid from "../src/Boid.js";
import Flock from "../src/Flock.js";
import BoidSimulation from '../src/BoidSimulation.js';

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let turtle = new Turtle(300, 300);
let turtle1 = new Turtle(canvas.width-300, canvas.height-300);
let turtle2 = new Turtle(canvas.width-300, canvas.height-300);
let center = V.createNew(canvas.width/2, canvas.height/2);
window.addEventListener('mousemove', (e) => {
    center = V.createNew(e.offsetX, e.offsetY);
});
// turtle.addForce(V.createNew(20, 10));
turtle1.addForce(V.createNew(20, -10));

ctx.fillRect(0,0,canvas.width, canvas.height);

function loop(){
    clear(ctx);
    turtle.move();
    turtle1.move();
    turtle2.move();
    turtle.subForce(center);
    turtle1.subForce(center);
    turtle2.subForce(center);
    turtle.subForce(turtle2.position);
    turtle.subForce(turtle1.position);
    turtle1.subForce(turtle.position);
    turtle1.subForce(turtle2.position);
    turtle2.subForce(turtle1.position);
    turtle2.subForce(turtle.position);

    drawTurt(turtle, 'red');
    drawVec(turtle.velocity, turtle.position, 'red');
    drawTurt(turtle1, 'cyan');
    drawVec(turtle1.velocity, turtle1.position, 'red');
    drawTurt(turtle2, 'yellow');
    drawVec(turtle2.velocity, turtle2.position, 'red');
    // drawVec(turtle.acceleration, turtle.position, 'yellow');
    drawStabVec(turtle.position, turtle1.position, 'gold');
    drawStabVec(turtle1.position, turtle2.position, 'gold');
    drawStabVec(turtle2.position, turtle.position, 'gold');
    // drawStabVec(turtle.position, center, 'cyan');
    // drawStabVec(turtle1.position, center, 'cyan');
    // drawStabVec(turtle2.position, center, 'cyan');
}

function drawTurt(turtle, color = 'red'){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(turtle.position.x, turtle.position.y, 10, 0, 2*Math.PI);
    ctx.fill();
}
function drawVec(vector, origin, color){
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(origin.x + vector.x, origin.y + vector.y);
    ctx.arc(origin.x + vector.x, origin.y + vector.y, 3, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();
}
function drawStabVec(vector, origin, color){
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(vector.x, vector.y);
    ctx.lineTo(origin.x, origin.y);
    ctx.arc(origin.x, origin.y, 3, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();
}


// fpsHandler(20, 60);
function fpsHandler(miliDelay, desiredFps, curFrame){
    let skip = false;
    let curFps = Math.round(1000/miliDelay);
    let neededFps = desiredFps - curFps;
    skip = neededFps < 0;

    let everySomeFrames = skip?Math.floor(curFps / desiredFps):Math.floor(desiredFps / curFps);

    if(curFrame % everySomeFrames === 0 && skip){
        for(let i = 0;i<everySomeFrames;i++){
            loop();
        }
    }else if(!skip){
        loop();
        if(curFrame % everySomeFrames === 0){
            loop();
        }
    }
}

const fps60 = 1000/16;
let curFrame = 0;
setTimeout(() => {
    let miliDelay = 50;
    let desiredFps = 100;
    setInterval(() => {
        fpsHandler(miliDelay, desiredFps, curFrame);
        curFrame = curFrame===1000/miliDelay?0:curFrame+1;

    }, miliDelay);
}, 500);



function clear(ctx) {
    let ogFill = ctx.fillStyle;
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = ogFill;
}
