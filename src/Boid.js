import Turtle from "./Turtle.js";

export default class Boid extends Turtle{
    constructor(options){
        super(options);
        let ogo = {
            nextAngle: 0, 
            visibility: 100,
            eiboh: 240
        }
        Object.assign(ogo, options);
        this.nextAngle = ogo.nextAngle;
        this.visibility = ogo.visibility;
        this.eiboh = ogo.eiboh;
    }
    canSee(options){
        let ogo = {
            boid: null,
            x: null,
            y: null
        }
        Object.assign(ogo, options);
        let x = ogo.x, y = ogo.y;
        if(!!ogo.boid){
            x = ogo.boid.getX();
            y = ogo.boid.getY();
        }
        return (
            Math.abs(this.getAngleTo(x, y)) <= Turtle.angConv(this.eiboh, {to: 'radians'}) / 2
        ) && (
            this.getRadius(x, y) <= this.visibility
        );
    }
}