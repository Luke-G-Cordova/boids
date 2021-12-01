export default class Vector {
    constructor(obj){
        this.x = obj.x;
        this.y = obj.y;
        this.#calculateMagnitude();
    }
    static createNew(x, y){
        return new Vector({x: x, y: y});
    }
    add(vector){
        this.x += vector.x;
        this.y += vector.y;
        this.#calculateMagnitude();
        return this;
    }
    addAngle(radians){
        this.x = (this.x * Math.cos(radians) - (this.y * Math.sin(radians)));
        this.y = (this.y * Math.cos(radians) + (this.x * Math.sin(radians)));
        let mag = this.magnitude;
        this.normalize();
        this.mult(mag);
        return this;
    }
    sub(vector){
        this.x -= vector.x;
        this.y -= vector.y;
        this.#calculateMagnitude();
        return this;
    }
    mult(scalor){
        this.x *= scalor;
        this.y *= scalor;
        this.#calculateMagnitude();
        return this;
    }
    div(scalor){
        this.x /= scalor;
        this.y /= scalor;
        this.#calculateMagnitude();
        return this;
    }
    upperLimit(scalor){
        let f = Math.min(this.magnitude, scalor) / this.magnitude;
        this.x = f * this.x;
        this.y = f * this.y;
        this.#calculateMagnitude();
        return this;
    }
    lowerLimit(scalor){
        let f = Math.max(this.magnitude, scalor) / this.magnitude;
        this.x = f * this.x;
        this.y = f * this.y;
        this.#calculateMagnitude();
        return this;
    }
    normalize(){
        this.#calculateMagnitude();
        if(this.magnitude !== 0){
            this.x /= this.magnitude;
            this.y /= this.magnitude;
            this.#calculateMagnitude();
        }
        return this;
    }
    #calculateMagnitude(){
        this.magnitude = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    clone(){
        return Vector.createNew(this.x, this.y);
    }
}