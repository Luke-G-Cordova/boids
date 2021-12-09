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
        V.createNew(
            // (Math.random() * 2) -1, 
            (Math.random() * 2) -1
        ).normalize().mult(2)
    );
}
// let bs = new BoidSimulation({
//     flock: boids, 
//     canvas: canvas
// });


let boid = new Boid(100, 50, {ctx:ctx, color: 'green'})
boid.velocity.add(V.createNew((Math.random() * 2) -1, (Math.random() * 2) -1));
// boid.velocity.addAngle(Math.PI);

let boid1 = new Boid(100, 100, {ctx:ctx, color: 'magenta'});
boid1.velocity.add(V.createNew((Math.random() * 2) -1, (Math.random() * 2) -1).normalize());
// boid1.velocity.addAngle(Math.PI);

let boid2 = new Boid(100, 150, {ctx:ctx, color: 'cyan'});
boid2.velocity.add(V.createNew((Math.random() * 2) -1, (Math.random() * 2) -1).normalize());
// boid2.velocity.addAngle(Math.PI);

ctx.fillRect(0,0,canvas.width, canvas.height);
function loop(){
    clear(ctx);
    boid.drawVision();
    boid1.drawVision();
    boid2.drawVision();
    boid.draw();
    boid1.draw();
    boid2.draw();

    let al = boid.velocity.getAngle();
    if(al<0)al = al+(Math.PI*2);
    let al1 = boid1.velocity.getAngle();
    if(al1<0)al1 = al1+(Math.PI*2);
    let al2 = boid2.velocity.getAngle();
    if(al2<0)al2 = al2+(Math.PI*2);

    let aal = (al1+al2)/2;
    let aal1 = (al+al2)/2;
    let aal2 = (al+al1)/2;

    ctx.font = '30px serif';
    ctx.fillStyle = 'white';
    ctx.fillText(Math.round(aal * 180/Math.PI), boid.position.x + 100, boid.position.y);
    ctx.fillText(': '+Math.round(al * 180/Math.PI), boid.position.x + 200, boid.position.y);
    ctx.fillText(Math.round(aal1 * 180/Math.PI), boid1.position.x + 100, boid1.position.y);
    ctx.fillText(': '+Math.round(al1 * 180/Math.PI), boid1.position.x + 200, boid1.position.y);
    ctx.fillText(Math.round(aal2 * 180/Math.PI), boid2.position.x + 100, boid2.position.y);
    ctx.fillText(': '+Math.round(al2 * 180/Math.PI), boid2.position.x + 200, boid2.position.y);

    boid.velocity.addAngle(alignment(boid, aal));
    boid1.velocity.addAngle(alignment(boid1, aal1));
    boid2.velocity.addAngle(alignment(boid2, aal2));
    // bs.loop();
}
function alignment(boid, heading){
    // if(heading > Math.PI){
    //     heading -= Math.PI*2;
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
    return .01 * direction;
}
var interval = setInterval(loop, 100);
// setTimeout(() => {
    
// }, 500);
function clear(ctx) {
    let ogFill = ctx.fillStyle;
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = ogFill;
}
window.addEventListener('click', () => {
    if(interval!=null){
        clearInterval(interval);
        interval = null;
    }else{
        interval = setInterval(loop, 100);
    }
})


