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
        new Boid(Math.random() * canvas.width, Math.random() * canvas.height, {
            w: 10, 
            h: 20, 
            color: 'yellow', 
            ctx: ctx
        })
    );
    boids[i].addForce(V.createNew((Math.random() * 2)-1, (Math.random() * 2)-1));
}

ctx.fillRect(0,0,canvas.width, canvas.height);
function loop(){
    clear(ctx);
    for(let i = 0;i<boids.length;i++){
        boids[i].draw(ctx);
        boids[i].drawVelocity('red');
        walls(boids[i]);
        boids[i].move();
    }
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
    setInterval(loop, 20);
}, 500);



function clear(ctx) {
    let ogFill = ctx.fillStyle;
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = ogFill;
}
