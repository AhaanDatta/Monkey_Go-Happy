var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var banana,bananaImg;
var stone,stoneImg; 

var stoneGroup;
var bananaGroup;

var score = 0    

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png")
  stoneImg = loadImage("stone.png")
 }

function setup() {
  createCanvas(displayWidth,displayHeight);
  
  backgr=createSprite(0,0,displayWidth,displayHeight);
  backgr.addImage(backImage);
  backgr.scale= 3.5
  backgr.x=backgr.width/2;
  
  player = createSprite(150,displayHeight-120,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.2;
  
  ground = createSprite(displayWidth/2,displayHeight-120,displayWidth,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  stoneGroup = new Group()
  bananaGroup = new Group()
 }

function draw() { 
  background("white");

  drawSprites();
  player.collide(ground);

  if(gameState===PLAY){
    backgr.velocityX=-4;

  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
  console.log(player.y)

    if(keyDown("space") ) {
      player.velocityY = -30;
    }
    player.velocityY = player.velocityY + 0.8;
   
    spawnBananas()
   spawnObstacles()

   if (player.isTouching(stoneGroup)){
    gameState = END
   }
   
   if(player.isTouching(bananaGroup)){
   player.scale += 0.09
   bananaGroup.destroyEach()
   score= score+10
   }
  
  }
  
 else if(gameState===END){
  backgr.velocityX= 0
   background("white")
   console.log(gameState)
   fill("black")
   textSize(50)
   text("Press-Key-R-To-Restart-The-Game",displayWidth/2-400,displayHeight/2-150 )  
    
   if(keyDown("R")){
    gameState= PLAY
   score = 0
    player.scale = 0.2
   stoneGroup.destroyEach()
   bananaGroup.destroyEach()
   }
  
   }
   
   

  textSize(50)
  text("Score="+score,displayWidth-250,100)

  }

  function spawnBananas(){
  if(frameCount%60===0){
  banana = createSprite(600,300,10,10)
  banana.addImage(bananaImg)
  banana.scale= 0.1
  banana.velocityX = -4
  banana.y = Math.round(random(300,200))
  bananaGroup.add(banana)
  }
  
  }

 function spawnObstacles(){
  if(frameCount%300===0){
     stone = createSprite(displayWidth,displayHeight-150,10,10)
     stone.addImage(stoneImg)
    stone.scale= 0.2 
    stone.velocityX = -4
    stoneGroup.add(stone)
  }
}