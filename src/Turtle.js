import {default as V} from './Vector.js';


export default class Turtle {
    #posVec;
    #velocity;
    #acceleration;
    #speed;
    #forces = [];
    #degreesRotated = 0;
    #accelerant;
    constructor(options){
        let ogo = {
            x: 0, 
            y: 0,
            speed: 5,
            accelerant: 1
        }
        Object.assign(ogo, options);
        this.#accelerant = ogo.accelerant;
        this.#posVec = V.createNew(ogo.x, ogo.y);
        this.#speed = ogo.speed;
        this.#velocity = V.createNew(0, 0);
        this.#acceleration = V.createNew(ogo.speed, ogo.speed);
    }
    moveTurtle(){
        if(this.#acceleration){
            this.#velocity.add(this.#acceleration);
        }
        this.#posVec.add(this.#velocity);
        // this.#forces = [];
        return this.#posVec;
    }
    
    // setters
    subForce(x, y){
        this.#acceleration = V.createNew(x, y);
        this.#acceleration.sub(this.#posVec);
        this.#acceleration.normalize();
        this.#acceleration.mult(this.#accelerant);
    }




    addForce(x, y){
        this.#velocity.add(V.createNew(x, y));
        this.#velocity.normalize();
        this.#velocity.mult(this.#speed);
    }
    setVelocity(x, y){
        this.#velocity = V.createNew(x, y);
    }
    // getters
    getDistanceTo(x, y){ //previously getRadius()
        return Math.sqrt(Math.pow(x - this.#posVec.x, 2) + Math.pow(y - this.#posVec.y, 2));
    }
    getOriginAngleTo(x, y){
        let ogX = this.getX() - x;
        let rad = this.getRadius(x, y);
        return Math.acos(ogX/rad);
    }
    getAngleTo(x, y){
        let ogAngle = this.getOriginAngleTo(x, y);
        let myAngle = Turtle.angConv(this.#degreesRotated, {to: 'radians'});
        return ogAngle - myAngle;
    }
    getXTo(r, theta){
        return (r * Math.cos(theta)) - Turtle.angConv(this.#degreesRotated, {to: 'radians'});
    }
    getYTo(r, theta){
        return (r * Math.sin(theta)) - Turtle.angConv(this.#degreesRotated, {to: 'radians'});
    }
    getX(){return this.#posVec.x;}
    getY(){return this.#posVec.y;}
    getPos(){return this.#posVec;}
    getSpeed(){return this.#speed;}
    getVelocity(){return this.#velocity;}
    getDegreesRotated(){return this.#degreesRotated}

    static angConv(angle, options){
        let aT = ['degrees', 'radians']
        let ogo = {
            to: 'radians'
        }
        Object.assign(ogo, options);
        if(ogo.to === aT[0]){
            return angle * (180/Math.PI);
        }else if(ogo.to === aT[1]){
            return angle * (Math.PI/180);
        }
    }
    static normalize(angle, options){
        let aT = ['degrees', 'radians']
        let ogo = {
            type: 'degrees'
        }
        Object.assign(ogo, options);
        let bound;
        if(ogo.type === 0 || ogo.type === aT[0]){
            bound = 360;
        }else if(ogo.type === 1 || ogo.type === aT[1]){
            bound = 2 * Math.PI;
        }else{
            throw 'incorrect angle type';
        }
        while(angle > bound)angle -= bound;
        while(angle < 0)angle += bound;
        return angle;
    }

}
let turt = new Turtle({x:2, y:1, velocity:[1, 1]});
turt.moveTurtle();