"use strict"
let Display = (function () {


               /* =============================
                         CLIENT WINDOW
               ==============================*/



     let viewportHeight = window.innerHeight;
     let viewportWidth = window.innerWidth;

               /*8888888888888888888888888888888
                         METHODS
               8888888888888888888888888888888*/

     function scrollMaster() {
          if(Player.getCentered() == true) {
               scrollToPlayer();
          }
     }

     function scrollToPlayer() {
          window.scroll(0, Player.getCenterY() - viewportHeight/2 + 140);
     }

     function showInvItems() {
          let itemsDict = Game.getInventoryTracker();
          for(let key in itemsDict) {
               if(itemsDict[key] == null) {
                    continue;
               } else {
                    let currentItem = itemsDict[key];
                    if(!currentItem.getInvCurrentlyAnimating()) {
                         document.getElementsByClassName("item")[key-1].firstChild.src = currentItem.getInvImg().src;
                    }
               }
          }
     }

               /* =============================
                    BASE LAYER ZERO
               ============================= */

     let canvasFloor = document.getElementById("floor");
     let ctxFloor = canvasFloor.getContext("2d");

     let canvasWidth = 600;
     let canvasHeight = 1000;

     function setBackground(imgName) {
          document.getElementById("floor").style.backgroundImage = "url(" + imgName + ")";
          console.log("ran2");
     }

               /*===============================
                    LAYER ONE
               =================================*/


     let canvasLayer1 = document.getElementById("layer1");
     let ctxLayer1 = canvasLayer1.getContext("2d");

                    /*88888888888888888888
                         METHODS
                    88888888888888888888*/

     function drawPlayer () {
          let colRow = Controller.playerSpriteHandler();

          ctxLayer1.drawImage(Player.getImage(), colRow[0] * Player.getFrameWidth(), colRow[1] * Player.getFrameHeight(),
                         Player.getFrameWidth(), Player.getFrameHeight(), Player.getCenterX(), Player.getCenterY(),
                         Player.getWidth(), Player.getHeight());
     }



     function wipe(layer) {
          if(layer == 1) {
               ctxLayer1.clearRect(0, 0, canvasLayer1.width, canvasLayer1.height);
          } else if(layer == 2) {
               ctxLayer2.clearRect(0, 0, canvasLayer1.width, canvasLayer1.height);
          } else if(layer == 3) {
               ctxLayer3.clearRect(0, 0, canvasLayer1.width, canvasLayer1.height);
          }
     }

     function wipeAll() {
          for(let i = 0; i < 4; i++) {
               wipe(i);
          }
     }

     function placeItem(item) {
          ctxLayer1.drawImage(item.getImage(), 0, 0, item.getFrameWidth(), item.getFrameHeight(),
                         item.getCenterX(), item.getCenterY(),
                         item.getFrameWidth(), item.getFrameHeight());
     }

     function itemNextFrame(item) {

          ctxLayer1.clearRect(item.getCenterX(), item.getCenterY(), item.getFrameWidth(), item.getFrameHeight());
          let spriteFrame = item.getFrameOrder()[item.getCounter()];
          ctxLayer1.drawImage(item.getImage(), spriteFrame * item.getFrameWidth(), 0,
                         item.getFrameWidth(), item.getFrameHeight(), item.getCenterX(),
                         item.getCenterY(), item.getFrameWidth(), item.getFrameHeight());

          if(Engine.getCurrentFrame() % item.getFrameStep() == 0) {
               item.setCounter(item.getCounter() + 1);
          }

          if(item.getCounter() >= item.getFrameOrder().length) {
               item.setCounter(0);
               item.setCurrentlyAnimating(false);
          }
     }

     function itemAnimationHandler() {
          for(let item of Game.getItemList()) {
               if(item.getCurrentlyAnimating() == true) {
                    itemNextFrame(item);
               }

               if(item.getCurrentlyAnimating() == false) {
                    placeItem(item);
                    item.setDelayCounter(item.getDelayCounter() + 1);

                    if(item.getDelayCounter() > item.getDelay()) {
                         item.setCurrentlyAnimating(true);
                         item.setDelayCounter(item.getFrameStep() * item.getFrameOrder().length);
                    }
               }
          }
          for(let key in Game.getInventoryTracker()) {
               let dict = Game.getInventoryTracker();
               let currentItem = dict[key];
               if(currentItem != null) {
                    if(currentItem.getInvCurrentlyAnimating() == true) {
                         currentItem.setInvCounter(currentItem.getInvCounter() + 1);

                         if(currentItem.getInvCounter() > currentItem.getInvTotalFrames()) {

                              currentItem.setInvCounter(0);
                              currentItem.setInvCurrentlyAnimating(false);
                         }
                    }
               } else {
                    continue;
               }
          }
     }

     function placeFurniture(furniture) {
          ctxLayer1.drawImage(furniture.getImage(), 0, 0, furniture.getFrameWidth(), furniture.getFrameHeight(),
                         furniture.getCenterX(), furniture.getCenterY(),
                         furniture.getWidth(), furniture.getHeight());
     }

     function furnitureNextFrame(furniture) {

          ctxLayer1.clearRect(furniture.getCenterX(), furniture.getCenterY(), furniture.getWidth(), furniture.getHeight());
          let spriteFrame = furniture.getFrameOrder()[furniture.getCounter()];
          ctxLayer1.drawImage(furniture.getImage(), spriteFrame * furniture.getFrameWidth(), 0,
                         furniture.getFrameWidth(), furniture.getFrameHeight(), furniture.getCenterX(),
                         furniture.getCenterY(), furniture.getWidth(), furniture.getHeight());

          if(Engine.getCurrentFrame() % furniture.getFrameStep() == 0) {
               furniture.setCounter(furniture.getCounter() + 1);
          }

          if(furniture.getCounter() >= furniture.getFrameOrder().length) {
               furniture.setCounter(0);
               furniture.setCurrentlyAnimating(false);
          }
     }

     function furnitureAnimationHandler() {
          for(let furniture of Game.getFurnitureList()) {
               if(furniture.getCurrentlyAnimating() == true) {
                    furnitureNextFrame(furniture);
               }

               if(furniture.getCurrentlyAnimating() == false) {
                    placeFurniture(furniture);
                    furniture.setDelayCounter(furniture.getDelayCounter() + 1);

                    if(furniture.getDelayCounter() > furniture.getDelay()) {
                         furniture.setCurrentlyAnimating(true);
                         furniture.setDelayCounter(furniture.getFrameStep() * furniture.getFrameOrder().length);
                    }
               }
          }
     }

     function drawDoor(door) {
          ctxLayer1.drawImage(door.getDisplayImage(), 0, 0, door.getWidth(), door.getHeight(),
                                   door.getCenterX(), door.getCenterY(), door.getWidth(), door.getHeight());
     }

     function placeAllDoors() {
          for(door of Game.getDoorList()) {
               drawDoor(door);
          }
     }

     function getCanvasWidth() {
          return canvasWidth;
     }

     function getCanvasHeight() {
          return canvasHeight;
     }

     function teleportPlayer(destX, destY) {
          Player.setCenterX(destX);
          Player.setCenterY(destY);
     }

     function drawWall(wall) {
          ctxLayer1.drawImage(wall.getImage(), 0, 0, wall.getWidth(), wall.getHeight(),
                              wall.getCenterX(), wall.getCenterY(), wall.getWidth(), wall.getHeight());
     }

     function buildAllWalls() {
          for(wall of Game.getWallList()) {
               drawWall(wall);
          }
     }

                    /* ==============================
                         SECOND LAYER
                    =============================*/

     let canvasLayer2 = document.getElementById("layer2");
     let ctxLayer2 = canvasLayer2.getContext("2d");

//                       88888888888888888888888888
//                            METHODS
//                       88888888888888888888888888

     function resetText() {
          let newWords = document.createElement("div");
          let newNode = document.createTextNode("");
          newWords.appendChild(newNode);
          newWords.id = "words";

          let parent = document.getElementById("textBox");
          let child = document.getElementById("words");

          parent.replaceChild(newWords, child);
     }

     function drawWord(string) {
          let newWords = document.createElement("div");
          let newNode = document.createTextNode(string);
          newWords.appendChild(newNode);
          newWords.id = "words";

          let parent = document.getElementById("textBox");
          let child = document.getElementById("words");

          parent.replaceChild(newWords, child);
     }

     function writeWords(words) {
          if(Engine.getCurrentFrame() % 2 == 0 && Words.getPrinting() == true) {
               Words.setTempWords(Words.getTempWords() + words[Words.getCounter()]);
               drawWord(Words.getTempWords());
               Words.setCounter(Words.getCounter() + 1);
               if(Words.getCounter() == words.length) {
                    Words.setCounter(0);
                    Words.setPrinting(false);
                    Words.setTempWords("");
               }
          }
     }

     function wordsSkipHandler() {
          let dialogueList = Game.getDialogue();
          if(Words.getSkip() == false) {
               writeWords(dialogueList[0]);
          } else if(Words.getSkip() == true) {
               resetText();
               Words.setPrinting(false);
               drawWord(dialogueList[0]);
               Words.setCounter(0);
               Words.setSkip(false);
          }
     }

     function wordsHandler() {
          let dialogueList = Game.getDialogue();
          if(Words.getPrinting() == false && Words.getNext() == true) {
               resetText();
               Words.setTempWords("");
               dialogueList.shift();
               Game.setDialogue(dialogueList);
               Words.setNext(false);
               Words.setPrinting(true);
          }
          if(dialogueList.length == 0) {
               return;
          }
          wordsSkipHandler();
     }
     function furnitureInteract(furniture) {
          ctxLayer2.drawImage(furniture.getiImage(), 0, 0, furniture.getiImageWidth(),
                                   furniture.getiImageHeight(), 200, window.scrollY + 250, furniture.getiImageWidth(),
                                   furniture.getiImageHeight());
     }

                    /*================================
                         THIRD LAYER
                    ==================================*/

     let canvasLayer3 = document.getElementById("layer3");
     let ctxLayer3 = canvasLayer3.getContext("2d");

     /*======================
     CANVAS ACCESS FUNCTIONS
     =======================*/

     let canvasList = [canvasFloor, canvasLayer1, canvasLayer2, canvasLayer3];
     let ctxList = [ctxFloor, ctxLayer1, ctxLayer2, ctxLayer3];

     function getCanvas() {
          return canvasList;
     }

     function getCtx() {
          return ctxList;
     }

     /*
          PUBLIC METHODS
     */
     return {
          drawPlayer : drawPlayer,
          wipe : wipe,
          wipeAll : wipeAll,
          placeFurniture : placeFurniture,
          getCanvasWidth : getCanvasWidth,
          getCanvasHeight : getCanvasHeight,
          furnitureAnimationHandler : furnitureAnimationHandler,
          itemAnimationHandler : itemAnimationHandler,
          placeAllDoors : placeAllDoors,
          teleportPlayer : teleportPlayer,
          scrollMaster : scrollMaster,
          furnitureInteract : furnitureInteract,
          showInvItems : showInvItems,
          buildAllWalls : buildAllWalls,
          writeWords : writeWords,
          drawWord : drawWord,
          wordsHandler : wordsHandler,
          resetText : resetText,
          setBackground : setBackground,
          getCanvas : getCanvas,
          getCtx : getCtx
     }
}());
