import Boid from "../src/Boid.js";
import {default as V} from "../src/Vector.js";
import BoidSimulation from "../src/BoidSimulation2.js";

const canvas = document.querySelector('canvas#myCanvas');
const ctx = canvas.getContext('2d');
let width, height;
width = ctx.canvas.width = window.innerWidth;
height = ctx.canvas.height = window.innerHeight;

let boids = [];
for(let i = 0;i<50;i++){
    boids.push(new Boid(
        Math.random() * width,
        Math.random() * height,
        {
            ctx,
            color:'blue',
            w:15,
            h:30,
        }
    ))
}
let bs = new BoidSimulation({
    flock:boids
});

let speed = 15;
let interval = setInterval(loop, speed);
function loop() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    // for(let boid of boids){
    //     boid.velocity.add(V.createRandom(-1, 1).normalize().mult(.5));
    //     boid.move();
    //     boid.draw();
    // }
    bs.loop((boid) => {
        walls(boid);
        boid.draw();
    });

}
window.addEventListener('click', () => {
    if(interval !== null){
        clearInterval(interval);
        interval = null;
    }else{
        interval = setInterval(loop, speed);
    }
});

function walls(boid){
    if(boid.position.x < 0){
        boid.position.x = ctx.canvas.width;
    }else if(boid.position.x > ctx.canvas.width){
        boid.position.x = 0;
    }
    if(boid.position.y < 0){
        boid.position.y = ctx.canvas.height;
    }else if(boid.position.y > ctx.canvas.height){
        boid.position.y = 0;
    }
}