import Boid from '../src/Boid.js';
import {BoidSimulation as bs} from '../src/BoidSimulation.js';
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

bs.ctx = ctx;
// bs.createPopulation(20);
let myBoid = new Boid({x: 100, y: 100, color: 'red'});
let my2Boid = new Boid({x: 50, y: 150, color: 'red'});
bs.boids.population.push(myBoid);
bs.boids.population.push(my2Boid);
let distance = Math.pow(my2Boid.getX() - myBoid.getX(), 2)+Math.pow(my2Boid.getY() - myBoid.getY(), 2);
distance = Math.sqrt(distance);
console.log(distance);

// myBoid.rotateTo(-45);
// console.log(myBoid.degreesAway(my2Boid.getX(), my2Boid.getY()))
// myBoid.rotateTo(400);
for(let i = 0;i< bs.boids.population.length;i++){
    if(myBoid === bs.boids.population[i])continue;
    if(myBoid.canSee(bs.boids.population[i])){
        // console.log(bs.boids.population[i]);
    }
}

setInterval(() => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // myBoid.drawVision(ctx);

    bs.loop();
    // bs.boids.step();

}, 1000 / 60);
