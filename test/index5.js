import Turtle from "../src/Turtle.js";
import Obstacle from "../src/Obstacle.js";
import {default as V} from "../src/Vector.js";
import Boid from "../src/Boid.js";
import Flock from "../src/Flock.js";
import BoidSimulation from '../src/BoidSimulation.js';

let canvas = document.querySelector('canvas');

let ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let circleVector = V.createNew(200, 0);

let boids = [];
let obstacles = [];
for(let i = 0;i<50;i++){
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
    let width = Math.random() * (ctx.canvas.width/4) + (ctx.canvas.width/2);
    let height = Math.random() * (ctx.canvas.height/8) + (ctx.canvas.height/2);
    // if(width<(ctx.canvas.width/2) + 200 && width>(ctx.canvas.width/2) -200){
    //     color[0] = 0;
    //     color[1] = 255;
    //     color[2] = 0;
    // }
    boids.push(
        new Boid(
            width, 
            height, 
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
            -1, 
            1
        ).normalize().mult(1)
    );
    boids[i].add = 1;
}

// let len = 100;
for(let i = 0;i<10;i++){
    obstacles.push(new Obstacle(
        (ctx.canvas.width/2) + (i*20) - 30,
        (ctx.canvas.height/2) - 50,
        {ctx:ctx}
    ));
    obstacles.push(new Obstacle(
        (ctx.canvas.width/2) + (i*20),
        (ctx.canvas.height/2) - 50,
        {ctx:ctx}
    ));
}
// for(let i = 0;i<len;i++){
    
//     obstacles.push(new Obstacle(
//         i * (ctx.canvas.width/len),
//         150,
//         {ctx:ctx}
//     ));
//     obstacles.push(new Obstacle(
//         i * (ctx.canvas.width/len),
//         0,
//         {ctx:ctx}
//     ));
//     // obstacles.push(new Obstacle(
//     //     circleVector.x + (ctx.canvas.width/2),
//     //     circleVector.y + (ctx.canvas.height/2),
//     //     {ctx: ctx}));
//     // obstacles.push(new Obstacle(
//     //     i * (ctx.canvas.width/ len),
//     //     ctx.canvas.height - 10,
//     //     {ctx: ctx}));
//     // circleVector.addAngle((Math.PI*2)/len);
// }

let bs = new BoidSimulation({
    flock: boids,
    obstacles: obstacles
});

let step = false;
ctx.fillRect(0,0,canvas.width, canvas.height);

function loop(){
    clear(ctx);
    bs.loop((boid, boidArray) => {
        walls(boid);
        boid.draw();
        // boid.drawVision();
        // boid.drawVision();
    }, (obstacle, obstaclesArray) => {
        obstacle.draw();
    });
}
var speed = 20;
// var interval = setInterval(loop, speed);
var interval = null;
function clear(ctx) {
    let ogFill = ctx.fillStyle;
    ctx.fillStyle = 'rgba(255, 255, 255,1)';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = ogFill;
}
window.addEventListener('mousedown', (e) => {
    if(interval!=null){
        clearInterval(interval);
        interval = null;
    }else{
        interval = setInterval(loop, speed);
    }
    window.onmousemove = (e) => {
        // bs.addObstacle(new Obstacle(e.offsetX, e.offsetY, {ctx: ctx}));
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


