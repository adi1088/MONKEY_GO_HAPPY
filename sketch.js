var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaImg;
var stoneImg;
var gameOver,gameOverImg;
var score = 0;
var END =0;
var PLAY =1;
var gameState = PLAY;
var FoodGroup, obstacleGroup;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
  gameOverImg = loadImage("gameOver.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(400,200,10,10);
  gameOver.addImage(gameOverImg);
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  score =0; 
}

function draw() { 
  background("black")
  text("Score : "+ score,400,200);
  textSize(30);
  fill(255)
  console.log(score)
  

  if(gameState===PLAY){
  gameOver.visible=false;
  spawnFood()
  spawnObstacle()
 

  if(keyDown("space") ) {
    player.velocityY = -18;
  }
  player.velocityY = player.velocityY + 0.8;

  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }

  if(FoodGroup.isTouching(player)){
     FoodGroup[0].destroy(obstacleGroup)
     score = score+2;
    player.scale+= +0.01
  }
  if(obstacleGroup.isTouching(player)){
    gameState=END;
  } 

  }else if (gameState===END){
    gameOver.visible=true;
    backgr.velocityX = 0 ;
    player.visible = false;

    FoodGroup.destroyEach()
    obstacleGroup.destroyEach();


    textSize(30);
    fill(255);
    text("GAME OVER !", 300,200);
  } 

  player.collide(ground);

  drawSprites();
}

function spawnFood(){
  if(frameCount % 100 === 0){
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -4;

    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana)
  }
}

function spawnObstacle(){
  if (frameCount % 120 ===0){
 var obstacle=createSprite(700,320,0,0);
//  obstacle.debug = true
 obstacle.addImage(stoneImg);
 obstacle.scale=0.2;
 //obstacle.setLifetimeEach(-1);
 obstacle.velocityX=-3;
 
 obstacleGroup.add(obstacle)
  } 
 }
 