import Turtle from "../src/Turtle.js";
import {default as V} from "../src/Vector.js";
import Boid from "../src/Boid.js";
import Flock from "../src/Flock.js";
import BoidSimulation from '../src/BoidSimulation.js';

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let center = V.createNew(canvas.width/2, canvas.height/2);
let boids = [];
for(let i = 0;i<100;i++){
    boids.push(
        new Boid(
            Math.random() * canvas.width, 
            Math.random() * canvas.height, 
            {
                ctx: ctx,
                color: 'yellow',
                visibility: 50,
                eiboh: 270
            }
        )
    );
    boids[i].velocity.add(
        V.createNew(-1,
            // (Math.random() * 2) -1, 
            (Math.random() * 2) -1
        ).normalize().mult(1)
    );
}
let bs = new BoidSimulation({
    flock: boids, 
    canvas: canvas
});

let boid = new Boid(100, 100, {ctx:ctx})
boid.addForce(V.createNew(100, 0));
let boid1 = new Boid(100, 150, {ctx:ctx})
ctx.fillRect(0,0,canvas.width, canvas.height);
function loop(){
    clear(ctx);
    bs.loop();
}


setTimeout(() => {
    setInterval(loop, 20);
}, 500);
function clear(ctx) {
    let ogFill = ctx.fillStyle;
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = ogFill;
}



