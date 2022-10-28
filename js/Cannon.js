class Cannon{
    constructor(x,y,width,height,angle){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = angle;
        this.imageBase = loadImage("assets/cannonBase.png");
        this.imageCannon = loadImage("assets/canon.png");
    }



    show(){
        if(keyIsDown(RIGHT_ARROW) && this.angle <70){
            this.angle = this.angle + 1;
        }
        if(keyIsDown(LEFT_ARROW) && this.angle>-30){
            this.angle = this.angle - 1;
        }

        push();
            translate(this.x,this.y);
            rotate(this.angle);
            imageMode(CENTER);
            image(this.imageCannon,0,0,this.width,this.height);
        pop();
        
        image(this.imageBase,70,20,200,200);
    }
}
