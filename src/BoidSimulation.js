import Boid from "../src/Boid.js";
import {default as V} from "../src/Vector.js";


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
            obsticals: null,
            seperationOffset: .01,
            alignmentOffset: .02,
            cohesionOffset: .05,
            obsticalOffset: .07
        }
        Object.assign(ogo, options);
        this.flock = ogo.flock;
        this.obsticals = ogo.obsticals;
        this.seperationOffset = ogo.seperationOffset;
        this.alignmentOffset = ogo.alignmentOffset;
        this.cohesionOffset = ogo.cohesionOffset;
        this.obsticalOffset = ogo.obsticalOffset;
    }
    loop(drawBoid, drawObsticals){
        let avgPos = V.createNew(0, 0);
        let avgDirSin = 0;
        let avgDirCos = 0;
        let count = 0;
        let newAngle = 0;
        let rol;
        let angle;
        for(let i = this.flock.length - 1;i>=0;i--){
            avgPos = V.createNew(0, 0);
            avgDirSin = 0;
            avgDirCos = 0;
            count = 0;
            newAngle = 0;
            rol = null;
    // this block is boids seeing other boids
            for(let j = this.flock.length - 1;j>=0;j--){
                if(i===j)continue;
                rol = this.flock[i].rightOrLeft(this.flock[j].position);
                if(rol.direction!==0){
                    angle = this.flock[j].velocity.getAngle();
                    avgDirSin += Math.sin(angle);
                    avgDirCos += Math.cos(angle);
                    avgPos.add(this.flock[j].position);
                    count++;
                    newAngle += this.seperation(rol, this.flock[i].visibility);
                }
            }
            if(count !== 0){
                avgDirSin /= count;
                avgDirCos /= count;
                avgPos.div(count);

                newAngle += this.alignment(this.flock[i], Math.atan2(avgDirSin, avgDirCos));
                
                rol = this.flock[i].rightOrLeft(avgPos);
                newAngle += this.cohesion(rol);
            }
            // this block is for boids seeing other obsticals
            for(let j = this.obsticals.length - 1;j>=0;j--){
                rol = this.flock[i].rightOrLeft(this.obsticals[j].position);
                newAngle += this.avoidObstical(rol, this.obsticals[j], this.flock[i].visibility);
            }
            this.flock[i].velocity.addAngle(newAngle);
            drawBoid(this.flock[i], this.flock, this.obsticals);
        }
        for(let i = this.obsticals.length - 1;i>=0;i--){
            drawObsticals(this.obsticals[i], this.obsticals);
        }
    }
    seperation(rol, visibility){
        return this.seperationOffset * ((visibility*.1) - (rol.distance*.1)) * rol.direction;
    }
    avoidObstical(rol, obstical, visibility){
        return this.obsticalOffset * ((visibility*.1) - ((rol.distance-(obstical.width/2))*.1)) * rol.direction;
    }
    alignment(boid, heading){
        let curDir = boid.velocity.getAngle();
        let diff = heading - curDir;
        if(diff < - Math.PI){
            diff += Math.PI*2;
        }
        if(diff > Math.PI){
            diff -= Math.PI*2;
        }
        diff = diff > 0 ? 1 : diff < 0 ? -1 : 0;
        return this.alignmentOffset * diff;
    }
    cohesion(rol){
        return -this.cohesionOffset * rol.direction;
    }
    
    addObstical(obstical){
        this.obsticals.push(obstical);
    }
    addBoid(boid){
        this.flock.push(boid);
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
}