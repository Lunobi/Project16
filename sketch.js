var knife, fruit, monster, fruitg, monsterg, score, r, randomFruit, position;
var knifeimg, fruit1, fruit2 ,fruit3, fruit4, monsterimg, gameOverimg;
var gameOverSound ,knifeSwoosh;

var play=1;
var end=0;
var gameState=1;

function preload(){
  
  knifeimg = loadImage("knife.png");
  monsterimg = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverimg = loadImage("gameover.png")
  
  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwoosh.mp3")
}



function setup() {
  createCanvas(600, 600);
  
  knife=createSprite(40,200,20,20);
  knife.addImage(knifeimg);
  knife.scale=0.7


  knife.setCollider("rectangle",0,0,40,40);
  score=0;
  fruitg=createGroup();
  monsterg=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===play){
    fruits();
    Monster();

    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    if(fruitg.isTouching(knife)){
      fruitg.destroyEach();
      
      knifeSwooshSound.play();
      score=score+2;
    }
    else
    {
      if(monsterg.isTouching(knife)){
        gameState=end;
        gameOverSound.play()
        
        fruitg.destroyEach();
        monsterg.destroyEach();
        fruitg.setVelocityXEach(0);
        monsterg.setVelocityXEach(0);
        
        knife.addImage(gameOverimg);
        knife.scale=2;
        knife.x=300;
        knife.y=300;
      }
    }
  }
  
  drawSprites();
  textSize(25);
  text("Score : "+ score,250,50);
}


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterimg);
    monster.y=Math.round(random(100,550));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    monsterg.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    console.log(position)
    
    if(position==1)
    {
    fruit.x=600;
    fruit.velocityX=-(7+(score/4));
    }
    else
    {
      if(position==2){
      fruit.x=0;
      
      fruit.velocityX= (7+(score/4));
      }
    }
    
    fruit.scale=0.2;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitg.add(fruit);
  }
}