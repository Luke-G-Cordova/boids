export default class Turtle{
    constructor(options){
        this.x = 0;
        this.y = 0;
        this.w = 10;
        this.h = 20;
        this.velocity = [2, 2];
        this.color = 'blue';

        if(options)Object.assign(this, options);
        
        this.trueX = this.x;
        this.trueY = this.y;

        this.xPts = new Array(3);
        this.yPts = new Array(3);

        this.xPts[0] = this.x - (this.w / 2);
        this.yPts[0] = this.y - (this.h / 2);
        this.xPts[1] = this.x + (this.w / 2);
        this.yPts[1] = this.y - (this.h / 2);
        this.xPts[2] = this.x; 
        this.yPts[2] = this.y + (this.h / 2);

        this.degreesRotated = 0;
        this.rad = .0174533;
        
    }
    moveInDirection(degreesFromOrigin){
        while(degreesFromOrigin > 360)degreesFromOrigin -= 360;
        while(degreesFromOrigin < 0)degreesFromOrigin += 360;
        this.addToX(this.velocity[0]*Math.cos((degreesFromOrigin+90)*Math.PI/180));
        this.addToY(this.velocity[1]*Math.sin((degreesFromOrigin+90)*Math.PI/180));
        this.rotateTo(degreesFromOrigin);
    }
    rotateTo(degreesFromOrigin){
        this.rotateAroundCenter(degreesFromOrigin - this.degreesRotated);
    }
    rotateAroundCenter(degrees){
        let ogx, ogy;
        for(let i = 0;i<this.xPts.length;i++){
            ogx = this.xPts[i]-this.x;
            ogy = this.yPts[i]-this.y;
            let xPrime = Math.round((ogx*Math.cos(degrees*this.rad))-(ogy*Math.sin(degrees*this.rad)));
            let yPrime = Math.round((ogy*Math.cos(degrees*this.rad))+(ogx*Math.sin(degrees*this.rad)));
            this.xPts[i] = xPrime+this.x;
            this.yPts[i] = yPrime+this.y;
        }
        this.degreesRotated += degrees;
    }
    getPts(){
        return {
            x: this.xPts,
            y: this.yPts
        }
    }
    addToX(x){
        this.trueX += x;
        this.setX(Math.round(this.trueX));
    }
    addToY(y){
        this.trueY += y;
        this.setY(Math.round(this.trueY));
    }
    setX(x){
        this.x = x;

        this.xPts[0] = this.x - (this.w / 2);
        this.yPts[0] = this.y - (this.h / 2);
        this.xPts[1] = this.x + (this.w / 2);
        this.yPts[1] = this.y - (this.h / 2);
        this.xPts[2] = this.x; 
        this.yPts[2] = this.y + (this.h / 2);
        this.degreesRotated = 0;
    }
    setY(y){
        this.y = y;

        this.xPts[0] = this.x - (this.w / 2);
        this.yPts[0] = this.y - (this.h / 2);
        this.xPts[1] = this.x + (this.w / 2);
        this.yPts[1] = this.y - (this.h / 2);
        this.xPts[2] = this.x; 
        this.yPts[2] = this.y + (this.h / 2);
        this.degreesRotated = 0;
    }
    drawOnCanvas(ctx){
        let ogFill = ctx.fillStyle;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.xPts[0], this.yPts[0]);
        ctx.lineTo(this.xPts[1], this.yPts[1]);
        ctx.lineTo(this.xPts[2], this.yPts[2]);
        ctx.lineTo(this.xPts[0], this.yPts[0]);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = ogFill;
    }
}