import Turtle from "../src/Turtle.js";
import {default as V} from "../src/Vector.js";
import Boid from "../src/Boid.js";
import Flock from "../src/Flock.js";
import BoidSimulation from '../src/BoidSimulation.js';

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let turtle = new Turtle(300, 300);
let turtle1 = new Turtle(canvas.width-300, canvas.height-300);
let center = V.createNew(canvas.width/2, canvas.height/2);
turtle.addForce(V.createNew(20, 10));
turtle1.addForce(V.createNew(20, -10));

ctx.fillRect(0,0,canvas.width, canvas.height);

function loop(){
    clear(ctx);
    turtle.move();
    turtle1.move();
    turtle.subForce(turtle1.position);
    turtle1.subForce(turtle.position);
    turtle.subForce(center);
    turtle1.subForce(center);

    drawTurt(turtle);
    drawVec(turtle.velocity, turtle.position, 'red');
    drawTurt(turtle1);
    drawVec(turtle1.velocity, turtle1.position, 'red');
    // drawVec(turtle.acceleration, turtle.position, 'yellow');
    drawStabVec(turtle.position, turtle1.position, 'purple');
    drawStabVec(turtle1.position, turtle.position, 'purple');
}

function drawTurt(turtle){
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(turtle.position.x, turtle.position.y, 5, 0, 2*Math.PI);
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

setTimeout(() => {
    setInterval(loop, 20)
}, 500);
function clear(ctx) {
    let ogFill = ctx.fillStyle;
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = ogFill;
}
