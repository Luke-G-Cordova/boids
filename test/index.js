import Turtle from "../src/Turtle.js";
import {default as V} from "../src/Vector.js";
import Boid from "../src/Boid.js";
import Flock from "../src/Flock.js";
import BoidSimulation from '../src/BoidSimulation.js';

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let center = V.createNew(canvas.width/2, canvas.height/2);

let boid = new Boid(150, 100, {
    ctx: ctx,
});
let boid1 = new Boid(200, 100, {
    ctx: ctx,
    color: 'red'
});
boid.velocity.add(V.createNew(10, 0));
boid.velocity.addAngle(Math.PI);
console.log(boid.canSee(boid1.position));
// boid.move();

ctx.fillRect(0,0,canvas.width, canvas.height);
function loop(){
    clear(ctx);
    boid1.draw();
    boid.draw();
    boid.drawVision();
    boid.drawVelocity('cyan');
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



function walls(turtle){
    if(turtle.position.x <= 100){
        turtle.addForce(V.createNew(1, 0));
    }else if(turtle.position.x >= canvas.width - 100){
        turtle.addForce(V.createNew(-1, 0));
    }
    if(turtle.position.y <= 100){
        turtle.addForce(V.createNew(0, 1));
    }else if(turtle.position.y >= canvas.height - 100){
        turtle.addForce(V.createNew(0, -1));
    }
}