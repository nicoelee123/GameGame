Levels = (function(){

     function One() {
          //Player initialize
          Player.setImage("mattPage.png");
          Player.setFrameDimensions(23, 50);

          //Furniture initialize
          Chest = new Furniture("chest.png", "chest.png", 186, 173, 1, 50, 100, 0.2);
          Table = new Furniture("table.png", "table.png", 512, 457, 1, 100, 350, 0.1);
          Hologram = new Furniture("greencap.png", "greencap.png", 16, 18, 1, 300, 100, 1.5);
          Hologram.setAnimation([0, 1, 0, 2], 10, 300);
          furnitureList = [Table, Chest, Hologram];

          //Doors initialize
          Door1 = new Door("door1.png", "door1open.png", 79, 24, 350, 435);
          doorList = [Door1];

          //Walls initialize
          Wall1 = new Wall("woodwall.png", 0, 440, 351, 62);
          wallList = [Wall1];

          Chest.setiImageDimensions(300, 300);
          Table.setiImageDimensions(300, 300);
          Hologram.setiImageDimensions(30, 30);

          // Item initialize
          selectedItems = [];

          //Bunch o' Words
          Game.setDialogue(Dialogue.getSample());
     }


     return {
          One : One
     }
}());
