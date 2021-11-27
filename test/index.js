import Turtle from "../src/Turtle.js";

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let turtle = new Turtle({x: 100, y: 100, velocity: [3, 3]});


setInterval(loop, 10);
// loop();
let deg = 0;
function loop(){
    clear(ctx);
    draw(ctx, turtle.getXPts(), turtle.getYPts());
    turtle.moveInDirection(deg);
    deg+=1;
}




function draw(ctx, xPts, yPts){
    let ogFill = ctx.fillStyle;
    ctx.fillStyle = 'black';
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