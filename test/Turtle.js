export default class Turtle{
    constructor(options){
        this.x = 0;
        this.y = 0;
        this.w = 10;
        this.h = 20;
        this.velocity = [1, 1];
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
        degreesFromOrigin = Turtle.normalizeDegrees(degreesFromOrigin);
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
            ogx = this.xPts[i]-this.trueX;
            ogy = this.yPts[i]-this.trueY;
            let xPrime = Math.round((ogx*Math.cos(degrees*this.rad))-(ogy*Math.sin(degrees*this.rad)));
            let yPrime = Math.round((ogy*Math.cos(degrees*this.rad))+(ogx*Math.sin(degrees*this.rad)));
            this.xPts[i] = xPrime+this.trueX;
            this.yPts[i] = yPrime+this.trueY;
        }
        this.degreesRotated += degrees;
    }
    
    radiansAway(x, y){
        let fromOrigin = Turtle.normalizeRadians(Turtle.degToRad(this.degreesRotated));
        return Turtle.addRadians(Math.tan((x-this.getX())/(y-this.getY())), -fromOrigin);
    }
    
    degreesAway(x, y){
        let fromOrigin = Turtle.normalizeDegrees(this.degreesRotated);
        let oX = x-this.getX(), oY = y-this.getY();
        let mult= oY===0?1:oY/Math.abs(oY);
        let angle = oX/this.distanceTo(x, y);
        angle = (Math.round(Turtle.radToDeg(Math.acos(angle))) * mult) - 90;
        if(angle === -180) angle = 180;
        return Turtle.normalizeDegrees(angle - fromOrigin);
    }
    distanceTo(x, y){
        return Math.sqrt(Math.pow(x - this.getX(), 2) + Math.pow(y - this.getY(), 2));
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
        this.trueX = x;
        this.x = x;

        this.xPts[0] = this.trueX - (this.w / 2);
        this.yPts[0] = this.trueY - (this.h / 2);
        this.xPts[1] = this.trueX + (this.w / 2);
        this.yPts[1] = this.trueY - (this.h / 2);
        this.xPts[2] = this.trueX; 
        this.yPts[2] = this.trueY + (this.h / 2);
        this.degreesRotated = 0;
    }
    setY(y){
        this.trueY = y;
        this.y = y;

        this.xPts[0] = this.trueX - (this.w / 2);
        this.yPts[0] = this.trueY - (this.h / 2);
        this.xPts[1] = this.trueX + (this.w / 2);
        this.yPts[1] = this.trueY - (this.h / 2);
        this.xPts[2] = this.trueX; 
        this.yPts[2] = this.trueY + (this.h / 2);
        this.degreesRotated = 0;
    }
    getY(){return this.trueY;}
    getX(){return this.trueX;}
    getDegreesRotated() {return this.degreesRotated;}
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
        ctx.fillStyle = 'red';
        ctx.fillText(this.degreesRotated, this.getX(), this.getY());
        ctx.fillStyle = ogFill;
    }
    static degToRad(degrees){
        return degrees * (Math.PI/180);
    }
    static radToDeg(radians){
        return radians * (180/Math.PI);
    }
    static normalizeDegrees(degree){
        while(degree > 360)degree -= 360;
        while(degree < 0)degree+=360;
        return degree;
    }
    static addDegrees(degree1, degree2){
        let ans = degree1+degree2;
        while(ans > 360)ans -= 360;
        while(ans < 0)ans+=360;
        return ans;
    }
    static normalizeRadians(radian){
        while(radian > 2 * Math.PI) radian -= 2 * Math.PI;
        while(radian < 0) radian += 2 * Math.PI;
        return radian;
    }
    static addRadians(radian1, radian2){
        let ans = radian1+radian2;
        while(ans > 2 * Math.PI) ans -= 2 * Math.PI;
        while(ans < 0) ans += 2 * Math.PI;
        return ans;
    }
}