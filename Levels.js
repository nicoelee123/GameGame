"use strict"
let Levels = (function(){
     let levelCounter = 0;

     function getLevelCounter() {
          return levelCounter;
     }

     function setLevelCounter(int) {
          levelCounter = int;
     }

     function One() {
          //Player initialize
          Player.setImage("pixels/mattPage.png");
          Player.setFrameDimensions(23, 50);

          Display.setBackground("pixels/BGoutside.png");

          //   Furniture initialize
          let Chest = new Furniture("pixels/chest.png", "pixels/chest.png", 186, 173, 50, 100, 0.2);
          let Table = new Furniture("pixels/table.png", "pixels/table.png", 512, 457, 100, 350, 0.1);
          let Hologram = new Furniture("pixels/greencap.png", "pixels/greencap.png", 16, 18, 300, 100, 3);
          Hologram.setAnimation([0, 1, 0, 2], 10, 300);
          Game.setFurnitureList([Chest, Hologram, Table]);


          //Doors initialize
          //Door1 = new Door("door1.png", "door1open.png", 79, 24, 350, 435);
          //doorList = [Door1];


          //Walls initialize


          Chest.setiImageDimensions(300, 300);
          Table.setiImageDimensions(300, 300);
          Hologram.setiImageDimensions(30, 30);

          // Item initialize
          let Coin = new Item("pixels/coinSprite.png","pixels/coinstay.jpg", "pixels/coinspin.gif", 50, 850, 1)
          Coin.setFrameDimensions(52, 50, 52, 50);
          Coin.setAnimation([0, 1, 2, 3, 4, 5, 6, 7], 5, 300, 50);
          Game.setItemList([Coin]);

          //Bunch o' Words
          Game.setDialogue(Dialogue.getSample());
     }


     return {
          getLevelCounter : getLevelCounter,
          setLevelCounter : setLevelCounter,
          One : One
     }
}());
