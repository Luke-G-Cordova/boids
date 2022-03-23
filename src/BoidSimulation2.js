import Boid from "./Boid.js";
import {default as V} from "./Vector.js";


// avgDirSin and avgDirCos are used to calculate the average
// angle of in view boids. avgDirSin stores the sum of the 
// sin angles of all in view boid velocities while avgDirCos 
// stores the sum of the cos angles of all in view boid velocities
// The average is then 
// Math.atan2(avgDirSin/amount_of_in_view_boids, avgDircos/amount_of_in_view_boids)

export default class BoidSimulation{ 
    constructor(options){
        let ogo = {
            flock: null,
            seperationOffset: .01,
            alignmentOffset: .05,
            cohesionOffset: .05,
            max_boid_add: 350
        }
        Object.assign(ogo, options);
        this.flock = ogo.flock;
        this.flockSize = this.flock.length;
        this.seperationOffset = ogo.seperationOffset;
        this.alignmentOffset = ogo.alignmentOffset;
        this.cohesionOffset = ogo.cohesionOffset;
        this.obstacleOffset = ogo.obstacleOffset;
        this.max_boid_add = ogo.max_boid_add;
    }
    loop(drawBoid, ...angleChanger){
        for(let i = 0;i<this.flockSize;i++){


            let seperateSteer = V.createNew(0, 0);
            let seperateCount = 0;
            for(let j = 0;j<this.flockSize;j++){
                if(this.flock[i].canSee(this.flock[j].position)){
                    // seperate
                    let difference = this.flock[i].position.clone();
                    difference.sub(this.flock[j].position);
                    let distance = difference.magnitude;
                    if(distance > 0){
                        difference.normalize();
                        difference.div(distance);
                        seperateSteer.add(difference);
                        seperateCount++;
                    }
                }
            }
            if(seperateCount > 0){
                seperateSteer.div(seperateCount);
            }
            if(seperateSteer.magnitude > 0){
                seperateSteer.normalize();
                seperateSteer.mult(this.flock[i].maxSpeed);
                seperateSteer.sub(this.flock[i].velocity);
                seperateSteer.upperLimit(.05);
            }



            this.flock[i].applyForce(seperateSteer);
            this.flock[i].move();
            drawBoid(this.flock[i]);
            


        }
    }

    addBoid(boid){
        if(this.flock.length > this.max_boid_add){
            this.flock.shift();
        }else{
            this.flockSize++;
        }
        this.flock.push(boid);
    }
    deleteBoid(boid){
        this.flock.splice(this.flock.indexOf(boid), 1);
        this.flockSize--;
        return this.flock.length;
    }
    
    setSeperationOffset(seperationOffset){
        this.seperationOffset = seperationOffset;
    }
    setAlignmentOffset(alignmentOffset){
        this.alignmentOffset = alignmentOffset;
    }
    setCohesionOffset(cohesionOffset){
        this.cohesionOffset = cohesionOffset;
    }
    setObstacleOffset(obstacleOffset){
        this.obstacleOffset = obstacleOffset;
    }
    scale(number, inMin, inMax, outMin, outMax) {
        return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }
}