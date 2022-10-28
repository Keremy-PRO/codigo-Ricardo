class Boat{
    constructor(x,y,w,h,boatPos){
        this.w = w;
        this.h = h;
        this.boatPosition = boatPos
        this.body = Bodies.rectangle(x,y,w,h);
        this.image = loadImage("./assets/boat.png");
        World.add(world,this.body)

    }

    remove(index) {
        setTimeout(() => {
          Matter.World.remove(world, boats[index].body);
          delete boats[index];
        }, 2000);
      }

    show(){
        var angle = this.body.angle;
        var pos = this.body.position;
        push();
        translate(pos.x,pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image,0,this.boatPosition,this.w,this.h);
        pop();

    }
}