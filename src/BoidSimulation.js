
import Boid from './Boid.js';
import Flock from './Flock.js';



export var BoidSimulation = {
    boids: new Flock(),
    ctx: null,
    loop : function(){
        for(let i = this.boids.population.length-1;i>=0;i--){
            for(let j = this.boids.population.length-1;j>=0;j--){
                this.boids.seperate(this.boids.population[i], this.boids.population[j]);
                
            }
            this.step(this.boids.population[i]);
            this.boids.population[i].drawOnCanvas(this.ctx);
            // this.boids.walls(this.boids.population[i], 0, 500, 0, 500);
        }
    },
    createPopulation(size, options={}){
        for(let i = 0;i<size;i++){
            options.x = Math.random() * 500;
            options.y = Math.random() * 500;
            // options.nextAngle = Math.random() * 360;
            this.boids.population.push(new Boid(options));
        }
    }, 
    step(boid){
        boid.moveInDirection(boid.nextAngle);
    } 
    
}


