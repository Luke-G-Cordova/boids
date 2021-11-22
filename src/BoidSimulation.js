
import Boid from './Boid.js';
import Flock from './Flock.js';



export var BoidSimulation = {
    boids: new Flock(),
    ctx: null,
    loop : function(){
        for(let i = this.boids.population.length-1;i>=0;i--){
            this.boids.seperate(this.boids.population[i]);
            this.boids.population[i].drawOnCanvas(this.ctx);
        }
    },
    createPopulation(size, options={}){
        for(let i = 0;i<size;i++){
            options.x = Math.random() * 500;
            options.y = Math.random() * 500;
            options.nextAngle = Math.random() * 360;
            this.boids.population.push(new Boid(options));
        }
    }
}


