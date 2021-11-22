



class Boid{
    constructor(options){
        this.seperation = true;
        this.alignment = true;
        this.cohesion = true;
        this.x = 0;
        this.y = 0;
        this.sightDistance = 1;
        this.lineOfSight = 1;
        if(options)Object.assign(this, options);
    }
    setSeperation(on){
        this.seperation = Boolean(on);
    }
    setAlignment(on){
        this.alignment = Boolean(on);
    }
    setCohesion(on){
        this.cohesion = Boolean(on);
    }
    seperate(){

    }
    align(){

    }
    cohesive(){

    }
}