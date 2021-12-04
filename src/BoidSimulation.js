import Boid from "../src/Boid.js";
import {default as V} from "../src/Vector.js";



export default class BoidSimulation{ 
    constructor(options){
        let ogo = {
            ctx: null,
            flockSize: 20
        }
        Object.assign(ogo, options);
        this.ctx = ogo.ctx;
        this.boids = [];
        for(let i = 0;i<flockSize;i++){
            boids.push(
                new Boid(Math.random() * canvas.width, Math.random() * canvas.height, {
                    w: 10, 
                    h: 20, 
                    color: 'yellow', 
                    ctx: ctx
                })
            );
            boids[i].addForce(V.createNew((Math.random() * 2)-1, (Math.random() * 2)-1));
        }
    }
    loop(){
        for(let i = this.boids.length;i>=0;i--){
            for(let j = this.boids.length;j>=0;j--){
                if(i===j)continue;

            }

            this.boids[i].draw(this.ctx);
            this.boids[i].move();
        }
    }
    seperation(boid){

    }
}