import Boid from '../src/Boid.js';
import {BoidSimulation as bs} from '../src/BoidSimulation.js';
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

bs.ctx = ctx;
// bs.createPopulation(20);
let myBoid = new Boid({x: 100, y: 100, color: 'red'});
// let my2Boid = new Boid({x: 100, y: 120, color: 'red'});
// let my2Boid = new Boid({x: 50, y: 150, color: 'red'});
// let my2Boid = new Boid({x: 50, y: 100, color: 'red'});
// let my2Boid = new Boid({x: 50, y: 50, color: 'red'});
// let my2Boid = new Boid({x: 100, y: 50, color: 'red'});
// let my2Boid = new Boid({x: 150, y: 50, color: 'red'});
// let my2Boid = new Boid({x: 150, y: 100, color: 'red'});
// let my2Boid = new Boid({x: 150, y: 150, color: 'red'});
bs.boids.population.push(myBoid);
// bs.boids.population.push(my2Boid);
// myBoid.nextAngle = 90;
// console.log(myBoid.canSee({otherBoid: my2Boid}));
// console.log(myBoid.canSee(my2Boid));

// for(let i = 0;i< bs.boids.population.length;i++){
//     if(myBoid === bs.boids.population[i])continue;
//     if(myBoid.canSee(bs.boids.population[i])){
        // console.log(bs.boids.population[i]);
//     }
// }

setInterval(() => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // myBoid.drawVision(ctx);
    // console.log(myBoid.getX());
    myBoid.moveInDirection(myBoid.nextAngle);
    myBoid.drawOnCanvas(ctx);
    // bs.loop();

}, 1000 / 60);

window.addEventListener('click', (e) => {
    console.log(e);
    myBoid.nextAngle = myBoid.degreesAway(e.clientX, e.clientY);
    console.log(myBoid.nextAngle, e.clientX, e.clientY, myBoid.getX(), myBoid.getY());
});