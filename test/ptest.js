import Boid from "../src/Boid.js";
import {default as V} from "../src/Vector.js";
import BoidSimulation from "../src/BoidSimulation2.js";

const canvas = document.querySelector('canvas#myCanvas');
const ctx = canvas.getContext('2d');
let width, height;
width = ctx.canvas.width = window.innerWidth;
height = ctx.canvas.height = window.innerHeight;

let boids = [];
for(let i = 0;i<500;i++){
    let color = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
    color = color.map((val, i, arr) => {
        let less = 0;
        for(let j = 0 ;j<arr.length;j++){
            if(j===i)continue;
            if(val < arr[j]){
                less++;
            }else if(val > arr[j]){
                less--;
            }
        }
        return less < 0 ? 0 : less > 0 ? 255 : val ;
    });
    boids.push(new Boid(
        Math.random() * width,
        Math.random() * height,
        {
            ctx,
            color:`rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`,
            w:5,
            h:10,
            maxSpeed:5,
            minSpeed:1
        }
    ))
}
let bs = new BoidSimulation({
    flock:boids
});

let speed = 0;
let interval = setInterval(loop, speed);
function loop() {
    ctx.fillStyle = `rgba(0,0,0,1)`;
    ctx.fillRect(0, 0, width, height);
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