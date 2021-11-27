import Flock from "./Flock.js";


export default class BoidSimulation{ 
    constructor(options){
        let ogo = {
            ctx: null,
            flockSize: 20
        }
        Object.assign(ogo, options);
        this.ctx = ogo.ctx;
        this.flock = new Flock(ogo.flockSize);
        this.boids = this.flock.population;
    }
    loop(){
        for(let i = this.boids.length;i>=0;i--){
            for(let j = this.boids.length;j>=0;j--){
                if(i===j)continue;
                // this.flock.seperate(this.boids[i], this.boids[j]);

            }
            // this.step(this.boids[i]);

            this.boids[i].draw(this.ctx);
        }
    }
    step(boid){
        boid.moveInDirection(boid.nextAngle);
    }
}