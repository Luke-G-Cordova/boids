import Turtle from './Turtle.js';

export default class Boid extends Turtle{
    constructor(options){
        super(options);
        this.seperation = true;
        this.alignment = true;
        this.cohesion = true;
        this.visibility = 100;
        this.eiboh = 120;
        this.eibohr = this.eiboh * (Math.PI/180);
        this.nextAngle = 0;
        if(options)Object.assign(this, options);
        this.rotateTo(this.nextAngle);
    }
    // canSee(otherBoid){
    //     let y2y1 = (otherBoid.getY() - this.getY());
    //     let x2x1 = (otherBoid.getX() - this.getX());
    //     let quadrent = y2y1>=0&&x2x1>0?270:y2y1<0&&x2x1>=0?180:y2y1<0&&x2x1<0?90:0;
    //     let outOfViewNeg = this.getDegreesRotated() - this.eiboh < 0 ? 
    //         360 - (this.eiboh - this.getDegreesRotated()) : this.getDegreesRotated() - this.eiboh;
    //     let outOfViewPos = this.getDegreesRotated()+this.eiboh>360?
    //         this.eiboh-(360-this.getDegreesRotated()) : this.getDegreesRotated()+this.eiboh;
    //     let angleTob = x2x1!=0?(Math.atan(y2y1/x2x1)/this.rad)+quadrent:(Math.atan(y2y1)/this.rad)+quadrent;
    //     angleTob = quadrent==0||quadrent==180?90+angleTob:angleTob;
	// 	angleTob = x2x1==0&&quadrent==0?0:angleTob;
    //     return (
    //         Math.sqrt(
    //             Math.abs((this.getX()-otherBoid.getX())*(this.getX()-otherBoid.getX()))
    //             +Math.abs((this.getY()-otherBoid.getY())*(this.getY()-otherBoid.getY()))
    //         )<this.visibility)
    //         &&(
    //             (outOfViewNeg>=360-this.eiboh)?
    //                     (angleTob>=outOfViewNeg&&angleTob<=360)||
    //                     (angleTob>=0&&angleTob<=outOfViewPos)
    //                     :
    //                     (outOfViewPos<this.eiboh)?
    //                             (angleTob<=outOfViewPos&&angleTob>=0)||
    //                             (angleTob<=360&&angleTob>=outOfViewNeg)
    //                             :
    //                             (angleTob>=outOfViewNeg&&angleTob<=outOfViewPos)
    //     );
    // }
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
                Math.cos((otherBoid.getY()-this.getY())/this.visibility) + (this.degreesRotated * Math.PI/180) <= (this.eiboh / 2 * (Math.PI/180))
            ) ||
            (
                (quadrent === 3 ||
                quadrent === 4) &&
                ((180*Math.PI/180) - Math.cos((otherBoid.getY()-this.getY())/this.visibility)) - (this.degreesRotated * Math.PI/180) <= (this.eiboh / 2 * (Math.PI/180))
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