"use strict"
let Controller = (function() {
     document.addEventListener("keydown", keyboardDownHandler, false);
     document.addEventListener("keyup", keyboardUpHandler, false);

     document.addEventListener("mouseup", mouseUpHandler, false);
     document.addEventListener("wheel", mouseWheelChecker, false);

     document.getElementById("startBtn").addEventListener("mouseup", startButtonHandler, false);

     let mouseClickX = 0;
     let mouseClickY = 0;


     let movementQueue = "STOP";

     function keyboardDownHandler(event) {
          if(event.key == "w") {
               movementQueue = "UP"
               Player.setMovement(movementQueue);
          }
          if(event.key == "s") {
               movementQueue = "DOWN"
               Player.setMovement(movementQueue);
          }
          if(event.key == "a") {
               movementQueue = "LEFT"
               Player.setMovement(movementQueue);
          }
          if(event.key == "d") {
               movementQueue = "RIGHT"
               Player.setMovement(movementQueue);
          }
          if(event.key == "e") {
               if(Player.getInteract() == true) {
                    Player.setInteract(false);
               } else {
                    Player.setInteract(true);
               }
          }
          if(event.key == 'f') {
               if(Words.getPrinting() == true) {
                    Words.setSkip(true);
               } else if(Words.getPrinting() == false) {
                    console.log("next");
                    Words.setNext(true);
               }
          }
          if(event.keyCode == 32) {
               event.preventDefault();
               Player.setCentered(true);
          }
     }

     function keyboardUpHandler(event) {
          if(event.key == "w") {
               if(Player.getMovement() == "UP") {
                    Player.setMovement("STOP");
               }
          }
          if(event.key == "s") {
               if(Player.getMovement() == "DOWN") {
                    Player.setMovement("STOP");
               }
          }
          if(event.key == "a") {
               if(Player.getMovement() == "LEFT") {
                    Player.setMovement("STOP");
               }
          }
          if(event.key == "d") {
               if(Player.getMovement() == "RIGHT") {
                    Player.setMovement("STOP");
               }
          }

          if(event.keyCode == 32) {
               event.preventDefault();
               Player.setCentered(true);
          }
     }

     function playerMovementHandler() {
          if(Player.getMovement() == "UP") {
               Player.setCenterY(Player.getCenterY() - Player.getSpeed());
               Sound.getSound()[1].play();
          }

          if(Player.getMovement() == "DOWN") {
               Player.setCenterY(Player.getCenterY() + Player.getSpeed());
               Sound.getSound()[1].play();
          }

          if(Player.getMovement() == "LEFT") {
               Player.setCenterX(Player.getCenterX() - Player.getSpeed());
               Sound.getSound()[1].play();
          }

          else if(Player.getMovement() == "RIGHT") {
               Player.setCenterX(Player.getCenterX() + Player.getSpeed());
               Sound.getSound()[1].play();
          }
     }

     function playerSpriteHandler() {
          let columns = [0, 1, 0, 2];
          let framesPerStep = 8;
          let row = 0;
          let col = columns[Player.getCounter()];

          if(Engine.getCurrentFrame() % framesPerStep == 0) {
               Player.setCounter(Player.getCounter() + 1);
          }

          if(Player.getCounter() > 3) {
               Player.setCounter(0);
          }

          if(Player.getMovement() == "UP") {
               row = 1;
               Player.setFacingDirection("UP");
          }
          if(Player.getMovement() == "DOWN") {
               row = 0;
               Player.setFacingDirection("DOWN");
          }
          if(Player.getMovement() == "LEFT") {
               row = 2;
               Player.setFacingDirection("LEFT");
          }
          if(Player.getMovement() == "RIGHT") {
               row = 3;
               Player.setFacingDirection("RIGHT");
          }
          if(Player.getMovement() == "STOP") {
               col = 0;
               if(Player.getFacingDirection() == "LEFT") {
                    row = 2;
               }
               if(Player.getFacingDirection() == "RIGHT") {
                    row = 3;
               }
               if(Player.getFacingDirection() == "UP") {
                    row = 1;
               }
               if(Player.getFacingDirection() == "DOWN") {
                    row = 0;
               }
          }

          let output = [col, row];
          return output;
     }

     function mouseUpHandler(event) {
          if (event.button == 0) {
               if($('#layer1').is(':visible')) {
                    var rect = Display.getCanvas()[1].getBoundingClientRect();
               }
               else if($('#startScreen1').is(':visible')) {
                    var rect = startScreen1.getBoundingClientRect();
               }

               let mouseClickX = Math.floor(event.clientX - rect.left);
               let mouseClickY = Math.floor(event.clientY - rect.top);
          }
     }

     function furnitureInteractTester() {
          let furnitureCount = 0;
          for(let furniture of Game.getFurnitureList()) {

               if(Player.getInteract()) {

                    //from the top
                    if((Game.furnitureZone(furniture) == "TOP-ZONE") && Player.getFacingDirection() == "DOWN")  {

                         return furniture;
                    }
                    //from the bottom
                    else if((Game.furnitureZone(furniture) == "BOTTOM-ZONE") && Player.getFacingDirection() == "UP") {
                         return furniture;

                    }
                    //from the left
                    else if((Game.furnitureZone(furniture) == "LEFT-ZONE") && Player.getFacingDirection() == "RIGHT")  {
                         return furniture;

                    }
                    //from the right
                    else if((Game.furnitureZone(furniture) == "RIGHT-ZONE") && Player.getFacingDirection() == "LEFT")  {
                         return furniture;

                    }
                    //if not in any zone
                    else if(Game.furnitureZone(furniture) == null) {
                         furnitureCount++;
                    }
               }
          }

          if(furnitureCount == Game.getFurnitureList().length) {
               return null;
          }
     }

     function itemInteractTester() {
          let itemCount = 0;
          for(let item of Game.getItemList()) {

               if(Player.getInteract()) {

                    //from the top
                    if((Game.itemZone(item) == "TOP-ZONE") && Player.getFacingDirection() == "DOWN")  {

                         return item;
                    }
                    //from the bottom
                    else if((Game.itemZone(item) == "BOTTOM-ZONE") && Player.getFacingDirection() == "UP") {
                         return item;

                    }
                    //from the left
                    else if((Game.itemZone(item) == "LEFT-ZONE") && Player.getFacingDirection() == "RIGHT")  {
                         return item;

                    }
                    //from the right
                    else if((Game.itemZone(item) == "RIGHT-ZONE") && Player.getFacingDirection() == "LEFT")  {
                         return item;

                    }
                    //if not in any zone
                    else if(Game.itemZone(item) == null) {
                         itemCount++;
                    }
               }
          }

          if(itemCount == Game.getItemList().length) {
               return null;
          }
     }

     function mouseWheelChecker(event) {
          Player.setCentered(false);
     }

     function startButtonHandler() {
          Game.setMode("Game");
          Sound.getSound()[0].play();
          Sound.getSound()[2].play();
          $("#startBtn").fadeOut(200);
          $('#startScreen1').fadeOut(1000);
          $('#startScreen2').fadeOut(1000);
          $("#textBox").show(500);
          $("#faceContainer").slideDown(1500);
          $("#inventoryContainer").slideDown(2000);
          Game.setLevel(1);
     }

     return {
          playerMovementHandler : playerMovementHandler,
          playerSpriteHandler : playerSpriteHandler,
          furnitureInteractTester : furnitureInteractTester,
          itemInteractTester : itemInteractTester,
          mouseWheelChecker : mouseWheelChecker,
          startButtonHandler : startButtonHandler
     }
}());
