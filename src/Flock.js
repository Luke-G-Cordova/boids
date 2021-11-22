import Boid from './Boid.js';

export default class Flock{
    constructor(options){
        this.population = [];

        if(options)Object.assign(this, options);
    }
    seperate(cBoid){
        for(let i = this.population.length-1;i>=0;i--){
            if(cBoid === this.population[i])continue;
            if(cBoid.canSee(this.population[i])){
                cBoid.nextAngle
            }
        }
    }
    align(){
        
    }
    cohesive(){
        
    }
    setSeperation(on){this.seperation = Boolean(on);}
    setAlignment(on){this.alignment = Boolean(on);}
    setCohesion(on){this.cohesion = Boolean(on);}
}