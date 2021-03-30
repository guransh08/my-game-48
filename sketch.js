var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var obsGroup;
var pGroup;
var form, player, game;

var cars, car1, car2, car3, car4;

function preload(){

  car1Img=loadImage("images/car1.png")
  car2Img=loadImage("images/car2.png")
  car3Img=loadImage("images/car3.png")
  car4Img=loadImage("images/car4.png")

  groundImg=loadImage("images/ground.png")
  trackImg=loadImage("images/track.jpg")

  petrol=loadImage("images/petrol.png")
  obs1=loadImage("images/obs1.png")
  obs2=loadImage("images/obs2.png")
  obs3=loadImage("images/obs3.png")
  

}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-100);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

  obsGroup=new Group();
  pGroup=new Group();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if (gameState===2){
    game.end ();
  }
}
