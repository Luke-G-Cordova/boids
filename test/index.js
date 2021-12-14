import Turtle from "../src/Turtle.js";
import Obstical from "../src/Obstical.js";
import {default as V} from "../src/Vector.js";
import Boid from "../src/Boid.js";
import Flock from "../src/Flock.js";
import BoidSimulation from '../src/BoidSimulation.js';

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let boids = [];
let obsticals = [];
for(let i = 0;i<300;i++){
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
    boids.push(
        new Boid(
            Math.random() * ctx.canvas.width, 
            Math.random() * ctx.canvas.height, 
            {
                ctx: ctx,
                color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`,
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
    boids[i].add = 1;
}


let bs = new BoidSimulation({
    flock: boids,
    obsticals: obsticals
});

ctx.fillRect(0,0,canvas.width, canvas.height);
function loop(){
    clear(ctx);
    bs.loop((boid, boidArray) => {
        boid.move();
        walls(boid);
        boid.draw();
    }, (obstical, obsticalsArray) => {
        obstical.draw();
    });
}
var speed = 0;
var interval = setInterval(loop, speed);
function clear(ctx) {
    let ogFill = ctx.fillStyle;
    ctx.fillStyle = 'rgba(0,0,0,.1)';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = ogFill;
}
window.addEventListener('mousedown', (e) => {
    // if(interval!=null){
    //     clearInterval(interval);
    //     interval = null;
    // }else{
    //     interval = setInterval(loop, speed);
    // }
    window.onmousemove = (e) => {
        bs.addObstical(new Obstical(e.offsetX - 10, e.offsetY - 10, {ctx: ctx}));
    }
    window.onmouseup = (e) => {
        window.onmousemove = null;
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


