Levels = (function(){
     levelCounter = 0;

     function getLevelCounter() {
          return levelCounter;
     }

     function setLevelCounter(level) {
          levelCounter = level;
     }

     function One() {
          //Player initialize
          Player.setImage("mattPage.png");
          Player.setFrameDimensions(23, 50);

          Display.setBackground("BGoutside.png");
          console.log("ran");

          //   Furniture initialize
          Chest = new Furniture("chest.png", "chest.png", 186, 173, 50, 100, 0.2);
          //Table = new Furniture("table.png", "table.png", 512, 457, 100, 350, 0.1);
          //Hologram = new Furniture("greencap.png", "greencap.png", 16, 18, 300, 100, 1.5);
          //Hologram.setAnimation([0, 1, 0, 2], 10, 300);
          furnitureList = [Chest];


          //Doors initialize
          //Door1 = new Door("door1.png", "door1open.png", 79, 24, 350, 435);
          //doorList = [Door1];


          //Walls initialize


          Chest.setiImageDimensions(300, 300);
          //Table.setiImageDimensions(300, 300);
          //Hologram.setiImageDimensions(30, 30);

          // Item initialize
          Solution1 = new Item("Chem_A.png","Chem_A.png", 46, 54, 50, 850, 0.5)
          itemList = [Solution1];

          //Bunch o' Words
          Game.setDialogue(Dialogue.getSample());
     }


     return {
          getLevelCounter : getLevelCounter,
          setLevelCounter : setLevelCounter,
          One : One
     }
}());
