import Turtle from "../src/Turtle.js";
import Boid from "../src/Boid.js";
import Flock from "../src/Flock.js";
import BoidSimulation from '../src/BoidSimulation.js';

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let bs = new BoidSimulation({ctx: ctx});

setInterval(loop, 5);
function loop(){
    clear(ctx);
    bs.loop();

}


function clear(ctx){
    let ogFill = ctx.fillStyle;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = ogFill;
}