var Controller = (function() {
     document.addEventListener("keydown", keyboardDownHandler, false);
     document.addEventListener("keyup", keyboardUpHandler, false);

     document.addEventListener("mouseup", mouseUpHandler, false);
     document.addEventListener("wheel", mouseWheelChecker, false);

     document.getElementById("startBtn").addEventListener("mouseup", startButtonHandler, false);

     mouseClickX = 0;
     mouseClickY = 0;


     movementQueue = "STOP";

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
               Display.setPlayerCentered(true);
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
               Display.setPlayerCentered(true);
          }
     }

     function playerMovementHandler() {
          if(Player.getMovement() == "UP") {
               Player.setCenterY(Player.getCenterY() - Player.getSpeed());
          }

          if(Player.getMovement() == "DOWN") {
               Player.setCenterY(Player.getCenterY() + Player.getSpeed());
          }

          if(Player.getMovement() == "LEFT") {
               Player.setCenterX(Player.getCenterX() - Player.getSpeed());
          }

          else if(Player.getMovement() == "RIGHT") {
               Player.setCenterX(Player.getCenterX() + Player.getSpeed());
          }
     }

     function playerSpriteHandler() {
          columns = [0, 1, 0, 2];
          framesPerStep = 8;
          row = 0;

          col = columns[counter];

          if(Engine.getCurrentFrame() % framesPerStep == 0) {
               counter++;
          }

          if(counter > 3) {
               counter = 0;
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
     }

     function mouseUpHandler(event) {
          if (event.button == 0) {
               if($('#layer1').is(':visible')) {
                    rect = canvasLayer1.getBoundingClientRect();
               }
               else if($('#startScreen1').is(':visible')) {
                    rect = startScreen1.getBoundingClientRect();
               }

               mouseClickX = Math.floor(event.clientX - rect.left);
               mouseClickY = Math.floor(event.clientY - rect.top);
          }
     }

     function furnitureInteractTester() {
          let furnitureCount = 0;
          for(furniture of furnitureList) {

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

          if(furnitureCount == furnitureList.length) {
               return false;
          }
     }

     function mouseWheelChecker(event) {
          Display.setPlayerCentered(false);
     }

     function startButtonHandler() {
          Game.setMode("Game");
     }

     return {
          playerMovementHandler : playerMovementHandler,
          playerSpriteHandler : playerSpriteHandler,
          furnitureInteractTester : furnitureInteractTester,
          mouseWheelChecker : mouseWheelChecker,
          startButtonHandler : startButtonHandler
     }
}());
