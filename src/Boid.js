import Turtle from "./Turtle.js";

export default class Boid extends Turtle{
    constructor(options){
        super(options);
        let ogo = {
            nextAngle: 0, 
            visibility: 50,
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
    drawVision(ctx){
        let ogStroke = ctx.strokeStyle;
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(this.getX(), this.getY());
        ctx.arc(
            this.getX(), this.getY(), 
            this.visibility, 
            Turtle.angConv(this.getDegreesRotated()-180, {to:'radians'}), 
            Turtle.angConv(this.getDegreesRotated() - (this.eiboh/2) - 180, {to:'radians'}), 
            true
        );
        ctx.lineTo(this.getX(), this.getY());
        ctx.arc(
            this.getX(), this.getY(), 
            this.visibility, 
            Turtle.angConv(this.getDegreesRotated()-180, {to:'radians'}), 
            Turtle.angConv(this.getDegreesRotated() + (this.eiboh/2) - 180, {to:'radians'})
        );
        ctx.lineTo(this.getX(), this.getY());
        ctx.closePath();
        
        ctx.stroke();
        ctx.strokeStyle = ogStroke;
    }
}