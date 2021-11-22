import Boid from '../src/Boid.js';
import {BoidSimulation as bs} from '../src/BoidSimulation.js';
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

bs.ctx = ctx;
bs.createPopulation(20);
let myBoid = new Boid({x: 100, y: 100, color: 'red'})
bs.boids.population.push(myBoid);
// myBoid.rotateTo(180);
for(let i = 0;i< bs.boids.population.length;i++){
    if(myBoid === bs.boids.population[i])continue;
    if(myBoid.canSee(bs.boids.population[i])){
        console.log(bs.boids.population[i]);
    }
}

setInterval(() => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // myBoid.drawVision(ctx);

    bs.loop();
}, 1000 / 60);
