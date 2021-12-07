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
                color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
                visibility: 50,
                eiboh: 90
            }
        )
    );
    boids[i].velocity.add(
        V.createNew(1, 
            // (Math.random() * 2) -1, 
            (Math.random() * 2) -1
        ).normalize().mult(2)
    );
}
let bs = new BoidSimulation({
    flock: boids, 
    canvas: canvas
});


let boid = new Boid(100, 100, {ctx:ctx})
boid.velocity.add(V.createNew(1, 0));
boid.velocity.addAngle(Math.PI);

let boid1 = new Boid(100, 150, {ctx:ctx});
boid1.velocity.add(V.createNew(1, (Math.random() * 2) -1).normalize());
boid1.velocity.addAngle(Math.PI);

let boid2 = new Boid(100, 50, {ctx:ctx});
boid2.velocity.add(V.createNew(1, (Math.random() * 2) -1).normalize());
boid2.velocity.addAngle(Math.PI);

ctx.fillRect(0,0,canvas.width, canvas.height);
function loop(){
    clear(ctx);

    bs.loop();
}
function alignment(boid, heading){
    // if(heading > Math.PI){
    //     heading -= Math.PI;
    // }
    let curDir = boid.velocity.getAngle();
    let diff = heading - curDir;
    let direction;
    if(diff < - Math.PI){
        diff += Math.PI*2;
    }
    if(diff > Math.PI){
        diff -= Math.PI*2;
    }
    direction = diff > 0 ? 1 : diff < 0 ? -1 : 0;
    return .02 * direction;
}

setTimeout(() => {
    setInterval(loop, 20);
}, 500);
function clear(ctx) {
    let ogFill = ctx.fillStyle;
    ctx.fillStyle = 'rgba(0,0,0,.03)';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = ogFill;
}



