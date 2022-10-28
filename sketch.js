const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world,ground;
var backImg;
var towerImg,tower;
var cannon;
var angle;

var balls = [];
var boats = [];

function preload() {  
  backImg = loadImage("assets/background.gif");
  towerImg = loadImage("assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);
  angle = 15;//Cambie a SETUP

  opciones = {
    isStatic: true
  }

  ground = Bodies.rectangle(0,height-1,width*2,1,opciones);
  World.add(world,ground);
 
  tower = Bodies.rectangle(160,350,160,310,opciones);
  World.add(world,tower);
 
  cannon = new Cannon(180,110,130,100,angle);

}

function draw() {
  background(backImg);
  
  Engine.update(engine);
  push()
  translate(tower.position.x, tower.position.y);
  rotate(tower.angle);
  imageMode(CENTER);
  image(towerImg,0,0,160,310);
  pop();

  showBoats();
  for(var i = 0; i < balls.length; i ++){
    showCannonBalls(balls[i]);
    collisionWithBoat(i);
  }
  cannon.show();
  
}

function collisionWithBoat(index) {
  for (var i = 0; i < boats.length; i++) {
    if (balls[index] !== undefined && boats[i] !== undefined) {
      var collision = Matter.SAT.collides(balls[index].body, boats[i].body);

      if (collision.collided) {
        boats[i].remove(i);

        Matter.World.remove(world, balls[index].body);
        delete balls[index];
      }
    }
  }
}

function keyPressed(){
  if(keyCode === DOWN_ARROW){
    var cannonBall = new CannonBall(cannon.x,cannon.y);
   
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball,index){
  if (ball) {
    ball.show();
    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
      ball.remove(index);
    }
  }
}

function showBoats(){
  if(boats.length>0){
    if (
      boats[boats.length - 1] === undefined ||
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var boat = new Boat(width, height - 100, 170, 170, position);
      boats.push(boat);
    }

    for(var i=0; i<boats.length; i++){
      if(boats[i]){
        Matter.Body.setVelocity(boats[i].body,{x:-0.9,y:0});
        boats[i].show();
      }else {
        boats[i];
      }
    }
  }  else{
     var boat = new Boat(width,height-60,170,170,-60);
      boats.push(boat);
  }
}

function keyReleased(){
  if(keyCode === DOWN_ARROW){
    balls[balls.length -1].shoot();
  }
}

