import Boid from './Boid.js';
import Turtle from './Turtle.js';
export default class Flock{
    constructor(options){
        this.population = [];

        if(options)Object.assign(this, options);
    }
    seperate(cBoid, oBoid){
        if(cBoid.canSee(oBoid)){
            let distance = cBoid.distanceTo(oBoid.getX(), oBoid.getY()) / 10;
            if(cBoid.degreesAway(oBoid.getX(), oBoid.getY()) > 180){
                cBoid.nextAngle += distance;
            }else{
                cBoid.nextAngle -= distance;
            }
        }
    }
    align(){
        
    }
    cohesive(){
        
    }
    walls(cBoid, x1, x2, y1, y2){
        let cX = cBoid.getX(), cY = cBoid.getY();
        let bias = 1;
        if(cBoid.canSee(x1, cY)){
            if(cBoid.degreesAway(x1, cY) > 180){
                cBoid.nextAngle += bias;
            }else{
                cBoid.nextAngle -= bias;
            }
        }
    }
    
    setSeperation(on){this.seperation = Boolean(on);}
    setAlignment(on){this.alignment = Boolean(on);}
    setCohesion(on){this.cohesion = Boolean(on);}
}