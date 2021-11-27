import Turtle from "../src/Turtle.js";
import Boid from "../src/Boid.js";

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let boid = new Boid({x: 100, y: 100, velocity: [1, 1]});
let boid2 = new Boid({x: 50, y: 100, velocity: [1, 1]});

// boid.rotateTo(-121);
draw(ctx, boid.getXPts(), boid.getYPts(), 'red');
draw(ctx, boid2.getXPts(), boid2.getYPts());

console.log(boid.canSee({boid: boid2}));
// setInterval(loop, 5);
// loop();
let deg = 0;
function loop(){
    clear(ctx);
    draw(ctx, boid.getXPts(), boid.getYPts());
    boid.moveInDirection(deg);
    deg+=1;
}




function draw(ctx, xPts, yPts, color='black'){
    let ogFill = ctx.fillStyle;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(xPts[0], yPts[0]);
    ctx.lineTo(xPts[1], yPts[1]);
    ctx.lineTo(xPts[2], yPts[2]);
    ctx.lineTo(xPts[0], yPts[0]);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = ogFill;
}

function clear(ctx){
    let ogFill = ctx.fillStyle;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = ogFill;
    
}