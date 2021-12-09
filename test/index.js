import Turtle from "../src/Turtle.js";
import {default as V} from "../src/Vector.js";
import Boid from "../src/Boid.js";
import Flock from "../src/Flock.js";
import BoidSimulation from '../src/BoidSimulation.js';

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let boids = [];

for(let i = 0;i<400;i++){
    let rand = Math.round(Math.random()*2);

    boids.push(
        new Boid(
            Math.random() * ctx.canvas.width, 
            Math.random() * ctx.canvas.height, 
            {
                ctx: ctx,
                color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
                visibility: 50,
                eiboh: 270
            }
        )
    );
    boids[i].velocity.add(
        V.createNew(
            (Math.random() * 2) -1, 
            (Math.random() * 2) -1
        ).normalize().mult(3)
    );
}

let bs = new BoidSimulation({
    flock: boids, 
    canvas: canvas
});

ctx.fillRect(0,0,canvas.width, canvas.height);
function loop(){
    clear(ctx);
    bs.loop();
}
var speed = 1;
var interval = setInterval(loop, speed);
function clear(ctx) {
    let ogFill = ctx.fillStyle;
    ctx.fillStyle = 'rgba(0,0,0,.03)';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = ogFill;
}
window.addEventListener('click', () => {
    if(interval!=null){
        clearInterval(interval);
        interval = null;
    }else{
        interval = setInterval(loop, speed);
    }
})


