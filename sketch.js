var towerImg, tower;
var doorImg, door, doorGroup;
var climberImg, climber, climberGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
   doorGroup = new Group()
   climberGroup = new Group()
   invisibleBlockGroup = new Group()


   

  ghost = createSprite(300,300);
  ghost.addImage(ghostImg);
  ghost.scale = 0.4;
   

}

function draw() {
  background(200);
  if(gameState ==="play"){
    if(tower.y > 400){
      tower.y = 300
    }
    
    if(keyDown('space')) {
      ghost.velocityY = -10;
      
    }
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(keyDown('left')) {
       ghost.velocityX = -5
    }
    
    if(keyDown('right')) {
      ghost.velocityX = 5
    }
    if(climberGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      gameState = "END"
      ghost.destroy()
    }
      


    spawnDoors();
  }
   if(gameState === "END"){
     tower.destroy()
     text("Game Over", 300,300)
   }
     
  
   
    drawSprites();
}

function spawnDoors(){
 if(frameCount % 240===0){
   door = createSprite(120,-50)
   climber = createSprite(120,10)
   invisibleBlock = createSprite(120,15)

   invisibleBlock.width = climber.width 
   invisibleBlock.height = 2
   
   door.x=Math.round(random(120,400))
   climber.x = door.x 
   invisibleBlock.x = door.x 
   
   door.addImage(doorImg)
   climber.addImage(climberImg)

   ghost.depth = door.depth 
   ghost.depth += 1

   door.velocityY = 1
   climber.velocityY = 1
   invisibleBlock.velocityY = 1
   
   doorGroup.add(door)
   climberGroup.add(climber)
   invisibleBlockGroup.add(invisibleBlock)

 }

}


