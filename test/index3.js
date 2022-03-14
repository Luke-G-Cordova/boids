import BoidSimulation from '../src/BoidSimulation.js';
import Boid from "../src/Boid.js";
import {default as V} from "../src/Vector.js";

let boids = []; 
let paragraph = document.querySelector('.myP');
let font = window.getComputedStyle(paragraph, null).getPropertyValue('font');

let size = font.substring(0, font.indexOf('x')+1);
size = parseInt(size);
font = font.substring(font.indexOf('x')+1);

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let text = paragraph.childNodes[0];
// split the text node into letters
let letters = [];
let hold; 
let lettersLength = text.length;
let tag;
for(let i = 0, k = 0;i<lettersLength;i++){
    hold = text.splitText(1);
    if(text.data.trim() !== ''){
        tag = document.createElement('span');
        tag.innerHTML = text.data;
        paragraph.insertBefore(tag, hold);
        text.data = '';
        letters.push(tag);
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
        )
        boids[k].velocity.add(
            V.createNew(
                (Math.random() * 2) -1, 
                (Math.random() * 2) -1
            ).normalize().mult(2)
        );
        boids[k].tag = letters[k];
        let range = document.createRange();
        range.selectNodeContents(letters[k].firstChild);
        boids[k].nodeRect = range.getClientRects()[0];
        boids[k].nodePosVec = V.createNew(boids[k].nodeRect.x, boids[k].nodeRect.y);
        boids[k].text = letters[k].firstChild.data;
        k++;
    }
    text = hold;
}


let bs = new BoidSimulation({
    flock: boids
});

var interval = setInterval(loop, 0);
let dist = 5;
let angleAmt = .001;
let addAmt = .0001;
let mySize = size;
ctx.fillStyle = 'white';
clear(ctx);
function loop(){
    clear(ctx);
    bs.loop((boid, boidArray) => {
        walls(boid);
        ctx.font = `${mySize}${font}`;
        
        ctx.save();
        ctx.translate(boid.position.x, boid.position.y);
        ctx.rotate(-boid.velocity.getAngle() + (Math.PI/2));
        ctx.fillText(boid.text, 0, 0);
        ctx.restore();
        if(
            boid.position.x <= boid.nodeRect.x + dist && 
            boid.position.x >= boid.nodeRect.x - dist && 
            boid.position.y <= boid.nodeRect.y + dist &&
            boid.position.y >= boid.nodeRect.y - dist
        ){
            boid.tag.style.color = 'white';
            if(bs.deleteBoid(boid) === 0){
                clearInterval(interval);
                clear(ctx);
                document.querySelector('span#wikilink').className = "appear";
            }
        }
    }, () => {

    }, (boid) => {
        let rol = boid.rightOrLeft(boid.nodePosVec);
        mySize = size + (rol.distance/10) + 'px';
        return -angleAmt * rol.direction2;
    });
    angleAmt += addAmt;
    
}


function clear(ctx) {
    let ogFill = ctx.fillStyle;
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = ogFill;
}
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
