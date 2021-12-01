import Turtle from "../src/Turtle.js";
import {default as V} from "../src/Vector.js";
import Boid from "../src/Boid.js";
import Flock from "../src/Flock.js";
import BoidSimulation from '../src/BoidSimulation.js';

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let mouseX = canvas.width/2, mouseY = canvas.height/2;

let turt = new Turtle({x: 200, y: 200, speed: 5, accelerant: .5});
let moon = new Turtle({x: 210, y: 210, speed: 1, accelerant: 5});
moon.addForce(-5, 0);

setTimeout(() => {
    setInterval(loop, 20)
}, 500);

function loop(){
    clear(ctx);
    turt.subForce(mouseX, mouseY);
    turt.moveTurtle();
    drawTurt(turt, 10);
    moon.subForce(turt.getX(), turt.getY());
    moon.moveTurtle();
    drawTurt(moon, 3, 'white');
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
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = ogFill;
}

canvas.addEventListener('mousemove', (e) => {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    
})