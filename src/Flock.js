import Boid from './Boid.js';
export default class Flock{
    constructor(options){
        let ogo = {
            flockSize: 20
        }
        Object.assign(ogo, options);
        this.population = [];
        this.createPopulation(ogo.flockSize);
    }
    seperate(){
        
    }
    createPopulation(size, options={}){
        for(let i = 0;i<size;i++){
            options.x = Math.random() * 500;
            options.y = Math.random() * 500;
            this.population.push(new Boid(options));
        }
    }
    drawAll(ctx){
        for(let i = 0;i<this.population.length;i++){
            this.population[i].draw(ctx);
        }
    }
}