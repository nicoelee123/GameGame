var Game = (function() {

     /*
          INITIALIZING GAME VARIABLES
     */
///////////////////////////////////////////////////////////////////////////////

     Mode = "StartScreen";
     Level = 0;

///////////////////////////////////////////////////////////////////////////////

/*===========================================================*/
     /*
          THE LOOP THAT STARTS THE MAIN GAME
     */
     function Play() {
          Engine.startClock();
          Display.wipeAll();
          Display.furnitureAnimationHandler();
          Player.trackPrevLocation();
          Controller.playerMovementHandler();
          Display.placeAllDoors();
          Display.buildAllWalls();
          playerInteractionHandler();
          initiateBoundaries();
          Display.drawPlayer();
          Display.scrollMaster();
          doorHandler();
          Display.wordsHandler();
     }
/*=============================================================*/

                         /* 88888888888888888888
                                   METHODS
                         88888888888888888888 */

     function showMainStage() {
          fadeInTime = 2000;
          $("#floor").fadeIn(fadeInTime);
          $("#layer1").fadeIn(fadeInTime);
          $("#layer2").fadeIn(fadeInTime);
          $("#layer3").fadeIn(fadeInTime);
     }

     function getMode() {
          return Mode;
     }

     function setMode(m) {
          Mode = m;
     }

     function getLevel() {
          return Level;
     }

     function setLevel(int) {
          Level = int;
     }

     function inventoryHandler() {
          $(".item").click(function() {
               currentItem = $(this).attr("data-boxNumber");
               list = getSelectedItems();
               if(list.includes(currentItem)) {
                    index = list.indexOf(currentItem);
                    list.splice(index, 1);
               } else {
                    list.push(currentItem);
               }
               $(this).toggleClass("selected");
          })
     }

//=================================================

//          MODE LISTENER

//=================================================

     function ModeListener() {
          if(Mode == "Game") {
               $("#startBtn").fadeOut(200);
               $('#startScreen1').fadeOut(1000);
               $('#startScreen2').fadeOut(1000);
               $("#textBox").show(500);
               $("#faceContainer").slideDown(1500);
               $("#inventoryContainer").slideDown(2000);
               showMainStage();

               Game.Play();
          }
          if(Mode == "StartScreen") {
               $('#layer1').hide();
               $('#layer2').hide();
               $('#layer3').hide();

               StartScreen.StartScreen();
          }
     }

     function LevelListener(input) {
          switch(input) {
               case 0:
                    Levels.One();
                    break;
          }
     }


     /*
          TESTS WHETHER THE PLAYER IS COLLIDING WITH A SPECIFIED FURNITURE OR NOT

          @param furniture the furniture we're testing
          @return true or false depending on whether the player is colliding with said furniture or not
     */
     function detectPlayerCollision(obstacle) {
          if((Player.getCenterY() + Player.getHeight()) > obstacle.getCenterY()) {
               if(Player.getCenterX() < obstacle.getCenterX() + obstacle.getWidth()) {
                    if((Player.getCenterX() + Player.getWidth()) > obstacle.getCenterX()) {
                         if((Player.getCenterY() + (Player.getHeight()/2)) < (obstacle.getCenterY()  + obstacle.getHeight())) {
                              return true;
                         } else {
                              return false;
                         }
                    } else {
                         return false;
                    }
               } else {
                    return false;
               }
          } else {
               return false;
          }
     }

     /*
          INITIATES ALL THE BOUNDARIES THAT THE PLAYER CANNOT CROSS
     */
     function initiateBoundaries() {
          let topWallBuffer = 0;
          let leftWallBuffer = 0;
          let rightWallBuffer = 0;
          let bottomWallBuffer = 150;
          /*
               Wall boundaries of the room
          */
          //left wall
          if(Player.getCenterX() < 0 + leftWallBuffer) {
               Player.setCenterX(0 + leftWallBuffer);
          }
          //right wall
          if((Player.getCenterX() + Player.getWidth()) > (Display.getCanvasWidth() - rightWallBuffer)) {
               Player.setCenterX(Display.getCanvasWidth() - Player.getWidth() - rightWallBuffer);
          }
          //top wall
          if(Player.getCenterY() < 0 + (topWallBuffer)) {
               Player.setCenterY(0 + topWallBuffer);
          }
          //bottom wall
          if((Player.getCenterY() + Player.getHeight()) > (Display.getCanvasHeight() - bottomWallBuffer)) {
               Player.setCenterY(Display.getCanvasHeight() - Player.getHeight() - bottomWallBuffer);
          }

          /*
               Furniture collision
          */
          for(frnt of furnitureList) {
               if(detectPlayerCollision(frnt)) {
                    Player.setCenterX(Player.getPrevX());
                    Player.setCenterY(Player.getPrevY());
               }
          }
          // Door collision
          for(dr of doorList) {
               if(detectPlayerCollision(dr)) {
                    Player.setCenterX(Player.getPrevX());
                    Player.setCenterY(Player.getPrevY());
               }
          }

          // Wall collision
          for(wall of wallList) {
               if(detectPlayerCollision(wall)) {
                    Player.setCenterX(Player.getPrevX());
                    Player.setCenterY(Player.getPrevY());
               }
          }
     }

     /*
          OUTPUTS WHETHER THE PLAYER IS ABOVE, BELOW, LEFT, OR TO THE RIGHT OF SPECIFIED FURNITURE.

          @param furniture the furniture we check around
          @return the zone the player is in with respect to specified furniture
     */
     function furnitureZone(furniture) {
          let howClose = 15;
          let playerCenterX = Player.getCenterX() + (Player.getWidth()/2);
          let playerCenterY = Player.getCenterY() + (Player.getHeight()/2);
          //up-down column
          if((playerCenterX > furniture.getCenterX()) && (playerCenterX < (furniture.getCenterX() + furniture.getWidth()))) {
               //up zone
               if((playerCenterY < furniture.getCenterY()) && (playerCenterY > furniture.getCenterY() - howClose*2)) {
                    return "TOP-ZONE";
               }
               //down zone
               if((playerCenterY > (furniture.getCenterY() + furniture.getHeight())) && (playerCenterY < furniture.getCenterY() + furniture.getHeight() + howClose/2)) {
                    return "BOTTOM-ZONE";
               }
          }
          //left-right row
          else if((playerCenterY > furniture.getCenterY()) && (playerCenterY < furniture.getCenterY() + furniture.getHeight())) {
               //left zone
               if((playerCenterX < furniture.getCenterX()) && (playerCenterX > furniture.getCenterX() - howClose)) {
                    return "LEFT-ZONE";
               }
               //right zone
               else if((playerCenterX > furniture.getCenterX() + furniture.getWidth()) && (playerCenterX < furniture.getCenterX() + furniture.getWidth() + howClose)) {
                    return "RIGHT-ZONE";
               }
          }
     }

     function playerCurrentInteractSetter() {

          if(Controller.furnitureInteractTester() == false) {
               Player.setCurrentlyInteractingWith(null);
          } else if(Controller.furnitureInteractTester() != false) {
               Player.setCurrentlyInteractingWith(Controller.furnitureInteractTester());
          }

          if(Player.getCurrentlyInteractingWith() == null) {
               Player.setInteract(false);
          }
     }

     function doorHandler() {
          for(door of doorList) {
               if(door.getOpen() == false) {
                    door.setDisplayImage(door.getImage());
               } else if(door.getOpen() == true) {
                    door.setDisplayImage(door.getOpenImage());
               }
          }
     }

     function playerInteractionHandler() {
          playerCurrentInteractSetter();

          if(furnitureList.includes(Player.getCurrentlyInteractingWith())) {

               Display.furnitureInteract(Player.getCurrentlyInteractingWith());

          }
     }

     function getDialogue() {
          return dialogue;
     }

     function setDialogue(thing) {
          dialogue = thing;
     }

     function getSelectedItems() {
          return selectedItems;
     }

     function setSelectedItems(array) {
          selectedItems = array;
     }


                              /* PUBLIC METHODS */
     return {
          initiateBoundaries : initiateBoundaries,
          playerInteractionHandler : playerInteractionHandler,
          furnitureZone : furnitureZone,
          setMode : setMode,
          getMode : getMode,
          getDialogue : getDialogue,
          setDialogue : setDialogue,
          ModeListener : ModeListener,
          LevelListener : LevelListener,
          getLevel : getLevel,
          setLevel : setLevel,
          inventoryHandler : inventoryHandler,
          getSelectedItems : getSelectedItems,
          setSelectedItems : setSelectedItems,
          Play : Play
     }
}());
