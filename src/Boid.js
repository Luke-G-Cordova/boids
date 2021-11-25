import Turtle from './Turtle.js';

export default class Boid extends Turtle{
    constructor(options){
        super(options);
        this.seperation = true;
        this.alignment = true;
        this.cohesion = true;
        this.visibility = 100;
        this.eiboh = 240;
        this.eibohr = this.eiboh * (Math.PI/180);
        this.nextAngle = 0;
        if(options)Object.assign(this, options);
        this.rotateTo(this.nextAngle);
    }
    canSee(otherBoid){
        let distance = this.distanceTo(otherBoid.getX(), otherBoid.getY());
        let angle = Math.abs(this.degreesAway(otherBoid.getX(), otherBoid.getY()));
        angle = angle > 180 ? 360 - angle : angle;
        return angle <= this.eiboh/2 && distance <= this.visibility;
    }
    canSee(x, y){
        let distance = this.distanceTo(x, y);
        let angle = Math.abs(this.degreesAway(x, y));
        angle = angle > 180 ? 360 - angle : angle;
        return angle <= this.eiboh/2 && distance <= this.visibility;
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