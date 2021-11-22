import Boid from './Boid.js';
import Turtle from './Turtle.js';
export default class Flock{
    constructor(options){
        this.population = [];

        if(options)Object.assign(this, options);
    }
    seperate(cBoid, i){
        if(cBoid.canSee(this.population[i])){
            let distance = Math.pow(this.population[i].getX() - cBoid.getX(), 2)+Math.pow(this.population[i].getY() - cBoid.getY(), 2);
            distance = Math.sqrt(distance);
            // console.log(distance);
        }
    }
    align(){
        
    }
    cohesive(){
        
    }
    step(){
        for(let i = this.population.length - 1;i>=0;i--){
            this.population[i].moveInDirection(this.population[i].nextAngle);
        }
    }
    setSeperation(on){this.seperation = Boolean(on);}
    setAlignment(on){this.alignment = Boolean(on);}
    setCohesion(on){this.cohesion = Boolean(on);}
}