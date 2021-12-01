export default class Vector {
    constructor(obj){
        this.x = obj.x;
        this.y = obj.y;
        this.calculateMagnitude();
    }
    static createNew(x, y){
        return new Vector({x: x, y: y});
    }
    add(vector){
        this.x += vector.x;
        this.y += vector.y;
        this.calculateMagnitude();
    }
    addAll(...vectors){
        for(let i = 0;i<arguments.length;i++){
            this.x += arguments[i].x;
            this.y += arguments[i].y;
        }
        this.calculateMagnitude();
    }
    sub(vector){
        this.x -= vector.x;
        this.y -= vector.y;
        this.calculateMagnitude();
    }
    subAll(...vectors){
        for(let i = 0;i<arguments.length;i++){
            this.x -= arguments[i].x;
            this.y -= arguments[i].y;
        }
        this.calculateMagnitude();
    }
    mult(scalor){
        this.x *= scalor;
        this.y *= scalor;
        this.calculateMagnitude();
    }
    div(scalor){
        this.x /= scalor;
        this.y /= scalor;
        this.calculateMagnitude();
    }
    normalize(){
        this.calculateMagnitude();
        if(this.magnitude !== 0){
            this.x /= this.magnitude;
            this.y /= this.magnitude;
            this.calculateMagnitude();
        }
        return this;
    }
    calculateMagnitude(){
        this.magnitude = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        return this.magnitude;
    }
    clone(){
        return Vector.createNew(this.x, this.y);
    }
}