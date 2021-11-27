
export default class Turtle {
    #x = 0;
    #y = 0;
    #trueX = 0;
    #trueY = 0;
    #w = 0;
    #h = 0;
    #velocity = [0, 0];
    #color = 'black';
    #xPts = new Array(3);
    #yPts = new Array(3);
    #degreesRotated = 0;
    #correctPts(){
        this.#xPts[0] = this.#x - (this.#h/2);this.#yPts[0] = this.#y;
        this.#xPts[1] = this.#x + (this.#h/2);this.#yPts[1] = this.#y + (this.#w/2);
        this.#xPts[2] = this.#x + (this.#h/2);this.#yPts[2] = this.#y - (this.#w/2);
        this.#degreesRotated = 0;
    }
    constructor(options){
        let ogo = {
            x: 0, 
            y: 0, 
            w: 12,
            h: 20, 
            color: 'black',
            velocity: [1, 1],
            angle: 0
        }
        Object.assign(ogo, options);
        this.#x = ogo.x;
        this.#y = ogo.y;
        this.#trueX = ogo.x;
        this.#trueY = ogo.y;
        this.#w = ogo.w;
        this.#h = ogo.h;
        this.#color = ogo.color;
        this.#velocity = ogo.velocity;
        this.#correctPts();
    }

    moveInDirection(angle, options){
        let ogo = {
            type: 'degrees'
        }
        Object.assign(ogo, options);
        if(ogo.type === 0 || ogo.type === 'degrees'){
            angle = Turtle.normalize(angle, {type: 'degrees'});
            angle = Turtle.angConv(angle, {to: 'radians'});
        }else if(ogo.type === 1 || ogo.type === 'radians'){
            angle = Turtle.normalize(angle, {type: 'radians'});
        }else{
            throw 'incorrect angle type';
        }
        this.addToX(this.#velocity[0] * Math.cos(angle));
        this.addToY(this.#velocity[1] * Math.sin(angle));
        this.rotateTo(angle - Math.PI, {type: 'radians'});
        
    }
    rotateTo(theta, options={}){
        this.rotate(theta - this.#degreesRotated, options);
    }
    rotate(theta, options){
        let ogo = {
            type: 0
        }
        if(options)Object.assign(ogo, options);
        if(ogo.type === 0 || ogo.type === 'degrees'){
            this.#degreesRotated += theta;
            theta = Turtle.angConv(theta, {to: 'radians'});
        }else if(ogo.type === 1 || ogo.type === 'radians'){
            this.#degreesRotated += Turtle.angConv(theta, {to: 'degrees'});
        }else{
            throw 'incorrect angle type';
        }
        let ogx, ogy;
        for(let i = 0;i<this.#xPts.length;i++){
            ogx = this.#xPts[i]-this.#x;
            ogy = this.#yPts[i]-this.#y;
            let xPrime = Math.round(
                (ogx * Math.cos(theta)) -
                (ogy * Math.sin(theta))
            );
            let yPrime = Math.round(
                (ogy * Math.cos(theta)) + 
                (ogx * Math.sin(theta))
            );
            this.#xPts[i] = xPrime + this.#x;
            this.#yPts[i] = yPrime + this.#y;
        }
        
    }

    

    addToX(x){
        this.#trueX += x;
        this.setX(Math.round(this.#trueX));
    }
    addToY(y){
        this.#trueY += y;
        this.setY(Math.round(this.#trueY));
    }

    // setters
    setX(x){
        this.#x = x;
        this.#correctPts();
    }
    setY(y){
        this.#y = y;
        this.#correctPts();
    }
    setSpeed(velocity){
        this.#velocity = velocity;
    }
    setColor(color){
        this.#color = color;
    }
    // getters
    getRadius(x, y){
        return Math.sqrt(Math.pow(x - this.#trueX, 2) + Math.pow(y - this.#trueY, 2));
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
    getX(){return this.#x;}
    getY(){return this.#y;}
    getW(){return this.#w;}
    getH(){return this.#h;}
    getColor(){return this.#color;}
    getSpeedVector(){return this.#velocity}
    getDegreesRotated(){return this.#degreesRotated}
    getXPts(){return this.#xPts}
    getYPts(){return this.#yPts}

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