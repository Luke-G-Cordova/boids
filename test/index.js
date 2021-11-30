import Turtle from "../src/Turtle.js";
import Boid from "../src/Boid.js";
import Flock from "../src/Flock.js";
import BoidSimulation from '../src/BoidSimulation.js';

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
// let bs = new BoidSimulation({ctx: ctx, flockSize: 20});
let turt = new Turtle({x: 10, y: 10});
turt.addForce(.5, 0);
let mouseX = turt.getX(), mouseY = turt.getY();

setInterval(loop, 20);
function loop(){
    turt.subForce(mouseX, mouseY);

    turt.moveTurtle();

    clear(ctx);
    drawTurt(turt);

}
function drawTurt(turtle){
    ctx.fillRect(turtle.getX(), turtle.getY(), 10, 10);
}

function clear(ctx){
    let ogFill = ctx.fillStyle;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = ogFill;
}

canvas.onmousemove = (e) => {
    // console.log(turt.getPosVec());
    // console.log(e.x, e.y);
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    // turt.addForce(e.x, e.y);
}