class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(car1Img);
    car2 = createSprite(300,200);
    car2.addImage(car2Img)
    car3 = createSprite(500,200);
    car3.addImage(car3Img)
    car4 = createSprite(700,200);
    car4.addImage(car4Img)
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
       background(groundImg)
      image (trackImg,0,-displayHeight*6,displayWidth,displayHeight*7)
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x=200
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction

        x=x+ 200 
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          fill ("yellow")
          ellipse(x,y,60,60);

          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
    
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    
    if(frameCount%20===0){
      var obstacle=createSprite(random(200,1200),random(-displayHeight*7,displayHeight),2,2)
      obstacle.velocityY=6;
      
      var number =Math.round(random(1,3))
      if(number===1){
        obstacle.addImage(obs1)
  
      }else if (number===2){
        obstacle.addImage(obs2)
      }else {
        obstacle.addImage(obs3)
      }
      obsGroup.add(obstacle);
      obstacle.scale=0.2
  
  
  
     }
     if(frameCount%60===0){
      var petrol1=createSprite(random(500,1200),random(-displayHeight*7,displayHeight),2,2)
      petrol1.velocityY=6;
      petrol1.addImage(petrol)
      petrol1.scale=0.2
     pGroup.add(petrol1)
     }
     if(player.index!==null){
      for(var i =0;i<pGroup.length;i++){
        if(pGroup.get(i).isTouching(cars)){
            pGroup.get(i).destroy();
            player.distance+=100
            player.update();
            
            
        }
    }
    
  }
  console.log(player.distance)
     if(player.index!==null){
      for(var i =0;i<obsGroup.length;i++){
        if(obsGroup.get(i).isTouching(cars)){
            obsGroup.get(i).destroy();
            player.update();
            gameState=2
            textSize(60)
            text("Game Over",displayWidth/2,camera.position.y)
        }
    }
  }
if(player.distance>6200){
  gameState=2;
}
    drawSprites();
  }
end (){
  console.log("gameEnded")


}
}
