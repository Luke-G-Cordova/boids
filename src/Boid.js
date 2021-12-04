import Turtle from "./Turtle.js";
import {default as V} from "../src/Vector.js";

export default class Boid extends Turtle{
    constructor(x, y, options){
        super(x, y);
        let ogo = {
            ctx: null,
            color: 'blue',
            w: 10, 
            h: 20,
            angle: 0
        }
        Object.assign(ogo, options);
        this.ctx = ogo.ctx;
        this.color = ogo.color;
        this.w = ogo.w;
        this.h = ogo.h;
        this.xPts = new Array(3);
        this.yPts = new Array(3);
        this.currentAngle = this.velocity.getAngle();
        this.#initCoords();
        this.setPts(ogo.angle);
        return this;
    }
    drawVelocity(color = this.color){
        let posX = this.position.x;
        let posY = this.position.y;
        let velX = this.velocity.x;
        let velY = this.velocity.y;
        
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(posX, posY);
        this.ctx.lineTo(posX + velX, posY + velY);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.arc(posX + velX, posY + velY, 3, 0, 2*Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }
    draw(ctx){
        if(ctx)this.ctx = ctx;
        let posX = this.position.x;
        let posY = this.position.y;
        let ogColor = ctx.fillStyle;
        ctx.fillStyle = this.color;
        let angle = this.velocity.getAngle();
        this.setPts(angle - this.currentAngle);
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        ctx.moveTo(this.xPts[0]+posX, this.yPts[0]+posY);
        ctx.lineTo(this.xPts[1]+posX, this.yPts[1]+posY);
        ctx.lineTo(this.xPts[2]+posX, this.yPts[2]+posY);
        ctx.lineTo(this.xPts[0]+posX, this.yPts[0]+posY);
        ctx.fill();
        ctx.fillStyle = ogColor;
    }

    setPts(angle = 0){
        let ogx, ogy;
        for(let i = 0;i<this.xPts.length;i++){
            ogx = this.xPts[i];
            ogy = this.yPts[i];
            let xPrime = (ogx * Math.cos(angle)) + (ogy * Math.sin(angle));
            let yPrime = (ogy * Math.cos(angle)) - (ogx * Math.sin(angle));
            this.xPts[i] = xPrime;
            this.yPts[i] = yPrime;
        }
        this.currentAngle = this.velocity.getAngle();
    }
    #initCoords(){
        this.xPts[0] = -(this.h/2);
		this.yPts[0] = +(this.w/2);

		this.xPts[1] = -(this.h/2);
		this.yPts[1] = -(this.w/2);

		this.xPts[2] = +(this.w/2);
		this.yPts[2] = 0;
    }
}