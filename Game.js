"use strict"
let Game = (function() {

     /*
          INITIALIZING GAME VARIABLES
     */
///////////////////////////////////////////////////////////////////////////////

     let Mode = "StartScreen";
     let modeCounter = "";
     let Level = 0;

     let furnitureList = [];
     let doorList = [];
     let wallList = [];
     let selectedItems = [];
     let itemList = [];

     let dialogue = [];

     let inventoryTracker = {
          1: null,
          2: null,
          3: null,
          4: null,
          5: null,
          6: null,
          7: null,
          8: null,
          9: null,
          10: null
     }

///////////////////////////////////////////////////////////////////////////////

/*===========================================================*/
     /*
          THE LOOP THAT STARTS THE MAIN GAME
     */
     function Play() {
          Engine.startClock();
          Display.wipeAll();
          Display.furnitureAnimationHandler();
          Display.itemAnimationHandler();
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
          Display.showInvItems();
     }
/*=============================================================*/

                         /* 88888888888888888888
                                   METHODS
                         88888888888888888888 */

     function showMainStage() {
          let fadeInTime = 2000;
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

     // HANDLES WHICH ITEMS ARE SELECTED FROM INVENTORY

     function inventoryHandler() {
          $(".item").click(function() {
               let currentItem = $(this).attr("data-boxNumber");
               let list = getSelectedItems();
               if(list.includes(currentItem)) {
                    let index = list.indexOf(currentItem);
                    list.splice(index, 1);
               } else {
                    list.push(currentItem);
               }
               $(this).toggleClass("selected");
          })

          $(".item").mouseenter(function() {
               let boxNumber = Number($(this).attr("data-boxNumber"));
               let dict = inventoryTracker;
               let hoveredItem = dict[boxNumber];
               if(hoveredItem != null) {
                    hoveredItem.setInvCurrentlyAnimating(true);
                    $(this).children().attr("src", hoveredItem.getGifSource());
               }
          })
     }

//=================================================

//          MODE LISTENER

//=================================================

     function ModeListener() {

          if(Mode == "Game") {
               // Activate only one time
               if(modeCounter != Mode) {
                    $("#floor").show();
                    $("#layer1").show();
                    $("#layer2").show();
                    $("#layer3").show();

                    $("#mgLayer1").hide();
                    $("#mgLayer2").hide();
                    $("#mgLayer3").hide();

                    console.log("mode = game");
               }
               // Looping
               Game.Play();

               // Making sure it doesn't loop unnecessary components
               modeCounter = "Game";
          }
          if(Mode == "StartScreen") {
               // Activate only one time
               if(modeCounter != Mode) {
                    $("#floor").hide();
                    $('#layer1').hide();
                    $('#layer2').hide();
                    $('#layer3').hide();

                    let time = 1300;
                    $("#startScreen1").fadeIn(time);
                    $("#startScreen2").fadeIn(time);
                    $("#startBtn").fadeIn(time);

                    console.log("mode = startscreen");
               }
               // Looping
               StartScreen.StartScreen();

               // Making sure it doesn't loop unnecessary components
               modeCounter = "StartScreen";
          }
          if(Mode == "Furniture") {
               // Activate only one time
               if(modeCounter != Mode) {
                    // Hiding mainstage
                    $("#floor").hide();
                    $('#layer1').hide();
                    $('#layer2').hide();
                    $('#layer3').hide();

                    // Showing Minigame
                    $("#mgLayer1").show();
                    $("#mgLayer2").show();
                    $("#mgLayer3").show();

                    console.log("mode = furniture");
               }
               // Looping
               Minigames.minigameHandler();

               // Making sure it doesn't loop unnecessary components
               modeCounter = "Furniture";
          }
     }

     function LevelListener(input) {
          switch(input) {
               case 1:
                    if(Levels.getLevelCounter() != Game.getLevel()) {
                         Levels.setLevelCounter(Levels.getLevelCounter() + 1);
                         Levels.One();
                    }
                    break;
          }
     }


     /*
          TESTS WHETHER THE PLAYER IS COLLIDING WITH A SPECIFIED FURNITURE OR NOT

          @param obstacle the furniture we're testing
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
          let bottomWallBuffer = 0;
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
          for(let frnt of furnitureList) {
               if(detectPlayerCollision(frnt)) {
                    Player.setCenterX(Player.getPrevX());
                    Player.setCenterY(Player.getPrevY());
               }
          }
          // Door collision
          for(let dr of doorList) {
               if(detectPlayerCollision(dr)) {
                    Player.setCenterX(Player.getPrevX());
                    Player.setCenterY(Player.getPrevY());
               }
          }

          // Wall collision
          for(let wall of wallList) {
               if(detectPlayerCollision(wall)) {
                    Player.setCenterX(Player.getPrevX());
                    Player.setCenterY(Player.getPrevY());
               }
          }

          // Item collision
          for(let item of itemList) {
               if(detectPlayerCollision(item)) {
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
          } else {
               return null;
          }
     }

     function itemZone(item) {
          let howClose = 15;
          let playerCenterX = Player.getCenterX() + (Player.getWidth()/2);
          let playerCenterY = Player.getCenterY() + (Player.getHeight()/2);
          //up-down column
          if((playerCenterX > item.getCenterX()) && (playerCenterX < (item.getCenterX() + item.getWidth()))) {
               //up zone
               if((playerCenterY < item.getCenterY()) && (playerCenterY > item.getCenterY() - howClose*2)) {
                    return "TOP-ZONE";
               }
               //down zone
               if((playerCenterY > (item.getCenterY() + item.getHeight())) && (playerCenterY < item.getCenterY() + item.getHeight() + howClose/2)) {
                    return "BOTTOM-ZONE";
               }
          }
          //left-right row
          else if((playerCenterY > item.getCenterY()) && (playerCenterY < item.getCenterY() + item.getHeight())) {
               //left zone
               if((playerCenterX < item.getCenterX()) && (playerCenterX > item.getCenterX() - howClose)) {
                    return "LEFT-ZONE";
               }
               //right zone
               else if((playerCenterX > item.getCenterX() + item.getWidth()) && (playerCenterX < item.getCenterX() + item.getWidth() + howClose)) {
                    return "RIGHT-ZONE";
               }
          } else {
               return null;
          }
     }

     function playerCurrentInteractSetter() {

          if((Controller.furnitureInteractTester() == null) && (Controller.itemInteractTester() == null)) {

               Player.setCurrentlyInteractingWith(null);

          } else if(Controller.furnitureInteractTester() != null) {

               Player.setCurrentlyInteractingWith(Controller.furnitureInteractTester());

          } else if(Controller.itemInteractTester() != null) {

               Player.setCurrentlyInteractingWith(Controller.itemInteractTester());
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
               setMode("Furniture");

          } else if(itemList.includes(Player.getCurrentlyInteractingWith())) {
               console.log("item");
               //deletes item from screen
               let currentItem = Player.getCurrentlyInteractingWith();
               itemList.splice(itemList.indexOf(currentItem.getImage().src));

               //places into inventory
               let emptySlot = 1;
               for(let key in inventoryTracker) {
                    if (inventoryTracker[key] == null) {
                         let emptySlot = key;
                         break;
                    }
               }
               inventoryTracker[emptySlot] = Player.getCurrentlyInteractingWith();
          }
     }

     function getInventoryTracker() {
          return inventoryTracker;
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

     function getFurnitureList() {
          return furnitureList;
     }

     function getItemList() {
          return itemList;
     }

     function getDoorList() {
          return doorList;
     }

     function getWallList() {
          return wallList;
     }

     function setFurnitureList(list) {
          furnitureList = list;
     }

     function setItemList(list) {
          itemList = list;
     }

     function setDoorList(list) {
          doorList = list;
     }

     function setWallList(list) {
          wallList = list;
     }


                              /* PUBLIC METHODS */
     return {
          initiateBoundaries : initiateBoundaries,
          playerInteractionHandler : playerInteractionHandler,
          furnitureZone : furnitureZone,
          getInventoryTracker : getInventoryTracker,
          itemZone : itemZone,
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
          getFurnitureList : getFurnitureList,
          getItemList : getItemList,
          getDoorList : getDoorList,
          getWallList : getWallList,
          setFurnitureList : setFurnitureList,
          setItemList : setItemList,
          setDoorList : setDoorList,
          setWallList : setWallList,
          Play : Play
     }
}());
