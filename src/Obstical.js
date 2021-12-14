import Turtle from "./Turtle.js";

export default class Obstical extends Turtle{
    constructor(x, y, options){
        super(x, y);
        let ogo = {
            color: 'white',
            ctx: null,
            width: 10, 
            height: 10
        }
        Object.assign(ogo, options);
        this.color = ogo.color;
        this.width = ogo.width;
        this.height = ogo.height;
        this.ctx = ogo.ctx;
    }

    draw(ctx){
        if(ctx)this.ctx = ctx;
        let posX = this.position.x;
        let posY = this.position.y;
        let ogColor = this.ctx.fillStyle;
        this.ctx.fillStyle = this.color;
        // let angle = this.velocity.getAngle();
        // this.setPts(angle - this.currentAngle);
        // this.ctx.beginPath();
        // this.ctx.moveTo(this.position.x, this.position.y);
        // this.ctx.moveTo(this.xPts[0]+posX, this.yPts[0]+posY);
        // this.ctx.lineTo(this.xPts[1]+posX, this.yPts[1]+posY);
        // this.ctx.lineTo(this.xPts[2]+posX, this.yPts[2]+posY);
        // this.ctx.lineTo(this.xPts[0]+posX, this.yPts[0]+posY);
        // this.ctx.fill();
        this.ctx.fillRect(posX, posY, this.width, this.height);
        this.ctx.fillStyle = ogColor;
    }
}