var spaceship,aestroid,alien,bullet,meteor;
var spaceshipimg,aestroidimg,alienimg,bulletimg,meteorimg;
var bulletGroup,alienGroup,aestroidGroup,meteorGroup;
var backgroundimg;
var bulletsnd;
var explosionsound;
var score = 0;
var spaceshipexplode;
var gamestate = "PLAY";



function preload() {
spaceshipimg = loadImage("Space Ship.png");
aestroidimg = loadImage("Aestroid.png");
alienimg = loadImage("Alien.png");
bulletimg = loadImage("Bullet.png");
meteorimg =loadImage("Meteor.png");
backgroundimg = loadImage("backgrnd.jpeg");

bulletsnd = loadSound("Bullet sound.mp3");
explosionsound = loadSound("explosinsound.mp3");
spaceshipexplode = loadSound("spaceshipexplosion.mp3");
}



function setup() {
  createCanvas(1000,800);
  //createSprite(400, 200, 50, 50);
spaceship = createSprite(100,120,80,80);
spaceship.addImage("Space Ship.",spaceshipimg);
spaceship.scale =0.5;

bulletGroup = new Group();
alienGroup = new Group();
meteorGroup = new Group();
aestroidGroup = new Group();

}



function draw() {
  background(backgroundimg);
  textSize(30);
  fill(255);  
  text("Score: "+ score,850,100 );
if(gamestate ==="PLAY"){


  spaceship.y = mouseY;  
  

  createAlien();
  if(keyDown("space")){
    createBullet();
    bulletsnd.play();
  }
  createAestroid();
  createMeteor(); 

if(bulletGroup.isTouching(alienGroup)){
alienGroup.destroyEach();
bulletGroup.destroyEach();
explosionsound.play();
score = score+50;
}

if(bulletGroup.isTouching(meteorGroup)){
  meteorGroup.destroyEach();
  bulletGroup.destroyEach();
  explosionsound.play();
  score = score+50;


}

if(bulletGroup.isTouching(aestroidGroup)){
  aestroidGroup.destroyEach();
  bulletGroup.destroyEach();
  explosionsound.play();
  score = score+50;


}

if(alienGroup.isTouching(spaceship)||meteorGroup.isTouching(spaceship)||aestroidGroup.isTouching(spaceship)){
  gamestate="END"
  spaceshipexplode.play();


}
}
else if( gamestate === "END"){
  spaceship.destroy();
  alienGroup.destroyEach();
  aestroidGroup.destroyEach();
  meteorGroup.destroyEach();
  bulletGroup.destroyEach();

  textSize(50);
  fill("red");  
  text("GAME OVER ",400,400 );

}


  drawSprites();
}


function createAlien() {
  if(frameCount % 150 === 0){
    alien = createSprite(1000,120,40,10);
    alien.y = Math.round(random(50,700));
    alien.addImage("Alien",alienimg);
    alien.scale = 0.2;
    alien.velocityX = -5;
    alienGroup.add(alien);
  }
}

function createBullet() {
bullet = createSprite(spaceship.x,spaceship.y,10,10);
bullet.velocityX = 5;
bullet.addImage("Bullet",bulletimg);
bullet.scale = 0.2;
bulletGroup.add(bullet);


  
}

function createAestroid() {

  if(frameCount % 210 === 0){
    aestroid = createSprite(1000,120,40,10);
    aestroid.y = Math.round(random(50,700));
    aestroid.addImage("Aestroid",aestroidimg);
    aestroid.scale = 0.2;
    aestroid.velocityX = -5;
    aestroidGroup.add(aestroid);
  }
}

function createMeteor(){
  if(frameCount % 161 === 0){
    meteor = createSprite(1000,120,40,10);
    meteor.y = Math.round(random(50,700));
    meteor.addImage("meteor",meteorimg);
    meteor.scale = 0.2;
    meteor.velocityX = -5;
    meteorGroup.add(meteor);
  }
} 