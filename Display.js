var Display = (function () {


               /* =============================
                         CLIENT WINDOW
               ==============================*/

     viewportHeight = window.innerHeight;
     viewportWidth = window.innerWidth;

     playerCentered = true;

               /*8888888888888888888888888888888
                         METHODS
               8888888888888888888888888888888*/

     function getPlayerCentered() {
          return playerCentered;
     }

     function setPlayerCentered(boolean) {
          playerCentered = boolean;
     }

     function scrollMaster() {
          if(playerCentered == true) {
               scrollToPlayer();
          }
     }

     function scrollToPlayer() {
          window.scroll(0, Player.getCenterY() - viewportHeight/2 + 140);
     }

     function showInvItems() {
          itemsDict = Game.getInventoryTracker();
          for(key in itemsDict) {
               if(itemsDict[key] == null) {
                    continue;
               } else {
                    currentItem = itemsDict[key];
                    document.getElementsByClassName("item")[key-1].style.backgroundImage = "url(" + currentItem.getInvImg().src + ")";
               }
          }
     }

               /* =============================
                    BASE LAYER
               ============================= */

     canvasFloor = document.getElementById("floor");
     ctxFloor = canvasFloor.getContext("2d");

     canvasWidth = 600;
     canvasHeight = 1000;

     function setBackground(imgName) {
          document.getElementById("floor").style.backgroundImage = "url(" + imgName + ")";
          console.log("ran2");
     }

               /*===============================
                    LAYER ONE
               =================================*/


     canvasLayer1 = document.getElementById("layer1");
     ctxLayer1 = canvasLayer1.getContext("2d");

     counter = 0;

                    /*88888888888888888888
                         METHODS
                    88888888888888888888*/

     function drawPlayer () {

          Controller.playerSpriteHandler();

          ctxLayer1.drawImage(Player.getImage(), col * Player.getFrameWidth(), row * Player.getFrameHeight(),
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
          for(i = 0; i < 4; i++) {
               wipe(i);
          }
     }

     function placeItem(item) {
          ctxLayer1.drawImage(item.getImage(), 0, 0, item.getFrameWidth(), item.getFrameHeight(),
                         item.getCenterX(), item.getCenterY(),
                         item.getFrameWidth(), item.getFrameHeight());
     }

     function itemNextFrame() {

          ctxLayer1.clearRect(item.getCenterX(), item.getCenterY(), item.getFrameWidth(), item.getFrameHeight());
          spriteFrame = item.getFrameOrder()[item.getCounter()];
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
          for(item of itemList) {
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
     }

     function placeFurniture(furniture) {
          ctxLayer1.drawImage(furniture.getImage(), 0, 0, furniture.getFrameWidth(), furniture.getFrameHeight(),
                         furniture.getCenterX(), furniture.getCenterY(),
                         furniture.getWidth(), furniture.getHeight());
     }

     function furnitureNextFrame() {

          ctxLayer1.clearRect(furniture.getCenterX(), furniture.getCenterY(), furniture.getWidth(), furniture.getHeight());
          spriteFrame = furniture.getFrameOrder()[furniture.getCounter()];
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
          for(furniture of furnitureList) {
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
          for(door of doorList) {
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
          for(wall of wallList) {
               drawWall(wall);
          }
     }

                    /* ==============================
                         SECOND LAYER
                    =============================*/

     canvasLayer2 = document.getElementById("layer2");
     ctxLayer2 = canvasLayer2.getContext("2d");

//                       88888888888888888888888888
//                            METHODS
//                       88888888888888888888888888

     function resetText() {
          console.log("reset");
          newWords = document.createElement("div");
          newNode = document.createTextNode("");
          newWords.appendChild(newNode);
          newWords.id = "words";

          parent = document.getElementById("textBox");
          child = document.getElementById("words");

          parent.replaceChild(newWords, child);
     }

     function drawWord(string) {
          newWords = document.createElement("div");
          newNode = document.createTextNode(string);
          newWords.appendChild(newNode);
          newWords.id = "words";

          parent = document.getElementById("textBox");
          child = document.getElementById("words");

          parent.replaceChild(newWords, child);
     }

     function writeWords(words) {
          if(Engine.getCurrentFrame() % 2 == 0 && Words.getPrinting() == true) {
               console.log("adding letter");
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
          dialogueList = Game.getDialogue();
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

     canvasLayer3 = document.getElementById("layer3");
     ctxLayer3 = canvasLayer3.getContext("2d");

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
          getPlayerCentered : getPlayerCentered,
          setPlayerCentered : setPlayerCentered,
          furnitureInteract : furnitureInteract,
          showInvItems : showInvItems,
          buildAllWalls : buildAllWalls,
          writeWords : writeWords,
          drawWord : drawWord,
          wordsHandler : wordsHandler,
          resetText : resetText,
          setBackground : setBackground
     }
}());
