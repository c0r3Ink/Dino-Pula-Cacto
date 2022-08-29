var dino,dinoImg,dinoF;
var paredes;
var chao; 
var chaoImg;
var chaofake;
var nuvem;
var nuvemImg;
var cacto;
var score = 0;
var grupoCacto;
var grupoNuvem;

var gameOver, gameOverImg;
var restart, restartImg;

var JOGAR = 0;
var FIM = 1;
var modo = JOGAR;

function preload(){
  //pré carrega os arquivos 
  //som, imagem, etc
 
  dinoImg = loadAnimation("trex3.png","trex4.png");
  dinoF = loadImage("trex_collided.png");
  chaoImg = loadImage("ground2.png");
  nuvemImg = loadImage("cloud.png");
  cactoImg = loadImage("obstacle1.png");
  cactoImg2 = loadImage("obstacle2.png");
  cactoImg3 = loadImage("obstacle3.png");
  cactoImg4 = loadImage("obstacle4.png");
  cactoImg5 = loadImage("obstacle5.png");
  cactoImg6 = loadImage("obstacle6.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  checkPoint = loadSound("checkPoint.mp3");
  die = loadSound("die.mp3");
  pular = loadSound("jump.mp3");

}

function setup(){
  //função de configuração

  //tamanho da tela
  createCanvas(600,200);

  dino = createSprite(50,100,10,10);
  dino.addAnimation("running",dinoImg);
  dino.scale = 0.5;

  dino.addImage("F",dinoF);

  dino.debug = false;
  dino.setCollider("circle",0,0,30); 

  
  
  chao = createSprite(300,190,600,20);
  chao.addImage(chaoImg);
  chao.x = chao.width/2;

  chaofake = createSprite(300,200,600,20);
  chaofake.visible = false;

  gameOver = createSprite(300,70);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  restart = createSprite(300,130);
  restart.addImage(restartImg);
  restart.visible = false;

  //randomizaçao de numeros
  var teste = Math.round(random(1,10))
  console.log(teste)

  grupoCacto = new Group()

  grupoNuvem = new Group()

  paredes = createEdgeSprites();
}

function draw(){
  background('white');

  textSize(14);
  fill("black");
  text("score: " + score,500,20);
  

  if(modo === JOGAR) {
    score = score + Math.round(frameRate() / 60);
                     //ou dino.isTouching(chao)
    if(keyDown("space") && dino.y > 165){
      dino.velocityY = -10;
      pular.play();
    }
//console.log(dino.velocityY)
    if(chao.x < 0) {
      chao.x = chao.width/2;
    }

    if(score %100 === 0 && score > 0) {
      checkPoint.play();
   }

      //gravidade
  dino.velocityY = dino.velocityY + 0.8;
  chao.velocityX = -(5 + score/100);
  dino.collide(paredes[3]);
  dino.collide(chaofake);

  spawn_nuvens();
 
  spawn_cacto();
 
  if(dino.isTouching(grupoCacto)) {
    modo = FIM;
    die.play();
    //dino.velocityY = -10;   inteligencia artificial
    //pular.play();
  }

  } else if(modo === FIM) {
    chao.velocityX = 0;
    dino.changeAnimation("F");
    dino.velocityY = 0;
    grupoNuvem.setVelocityXEach(0);
    grupoCacto.setVelocityXEach(0);
    grupoCacto.setLifetimeEach(-1);
    grupoNuvem.setLifetimeEach(-1);

    gameOver.visible = true;
    restart.visible = true;

    if(mousePressedOver(restart)) {
      reset();
    }
  }

  drawSprites();
}

function spawn_nuvens() {

if(frameCount %60 === 0 ){
  nuvem = createSprite(610,100,20,20); 
  nuvem.velocityX = -3
  nuvem.scale = 0.5

  nuvem.addImage(nuvemImg);

  nuvem.y = Math.round(random(50,150))

  nuvem.depth = dino.depth
  dino.depth = dino.depth+1

  //console.log("nuvem:" +nuvem.depth)
  //console.log("dino" +dino.depth)

  nuvem.lifetime = 210;

  grupoNuvem.add(nuvem);
}
}  

function spawn_cacto() {
    
if(frameCount %60 === 0){
  cacto =  createSprite(610,175,20,20);
  cacto.velocityX = -(5 + score/100);
  cacto.scale = 0.4
  
  var ajudante = Math.round(random(1,6));
  switch(ajudante){
    case 1: cacto.addImage(cactoImg);
    break;
    case 2: cacto.addImage(cactoImg2);
    break;
    case 3: cacto.addImage(cactoImg3);
    break;
    case 4: cacto.addImage(cactoImg4);
    break;
    case 5: cacto.addImage(cactoImg5);
    break;
    case 6: cacto.addImage(cactoImg6);
    break;


   }

  cacto.lifetime = 130;

  grupoCacto.add(cacto);

}  

}

function reset() {
  modo = JOGAR
  grupoCacto.destroyEach();
  grupoNuvem.destroyEach();
  gameOver.visible = false;
  restart.visible = false;
  score = 0;
  dino.changeAnimation("running");
} 