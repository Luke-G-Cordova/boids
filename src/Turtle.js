import {default as V} from './Vector.js';


export default class Turtle {
    #posVec;
    #velocity;
    #forces = [];
    #sForce;
    #degreesRotated = 0;
    #forceAdder = V.createNew(0, 0);
    constructor(options){
        let ogo = {
            x: 0, 
            y: 0,
            speed: .5,
            limit: .0001
        }
        Object.assign(ogo, options);
        this.#posVec = V.createNew(ogo.x, ogo.y);
        this.#velocity = ogo.speed;
        this.#posVec.limit(ogo.limit);
    }
    moveTurtle(){
        // this.#posVec.add(this.#forceAdder);

        if(this.#sForce){
            this.#forceAdder.add(this.#sForce);
        }
        this.#posVec.add(this.#forceAdder);
        // this.#sForces = [];
        this.#forces = [];
        return this.#posVec;
    }
    
    // setters
    subForce(x, y){
        this.#sForce = V.createNew(x, y);
        this.#sForce.sub(this.#posVec);
        this.#sForce.normalize();
        this.#sForce.mult(this.#velocity);
    }
    addForce(x, y){
        this.#forces.push(V.createNew(x, y));
        this.#forceAdder.addAll(...this.#forces);
        this.#forceAdder.mult(this.#velocity);
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
    getPosVec(){return this.#posVec;}
    getVelocity(){return this.#velocity}
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