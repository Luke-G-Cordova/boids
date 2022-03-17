import Turtle from "../src/Turtle.js";
import Obstacle from "../src/Obstacle.js";
import {default as V} from "../src/Vector.js";
import Boid from "../src/Boid.js";
import Flock from "../src/Flock.js";
import BoidSimulation from '../src/BoidSimulation.js';

let seperationOffset = .01;
let alignmentOffset = .2;
let cohesionOffset = .15;
let obstacleOffset = .2;

let canvas = document.querySelector('canvas');
let sep = document.querySelector('.sep');
let sepLab = document.querySelector('.sepLab');
sep.value = seperationOffset;
sepLab.innerHTML = seperationOffset;
let ali = document.querySelector('.ali');
let aliLab = document.querySelector('.aliLab');
ali.value = seperationOffset;
aliLab.innerHTML = alignmentOffset;
let coh = document.querySelector('.coh');
let cohLab = document.querySelector('.cohLab');
coh.value = seperationOffset;
cohLab.innerHTML = cohesionOffset;
let obs = document.querySelector('.obs');
let obsLab = document.querySelector('.obsLab');
obs.value = obstacleOffset;
obsLab.innerHTML = obstacleOffset;
sep.addEventListener('input', (e) => {
    let num = parseFloat(sep.value);
    if(isNaN(num)){
        num = 0;
    }
    bs.setSeperationOffset(num);
    sepLab.innerHTML = num;
});
ali.addEventListener('input', (e) => {
    let num = parseFloat(ali.value);
    if(isNaN(num)){
        num = 0;
    }
    bs.setAlignmentOffset(num);
    aliLab.innerHTML = num;
});
coh.addEventListener('input', (e) => {
    let num = parseFloat(coh.value);
    if(isNaN(num)){
        num = 0;
    }
    bs.setCohesionOffset(num);
    cohLab.innerHTML = num;
});
obs.addEventListener('input', (e) => {
    let num = parseFloat(obs.value);
    if(isNaN(num)){
        num = 0;
    }
    bs.setObstacleOffset(num);
    obsLab.innerHTML = num;
});
let ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let circleVector = V.createNew(40, 0);

let boids = [];
let obstacles = [];
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
    let width = Math.random() * ctx.canvas.width;
    let height = Math.random() * ctx.canvas.height;
    boids.push(
        new Boid(
            width, 
            height, 
            {
                ctx: ctx,
                color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`,
                visibility: 100,
                eiboh: 90,
                w:5,
                h:10
            }
        )
    );
    boids[i].velocity.add(
        V.createNew(
            (Math.random() * 2) -1, 
            (Math.random() * 2) -1
        ).normalize().mult(2)
    );
    boids[i].add = 1;
}


// for(let j = 0;j<15;j++){
//     let w = Math.random() * ctx.canvas.width;
//     let h = Math.random() * ctx.canvas.height;
//     let len = 20;
//     for(let i = 0;i<len;i++){
//         obstacles.push(new Obstacle(
//             circleVector.x + w,
//             circleVector.y + h,
//             {ctx: ctx}));
//         circleVector.addAngle((Math.PI*2)/len);
//     }
// }


let bs = new BoidSimulation({
    flock: boids,
    obstacles: obstacles,
    seperationOffset,
    alignmentOffset,
    cohesionOffset,
    obstacleOffset,
    max_boid_add: 500
});

let pred = new Boid(0, ctx.canvas.height/2, {
    ctx:ctx,
    color: 'red',
    w:15,
    h:30
});

pred.velocity.add(V.createNew(1, 0));

ctx.fillRect(0,0,canvas.width, canvas.height);
function loop(){
    clear(ctx);
    bs.loop((boid, boidArray) => {
        walls(boid);
        boid.draw();
        // boid.drawVision();
    }, (obstacle, obstaclesArray) => {
        obstacle.draw();
    }, (boid) => {
        let rol = boid.rightOrLeft(pred.position);
        return obstacleOffset * scale((boid.visibility - rol.distance), 0, boid.visibility, 0, Math.PI*2) * rol.direction;
    });
    walls(pred);
    pred.move();
    pred.draw();
}
var speed = 0;
var interval = setInterval(loop, speed);
function clear(ctx) {
    let ogFill = ctx.fillStyle;
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = ogFill;
}

let lastX, lastY;
window.addEventListener('mousedown', (e) => {
    // if(interval!=null){
    //     clearInterval(interval);
    //     interval = null;
    // }else{
    //     interval = setInterval(loop, speed);
    // }
    // lastX = e.offsetX;
    // lastY = e.offsetY;
    window.onmousemove = (e) => {
        // bs.addObstacle(new Obstacle(e.offsetX, e.offsetY, {ctx: ctx}));
    //     let color = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
    //     color = color.map((val, i, arr) => {
    //         let less = 0;
    //         for(let j = 0 ;j<arr.length;j++){
    //             if(j===i)continue;
    //             if(val < arr[j]){
    //                 less++;
    //             }else if(val > arr[j]){
    //                 less--;
    //             }
    //         }
    //         return less < 0 ? 0 : less > 0 ? 255 : val ;
    //     });
        
    //     let myBoid = new Boid(
    //         e.offsetX, 
    //         e.offsetY, 
    //         {
    //             ctx: ctx,
    //             color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`,
    //             visibility: 50,
    //             eiboh: 270
    //         }
    //     );
    //     myBoid.velocity.add(
    //         V.createNew(
    //             e.offsetX - lastX > 0 ? 1:-1, 
    //             e.offsetY - lastY> 0 ? 1:-1
    //         ).normalize().mult(3)
    //     );
    //     bs.addBoid(myBoid)
    //     lastX = e.offsetX;
    //     lastY = e.offsetY;
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


function scale(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}