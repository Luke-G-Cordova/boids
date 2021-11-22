import Turtle from './Turtle.js';

export default class Boid extends Turtle{
    constructor(options){
        super(options);
        this.seperation = true;
        this.alignment = true;
        this.cohesion = true;
        this.visibility = 100;
        this.eiboh = 270;
        this.eibohr = this.eiboh * (Math.PI/180);
        this.nextAngle = 0;
        if(options)Object.assign(this, options);
        this.rotateTo(this.nextAngle);
    }
    canSee(otherBoid){
        let y2y1 = (otherBoid.getY() - this.getY());
        let x2x1 = (otherBoid.getX() - this.getX());
        let quadrent = y2y1>=0&&x2x1>0? 1 : y2y1<0&&x2x1>=0? 4 : y2y1<0&&x2x1<0? 3 : 2;
        return (
            Math.pow(otherBoid.getX()-this.getX(), 2) + 
            Math.pow(otherBoid.getY()-this.getY(), 2)
        )<=Math.pow(this.visibility, 2) && 
        (
            (
                (quadrent === 1 || 
                quadrent===2) && 
                Turtle.addRadians(Math.cos((otherBoid.getY()-this.getY())/this.visibility), Turtle.degToRad(this.degreesRotated)) <= Turtle.degToRad(this.eiboh / 2)
            ) ||
            (
                (quadrent === 3 ||
                quadrent === 4) &&
                Turtle.addRadians((Turtle.degToRad(180) - Math.cos((otherBoid.getY()-this.getY())/this.visibility)), -Turtle.degToRad(this.degreesRotated)) <= Turtle.degToRad(this.eiboh / 2)
            )
        );
    }
    drawVision(ctx){
        let ogStroke = ctx.strokeStyle;
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.getX(), this.getY(), this.visibility, this.eibohr+(this.eibohr*2.5), 2 * (this.eibohr)-this.eibohr);
        ctx.lineTo(this.getX(), this.getY());
        ctx.closePath();
        ctx.stroke();
        ctx.strokeStyle = ogStroke;
    }
}