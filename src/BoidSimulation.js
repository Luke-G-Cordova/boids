import Boid from "../src/Boid.js";
import {default as V} from "../src/Vector.js";



export default class BoidSimulation{ 
    constructor(options){
        let ogo = {
            flock: null, 
            canvas: null
        }
        Object.assign(ogo, options);
        this.flock = ogo.flock;
        this.canvas = ogo.canvas;
    }
    loop(){
        for(let i = this.flock.length - 1;i>=0;i--){
            for(let j = this.flock.length - 1;j>=0;j--){
                if(i===j)continue;
                this.seperation(this.flock[i], this.flock[j]);
            }
            this.walls(this.flock[i]);
            this.flock[i].move();
            this.flock[i].draw();
            // this.flock[i].drawVision();
        }
    }
    seperation(boid, oBoid){
        let rol = boid.rightOrLeft(oBoid.position);
        let dis = rol.distance * .02;
        boid.velocity.addAngle(.1 * dis * rol.direction);
    }
    walls(boid){
        if(boid.position.x < 0){
            boid.position.x = this.canvas.width;
        }else if(boid.position.x > this.canvas.width){
            boid.position.x = 0;
        }
        if(boid.position.y < 0){
            boid.position.y = this.canvas.height;
        }else if(boid.position.y > this.canvas.height){
            boid.position.y = 0;
        }
    }
}