import Boid from "../src/Boid.js";
import {default as V} from "../src/Vector.js";



export default class BoidSimulation{ 
    constructor(options){
        let ogo = {
            flock: null, 
            canvas: null,
            seperationOffset: .01,
            alignmentOffset: .02,
            cohesionOffset: .05
        }
        Object.assign(ogo, options);
        this.flock = ogo.flock;
        this.canvas = ogo.canvas;
        this.seperationOffset = ogo.seperationOffset;
        this.alignmentOffset = ogo.alignmentOffset;
        this.cohesionOffset = ogo.cohesionOffset;
    }
    loop(callback){
        for(let i = this.flock.length - 1;i>=0;i--){
            let avgPos = V.createNew(0, 0);
            // avgDirSin and avgDirCos are used to calculate the average
            // angle of in view boids. avgDirSin stores the sum of the 
            // sin angles of all in view boid velocities while avgDirCos 
            // stores the sum of the cos angles of all in view boid velocities
            // The average is then 
            // Math.atan2(avgDirSin/amount_of_in_view_boids, avgDircos/amount_of_in_view_boids)
            let avgDirSin = 0;
            let avgDirCos = 0;
            let avgC = [0, 0, 0];
            let count = 0;
            let newAngle = 0;
            let rol;
            let avgSpeed = 0;
            for(let j = this.flock.length - 1;j>=0;j--){
                if(i===j)continue;
                rol = this.flock[i].rightOrLeft(this.flock[j].position);
                if(rol.direction!==0){
                    let angle = this.flock[j].velocity.getAngle();
                    avgDirSin += Math.sin(angle);
                    avgDirCos += Math.cos(angle);
                    avgPos.add(this.flock[j].position);

                    // let col = this.flock[j].getColor();
                    // avgC = avgC.map((rgb, index) => rgb + col[index]);
                    
                    count++;
                }else{continue;}
                newAngle += this.seperation(rol, this.flock[i].visibility);
            }
            if(count !== 0){
                avgDirSin /= count;
                avgDirCos /= count;
                avgPos.div(count);

                newAngle += this.alignment(this.flock[i], Math.atan2(avgDirSin, avgDirCos));
                
                rol = this.flock[i].rightOrLeft(avgPos);
                newAngle += this.cohesion(rol);

                avgC = avgC.map(rgb => rgb/count);
                avgC = avgC.map((rgb, i, arr) =>{
                    let less = 0;
                    for(let j = 0 ;j<arr.length;j++){
                        if(j===i)continue;
                        if(rgb < arr[j]){
                            less++;
                        }else if(rgb > arr[j]){
                            less--;
                        }
                    }
                    return less < 0 ? 0 : less > 0 ? 255 : rgb ;
                });
                // this.flock[i].setColor(`rgba(${avgC[0]}, ${avgC[1]}, ${avgC[2]}, 1)`);
                this.flock[i].velocity.addAngle(newAngle);
            }
            

            callback(this.flock[i]);
            this.walls(this.flock[i]);
            // this.flock[i].move();
            // this.flock[i].drawImage();
            // this.flock[i].draw();
            // this.flock[i].drawVision();
        }
    }
    seperation(rol, visibility){
        return this.seperationOffset * ((visibility*.1) - (rol.distance*.1)) * rol.direction;
    }
    alignment(boid, heading){
        let curDir = boid.velocity.getAngle();
        let diff = heading - curDir;
        let direction;
        if(diff < - Math.PI){
            diff += Math.PI*2;
        }
        if(diff > Math.PI){
            diff -= Math.PI*2;
        }
        direction = diff > 0 ? 1 : diff < 0 ? -1 : 0;
        return this.alignmentOffset * direction;
    }
    cohesion(rol){
        return -this.cohesionOffset * rol.direction;
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